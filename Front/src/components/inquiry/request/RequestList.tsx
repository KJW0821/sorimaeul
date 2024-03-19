import styled from "styled-components";

const Line = styled.hr<{$color?: string}>`
  border-color: ${(props) => (props.$color ? `${props.$color}rem` : "black")};
`

const List = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: .5rem;

  .title {
    font-family: 'GmarketSansMedium';
    font-size: 1.25rem;
    margin-top: .4rem;
  }

  .date {
    font-family: 'GmarketSansLight';
    font-size: 0.75rem;
    margin-top: .4rem;
  }
`

function RequestList() {
  const data = [
    {
      id: 1,
      title: "타짜 영상 올려주세요",
      createdTime: "2024-03-19"
    },
    {
      id: 2,
      title: "짱구는 못말려 영상도 올려주세요",
      createdTime: "2024-03-19"
    },
    {
      id: 3,
      title: "요청요청",
      createdTime: "2024-03-18"
    },
    {
      id: 4,
      title: "요청요청",
      createdTime: "2024-03-18"
    },
    {
      id: 5,
      title: "요청요청",
      createdTime: "2024-03-18"
    },
    {
      id: 6,
      title: "요청요청",
      createdTime: "2024-03-17"
    }
  ]
  
  return (
    <List>
      <div className="flex justify-center items-center">
        <p className="title w-3/4">제목</p>
        <p className="title w-1/6">게시 날짜</p>
      </div>
      <Line />
      {
        data.map(el => (
          <>
            <div className="flex items-center justify-center">
              <p className="title w-3/4">{el.title}</p>
              <p className="date w-1/6">{el.createdTime}</p>
            </div>
            <Line $color="#A3A3A3" />
          </>
        ))
      }
    </List>
  )
}

export default RequestList;