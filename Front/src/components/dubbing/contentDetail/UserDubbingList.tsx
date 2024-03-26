import { useEffect, useState } from "react";
import { getUserVideos } from "../../../utils/dubbingAPI";
import { VideoData } from "./SoriAward";
import UserDubbingCard from "./UserDubbingCard";
import styled from "styled-components";

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
  const [page, setPage] = useState(1);
  const [userVideoList, setUserVideoList] = useState<VideoData[]>([]);
  const [totalPage, setTotalPage] = useState(1);

  const getUserVideoList = async () => {
    const res = await getUserVideos(page);
    setUserVideoList(res.dubbings);
    setTotalPage(res.totalPages);
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