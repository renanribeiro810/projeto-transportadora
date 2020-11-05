import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
html, body {
  height: 100vh;
  display: flex;
  flex-direction: column;
}
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }
`;
