// @flow
import { createGlobalStyle } from 'styled-components'

createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Roboto:300,400');

  * {
    box-sizing: border-box;
    margin:0;
    padding:0;
    font-weight: 400;
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

  h1 {
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
  }
`;
