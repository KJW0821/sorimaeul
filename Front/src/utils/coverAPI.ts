import API from "./axios";
import { CoverCreateInterface, CoverUpdateInterface } from "../components/aiCover/CoverInterface";

// AI 커버 생성을 위한 음성 모델 조회 - videoSourceCode 와 page 모두 null로 전달
export const getCoverModels = () => {
  return API.get("model")
  .then((res) => {
    return res.data;
  })
  .catch((err) => {
    return err;
  })
}

// AI 커버 생성을 위한 서버 제공 노래 소스 목록 조회 
export const getMusicSources = () => {
  return API.get("cover/source")
  .then(res => res.data)
  .catch(err => console.error(err))
}

// AI 커버 생성
export const createCover = (data: CoverCreateInterface) => {
  return API.post("cover/create", data)
  .then((res) => {
    return res.data;
  })
  .catch((err) => {
    return err;
  })
}

// AI 전체 목록 조회 
interface ListParams {
  target: string;
  page: number;
  keyword?: string | null;
}

export const getCovers = (keyword: string | null = null) => {
  const params: ListParams = { target: "all", page: 1 };
  if (keyword) {
    params.keyword = keyword;
  }
  
  return API.get("cover", { params })
  .then((res) => {
    return res.data;
  })
  .catch((err) => {
    return err;
  })
}

// AI 인기 목록 조회
export const getPopularCovers = () => {
  const params: ListParams = { target: "popular", page: 1 };

  return API.get("cover", { params })
  .then((res) => {
    return res.data;
  })
  .catch((err) => {
    return err;
  })
}

// AI 상세 목록 조회
export const getCover = (coverCode: string) => {
  return API.get(`cover/${coverCode}`)
  .then((res) => { 
    return res.data;
  }) 
  .catch((err) => {
    return err;
  })
}

// AI 커버 게시(수정)
export const updateCover = (coverCode: string, edit: CoverUpdateInterface) => {
  return API.patch(`cover/board/${coverCode}`, edit)
  .then((res) => {
    return res.data;
  }) 
  .catch((err) => {
    return err
  })
}

// AI 커버 삭제
export const deleteCover = (coverCode: string) => {
  return API.delete(`cover/board/${coverCode}`)
  .then((res) => {
    return res.data;
  })
  .catch((err) => {
    return err;
  })
}

// AI 커버 좋아요
export const likeCover = (coverCode: string) => {
  return API.get(`/like/cover/${coverCode}`)
  .then(res => res)
  .catch(err => err)
}

// AI 커버 좋아요 취소
export const unlikeCover = (coverCode: string) => {
  return API.delete(`/like/cover/${coverCode}`)
  .then(res => res)
  .catch(err => err)
}