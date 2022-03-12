import React, { useState } from "react";
import styled from "styled-components/macro";

import { questions } from "../../questions";

const StyledQuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.25rem;
  width: 100%;
  margin-bottom: 2.5rem;
  font-size: 1.25rem;
`;

function QuestionContainer(props) {
  return <StyledQuestionContainer>{props.children}</StyledQuestionContainer>;
}

const StyledQuestionNumber = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3.12rem;
  height: 3.12rem;
  padding-left: 0.25rem;
  background: #4d4d4d;
  border-radius: 99px;
`;

function QuestionNumber(props) {
  return <StyledQuestionNumber>{props.children}</StyledQuestionNumber>;
}

const StyledQuestion = styled.p`
  text-align: center;
`;

function Question(props) {
  return <StyledQuestion>{props.children}</StyledQuestion>;
}

const StyledOptionList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  width: 100%;
  padding: 0;
  list-style: none;
`;

function OptionList(props) {
  return <StyledOptionList>{props.children}</StyledOptionList>;
}

const StyledOption = styled.button`
  width: 100%;
  padding: 1.25rem;
  border-radius: 0.5rem;
  background: #554f4f;
  border: none;
  text-align: left;
  font-size: 1.12rem;
  -webkit-tap-highlight-color: transparent;

  &:hover {
    cursor: pointer;
  }

  &[aria-pressed="true"] {
    background: ${({ theme }) => theme.colors.primary};
    color: black;
  }

  &[aria-disabled="true"] {
    filter: brightness(75%);
    cursor: default;
  }
`;

function Option(props) {
  return <StyledOption {...props}>{props.children}</StyledOption>;
}

const StyledMainContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 800px;
  margin-top: 2.5rem;
`;

function MainContent() {
  const [questionNumber, setQuestionNumber] = useState(4);
  const [answers, setAnswers] = useState(
    [...Array(questions.length)].map(() => [])
  );

  const questionIndex = questionNumber - 1;
  const curAns = answers[questionIndex];
  const expectedAnsCount = questions[questionIndex].answer.length;

  const isSelected = (index) =>
    answers[questionNumber - 1].includes(index) ? "true" : "false";

  const isDisabled = (index) => {
    if (expectedAnsCount !== 1 && expectedAnsCount === curAns.length) {
      if (!answers[questionNumber - 1].includes(index)) {
        return "true";
      }
    }

    return "false";
  };

  const handleClick = (index) => {
    const answersCopy = [...answers];

    if (curAns.includes(index)) {
      answersCopy[questionIndex] = curAns.filter((i) => i !== index);
    } else if (expectedAnsCount === 1) {
      answersCopy[questionIndex] = [index];
    } else if (expectedAnsCount !== curAns.length) {
      answersCopy[questionIndex].push(index);
    }

    setAnswers(answersCopy);
  };

  return (
    <StyledMainContent>
      <QuestionContainer>
        <QuestionNumber>{questionNumber}.</QuestionNumber>
        <Question>{questions[questionNumber - 1].question}</Question>
      </QuestionContainer>
      <OptionList>
        {questions[questionNumber - 1].options.map((option, index) => (
          <li key={index}>
            <Option
              aria-pressed={isSelected(index)}
              aria-disabled={isDisabled(index)}
              onClick={() => handleClick(index)}
            >
              {option}
            </Option>
          </li>
        ))}
      </OptionList>
    </StyledMainContent>
  );
}

const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

function Main() {
  return (
    <StyledMain>
      <MainContent />
    </StyledMain>
  );
}

export function Quiz() {
  return (
    <Main>
      <MainContent />
    </Main>
  );
}
