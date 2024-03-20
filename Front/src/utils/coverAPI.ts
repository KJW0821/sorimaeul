import API from "./axios";

interface Params {
  target: string;
  page: number;
  keyword?: string | null;
}

// AI 전체 목록 조회 
export const getCovers = (keyword: string | null = null) => {
  const params: Params = { target: "all", page: 1 };
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