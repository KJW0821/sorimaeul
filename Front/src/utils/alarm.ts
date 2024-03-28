import API from "./axios";

const URL = '/notify';

export const getAlarmList = () => {
  return API.get(URL)
    .then(res => res.data)
    .catch(err => console.error(err))
};