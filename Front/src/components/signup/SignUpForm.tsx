import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { checkNickname, signUp } from "../../utils/userAPI";
import { login, set } from "../../stores/user";
import { requestS3 } from "../../utils/s3";
import { getCookie } from "../../utils/cookie";


function SignUpForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [inputNickname, setInputNickname] = useState(""); // 입력된 닉네임을 저장할 상태
  const [imagePath, setImagePath] = useState('');
  const [selectedImagePath, setSelectedImagePath] = useState('');
  const [isValidNickname, setIsValidNickname] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // 제출 상태 관리를 위한 상태 변수 추가


  const handleNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputNickname(e.target.value);
    setIsValidNickname(false);
  };

  const handleImagePath = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImagePath((reader.result as string));
      };
      reader.readAsDataURL(file);
      try {
        const uploadedImageUrl = await requestS3({
          filename: file.name.replace(/\.[^/.]+$/, ''),
          file: file,
        })
        if (uploadedImageUrl) {
          setImagePath(uploadedImageUrl);
        } else {
          console.error("Error: Uploaded image URL is undefined");
        }
      } catch (err) {
        console.error("Error:", err);
      }
    }
  };

  const onClickCheckNickname = async (e: { preventDefault: () => void; }) => {
    e.preventDefault(); // 폼의 제출을 방지합니다.
    const response = await checkNickname(inputNickname);

    if (response === 0) {
      setIsValidNickname(true);
    } else if (response === 1) {
      setIsValidNickname(false);
    }
  };
  
  // 회원 정보 등록 
  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (!isSubmitting && isValidNickname) { // 중복 제출 방지 조건 추가
      setIsSubmitting(true); // 제출 시작 시 isSubmitting 상태를 true로 설정
      try {
        console.log("회원가입중?");
        const res = await signUp(inputNickname, imagePath);
        // 회원 가입 성공 시 redux store 로그인 상태 반영 후 홈페이지로 이동
        if (res?.status === 201) {
          console.log("회원가입 성공");
          dispatch(login());
          dispatch(set({ nickname: inputNickname, profileImage: imagePath }));
          navigate('/');
        }
      } catch (error) {
        console.error("회원 가입 실패", error);
      } finally {
        setIsSubmitting(false); // 제출 완료 후 false로 재설정
      }
    } else {
      console.log("중복된 닉네임입니다.");
    }
  };


  return (
    <div>
      <h2>회원 정보 기입</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>프로필 이미지 업로드</label>
          <input type="file" id="file" accept="image/*" onChange={handleImagePath} />
          {selectedImagePath && (<img src={selectedImagePath} alt="Selected Proofile" />)}
        </div>
        <div>
          <label>닉네임:</label>
          <input type="text" value={inputNickname} onChange={handleNickname} />
          <button onClick={onClickCheckNickname}>중복 확인</button>
        </div>
        <button type="submit" onClick={handleSubmit}>등록</button>
      </form>
    </div>
  )

}

export default SignUpForm;