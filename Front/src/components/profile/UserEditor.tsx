import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Button } from "../common/Button";
import { RootState } from "../../stores/store";
import { checkNickname, editUserInfo } from "../../utils/userAPI";
import { set } from "../../stores/user";
import { requestS3 } from "../../utils/s3";


interface ProfileImageProps {
  $image: string;
}

const ProfileImage = styled.div<ProfileImageProps>`
  background-image: url(${props => props.$image});
  width: 100px; 
  height: 100px; 
  border-radius: 50%; 
  background-size: cover;
  background-position: center;


`;

const NicknameContainer = styled.div`
flex-grow: 0;
display: flex;
align-items: center; 
justify-content: space-between; 
margin-bottom: 20px; 
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-left: 10px; 
`;

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 221px; 
`;

// 닉네임 중복 확인 문구 스타일
const NicknameCheckMessage = styled.p`
  margin-left: 10px; 
`;

const FlexContainer = styled.div`
  display: flex;
  align-items: center; // 버튼과 닉네임을 수직 방향으로 가운데 정렬
  justify-content: space-between; // 요소들 사이에 공간을 균등하게 배분
`;

const Line = styled.hr`
margin-top: 20px;
margin-bottom: 20px; 
border: 0;
height: 1px; 
background-color: #ccc; 
`

function UserEditor() {
  const dispatch = useDispatch();
  const { nickname, profileImage, learnCount } = useSelector((state: RootState) => state.user);
  const [isEditing, setIsEditing] = useState(false);
  const [newNickname, setNewNickname] = useState(nickname);
  const [isCheckingNickname, setIsCheckingNickname] = useState(false);
  const [isValidNickname, setIsValidNickname] = useState(true);
  const [selectedImagePath, setSelectedImagePath] = useState(profileImage);
  const [newProfileImg, setNewProfileImg] = useState(profileImage);

  // 디바운싱으로 닉네임 중복 체크 
  useEffect(() => {
    if (newNickname && newNickname !== nickname) {
      const handler = setTimeout(() => {
        setIsCheckingNickname(true);
        checkNickname(newNickname).then(response => {
          setIsValidNickname(response === 0);
          setIsCheckingNickname(false);
        }).catch(error => {
          console.error("닉네임 중복 체크 중 오류 발생:", error);
          setIsCheckingNickname(false);
        });
      }, 500);
  
      return () => clearTimeout(handler);
    }
  }, [newNickname, nickname]);

  const handleNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewNickname(e.target.value);
  };

  const handleImagePath = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImagePath(reader.result as string);
      };
      reader.readAsDataURL(file);

      try {
        const uploadedImageUrl = await requestS3({
          filename: file.name.replace(/\.[^/.]+$/, ''),
          file: file,
        });
        setNewProfileImg(uploadedImageUrl);
      } catch (err) {
        console.error("Error:", err);
      }
    }
  };

  const handleEdit = () => {
    if (isEditing && (newNickname !== nickname || newProfileImg !== profileImage)) {
      editUserInfo(newNickname, newProfileImg).then(() => {
        dispatch(set({ nickname: newNickname, profileImage: newProfileImg, learnCount }));
      }).catch(err => {
        console.error("회원 정보 수정 실패", err);
      });
    }
    setIsEditing(!isEditing); // 수정 상태 토글
  };

  const handleCancel = () => {
    setIsEditing(false);
    setNewNickname(nickname); // 닉네임 초기화
    setSelectedImagePath(profileImage); // 이미지 경로 초기화
    setNewProfileImg(profileImage); // 새 프로필 이미지 초기화
  };

  return (
    <LayoutContainer>
   {isEditing ? (
  <>
    <label htmlFor="file" className="cursor-pointer">
      <ProfileImage $image={selectedImagePath}></ProfileImage>
    </label>
    <input type="file" id="file" accept="image/*" onChange={handleImagePath} className="hidden" />
  </>
) : (
  <>
    {console.log('렌더링되고 있는 이미지 경로:', selectedImagePath)}
    <ProfileImage $image={selectedImagePath} />
  </>
)}
<FlexContainer>
      <NicknameContainer> 
        {isEditing ? (
          <>
            <input
              type="text"
              value={newNickname}
              onChange={handleNickname}
              placeholder="닉네임 입력"
            />
            <NicknameCheckMessage>
            {isCheckingNickname && "닉네임 중복 확인 중..."}
            {!isCheckingNickname && !isValidNickname && newNickname && "이미 사용 중인 닉네임입니다."}
            {!isCheckingNickname && isValidNickname && "사용 가능한 닉네임입니다."}
            </NicknameCheckMessage>
          </>
        ) : (
          <p>{nickname}</p>
        )}
      </NicknameContainer>
      <ButtonContainer>
      <Button $marginLeft={0} $marginTop={0} onClick={handleEdit}>
        {isEditing ? "변경" : "수정"}
      </Button>
      {isEditing && (
        <Button $marginLeft={0} $marginTop={0} onClick={handleCancel}>
          취소
        </Button>)}
        </ButtonContainer> 
        </FlexContainer>
        <Line />
        </LayoutContainer>);
}

export default UserEditor;