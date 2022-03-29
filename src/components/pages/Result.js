import React, { useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components/macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import _ from "lodash";

import RunningGirl from "../../images/running-girl-finish-line.svg";
import { ReactComponent as Medal } from "../../images/medal.svg";
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

    @media screen and (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
      font-size: 2.5rem;
    }
  }

  & > span {
    color: ${(props) => props.levelColor};
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

    @media screen and (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
      font-size: 5.5rem;
    }
  }
`;

function Score({ correctAnswerCount, levelColor }) {
  return (
    <StyledScore levelColor={levelColor}>
      <h1>Your Score:</h1>
      <span>
        {correctAnswerCount}/{questions.length}
      </span>
    </StyledScore>
  );
}

const StyledFeedback = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;
  justify-content: ${({ showMedal }) => (showMedal ? "left" : "center")};
  text-align: ${({ showMedal }) => (showMedal ? "left" : "center")};

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    gap: 1.25rem;
    align-items: center;
  }

  & svg {
    width: 50px;
    height: 50px;
    flex-shrink: 0;

    @media screen and (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
      width: 65px;
      height: 65px;
    }

    #color {
      fill: ${({ levelColor }) => levelColor};
    }
  }

  & * {
    font-family: ${({ theme }) => theme.fonts.secondary};
  }

  & p {
    color: #c9c9c9;
    font-size: 1.25rem;

    @media screen and (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
      font-size: 1.35rem;
    }
  }

  & span {
    color: ${({ levelColor }) => levelColor};
  }
`;

function Feedback({ levelColor, medalText, feedback }) {
  const showMedal = medalText !== null;

  return (
    <StyledFeedback levelColor={levelColor} showMedal={showMedal}>
      {showMedal && <Medal />}
      <p>
        {medalText && <span>{medalText}</span>} {feedback}
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

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    gap: 2.5rem;
  }

  & > img {
    width: 180px;

    @media screen and (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
      width: 300px;
    }
  }
`;

function ScoreSection({ correctAnswerCount }) {
  const levels = {
    gold: 1,
    silver: 0.8,
    bronze: 0.6,
  };
  const levelColors = {
    gold: "#FBB03B",
    silver: "#DADADA",
    bronze: "#D68245",
    other: "#9ACCE9",
  };

  const successRatio = correctAnswerCount / questions.length;
  let color;
  let medalText = null;
  let feedback;

  if (successRatio === levels.gold) {
    color = levelColors.gold;
    medalText = "Gold!";
    feedback =
      "You did it! What an amazing performance! You are a sports guru!";
  } else if (successRatio >= levels.silver) {
    color = levelColors.silver;
    medalText = "Silver!";
    feedback =
      "You know your sports! Gold was not far off, just a bit more practice.";
  } else if (successRatio >= levels.bronze) {
    color = levelColors.bronze;
    medalText = "Bronze!";
    feedback = "You're in shape for a medal! Good performance.";
  } else {
    color = levelColors.other;
    feedback =
      "Good try but you didn't quite reach the podium. Keep practicing!";
  }

  return (
    <StyledScoreSection>
      <Score correctAnswerCount={correctAnswerCount} levelColor={color} />
      <img src={RunningGirl} alt="" />
      <Feedback levelColor={color} medalText={medalText} feedback={feedback} />
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
  font-weight: 300;
  margin-bottom: 0.1rem;
`;

const RightOption = styled.li`
  display: block;
  margin-left: calc(${wrongOptionMarkSize} + ${wrongOptionMarkGap});
  color: ${({ theme }) => theme.colors.primary};
`;

const WrongAnswerList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  padding: 0;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    gap: 1.9rem;
  }
`;

const StyledwrongAnswer = styled.li`
  display: flex;
  gap: 1rem;
  width: 100%;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    gap: 1.25rem;
  }

  & * {
    font-size: 1.12rem;
  }

  h3 {
    color: #e0e0e0;
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
      <QuestionNumber size="small">{questionIndex + 1}.</QuestionNumber>
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
    font-size: 1.5rem;

    @media screen and (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
      margin-bottom: 2.5rem;
      font-size: 2rem;
    }
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
  padding-bottom: 56px;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin-top: 3.5rem;
    gap: 3.5rem;
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
