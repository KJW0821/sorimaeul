import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../stores/store";
import { useState } from "react";
import { set } from "../../stores/user";
import { checkNickname, signUp } from "../../utils/userAPI";

function SignUpPage() {
  const dispatch = useDispatch();
  const [ inputNickname, setInputNickname ] = useState(""); // 입력된 닉네임을 저장할 상태

  const [ selectedImage, setSelectedImage ] = useState("");
  const [ isValidNickname, setIsValidNickname ] = useState(false);


  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputNickname(e.target.value);
    setIsValidNickname(false);
  };


  const onClickCheckNickname = async () => {
    const response = await checkNickname(inputNickname);
    console.log(response);

    if (response === 0) {
      setIsValidNickname(true);
      console.log("닉네임 체크 결과: o")
    } else if (response === 1) {
      setIsValidNickname(false);
    }
  };

  // 회원 정보 등록 
  const onClickSubmit = async () => {
    if (isValidNickname) {
      try {
        await signUp(inputNickname, selectedImage);
        // 회원 가입 성공 시 redux store 로그인 상태 반영 
        dispatch(set({ nickname: inputNickname, profileImage: selectedImage, loggedIn: true  }));

      } catch (error){
        console.error("회원 가입 실패", error);
      }
    }

  };

  const handleSubmit = (e : React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div>
      <h2>회원 정보 기입</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>프로필 이미지 업로드</label>
            <input type="file" accept="image/*" />
            { selectedImage && (<img src={selectedImage} alt="Selected Proofile" />)}
          </div>
          <div>
            <label>닉네임:</label>
            <input type="text" value={ inputNickname } onChange={ handleNicknameChange }/>
            <button onClick={ onClickCheckNickname }>중복 확인</button>
          </div>
          <button type="submit" onClick={ onClickSubmit }>등록</button>
        </form>
    </div>
  )
}

export default SignUpPage;