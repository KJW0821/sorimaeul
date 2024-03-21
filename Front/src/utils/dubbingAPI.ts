import API from "./axios";

export const getSourceVideos = (page: number) => {
  return API.get(`/dub/video`, {
    params: {
      page
    }
  })
    .then(res => res.data)
    .catch(err => console.log(err))
};