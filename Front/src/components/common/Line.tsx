import styled from "styled-components";

export const Line = styled.hr<{$color?: string}>`
  border-color: ${(props) => (props.$color ? `${props.$color}rem` : "black")};
`