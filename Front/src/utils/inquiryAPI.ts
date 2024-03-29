import API from "./axios";

const URL = '/request'

export const getFAQ = () => {
  return API.get(URL + '/faq')
    .then(res => res.data)
    .catch(err => console.error(err))
};