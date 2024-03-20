from fastapi import FastAPI
from pydantic import BaseModel
from pytube import YouTube
from simple_diarizer.diarizer import Diarizer
from simple_diarizer.utils import convert_wavfile

import os
import tempfile
import librosa
import soundfile as sf

app = FastAPI()

root_path = r'./youtube'

class DataInput(BaseModel):
    youtubeURL: str
    name: str
    num: int

@app.post('/diarizer')
def dializer(request: DataInput):
    print('start diarizer')

    youtubeURL = request.youtubeURL
    name = request.name
    num = request.num

    download(youtubeURL, name)

    split(name)

    diarize(name, num)

    print('finish diarizer')
    

def download(youtubeURL, name):
    yt = YouTube(youtubeURL)

    print(f'start download youtube : {yt.title}')

    # 원본 영상 다운로드
    yt.streams.filter(progressive=True, file_extension="mp4").order_by('resolution').desc().first().download(filename=f'{name}_origin.mp4', output_path=f'{root_path}/{name}')

    # 영상만 다운로드
    yt.streams.filter(adaptive=True, file_extension="mp4", only_video=True).order_by('resolution').desc().first().download(filename=f'{name}_video.mp4', output_path=f'{root_path}/{name}')

    # 오디오만 다운로드
    yt.streams.filter(adaptive=True, file_extension="mp4", only_audio=True).first().download(filename=f'{name}.wav', output_path=f'{root_path}/{name}')

    print('finish download')

def split(name):
    print('start split voice & background')

    audio_path = f'{root_path}/{name}/{name}.wav'
    spl = f'spleeter separate -p spleeter:2stems -o {root_path} ' + audio_path
    os.system(spl)

    print('finish split')

def diarize(name, num):
    print('start diarizing')

    audio_path = f'{root_path}/{name}/vocals.wav'

    with tempfile.TemporaryDirectory() as outdir:
        voice = audio_path

        wav_file = convert_wavfile(voice, f"{outdir}\\{name}_converted.wav")

        diar = Diarizer(
            embed_model='xvec', # supported types: ['xvec', 'ecapa']
            cluster_method='sc', # supported types: ['ahc', 'sc']
            window=1.5, # size of window to extract embeddings (in seconds)
            period=0.75 # hop of window (in seconds)
        )

        segments = diar.diarize(wav_file,
                            num_speakers=num,
                            outfile=f"{outdir}\\{name}.rttm"
        )

    sample_rate = 16000

    y, sr = librosa.load(audio_path, sr=sample_rate)

    duration = librosa.get_duration(y=y, sr=sample_rate)

    for i in range(0, num):
        ny = [0.0 for j in range(round(sr * duration))]

        for seg in segments:
            if seg['label'] == i:
                start = seg['start_sample']
                end = seg['end_sample']
                for j in range(start, end):
                    ny[j] = y[j]

        sf.write(f"{root_path}/{name}/{name}_label{i}.wav", ny, sr, format='WAV')
    
    print('finish diarizing')

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app=app, host='0.0.0.0', port=7654)