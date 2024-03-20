import API from "./axios";
import { getCookie } from "./cookie";

const URL = "/model";

export interface modelCreationData {
  modelName: string;
  imagePath: string;
}

export const createModel = (data: modelCreationData) => {
  return API.post(URL, data)
    .then((res) => {
      return res
    })
    .catch((err) => {
      console.log(err);
    })
}