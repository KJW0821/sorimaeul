import { useEffect, useState } from 'react';
import { Cover } from '../../components/aiCover/CoverInterface';
import { getCovers, getPopularCovers } from '../../utils/coverAPI';
import styled from 'styled-components';
import CoverList from '../../components/aiCover/CoverList';
import PopularCoverList from '../../components/aiCover/PopularCoverList';
import { useNavigate } from 'react-router';
import { Button } from '../../components/common/Button';
import Pagination from '../../components/common/Pagination';

const ColorBlock = styled.div`
  width: 100%;
  height: 11rem;
  background: linear-gradient(
      90deg,
      rgba(225, 165, 255, 0.5) 0%,
      rgba(229, 151, 249, 0.5) 12.97%,
      rgba(255, 55, 211, 0.5) 100%
    ),
    #fdff00;
  display: flex;
  align-items: center;
  margin-bottom: 2rem;

  .description {
    font-size: 1.5rem;
    color: white;
    margin-bottom: 0.5rem;
  }
`;

const Title = styled.h1`
  font-family: 'PyeongChangPeace-Bold';
  font-size: 4rem;
  color: rgba(255, 255, 255, 0.5);
  -webkit-text-stroke: 1px white;
`;

const Container = styled.div`
  width: 85%;
  margin: 0 auto;
  .title {
    font-size: 2.5rem;
    font-family: 'GmarketSansBold';
  }
`;

const CoverListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 1rem;

  & > div:last-child {
    margin-right: auto;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 5rem;
  width: 100%;
`;

const DetailLine = styled.div`
  height: 2px;
  margin: 2rem 0;
  background-color: #a3a3a3;
`;

// 커버 전체 목록 페이지
const CoverListPage: React.FC = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [dataList, setDataList] = useState<Cover[]>([]);
  const [popularDataList, setPopularDataList] = useState<Cover[]>([]);

  const getCoverList = async () => {
    const data = await getCovers(page);
    setDataList(data.covers);
    setTotalPages(data.totalPages);
  };

  const getHotCovers = async () => {
    const popularData = await getPopularCovers();
    setPopularDataList(popularData.covers);
  };

  useEffect(() => {
    getCoverList();
  }, [page]);

  useEffect(() => {
    getHotCovers();
  }, []);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <>
      <ColorBlock>
        <div className="flex ml-32 items-end gap-4">
          <Title>AI 노래방</Title>
          <p className="description">나만의 노래 커버를 만들어 보세요!</p>
        </div>
      </ColorBlock>
      <Container>
        <h2 className="title">Hot Contents</h2>
        <ButtonContainer>
          <Button
            onClick={() => navigate('/cover/create')}
            $marginLeft={0}
            $marginTop={0}
          >
            나만의 커버 만들기
          </Button>
        </ButtonContainer>
        <PopularCoverList data={popularDataList} />
        <DetailLine />
        <CoverListContainer>
          <CoverList data={dataList} />
        </CoverListContainer>
      </Container>
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        color="#FDA06C"
      />
    </>
  );
};

export default CoverListPage;
