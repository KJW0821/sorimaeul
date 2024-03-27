import React, { useEffect, useRef, useState } from 'react';
import Header from '../../components/common/Header';
import styled from "styled-components";

const Outer = styled.div`
height: 100vh;
overflow-y: auto;

&::-webkit-scrollbar {
  display: none;
}
`;

const Page1 = styled.div`
  height: calc(100vh - 271px);
  display: flex;
  background-color: #f7f6cf;
`;

const Page2 = styled.div`
  height: 100vh;
  display: flex;
  background-color: #b6d8f2;
`;

const Page3 = styled.div`
  height: 100vh;
  display: flex;
  background-color: #f4cfdf;
`

const HomePage: React.FC = () => {
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
    <Header />
      <Page1></Page1>
      <Page2></Page2>
      <Page3></Page3>
    </Outer>

  );
};

export default HomePage;
