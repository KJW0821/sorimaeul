import API from "./axios";

const URL = '/dub';

export const getSourceVideoList = (page: number) => {
  return API.get(URL + '/video', {
    params: {
      page
    }
  })
    .then(res => res.data)
    .catch(err => console.error(err))
};