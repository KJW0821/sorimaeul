import API from "./axios";

const URL = '/dub';

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
  return API.get(URL + dubCode)
    .then(res => res.data)
    .catch(err => console.error(err))
};