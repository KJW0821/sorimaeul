import styled from "styled-components";
import trophy from "../../../assets/trophy.png";
import { getPopularUserVideo } from "../../../utils/dubbingAPI";
import { Fragment, useEffect, useState } from "react";

const AwardBox = styled.div`
  width: 100%;
  height: 24rem;
  background: black;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 0 1.5rem;

  .trophy {
    height: 100%;
  }

  .carousel-box {
    width: 44.5%;
    .award-title {
      font-family: 'Bagel Fat One';
      color: #BFFF0A;
      font-size: 3.125rem;
    }
  }
`
const RatingBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: .5rem;
  justify-content: center;
  width: 22.8%;

  .title {
    color: #BFFF0A;
    font-family: 'GmarketSansLight';
    font-size: 1.5rem;
    text-align: center;
  }

  .list {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    background: white;
    height: 13.875rem;
    padding: 1rem;
    border-radius: 10px;
    align-items: center;

    .name {
      font-size: 1.5rem;
      width: 90%;
      font-family: 'GmarketSansBold';
    }

    .line {
      height: 1px;
      width: 90%;
      background: #5FD3A8;
    }
  }
`

export interface VideoData {
  dubCode: number;
  dubName: string;
  storagePath: string;
  thumbnailPath: string;
  dubDetail: string;
  nickname: string;
  profileImage: string;
  likeCount: number;
  createdTime: string;
  isLiked: number;
  public: boolean;
}

function SoriAward() {
  const [hotContents, setHotContents] = useState<VideoData[]>([]);

  const getHotContents = async () => {
    const res = await getPopularUserVideo();
    setHotContents(res.dubbings.slice(0, 3));
  }

  useEffect(() => {
    getHotContents();
  }, [])

  return (
    <AwardBox>
        <img className="trophy" src={trophy} alt="trophy" />
        <div className="carousel-box">
          <h3 className="award-title">SORI AWARDS</h3>
        </div>
        <RatingBox>
          <p className="title">Best Creators</p>
          <ol className="list">
            {
              hotContents.slice(0, 3).map((el, idx) => (
                <Fragment key={el.dubCode}>
                  <li className="name">{idx + 1}. {el.nickname}</li>
                  {
                    idx !== 2 &&
                    <div className="line"></div>
                  }
                </Fragment>
              ))
            }
          </ol>
        </RatingBox>
      </AwardBox>
  )
}

export default SoriAward;