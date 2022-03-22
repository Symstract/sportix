import { createGlobalStyle } from "styled-components/macro";

export const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    font-family: 'Rowdies', cursive;
    color: #fff;
  }

  body {
    position: relative;
    min-height: 100vh;
    background: linear-gradient(#292525, #232020);
  }

  img {
    display: block;
  }

  .highlightable {
    &:hover {
    filter: saturate(70%);
    filter: brightness(110%);
    }
  }

  .darkens-on-active-state {
    &:active {
      filter: brightness(80%);
    }
  }
`;
