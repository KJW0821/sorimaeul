import API from "./axios";

const URL = "/model";

export interface modelCreationData {
  modelName: string;
  imagePath: string;
}

export const createModel = (data: modelCreationData) => {
  return API.post(URL, data)
    .then(res => res)
    .catch((err) => console.error(err))
}

export const getModelInfo = (modelCode: string) => {
  return API.get(URL + `/detail/${modelCode}`)
    .then(res => res.data)
    .catch(err => console.error(err))
}

export const getScripts = () => {
  return API.get(URL + '/script')
    .then(res => res.data)
    .catch(err => console.error(err))
}

export const uploadExVoiceFiles = (modelCode: number, data: FormData | undefined) => {
  return API.post(URL + `/voice/${modelCode}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    }
  })
    .then(res => res)
    .catch(err => console.error(err))
}

export const startModelLearning = (modelCode: number) => {
  return API.post(URL + `/start/${modelCode}`)
    .then(res => res)
    .catch(err => console.error(err))
}

export const uploadExModelFile = (modelCode: number, data: FormData | undefined) => {
  return API.post(URL + `/external/${modelCode}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    }
  })
    .then(res => res)
    .catch(err => console.error(err))
}

export const recordVoice = (modelCode: number, num: number, data: FormData | undefined) => {
  return API.post(URL + `/record/${modelCode}/${num}`, data, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })
    .then(res => res)
    .catch(err => console.error(err))
}