import React from "react";
import styled from "styled-components/macro";

const phoneLarge = "3.12rem";
const phoneSmall = "2.5rem";
const tabletLarge = "3.6rem";
const tabletSmall = "2.8rem";

const StyledQuestionNumber = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 0;
  flex-shrink: 0;
  width: ${({ size }) => (size === "small" ? phoneSmall : phoneLarge)};
  height: ${({ size }) => (size === "small" ? phoneSmall : phoneLarge)};
  padding-left: 0.7%;
  background: #4d4d4d;
  border-radius: 99px;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: ${({ size }) => (size === "small" ? tabletSmall : tabletLarge)};
    height: ${({ size }) => (size === "small" ? tabletSmall : tabletLarge)};
  }
`;

export function QuestionNumber(props) {
  return (
    <StyledQuestionNumber {...props}>{props.children}</StyledQuestionNumber>
  );
}
