import { useEffect, useState } from "react";
import { getUserVideos } from "../../../utils/dubbingAPI";
import { VideoData } from "./SoriAward";
import UserDubbingCard from "./UserDubbingCard";
import styled from "styled-components";
import { useParams } from "react-router-dom";

const Container = styled.div`
  display: flex;
  width: 80%;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 0 auto;

  & > div:last-child {
    margin-right: auto;
  }
`

function UserDubbingList() {
  const params = useParams();
  
  const [page, setPage] = useState(1);
  const [userVideoList, setUserVideoList] = useState<VideoData[]>([]);
  const [totalPage, setTotalPage] = useState(1);

  const getUserVideoList = async () => {
    if (params.sourceCode) {
      const res = await getUserVideos(page, params.sourceCode);
      setUserVideoList(res.dubbings);
      setTotalPage(res.totalPages);
    }
  }

  useEffect(() => {
    getUserVideoList();
  }, [page])

  return (
    <Container>
      {
        userVideoList.map((el) => (
          <UserDubbingCard key={el.dubCode} videoData={el} />
        ))
      }
    </Container>
  )
}

export default UserDubbingList;