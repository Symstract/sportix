import React from "react";
import styled from "styled-components/macro";

import pattern from "../images/ball-pattern.svg";

const StyledBackgroundPattern = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: -9999;
  display: block;
  width: 100%;
  height: 100%;
  opacity: 0.03;
  background-image: url(${pattern});
  background-size: 220px;
  background-position: 10px -30px;
`;

export function BackgroundPattern() {
  return <StyledBackgroundPattern></StyledBackgroundPattern>;
}
