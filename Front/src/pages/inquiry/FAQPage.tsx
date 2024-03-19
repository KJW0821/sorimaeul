import ColorLine from "../../components/inquiry/ColorLine";
import styled from "styled-components";
import { useState } from "react";
import closeBtn from '../../assets/closeBtn.png';
import openBtn from '../../assets/openBtn.png';
import { useNavigate } from "react-router-dom";
import SubTitle from "../../components/inquiry/SubTitle";


const Question = styled.p`
  font-family: 'GmarketSansMedium';
  font-size: 2rem;
`

const Answer = styled.p`
  font-family: 'GmarketSansMedium';
  font-size: 1.125rem;
  white-space: pre-wrap;
  margin-left: 3rem;
`

interface questionData {
  q: string;
  a: string;
  isOpen?: boolean;
}

function FAQPage() {
  const navigate = useNavigate();

  const questions: questionData[] = [
    {
      q: '이 사이트는 어떻게 이용하나요?',
      a: '우리 사이트 사용법은 알아서 만들어가보아요....\n쓰면서 익혀보는건 어떨까요???\n원래 다 하면서 배우는거니까 사용하면서 알아가보세요....ㅎㅎㅎㅎ'
    },
    {
      q: '이 사이트는 어떻게 이용하나요?',
      a: '우리 사이트 사용법은 알아서 만들어가보아요....\n쓰면서 익혀보는건 어떨까요???\n원래 다 하면서 배우는거니까 사용하면서 알아가보세요....ㅎㅎㅎㅎ'
    },
    {
      q: '이 사이트는 어떻게 이용하나요?',
      a: '우리 사이트 사용법은 알아서 만들어가보아요....\n쓰면서 익혀보는건 어떨까요???\n원래 다 하면서 배우는거니까 사용하면서 알아가보세요....ㅎㅎㅎㅎ'
    }
  ]

  const [questionsState, setQuestionState] = useState<questionData[]>(questions.map(question => {
    const q = question;
    q.isOpen = false;
    return q;
  }));

  return (
    <>
      <ColorLine />
      <div className="mx-auto w-9/12 flex flex-col gap-8 mt-12">
        <div className="flex gap-4 items-center">
          <SubTitle>
            <span className="lg-font">자</span>주 묻는 질문 FAQ
          </SubTitle>
          <SubTitle><span className="disabled" onClick={() => navigate('/request')}>| 요청 게시판</span></SubTitle>
        </div>
        <div className="flex flex-col gap-6">
          {
            questionsState.map((question, idx) => (
              <div key={idx} className="flex flex-col gap-4">
                <div className="flex gap-2 justify-between items-center">
                  <Question>Q. {question.q}</Question>
                  {question.isOpen ? <button onClick={() => setQuestionState(pre => {
                    const newState = [...pre];
                    newState[idx].isOpen = false;
                    return newState
                  })}><img src={closeBtn} /></button>
                  : 
                  <button onClick={() => setQuestionState(pre => {
                    const newState = [...pre];
                    newState[idx].isOpen = true;
                    return newState
                  })}><img src={openBtn} /></button>}
                </div>
                {question.isOpen && <Answer>{question.a}</Answer>}
                {idx !== questionsState.length - 1 && <hr />}
              </div>
            ))
          }
        </div>
      </div>
    </>
  )
}

export default FAQPage;