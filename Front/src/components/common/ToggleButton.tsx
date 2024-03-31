import styled from "styled-components";
import hidden from "../../assets/hidden.svg";

const Button = styled.div<{ $color: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 0;
  height: 1.75rem;
  gap: .5rem;
  
  .hide {
    height: 100%;
    width: 2rem;
  }
`

const CheckBox = styled.input<{ $color: string }>`
  z-index: 1;
  width: 3rem;
  height: 1.625rem;
  border-radius: 1.2rem;
  background: #D9D9D9;
  &::before {
    content: '';
    width: 3rem;
    height: 1.625rem;
    display: block;
    position: absolute;
    border-radius: 1.2rem;
    background-color: #D9D9D9;
    transition: all 0.2s ease-in-out;
    cursor: pointer;
  }
  &::after {
    content: '';
    position: relative;
    display: block;
    width: 1.25rem;
    height: 1.25rem;
    top: calc((1.625rem - 1.25rem) / 2);
    left: .25rem;
    border-radius: 50%;
    background: white;
    transition: all 0.2s ease-in-out;
  }
  &:checked {
    background: ${(props) => props.$color};
    transition: all 0.2s ease-in-out;
    &::before {
      background-color: ${(props) => props.$color};
    }
    &::after {
      left: calc(100% - 1.5rem);
    }
  }
`

const ToggleButton: React.FC<{ isPublic: boolean, setIsPublic: React.Dispatch<React.SetStateAction<boolean>>, color: string }> = ({isPublic, setIsPublic, color}) => {
  return (
    <Button $color={color}>
      <CheckBox $color={color} type="checkbox" onChange={() => setIsPublic(prev => !prev)} defaultChecked={isPublic} />
      {
        isPublic ?
        <svg style={{maxWidth: "100%"}} width={'2rem'} height={'75%'} viewBox="0 0 42 29" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 0C11.4545 0 3.30273 6.01267 0 14.5C3.30273 22.9873 11.4545 29 21 29C30.5455 29 38.6973 22.9873 42 14.5C38.6973 6.01267 30.5455 0 21 0ZM21 24.1667C15.7309 24.1667 11.4545 19.836 11.4545 14.5C11.4545 9.164 15.7309 4.83333 21 4.83333C26.2691 4.83333 30.5455 9.164 30.5455 14.5C30.5455 19.836 26.2691 24.1667 21 24.1667ZM21 8.7C17.8309 8.7 15.2727 11.2907 15.2727 14.5C15.2727 17.7093 17.8309 20.3 21 20.3C24.1691 20.3 26.7273 17.7093 26.7273 14.5C26.7273 11.2907 24.1691 8.7 21 8.7Z" fill={color}/>
        </svg>
        :
        <img className="hide" src={hidden} alt="hidden" />
      }
    </Button>
  )
}

export default ToggleButton;