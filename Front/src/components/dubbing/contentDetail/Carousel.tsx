import { useState } from "react";
import styled from "styled-components";
import { VideoData } from "./SoriAward";
import gold from "../../../assets/gold.png";
import silver from "../../../assets/silver.png";
import bronze from "../../../assets/bronze.png";

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  perspective: 90%;
  transform-style: preserve-3d;
  width: 100%;
  height: 18rem;
  flex-grow: 1;

  .nav {
    color: rgba(255 ,255, 255, 0.7);
    font-size: 3rem;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
    cursor: pointer;
    user-select: none;
    background: unset;
    border: unset;
    transition: all 200ms ease;

    &.left {
      left: 0;
      transform: translateX(-25%) translateY(0);
      filter: drop-shadow(3px 3px 4px rgba(0, 0, 0, 0.1));
      &:hover {
        color: #fbfbfb;
      }
    }

    &.right {
      filter: drop-shadow(3px 3px 4px rgba(0, 0, 0, 0.1));
      right: 0;
      transform: translateX(25%) translateY(-0%);
      &:hover {
        color: #fbfbfb;
      }
    }
  }
`

const Card = styled.div<{ $active: boolean, $offset: number, $direction: number, $absOffset: number, $isOver: boolean }>`
  width: 90%;
  height: 90%;
  position: absolute;
  transform: ${(props) => `
    rotateY(calc(${props.$offset} * 50deg))
    scaleY(calc(1 + ${props.$absOffset} * -0.4))
    translateZ(calc(${props.$absOffset} * -20rem))
  `};
  filter: ${(props) => `blur(calc(${props.$absOffset} * 0.7rem))`};
  transition: all 0.3s ease-out;
  opacity: ${(props) => props.$isOver ? "0" : "1"};
  display: ${(props) => props.$isOver ? "none" : "flex"};
  flex-direction: column;
  align-items: center;
  .img {
    width: 75%;
    height: 80%;
    box-shadow: ${(props) => props.$active && '0px 0px 10px 10px rgba(191, 255, 10, 0.5)'};
    border-radius: 5px;
  }
  .medal {
    position: absolute;
    left: 17%;
    top: 6%;
    display: ${(props) => props.$active ? "block" : "none"};
  }
  .title {
    display: ${(props) => props.$active ? "flex" : "none"};
    color: white;
    font-size: 1.5rem;
    height: 20%;
    margin-top: 5%;
    align-items: center;
  }
`

const Carousel: React.FC<{ hotContents: VideoData[]}> = ({ hotContents }) => {
  const count = 3;
  const MAX_VISIBILITY = 3;
  const [active, setActive] = useState(0);

  return (
    <Container className="carousel">
      {active > 0 && (
        <button
          className="nav left text-white"
          onClick={() => setActive((active) => active - 1)}
        >
          {
            '<'
          }
        </button>
      )}
      {hotContents.map((child, i) => (
        <Card
          $active={i === active ? true : false}
          $offset={(active - i) / 3}
          $direction={Math.sign(active - 1)}
          $absOffset={Math.abs(active - i) / 3}
          $isOver={Math.abs(active - i) >= MAX_VISIBILITY}
          key={child.dubCode}
          className="card-container"
        >
          <img 
            className="medal"
            src={
              i === 0 && gold ||
              i === 1 && silver ||
              i === 2 && bronze ||
              ''
            } 
            alt="medal" 
          />
          <img className="img" src={child.thumbnailPath} alt="" />
          <p className="title">{child.dubName}</p>
        </Card>
      ))}
      {active < count - 1 && (
        <button
          className="nav right text-white"
          onClick={() => setActive((active) => active + 1)}
        >
          {
            '>'
          }
        </button>
      )}
    </Container>
  )
}

export default Carousel;