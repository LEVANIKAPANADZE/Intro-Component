import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    background: #FF7979;
    font-family: "Poppins", serif;
    min-height: 100vh;
    display: flex;
    align-items: center;
    padding: 88px 24px 68px;
    justify-content: center;
    background-image: url("/images/bg-intro-mobile.png");
    @media (min-width: 1440px) {
        padding: 121px 165px 121px 165px;
    }
}
`;

export default GlobalStyles;
