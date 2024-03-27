import React from 'react';
import styled, { keyframes } from 'styled-components';

// keyframes를 사용하여 marquee 애니메이션 정의
const marquee = keyframes`
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
`;

// styled-components를 사용하여 스타일 적용
const AnimatedTitle = styled.div`
  font-size: 60px;
  font-family: 'Raleway', Sans-serif;
  font-weight: 300;
  position: relative;
  width: 100%;
  max-width: 100%;
  height: auto;
  padding: 100px 0;
  overflow-x: hidden;
  overflow-y: hidden;
`;

const Track = styled.div`
  position: absolute;
  white-space: nowrap;
  will-change: transform;
  animation: ${marquee} 60s linear infinite;
`;

const Content = styled.div`
  @media (hover: hover) and (min-width: 700px) {
    transform: translateY(calc(100% - 8rem));
  }
`;

// 컴포넌트 생성
const MarqueeComponent: React.FC = () => {
  return (
    <AnimatedTitle>
      <Track>
        <Content>&nbsp;moho design template glad&nbsp;moho design template glad&nbsp;moho design template glad&nbsp;moho design template glad&nbsp;moho design template glad&nbsp;moho design template glad</Content>
      </Track>
    </AnimatedTitle>
  );
};

export default MarqueeComponent;
