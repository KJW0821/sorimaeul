import { styled } from "styled-components";

const MenuHeader = styled.div`
  height: auto;
  display: flex;
  align-items: center;
  padding: 0 20px;
  margin-left: 60px;
`;

const BigText = styled.span`
  font-size: 70px;
  font-family: 'GmarketSansBold';
`;

const MiddleText = styled.span`
  font-size: 55px;
  font-family: 'GmarketSansBold';
  margin-top: 9px;
  margin-right: 45px;
`;

const SmallText = styled.span`
  margin-top: 12px;
  font-size: 40px;
  font-family: GmarketSansLight;
`;

interface Props {
  bigText: string;
  middleText: string;
  smallText: string;
}

const MenuDescription: React.FC<Props> = ({ bigText, middleText, smallText }) => {
  return (
    <MenuHeader>
      <BigText>{bigText}</BigText>
      <MiddleText>{middleText}</MiddleText>
      <SmallText>{smallText}</SmallText>
    </MenuHeader>
  );
}

export default MenuDescription;