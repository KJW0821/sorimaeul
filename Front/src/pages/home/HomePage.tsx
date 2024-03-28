import React, { useEffect, useRef, useState } from 'react';
import styled from "styled-components";
import { CategoryBox } from '../../components/home/HomeStyles';
import goBtnImg from "../../assets/goBtn.png";
import { useNavigate } from 'react-router-dom';
import tape from "../../assets/tape.png";
import tape2 from "../../assets/tape2.png";
import MarqueeComponent from '../../components/home/MarqueeComponent';



const Outer = styled.div`
height: 100vh;
overflow-y: auto;
overflow-x: hidden; /* 가로 스크롤바 방지 */
&::-webkit-scrollbar {
  display: none;
}
`;

const Page1 = styled.div`
  height: calc(100vh - 230px);
  display: flex;
  background-color: #f7f6cf;
`;

const Page2 = styled.div`
  overflow-x: hidden;
  width: 100%;
  height: 100vh;
  display: flex;
  background-color: #b6d8f2;
`;
const GoBtnImg = styled.img`
position: absolute; 
left: 30px; 
top: 50%; 
transform: translateY(-50%);
width: 40px; 
height: auto; 
`

interface MarginProps {
  $marginTop?: number;
  $marginRight?: number;
}


const Line = styled.div`
  position: absolute;
  width: '627px';
  height: 0px;
  border: 1px solid #000000;
  margin-top: '175px';
  margin-right: '50px';
`;

const BackgroundTape = styled.img<MarginProps>`
  position: absolute;
  margin-top: ${(props) => props.$marginTop? `${props.$marginTop}px` : '75px'};
  margin-right: ${(props) => props.$marginRight? `${props.$marginRight}px` : '100px'};
  width:'435px';
  height:'auto';
`;

const RightAlignedContainer = styled.div`
  display: flex;
  justify-content: flex-end; 
  padding-right: 20px; 
  width: 100%;
  position: relative;
`;

const DubbingCategory = styled(CategoryBox)`
  position: relative;
  margin-top: 100px; 
  margin-right: 250px;
  z-index: 2;
`;

const CategoryDescription = styled.p`
  position: absolute;
  margin-top: 125px;
  margin-left: 500px;
  font-size: 35px;
  line-height: 63px;
  font-family: GmarketSansLight;
  `

const Page3 = styled.div`
  height: 100vh;
  display: flex;
  background-color: #f4cfdf;
`

const LeftAlignedContainer = styled.div`
  display: flex;
  justify-content: flex-start; 
  padding-left: 50px; 
  width: 100%;
  position: relative;
`;

const CoverCategory = styled(CategoryBox)`
  position: relative;
  margin-top: 90px; 
  margin-right: 300px;
  z-index: 2;
`;

const BottomAlignedContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end; 
  width: 100%;
  height: 100%; 
  position: relative;
  bottom: 0; 
`;


const TeamName = styled.p`
font-family: GmarketSansBold;
font-style: normal;
font-weight: 700;
font-size: 150px;
line-height: 173px;
margin-top: 10px;
`;


const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const DIVIDER_HEIGHT = 5;
  const outerDivRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태 관리

  useEffect(() => {
    const wheelHandler = (e: WheelEvent) => {
      e.preventDefault();
      if (!outerDivRef.current) return;

      const { deltaY } = e;
      const { scrollTop } = outerDivRef.current;
      const pageHeight = window.innerHeight;

      if (deltaY > 0) { // 스크롤 내릴 때
        if (scrollTop >= 0 && scrollTop < pageHeight) {
          outerDivRef.current.scrollTo({
            top: pageHeight + DIVIDER_HEIGHT,
            left: 0,
            behavior: 'smooth',
          });
          setCurrentPage(2);
        } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
          outerDivRef.current.scrollTo({
            top: pageHeight * 2 + DIVIDER_HEIGHT * 2,
            left: 0,
            behavior: 'smooth',
          });
          setCurrentPage(3);
        }
      } else { // 스크롤 올릴 때
        if (scrollTop >= 0 && scrollTop < pageHeight) {
          // 현재 1페이지
        } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
          outerDivRef.current.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
          });
          setCurrentPage(1);
        } else {
          outerDivRef.current.scrollTo({
            top: pageHeight + DIVIDER_HEIGHT,
            left: 0,
            behavior: 'smooth',
          });
          setCurrentPage(2);
        }
      }
    };

    const outerDivRefCurrent = outerDivRef.current;
    if (outerDivRefCurrent) {
      outerDivRefCurrent.addEventListener('wheel', wheelHandler);
    }
    return () => {
      if (outerDivRefCurrent) {
        outerDivRefCurrent.removeEventListener('wheel', wheelHandler);
      }
    };
  }, []);

  return (

    <Outer ref={outerDivRef}>
      <Page1>

      </Page1>
      <Page2>
      <RightAlignedContainer>
        
    <DubbingCategory onClick={()=>navigate("/dubbing")}>
      더빙 극장
      <GoBtnImg src={goBtnImg} alt='Button Image'/>
    </DubbingCategory>
    <Line />
    <BackgroundTape src={tape} alt='Tape Image'/>
  </RightAlignedContainer>
      </Page2>
      <Page3>
        <LeftAlignedContainer>
        <CoverCategory onClick={()=>navigate("/cover")}>
           AI 노래방
          <GoBtnImg src={goBtnImg} alt='Button Image'/>
        </CoverCategory>
        <CategoryDescription>
          나만의 AI 커버 송을 만들어 보세요!
        </CategoryDescription>
        <BackgroundTape src={tape2} alt='Tape Image' $marginTop={125}/>
        </LeftAlignedContainer>
        <BottomAlignedContainer>
    <MarqueeComponent />
      </BottomAlignedContainer>
      </Page3>
    </Outer>

  );
};

export default HomePage;
