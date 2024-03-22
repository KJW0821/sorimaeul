import API from "./axios";
import { CoverCreateInterface, CoverUpdateInterface } from "../components/aiCover/CoverInterface";


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
export const getCover = async (coverCode: string) => {
  return API.get(`cover/${coverCode}`)
  .then((res) => { 
    return res.data;
  }) 
  .catch((err) => {
    return err;
  })
}

// AI 커버 생성
export const createCover =async (data: CoverCreateInterface) => {
  return API.post("cover/create", data)
  .then((res) => {
    return res.data;
  })
  .catch((err) => {
    return err;
  })
}

// AI 커버 게시(수정)
export const updateCover = async (coverCode: string, edit: CoverUpdateInterface) => {
  return API.patch(`cover/board/${coverCode}`, edit)
  .then((res) => {
    return res.data;
  }) 
  .catch((err) => {
    return err
  })
}

// AI 커버 삭제
export const deleteCover = async (coverCode: string) => {
  return API.delete(`cover/board/${coverCode}`)
  .then((res) => {
    return res.data;
  })
  .catch((err) => {
    return err;
  })
}