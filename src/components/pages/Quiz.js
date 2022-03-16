import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components/macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

import { questions } from "../../questions";

const bottomNavHeight = "66px";
const contentMaxWidth = "800px";

// Main content
// =============================================================================

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
  max-width: ${contentMaxWidth};
  margin-top: 2.5rem;
  padding-bottom: calc(${bottomNavHeight} + 30px);
`;

function MainContent({ questionNumber, answers, setAnswers }) {
  const questionIndex = questionNumber - 1;
  const curAns = answers[questionIndex];
  const expectedAnsCount = questions[questionIndex].answer.length;

  const isSelected = (index) =>
    answers[questionNumber - 1].includes(index) ? "true" : "false";

  const isDisabled = (index) => {
    if (expectedAnsCount !== 1 && expectedAnsCount === curAns.length) {
      if (!answers[questionNumber - 1].includes(index)) {
        return true;
      }
    }

    return false;
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
              className={isDisabled(index) ? "" : "highlightable"}
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

// Bottom nav
// =============================================================================

const StyledProgressBar = styled.div`
  flex-shrink: 0;
  flex-grow: 0;
  width: 100%;
  height: 6px;
  background-image: linear-gradient(
    to right,
    ${({ theme }) => theme.colors.primary},
    ${({ theme }) => theme.colors.primary}
      ${({ percentage }) => `${percentage}%`},
    #818181 ${({ percentage }) => `${percentage}%`}
  );
`;

function ProgressBar(props) {
  return <StyledProgressBar {...props}></StyledProgressBar>;
}

const StyledNavButton = styled.button`
  visibility: ${({ hide }) => (hide ? "hidden" : "initial")};
  width: 3.75rem;
  height: 100%;
  background: none;
  border: none;
  font-size: 1.25rem;

  &[aria-disabled="false"]:hover {
    cursor: pointer;
  }

  &[aria-disabled="true"] {
    filter: brightness(75%);
  }
`;

function NavButton(props) {
  return <StyledNavButton {...props}>{props.children}</StyledNavButton>;
}

const StyledNavIcon = styled(FontAwesomeIcon)`
  ${StyledNavButton}[aria-disabled=false]:hover &,
  ${StyledNavButton}[aria-disabled=false]:focus & {
    transform: scale(120%);
  }
`;

function NavIcon(props) {
  return (
    <StyledNavIcon
      icon={props.direction === "next" ? faAngleRight : faAngleLeft}
    />
  );
}

const StyledQuestionNav = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
`;

function QuestionNav(props) {
  return <StyledQuestionNav>{props.children}</StyledQuestionNav>;
}

const StyledFinishButton = styled(Link)`
  position: absolute;
  right: 0;
  display: flex;
  justify-content: center;
  padding: 0.4rem 1rem;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.primary};
  color: black;
  font-size: 1.25rem;
  text-decoration: none;

  &[aria-disabled="true"] {
    cursor: default;
    filter: brightness(75%);
  }
`;

function FinishButton(props) {
  return (
    <StyledFinishButton
      to="/result"
      state={{ answers: props.answers }}
      className={props["aria-disabled"] ? "" : "highlightable"}
      {...props}
    >
      Finish
    </StyledFinishButton>
  );
}

const StyledNavControls = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ theme }) => theme.pageWidth};
  max-width: ${contentMaxWidth};
  height: 100%;
  font-size: 1.25rem;

  span {
    display: block;
    width: 6rem;
    text-align: center;
  }
`;

function NavControls({
  questionNumber,
  setQuestionNumber,
  canMoveToNext,
  answers,
}) {
  const next = () => {
    if (!canMoveToNext) return;
    setQuestionNumber(Math.min(questionNumber + 1, questions.length));
  };

  const prev = () => setQuestionNumber(Math.max(questionNumber - 1, 1));

  const finish = (e) => {
    if (!canMoveToNext) e.preventDefault();
  };

  return (
    <StyledNavControls>
      <QuestionNav>
        <NavButton
          onClick={prev}
          hide={questionNumber === 1}
          aria-disabled={false}
        >
          <NavIcon direction="previous" />
        </NavButton>
        <span>
          {questionNumber}/{questions.length}
        </span>
        <NavButton
          onClick={next}
          hide={questionNumber === questions.length}
          aria-disabled={!canMoveToNext}
        >
          <NavIcon direction="next" />
        </NavButton>
      </QuestionNav>
      {questionNumber === questions.length && (
        <FinishButton
          aria-disabled={!canMoveToNext}
          onClick={(e) => finish(e)}
          answers={answers}
        />
      )}
    </StyledNavControls>
  );
}

const StyledBottomNav = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  bottom: 0;
  width: 100vw;
  height: ${bottomNavHeight};
  background: #282525;
`;

function BottomNav({
  questionNumber,
  setQuestionNumber,
  canMoveToNext,
  answers,
}) {
  return (
    <StyledBottomNav>
      <ProgressBar percentage={(questionNumber / questions.length) * 100} />
      <NavControls
        questionNumber={questionNumber}
        setQuestionNumber={setQuestionNumber}
        canMoveToNext={canMoveToNext}
        answers={answers}
      />
    </StyledBottomNav>
  );
}

// Main and page
// =============================================================================

const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

function Main(props) {
  return <StyledMain>{props.children}</StyledMain>;
}

export function Quiz() {
  const [questionNumber, setQuestionNumber] = useState(1);
  const [answers, setAnswers] = useState(
    [...Array(questions.length)].map(() => [])
  );

  const canMoveToNext =
    answers[questionNumber - 1].length ===
    questions[questionNumber - 1].answer.length;

  return (
    <Main>
      <MainContent
        questionNumber={questionNumber}
        answers={answers}
        setAnswers={setAnswers}
      />
      <BottomNav
        questionNumber={questionNumber}
        setQuestionNumber={setQuestionNumber}
        canMoveToNext={canMoveToNext}
        answers={answers}
      />
    </Main>
  );
}
