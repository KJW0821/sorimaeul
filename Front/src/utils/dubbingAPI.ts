import API from "./axios";

const URL = '/dub';

interface ConvertingData {
  videoSourceCode: number;
  modelCode: number;
  voicePath: string;
  pitch: number;
}

interface CreatingData {
  videoSourceCode: number;
  dubName: string;
  voicePaths: string[];
}

interface UpdatingData {
  dubName: string;
  dubDetail: string;
  isPublic: boolean;
}

export const getSourceVideoList = (page: number) => {
  return API.get(URL + '/video', {
    params: {
      target: 'all',
      page
    }
  })
    .then(res => res.data)
    .catch(err => console.error(err))
};

export const getPopularSourceVideoList = () => {
  return API.get(URL + '/video', {
    params: {
      target: 'popular'
    }
  })
    .then(res => res.data)
    .catch(err => console.error(err))
};

export const getSourceVideo = (sourceCode: string) => {
  return API.get(URL + `/video/${sourceCode}`)
    .then(res => res.data)
    .catch(err => console.error(err))
};

export const getPopularUserVideo = (sourceCode: string) => {
  return API.get(URL, {
    params: {
      videoSourceCode: sourceCode,
      target: 'popular',
      page: 1
    }
  })
    .then(res => res.data)
    .catch(err => console.error(err))
};

export const getUserVideos = (page: number, sourceCode: string) => {
  return API.get(URL, {
    params: {
      videoSourceCode: sourceCode,
      target: 'all',
      page
    }
  })
    .then(res => res.data)
    .catch(err => console.error(err))
};

export const getUserVideo = (dubCode: string) => {
  return API.get(URL + `/${dubCode}`)
    .then(res => res.data)
    .catch(err => console.error(err))
};

export const getOriginVoices = (sourceCode: string) => {
  return API.get(URL + `/audio/${sourceCode}`)
    .then(res => res.data)
    .catch(err => console.error(err))
};

export const uploadRecord = (videoSourceCode: string, voiceIndex: number, data: FormData) => {
  return API.post(URL + `/record/${videoSourceCode}/${voiceIndex}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    }
  })
    .then(res => res.data)
    .catch(err => console.error(err))
};

export const convertRecord = (voiceIndex: number, data: ConvertingData) => {
  return API.post(URL + `/convert/${voiceIndex}`, data)
    .then(res => res.data)
    .catch(err => console.error(err))
};

export const createDubbing = (data: CreatingData) => {
  return API.post(URL + '/create', data)
    .then(res => res.data)
    .catch(err => console.error(err))
};

export const updateDubbing = (dubCode: string, data: UpdatingData) => {
  return API.patch(URL + `/${dubCode}`, data)
    .then(res => res)
    .catch(err => console.error(err))
};