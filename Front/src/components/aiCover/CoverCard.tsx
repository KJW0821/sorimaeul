import { Cover } from "./CoverInterface"

interface Props {
  cover: Cover;
}

const CoverCard: React.FC<Props> = ({
  cover
}) => {
  const { coverName, thumbnailPath, nickname, likeCount, coverSinger, singer, title } = cover;

  return (
    <div>
      <img src={thumbnailPath} alt={title} />
      <h2>{title}</h2>
      <p>원곡 가수: {singer}</p>
      <p>커버 가수: {coverSinger}</p>
      <p>커버 제목: {coverName}</p>
      <p>업로드한 사용자: {nickname}</p>
      <p>좋아요 수: {likeCount}</p>
    </div>
  );
};

export default CoverCard;