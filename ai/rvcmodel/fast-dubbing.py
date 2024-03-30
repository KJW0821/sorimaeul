from fastapi import FastAPI, BackgroundTasks, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from moviepy.editor import VideoFileClip, AudioFileClip, CompositeAudioClip
from dotenv import load_dotenv

import os, shutil
import requests
import logging


logger = logging.getLogger(__name__)

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

cur_dir = os.getcwd()
root_path = f"{cur_dir}/sorimaeul-data/dub"

load_dotenv(os.path.join(cur_dir, ".env"))
s3_url = os.environ["S3_URL"]


class Request(BaseModel):
    userCode: int
    dubCode: int
    dubName: str
    videoURL: str
    voiceURL: List[str]
    

# S3 서버에서 파일 다운로드
def download_file(url: str, filename: str):
    with open(filename, 'wb') as f:
        response = requests.get(f"{s3_url}{url}")
        if response.status_code == 200:
            f.write(response.content)
        else:
            raise HTTPException(status_code=response.status_code, detail="Failed to download file")


# 더빙 영상 제작
def create_dubbing(request: Request):
    userCode = request.userCode
    dubCode = request.dubCode
    dubName = request.dubName
    videoURL = request.videoURL
    voiceURL = request.voiceURL

    logger.info(f"Start create video: {root_path}/{dubCode}/{dubCode}.mp4")

    try:
        dub_path = f"{root_path}/{dubCode}"
        video_file = f"{dub_path}/video.mp4"

        os.makedirs(dub_path, exist_ok=True)

        download_file(videoURL, video_file)

        video = VideoFileClip(video_file).write_videofile()

        combine_audio = [video.audio]

        for idx, voice_url in enumerate(voiceURL):
            voice_file = f"{dub_path}/voice_{idx}.mp3"
            download_file(voice_url, voice_file)
            combine_audio.append(AudioFileClip(voice_file))
            
        audio = CompositeAudioClip(combine_audio)

        video = video.set_audio(audio)

        dub_file = f"{dub_path}/dub_{dubCode}.mp4"
        video.write_videofile(dub_file, codec='libx264', audio_codec='libmp3lame')
        logger.info(f"Write video {dub_file}")

        response = requests.post("https://j10e201.p.ssafy.io/api/dub/save",
                                 json={"dubCode":dubCode, "path":dub_file})
        response.raise_for_status()
        
        logger.info(f"Response status {response.status_code}")
        msg = f'더빙 영상 "{dubName}" 생성이 완료되었습니다.'

    except Exception as e:
        logger.info(f"Error occured: {e}")
        msg = f'더빙 영상 "{dubName}" 생성에 실패했습니다.'
    
    finally:
        sendNotification(userCode, dubCode, msg)

        if os.path.exists(dub_path):
            shutil.rmtree(dub_path)
            logger.info(f"Remove {dub_path}")


# 알림 전송
def sendNotification(userCode, targetCode, msg):
    logger.info("Send notification")
    try:
        response = requests.post(f"https://j10e201.p.ssafy.io/api/notify/send",
                                 json={"userCode":userCode,
                                       "name":"dubbing",
                                       "data": {
                                           "targetCode":targetCode,
                                           "content":msg
                                           }})
        logger.info(f"Response status {response.status_code}")
    except requests.exceptions.RequestException as e:
        logger.info(f"Error occurred: {e}")


@app.post("/create-dubbing")
def create(request, background_tasks: BackgroundTasks):
    background_tasks.add_task(create_dubbing, request)
    return {"status": 200, "message": "Process accepted"}


if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app=app, host='0.0.0.0', port=7864)