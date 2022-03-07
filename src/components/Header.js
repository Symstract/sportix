import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components/macro";

const StyledLogo = styled(Link)`
  display: flex;
  align-items: center;
  height: 100%;
  color: ${({ theme }) => theme.colors.primary};
  font-family: "Luckiest Guy", cursive;
  font-size: 1.125rem;
  text-decoration: none;
`;

function Logo() {
  return <StyledLogo to="/">SPORTIX</StyledLogo>;
}

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  width: 100%;
  height: 40px;
`;

export function Header(props) {
  return (
    <StyledHeader>
      <Logo></Logo>
    </StyledHeader>
  );
}
