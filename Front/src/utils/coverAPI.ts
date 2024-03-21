import API from "./axios";

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
