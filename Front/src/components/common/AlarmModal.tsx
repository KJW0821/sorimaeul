import { RootState } from "../../stores/store";
import { getAlarmList, checkAlarm, deleteAlarm } from "../../utils/alarm";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import modalCloseBtn from "../../assets/modalCloseBtn.png";
import { useEffect } from "react";
import { setAlarmList, checkAlarmState, removeAlarm } from "../../stores/common";

const Container = styled.div`
  width: 34.125rem;
  height: 19.125rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  background: white;
  border-radius: 5px;
  z-index: 2;
  
  .control-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 15%;
    .count {
      font-size: 1rem;
      font-family: 'GmarketSansLight';
      .bold {
        font-family: 'GmarketSansBold';
      }
    }
  }

  .alarm-box {
    width: 100%;
    height: 85%;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: .5rem;
    .alarm {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border: 1px solid #E5E7DF;
      border-radius: 10px;
      padding: .5rem;
      .content {
        padding-top: .15rem;
        font-size: 1rem;
        width: 75%;
      }
      .date {
        padding-top: .35rem;
        font-size: 0.75rem;
        font-family: 'GmarketSansLight';
      }
    }
  }
`

function AlarmModal() {
  const alarmList = useSelector((state: RootState) => state.common.alarmList);
  const dispatch = useDispatch();

  const getAlarmData = async () => {
    const res = await getAlarmList();
    dispatch(setAlarmList(res.list));
  };

  useEffect(() => {
    getAlarmData();
    alarmList.forEach((el) => {
      checkAlarm(el.notifyCode);
      dispatch(checkAlarmState(el.notifyCode));
    })
  }, [])

  const clickDelete = (notifyCode: number) => {
    deleteAlarm(notifyCode);
    dispatch(removeAlarm(notifyCode));
  };

  return (
    <Container>
      <div className="control-box">
        <p className="count">총 <span className="bold">{alarmList ? alarmList.length : 0}</span>개의 알림이 있습니다.</p>
        <img src={modalCloseBtn} alt="X" />
      </div>
      <div className="alarm-box">
        {
          alarmList &&
          alarmList.map(el => (
            <div className="alarm" key={el.notifyCode}>
              <p className="content">{el.notifyContent}</p>
              <div className="flex gap-3 justify-center items-center">
                <p className="date">{el.createdTime.split('T')[0]}</p>
                <img onClick={() => clickDelete(el.notifyCode)} src={modalCloseBtn} alt="" />
              </div>
            </div>
          ))
        }
      </div>
    </Container>
  )
}

export default AlarmModal;