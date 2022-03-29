import React, { useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components/macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import _ from "lodash";

import RunningGirl from "../../images/running-girl-finish-line.svg";
import Medal from "../../images/medal.svg";
import { QuestionNumber } from "../QuestionNumber";
import { questions } from "../../questions";

const contentMaxWidth = "800px";
const mainTitleColor = "#D9D9D9";

// Score
// =============================================================================

const StyledScore = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.62rem;
  width: 100%;

  h1 {
    color: ${mainTitleColor};
    font-size: 1.9rem;
  }

  & > span {
    font-size: 5rem;
    width: 100%;
    text-align: center;
    background: linear-gradient(
      to right,
      transparent,
      black 15%,
      black 85%,
      transparent
    );
  }
`;

function Score({ correctAnswerCount }) {
  return (
    <StyledScore>
      <h1>Your Score:</h1>
      <span>
        {correctAnswerCount}/{questions.length}
      </span>
    </StyledScore>
  );
}

const medalColors = {
  bronze: "",
  silver: "",
  gold: "",
};

const StyledFeedback = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;

  & img {
    width: 50px;
  }

  & * {
    font-family: ${({ theme }) => theme.fonts.secondary};
  }

  & p {
    color: #c9c9c9;
    font-size: 1.25rem;
  }

  & span {
    color: yellow;
  }
`;

function Feedback() {
  return (
    <StyledFeedback>
      <img src={Medal} alt="" />
      <p>
        <span>Bronze!</span> You're in shape for a medal! Good performance.
      </p>
    </StyledFeedback>
  );
}

const StyledScoreSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.9rem;
  width: 100%;

  & > img {
    width: 180px;
  }
`;

function ScoreSection({ correctAnswerCount }) {
  return (
    <StyledScoreSection>
      <Score correctAnswerCount={correctAnswerCount} />
      <img src={RunningGirl} alt="" />
      <Feedback />
    </StyledScoreSection>
  );
}

const Separator = styled.div`
  width: 100%;
  height: 3px;
  opacity: 20%;
  background: linear-gradient(
    to right,
    transparent,
    white 15%,
    white 85%,
    transparent
  );
`;

// Wrong answers
// =============================================================================

const wrongOptionMarkSize = "1em";
const wrongOptionMarkGap = "0.2em";
const wrongOptionColor = "#a4a4a4";

const Xmark = styled(FontAwesomeIcon).attrs({
  icon: faXmark,
})`
  width: ${wrongOptionMarkSize};
  margin-right: ${wrongOptionMarkGap};
  & > * {
    fill: #a4a4a4;
  }
`;

const WrongOption = styled.li`
  display: block;
  color: ${wrongOptionColor};
  font-size: 1.12rem;
  font-weight: 300;
  margin-bottom: 0.1rem;
`;

const RightOption = styled.li`
  display: block;
  margin-left: calc(${wrongOptionMarkSize} + ${wrongOptionMarkGap});
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.12rem;
`;

const WrongAnswerList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  padding: 0;
`;

const StyledwrongAnswer = styled.li`
  display: flex;
  gap: 1rem;
  width: 100%;

  h3 {
    color: #e0e0e0;
    font-size: 1.12rem;
    font-weight: 300;
    margin-bottom: 0.6rem;
  }

  ul {
    padding: 0;
  }
`;

function WrongAnswer({ questionIndex, answers }) {
  const question = questions[questionIndex];

  return (
    <StyledwrongAnswer>
      <QuestionNumber>{questionIndex + 1}.</QuestionNumber>
      <div>
        <h3>{question.question}</h3>
        <ul>
          {answers[questionIndex].map((optionIndex) => (
            <WrongOption key={optionIndex} aria-label="Wrong answer">
              <Xmark />
              {question.options[optionIndex]}
            </WrongOption>
          ))}
          {question.answer.map((optionIndex) => (
            <RightOption key={optionIndex} aria-label="Right answer">
              {question.options[optionIndex]}
            </RightOption>
          ))}
        </ul>
      </div>
    </StyledwrongAnswer>
  );
}

const StyledWrongAnswersSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  h2 {
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 1.9rem;
    color: ${mainTitleColor};
  }
`;

function WrongAnswersSection({ answers, wrongAnswerIndices }) {
  return (
    <StyledWrongAnswersSection>
      <h2>Wrong Answers</h2>
      <WrongAnswerList>
        {wrongAnswerIndices.map((i) => {
          return <WrongAnswer key={i} questionIndex={i} answers={answers} />;
        })}
      </WrongAnswerList>
    </StyledWrongAnswersSection>
  );
}

// Main and page
// =============================================================================

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  width: 100%;
  max-width: ${contentMaxWidth};
  margin-top: 1.5rem;
  padding-bottom: 30px;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin-top: 3.5rem;
  }
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export function Result() {
  const location = useLocation();

  if (!location.state) return <Navigate to="/"></Navigate>;

  // const location = {
  //   state: {
  //     // answers: [[3], [1], [3], [1, 2], [2], [2], [1], [2], [3, 1], [1, 2]],
  //     answers: [[3], [1], [3], [1, 3], [2], [0], [3], [1], [1, 2], [0, 3]],
  //   },
  // };

  const answers = location.state.answers;
  const wrongAnswerIndices = _.range(0, questions.length).filter(
    (i) => !_.isEqual(answers[i], questions[i].answer)
  );
  const correctAnswerCount = answers.length - wrongAnswerIndices.length;

  return (
    <Main>
      <MainContent>
        <ScoreSection correctAnswerCount={correctAnswerCount} />
        {wrongAnswerIndices.length !== 0 && (
          <>
            <Separator />
            <WrongAnswersSection
              answers={location.state.answers}
              wrongAnswerIndices={wrongAnswerIndices}
            />
          </>
        )}
      </MainContent>
    </Main>
  );
}
