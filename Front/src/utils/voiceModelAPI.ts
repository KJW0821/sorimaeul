import API from "./axios";
import { getCookie } from "./cookie";

const URL = "/model";

export interface modelCreationData {
  modelName: string;
  imagePath: string;
}

export const createModel = (data: modelCreationData) => {
  return API.post(URL, data)
    .then(res => res)
    .catch((err) => console.log(err))
}

export const getModelInfo = (modelCode: string) => {
  return API.get(URL + `/detail/${modelCode}`)
    .then(res => res.data)
    .catch(err => console.log(err))
}