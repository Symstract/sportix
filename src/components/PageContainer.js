import React from "react";
import styled from "styled-components/macro";

const StyledPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  max-width: 1100px;
  margin: 0 auto;
`;

export function PageContainer(props) {
  return <StyledPageContainer>{props.children}</StyledPageContainer>;
}
