import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components/macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

import { QuestionNumber } from "../QuestionNumber";
import { questions } from "../../questions";

const bottomNavHeightPhone = "66px";
const bottomNavHeightTablet = "72px";
const contentMaxWidth = "800px";

// Main content
// =============================================================================

const QuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.25rem;
  width: 100%;
  margin-bottom: 2.5rem;
  font-size: 1.25rem;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin-bottom: 2.8rem;
  }
`;

const Question = styled.p`
  text-align: center;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 1.5rem;
  }
`;

const OptionList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  width: 100%;
  padding: 0;
  list-style: none;
`;

const Option = styled.button`
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

const StyledMainContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: ${contentMaxWidth};
  margin-top: 2.5rem;
  padding-bottom: calc(${bottomNavHeightPhone} + 30px);

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding-bottom: calc(${bottomNavHeightTablet} + 30px);
    margin-top: 3.5rem;
  }
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
      // Sort the array so the answers will be shown in the correct order in the
      // result page.
      answersCopy[questionIndex].sort((a, b) => a - b);
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
              onClick={(e) => handleClick(index)}
              onPointerDown={(e) => e.preventDefault()}
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

const ProgressBar = styled.div`
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

const NavButton = styled.button.attrs({
  className: "darkens-on-active-state",
})`
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

const NavIcon = styled(FontAwesomeIcon).attrs(({ direction }) => ({
  icon: direction === "next" ? faAngleRight : faAngleLeft,
}))`
  ${NavButton}[aria-disabled=false]:hover &,
  ${NavButton}[aria-disabled=false]:focus & {
    transform: scale(120%);
  }
`;

const QuestionNav = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
`;

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
      className={
        props["aria-disabled"] ? "" : "highlightable darkens-on-active-state"
      }
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

    @media screen and (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
      width: 10rem;
    }
  }
`;

function NavControls({
  questionNumber,
  canMoveToNext,
  answers,
  moveToPrevious,
  moveToNext,
}) {
  const finish = (e) => {
    if (!canMoveToNext) e.preventDefault();
  };

  return (
    <StyledNavControls>
      <QuestionNav>
        <NavButton
          onClick={moveToPrevious}
          hide={questionNumber === 1}
          aria-disabled={false}
        >
          <NavIcon direction="previous" />
        </NavButton>
        <span>
          {questionNumber}/{questions.length}
        </span>
        <NavButton
          onClick={moveToNext}
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
  height: ${bottomNavHeightPhone};
  background: #282525;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    height: ${bottomNavHeightTablet};
  }
`;

function BottomNav({
  questionNumber,
  canMoveToNext,
  answers,
  moveToPrevious,
  moveToNext,
}) {
  return (
    <StyledBottomNav>
      <ProgressBar percentage={(questionNumber / questions.length) * 100} />
      <NavControls
        questionNumber={questionNumber}
        canMoveToNext={canMoveToNext}
        answers={answers}
        moveToPrevious={moveToPrevious}
        moveToNext={moveToNext}
      />
    </StyledBottomNav>
  );
}

// Main and page
// =============================================================================

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export function Quiz() {
  const [questionNumber, setQuestionNumber] = useState(1);
  const [answers, setAnswers] = useState(
    [...Array(questions.length)].map(() => [])
  );

  const canMoveToNext =
    answers[questionNumber - 1].length ===
    questions[questionNumber - 1].answer.length;

  const next = () => {
    if (canMoveToNext) {
      setQuestionNumber(Math.min(questionNumber + 1, questions.length));
    }
  };

  const prev = () => {
    setQuestionNumber(Math.max(questionNumber - 1, 1));
  };

  const handleKeyUp = (e) => {
    if (e.key === "ArrowLeft") prev(true);
    if (e.key === "ArrowRight") next(true);
  };

  useEffect(() => {
    document.addEventListener("keyup", handleKeyUp);
    return () => document.removeEventListener("keyup", handleKeyUp);
  });

  const swipeNavigation = {
    targetDist: 50,
    multiTouchHappened: false,
    initXPos: null,
    curXpos: null,

    handleEvent(e) {
      this[e.type](e);
    },

    touchstart(e) {
      if (e.touches.length > 1) {
        this.multiTouchHappened = true;
        return;
      }

      this.initXPos = e.touches[0].clientX;
    },

    touchmove(e) {
      this.curXpos = e.touches[0].clientX;
    },

    touchend(e) {
      if (this.multiTouchHappened) {
        if (!e.touches.length) {
          this.reset();
        }
        return;
      }

      if (this.curXpos !== null) {
        if (this.curXpos - this.initXPos <= -this.targetDist) {
          next();
        } else if (this.curXpos - this.initXPos >= this.targetDist) {
          prev();
        }
      }

      this.reset();
    },

    touchcancel(e) {
      if (!e.touches.length) this.reset();
    },

    reset() {
      this.multiTouchHappened = false;
      this.initXPos = null;
      this.curXpos = null;
    },
  };

  useEffect(() => {
    const events = ["touchstart", "touchmove", "touchend", "touchcancel"];

    events.forEach((e) => document.addEventListener(e, swipeNavigation));

    return () =>
      events.forEach((e) => document.removeEventListener(e, swipeNavigation));
  });

  return (
    <Main>
      <MainContent
        questionNumber={questionNumber}
        answers={answers}
        setAnswers={setAnswers}
      />
      <BottomNav
        questionNumber={questionNumber}
        canMoveToNext={canMoveToNext}
        answers={answers}
        moveToNext={next}
        moveToPrevious={prev}
      />
    </Main>
  );
}
