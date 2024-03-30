import Lottie from "lottie-react";
import converting from "../../assets/lottie/coverConverting.json";

function CoverConverting () {
  return (
    <div>
    <p> AI 커버 컨텐츠 제작이 진행 중입니다.</p>
    <p> 커버 변환에는 약 n분의 시간이 소요됩니다.</p>
    <p> 변환 중에도 사이트 서비스 이용이 가능합니다!</p>
    <p> 제작 완료 알림을 받고, 다시 커버를 확인해주세요.</p>
    <Lottie 
    animationData={converting}
    style={{width: 1800}}/>
    </div>
  )
}

export default CoverConverting;