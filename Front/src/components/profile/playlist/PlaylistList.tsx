import { useDispatch, useSelector } from "react-redux";
import { getPlaylists } from "../../../utils/playlistAPI";
import { useEffect, useState} from "react";
import { PlaylistCard } from "./PlaylistCard";
import { setPlaylists, setTotalPages } from "../../../stores/playlists";
import { RootState } from "../../../stores/store";
import styled from 'styled-components';


const ListContainer = styled.div`
  margin-left: 50px;
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
`;

export function PlaylistList () {
  const dispatch = useDispatch();
  const dataList = useSelector((state: RootState) => state.playlists);

 
  useEffect(() => {
    (async () => {
      try {
        const data = await getPlaylists();
        dispatch(setPlaylists(data.playlists));
        dispatch(setTotalPages(data.totalPages));
      } catch (err) {
        console.error("플레이리스트 데이터를 가져오는데 실패했습니다.");
      }
    }) ();
  }, []);

  return (
    <>
    <ListContainer>
      {dataList.playlists.map((playlist) => (
        <PlaylistCard
          key={playlist.playlistCode}
          playlistCode={playlist.playlistCode}
          playlistName={playlist.playlistName}
          createdTime={playlist.createdTime}
        />
      ))}
      </ListContainer>
    </>
  );
}