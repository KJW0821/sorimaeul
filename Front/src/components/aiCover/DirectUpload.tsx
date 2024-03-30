import styled from "styled-components";

const Input = styled.input`
  border: 1px solid #ccc; /* 기본 테두리 색상 */
  &:focus {
    border-color: #007bff; /* 포커스 시 테두리 색상 */
  }
`;

interface DirectUploadProps {
  link: string;
  onLinkChange: (link: string) => void;
}

function DirectUpload({ link, onLinkChange }: DirectUploadProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onLinkChange(e.target.value);
  };

  return (
    <>
        <label>
          YouTube 링크:
          <Input
      type="text"
      value={link}
      onChange={handleChange}
      placeholder="YouTube 링크를 입력하세요"
    />
        </label>
        
    </>
  );
}

export default DirectUpload;