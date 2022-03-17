import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components/macro";

const StyledLogo = styled(Link)`
  display: flex;
  align-items: center;
  height: 100%;
  color: ${({ theme }) => theme.colors.primary};
  font-family: "Luckiest Guy", cursive;
  font-size: 1.25rem;
  text-decoration: none;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 2rem;
  }
`;

function Logo() {
  return <StyledLogo to="/">SPORTIX</StyledLogo>;
}

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  width: 100%;
  height: 50px;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    height: 72px;
  }
`;

export function Header(props) {
  return (
    <StyledHeader>
      <Logo></Logo>
    </StyledHeader>
  );
}
