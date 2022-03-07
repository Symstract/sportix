import { createGlobalStyle } from "styled-components/macro";

export const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
  }

  body {
    height: 100vh;
    background: linear-gradient(#292525, #232020);
    font-family: 'Rowdies', cursive;
    color: #fff;
  }

  img {
    display: block;
  }

  .highlightable {
    &:hover, &:focus {
    filter: saturate(70%);
    filter: brightness(110%);
    }
  }
`;
