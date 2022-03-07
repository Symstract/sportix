import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import heroImage from "../../images/soccer-with-question-marks.svg";

function HeroImage() {
  return <img src={heroImage} alt="" height="295px"></img>;
}

const StyledQuestion = styled.p`
  font-family: ${({ theme }) => theme.fonts.secondary};
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.primary};
`;

function Question() {
  return <StyledQuestion>Are you a sports guru or a novice?</StyledQuestion>;
}

const StyledHeading = styled.h1`
  color: #e4e4e4;
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;

  & > span {
    color: #99e23c;
  }
`;

function Heading() {
  return (
    <StyledHeading>
      TEST YOUR <span>SPORTS</span> KNOWLEDGE IN THIS FUN QUIZ!
    </StyledHeading>
  );
}

const StyledButton = styled(Link)`
  display: flex;
  justify-content: center;
  width: 13.5rem;
  padding: 1rem 0;
  border-radius: 18px;
  background: ${({ theme }) => theme.colors.primary};
  color: black;
  font-size: 1.25rem;
  text-decoration: none;
`;

function Button() {
  return (
    <StyledButton to="/quiz" className="highlightable">
      Let's Go!
    </StyledButton>
  );
}

const StyledTextContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.9rem;
  margin-top: 1.9rem;
`;

function TextContent() {
  return (
    <StyledTextContent>
      <Question />
      <Heading />
      <Button />
    </StyledTextContent>
  );
}

const StyledMainContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2.5rem;
`;

function MainContent() {
  return (
    <StyledMainContent>
      <HeroImage />
      <TextContent />
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

export function Home() {
  return <Main />;
}
