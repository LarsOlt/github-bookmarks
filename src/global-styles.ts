// @flow
import { createGlobalStyle } from 'styled-components'

import "normalize.css"

export const GlobalStyles = createGlobalStyle`

  * {
    box-sizing: border-box;
    font-weight: 400;
    margin:0;
  }

  html, body, #root {
    width: 100%;
    height: 100%;
    margin: 0;
    font-weight: 300;
    font-family: 'Roboto', sans-serif;
  }

  form {
    margin: 0;
  }

  #modal-root {
    position: relative;
    z-index: 999;
  }

  li {
    list-style-type:none;
  }

  pre {
    font-family: inherit;
  }

  /* h1 {
    font-size: 56px;
  }
  h2 {
    font-size: 48px;
  }

  h3 {
    font-size: 36px;
  }
  h4 {
    font-size: 32px;
  }

  h5 {
    font-size: 24px;
  }

  h6 {
    font-size: 20px;
  }

  b {
    font-weight: bold;
  } */
`;
