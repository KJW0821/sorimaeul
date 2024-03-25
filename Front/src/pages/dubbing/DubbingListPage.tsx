import { useEffect, useState } from "react";
import { getSourceVideoList } from "../../utils/dubbingAPI";

interface VideoData {
  videoSourceCode: number;
  sourceName: string;
  thumbnailPath: string;
  videoPlaytime: string;
  createdTime: string;
  storagePath: string;
  sourceDetail: string;
}

function DubbingListPage() {
  const [page, setPage] = useState(1);
  const [videoList, setVideoList] = useState<VideoData[]>([]);

  const getSourceVideos = async () => {
    const res = await getSourceVideoList(page);
    setVideoList(res);
  }

  useEffect(() => {
    getSourceVideos();
  }, [page])

  return (
    <div>더빙 원본 컨텐츠 리스트</div>
  )
}

export default DubbingListPage;