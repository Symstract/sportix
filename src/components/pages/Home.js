import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import heroImage from "../../images/soccer-with-question-marks.svg";

const desktopWidth = "1200px";

const HeroImage = styled.img.attrs({
  src: heroImage,
  alt: "",
})`
  flex-shrink: 0;
  height: 295px;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    height: 390px;
  }

  @media screen and (min-width: ${desktopWidth}) {
    width: 353px;
    height: 600px;
  }
`;

const StyledQuestion = styled.p`
  font-family: ${({ theme }) => theme.fonts.secondary};
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.primary};

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 1.75rem;
  }
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

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 2rem;
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
    <StyledButton to="/quiz" className="highlightable darkens-on-active-state">
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

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    gap: 2.5rem;
    margin-top: 2.5rem;
  }

  @media screen and (min-width: ${desktopWidth}) {
    gap: 4.4rem;
    margin-top: 0;
  }
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

  @media screen and (min-width: ${desktopWidth}) {
    flex-direction: row;
    margin-top: 5rem;
  }
`;

function MainContent() {
  return (
    <StyledMainContent>
      <HeroImage />
      <TextContent />
    </StyledMainContent>
  );
}

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export function Home() {
  useEffect(() => (document.title = "Sportix - A Fun Sports Quiz"));

  return (
    <Main>
      <MainContent />
    </Main>
  );
}
