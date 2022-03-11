import React from "react";
import styled from "styled-components/macro";

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

const StyledOptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  width: 100%;
`;

function OptionsContainer(props) {
  return <StyledOptionsContainer>{props.children}</StyledOptionsContainer>;
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
`;

function Option(props) {
  return (
    <StyledOption
      aria-pressed="false"
      onClick={(e) => {
        e.target.ariaPressed =
          e.target.ariaPressed === "true" ? "false" : "true";
      }}
    >
      {props.children}
    </StyledOption>
  );
}

const StyledMainContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 800px;
  margin-top: 2.5rem;
`;

function MainContent() {
  return (
    <StyledMainContent>
      <QuestionContainer>
        <QuestionNumber>13.</QuestionNumber>
        <Question>
          Question comes here sdfsdf sdfsdf sdsfdsdfsdf sdfsdfsdffsd fsdfsdffsdf
          sdfsdfsdfs
        </Question>
      </QuestionContainer>
      <OptionsContainer>
        <Option>Test option</Option>
        <Option>Test option</Option>
        <Option>Test option</Option>
        <Option>Test option</Option>
      </OptionsContainer>
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
