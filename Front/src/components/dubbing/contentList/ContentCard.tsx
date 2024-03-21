import { useEffect, useState } from "react";
import { getSourceVideos } from "../../../utils/dubbingAPI";

interface SourceVideoData {
  videoSourceCode: string;
  sourceName: string;
  thumbnailPath: string;
  totalPages: number;
}

function ContentCard() {
  const [sourceVideos, setSourceVideos] = useState<SourceVideoData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  
  const getSourceVideoList = async () => {
      const response = await getSourceVideos(currentPage);
      setSourceVideos(response);
    };
    
    useEffect(() => {
        getSourceVideoList();
      }, []);

  return (
    <div>
      <div>
        {
          sourceVideos.map((el) => (
            <div>
              <img src={el.thumbnailPath} alt="thumbnail" />
              <p>{el.sourceName}</p>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default ContentCard;