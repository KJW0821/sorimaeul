# 소리마을 포팅 매뉴얼

## 목차

1. [환경 설정](#1-환경-설정)

- [기술 스택](#기술-스택)
- [외부 서비스](#외부-서비스)

2. [빌드 및 배포](#2-빌드-및-배포)

- [환경 변수 설정](#환경-변수-설정)
- [빌드](#빌드)
- [배포](#배포)

## 1. 환경 설정

### 기술 스택

- 이슈 관리: Jira
- 형상 관리: Gitlab
- 빌드/배포 관리: Jenkins
- 커뮤니케이션: Mattermost, Notion, Discord
- 디자인: Figma
- 개발 환경
  - IDE
    - Visual Studio Code 1.85.1
    - IntelliJ IDEA 2023.3.3 (Community Edition)
  - 서버
    - AWS EC2
      - Ubuntu 20.04.6 LTS
      - Nginx 1.18.0
      - OpenSSL 1.1.1f
    - AWS S3 Bucket
    - GPU server
      - Ubuntu 20.04.4 LTS
      - Device: NVIDIA Corporation GV100GL (Tesla V100 PCle 32GB)
  - Front-End
    - React 18.2.0
    - Redux 5.0.1
    - Tailwind CSS 3.4.1
    - Node.js 20.10.0
  - Back-End
    - Java 17 (Azul Zulu version 17.0.9)
    - Spring boot 3.2.2
    - MySQL 8.0.35
    - Redis 7.2.4
  - AI
    - Python 3.9.13
    - CUDA Toolkit 11.7.1
    - Anaconda 4.10.3

### 외부 서비스

- Kakao OAuth: [Kakao developers](https://developers.kakao.com/)
- Google OAuth: [Google Cloud](https://console.cloud.google.com/)
- AWS S3 Bucket: [AWS S3](https://s3.console.aws.amazon.com/)

## 2. 빌드 및 배포

### 환경 변수 설정

- Front/.env

- Back/src/main/resources/application.yml

  - MySQL

    ```yml
    spring:
      datasource:
        url: { MySQL server URL }
        hikari:
          username: { MySQL username }
          password: { MySQL password }
    ```

  - Redis

    ```yml
    jwt:
      redis:
        host: { BASE_URL }
        port: { Redis port }
        password: { Redis password }
    ```

  - JWT

    ```yml
    jwt:
      token:
        secret-key: {key} (HS256으로 해독 가능한 키, Base64 인코딩, 512 byte 이상)
    ```

  - OAuth

    ```yml
    spring:
      security:
        oauth2:
          client:
            registration:
              kakao:
                client-id: {Kakao API key}
                client-secret: {Kakao API secret}
                redirect-uri: {BASE_URL}/login-callback/kakao
              google:
                client-id: {Google API key}
                client-secret: {Google API secret}
                redirect-uri: {Base URL}/login-callback/google
    ```

  - S3 Bucket

    ```yml
    cloud:
      aws:
        s3:
          bucket: { AWS S3 Bucket URL }
        region:
          static: { AWS S3 Bucket region }
        credentials:
          access-key: { AWS S3 Bucket key }
          secret-key: { AWS S3 Bucket secert }
    ```

- ai/rvcmodel/.env
  ```env
  BASE_URL={Base URL}
  S3_URL={AWS S3 Bucket URL}
  ```

### 빌드

- Front-End

- Back-End

- AI

  - Pre-trained Model 준비 ([Hugging Face space](https://huggingface.co/lj1995/VoiceConversionWebUI/tree/main))

    - Aria2c 설치

      ```bash
      $ sudo apt install aria2
      ```

    - 모델 다운로드

      ```bash
      $ sh ./ai/rvcmodel/tools/dlmodels.sh
      ```

      - 이후 tools 폴더 내에 생성된 파일들을 각 위치로 이동
      - ai/rvcmodel/assets/hubert/hubert_base.pt
      - ai/rvcmodel/assets/pretrained
      - ai/rvcmodel/assets/uvr5_weights

    - `ai/rvcmodel/assets/rmvpe` 폴더에 RMVPE 피치 추출 파일 다운로드 ([rmvpe.pt](https://huggingface.co/lj1995/VoiceConversionWebUI/blob/main/rmvpe.pt))

  - ffmpeg 설치

    ```bash
    $ sudo apt install ffmpeg
    ```

  - 가상 환경 설정

    - 모델 학습 환경 (train)

      ```bash
      $ conda create -n train python=3.9
      $ conda activate train
      $ pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu117
      $ pip install -r requirements-train.txt
      $ conda deactivate
      ```

    - 음성 추론 환경 (infer)

      ```bash
      $ conda create -n infer python=3.9
      $ conda activate infer
      $ pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu117
      $ pip install -r requirements-infer.txt
      $ conda deactivate
      ```

    - 더빙 영상 인코딩 환경 (encode)

      ```bash
      $ conda create -n encode python=3.9
      $ conda activate encode
      $ pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu117
      $ pip install -r requirements-encode.txt
      $ conda deactivate
      ```

### 배포

- Front-End

- Back-End

- AI

  - train

    ```bash
    $ conda activate train
    $ nohup python train-model.py >> train-model.log 2>&1 &
    $ conda deactivate
    ```

  - infer

    ```bash
    $ conda activate infer
    $ nohup python infer-cover.py >> infer-cover.log 2>&1 &
    $ nohup python infer-dubbing.py >> infer-dubbing.log 2>&1 &
    $ conda deactivate
    ```

  - encode

    ```bash
    $ conda activate encode
    $ nohup python encode-dubbing.py >> encode-dubbing.log 2>&1 &
    $ conda deactivate
    ```
