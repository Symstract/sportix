import React from "react";
import styled from "styled-components/macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import RunningGirl from "../../images/running-girl-finish-line.svg";
import Medal from "../../images/medal.svg";
import { QuestionNumber } from "../QuestionNumber";

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

function Score() {
  return (
    <StyledScore>
      <h1>Your Score:</h1>
      <span>8/10</span>
    </StyledScore>
  );
}

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

function ScoreSection() {
  return (
    <StyledScoreSection>
      <Score />
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

const WrongOption = styled.span`
  display: block;
  color: ${wrongOptionColor};
  font-size: 1.12rem;
  font-weight: 300;
  margin-bottom: 0.1rem;
`;

const RightOption = styled.span`
  display: block;
  margin-left: calc(${wrongOptionMarkSize} + ${wrongOptionMarkGap});
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.12rem;
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
`;

function WrongAnswer() {
  return (
    <StyledwrongAnswer>
      <QuestionNumber>1.</QuestionNumber>
      <div>
        <h3>Which country won the Men's Football World Cup in 2006?</h3>
        <WrongOption>
          <Xmark />
          France
        </WrongOption>
        <RightOption>Italy</RightOption>
      </div>
    </StyledwrongAnswer>
  );
}

const WrongAnswers = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  padding: 0;
`;

const StyledWrongAswersSection = styled.div`
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

function WrongAswersSection() {
  return (
    <StyledWrongAswersSection>
      <h2>Wrong Answers</h2>
      <WrongAnswers>
        <WrongAnswer />
        <WrongAnswer />
      </WrongAnswers>
    </StyledWrongAswersSection>
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
  return (
    <Main>
      <MainContent>
        <ScoreSection />
        <Separator />
        <WrongAswersSection />
      </MainContent>
    </Main>
  );
}
