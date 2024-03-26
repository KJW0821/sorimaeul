import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  inset: 0;
  z-index: 1;
`;
export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.3);
`;
export const Content = styled.section`
  width: 30rem;
  height: 7rem;
  background: #fff;
  border-radius: 15px;
  padding: 2rem;
  z-index: 1;
`;
