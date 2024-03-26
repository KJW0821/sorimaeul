import ColorLine from "../../components/dubbing/ColorLine";
import SourceVideoInfo from "../../components/dubbing/contentDetail/SourceVideoInfo";
import styled from "styled-components";
import trophy from "../../assets/trophy.png";

const AwardBox = styled.div`
  width: 100%;
  height: 26rem;
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

function DubbingDetailPage() {
  const rating = ['남천동 빵도둑', '송삼 우사기', '8시 58분의 기적'];

  return (
    <>
      <ColorLine />
      <SourceVideoInfo />
      <AwardBox>
        <img className="trophy" src={trophy} alt="trophy" />
        <div className="carousel-box">
          <h3 className="award-title">SORI AWARDS</h3>
        </div>
        <RatingBox>
          <p className="title">Best Creators</p>
          <ol className="list">
            {
              rating.map((el, idx) => (
                <>
                  <li className="name">{idx + 1}. {el}</li>
                  {
                    idx + 1 !== rating.length &&
                    <div className="line"></div>
                  }
                </>
              ))
            }
          </ol>
        </RatingBox>
      </AwardBox>
    </>
  )
}

export default DubbingDetailPage;