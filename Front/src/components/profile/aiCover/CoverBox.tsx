import { useEffect, useState } from "react";
import { getMyCovers } from "../../../utils/coverAPI";
import { CoverListInterface } from "../../aiCover/CoverInterface";
import { styled } from "styled-components";



function CoverBox() {
  const [dataList, setDataList] = useState<CoverListInterface['data']>({ covers: [], totalPages: 0 });
  useEffect(() => {
    (async () => {
      try {
        const data = await getMyCovers();
        setDataList({
          covers: data.covers,
          totalPages: data.totalPages
        });
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  console.log(dataList);
  return (
    <>
      coverbox
      <div>
      {dataList &&
        dataList.covers?.map((cover) => (
          <div key={cover.coverCode}>
            <div>
              <h4>{cover.coverName}</h4>
              <p>완성 여부:{cover.complete ? '완성' : '미완성'}</p>
              <p>커버 가수: {cover.coverSinger}</p>
              <p>원곡 가수: {cover.singer}</p>
              <p>원곡명: {cover.title}</p>
              <p>{cover.storagePath}</p>
              <p>공개 여부: {cover.public ? '공개' : '비공개'}</p>
            </div>
          </div>
        ))

      }
      </div>
    </>
  )
}

export default CoverBox;