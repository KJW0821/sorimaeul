import ColorLine from "../../components/inquiry/ColorLine";
import SubTitle from "../../components/inquiry/SubTitle";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/common/Button";
import RequestList from "../../components/inquiry/request/RequestList";

function RequestListPage() {
  const navigate = useNavigate();

  return (
    <>
      <ColorLine />
      <div className="mx-auto w-9/12 flex flex-col gap-8">
        <div className="flex gap-4 items-center">
          <SubTitle>
            <span className="lg-font">요</span>청 게시판
          </SubTitle>
          <SubTitle><span className="disabled" onClick={() => navigate('/FAQ')}>| 자주 묻는 질문 FAQ</span></SubTitle>
        </div>
        <RequestList />
        <Button onClick={() => navigate('/request/create')} $marginTop={0} $width={4.375} $height={2} $background="#28BEFF">글쓰기</Button>
      </div>
    </>
  )
}

export default RequestListPage;