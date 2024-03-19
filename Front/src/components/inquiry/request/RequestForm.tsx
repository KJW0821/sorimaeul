import styled from "styled-components";
import { Button } from "../../common/Button";
import { useNavigate } from "react-router-dom";

const Form = styled.form`
  width: 75%;
  display: flex;
  flex-direction: column;
  gap: .5rem;
  margin: 0 auto;

  .label {
    width: 100%;
    font-family: 'GmarketSansMedium';
    font-size: 1.25rem;
  }

  .content {
    width: 100%;
    border: 1px solid #A3A3A3;
    border-radius: 10px;
  }

  .input {
    height: 2.5rem;
  }

  .textarea {
    resize: none;
  }

  .button-box {
    display: flex;
    gap: .5rem;
    margin-left: auto;
  }
`

const RequestForm: React.FC<{ isEdit: boolean }> = ({isEdit}) => {
  const navigate = useNavigate();

  return (
    <Form>
      <label className="label" htmlFor="title" id="title">제목</label>
      <input className="content input" type="text" name="title" />
      <label className="label" htmlFor="content" id="content">내용</label>
      <textarea className="content textarea" name="content" id="" cols={30} rows={10}></textarea>
      <div className="button-box">
        <Button onClick={() => navigate('/request')} $marginLeft={0} $marginTop={0} $height={2} $width={4.375}>취소</Button>
        <Button $marginLeft={0} $marginTop={0} $height={2} $width={4.375} $background="#28BEFF">{ isEdit ? "수정" : "작성" }</Button>
      </div>
    </Form>
  )
}

export default RequestForm;