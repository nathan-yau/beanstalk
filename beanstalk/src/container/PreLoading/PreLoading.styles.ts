import styled, {keyframes} from "styled-components";
import {gradientAnimation} from "../../components/TopNav/TopNav.styles";

const bounce = keyframes`
    0% {
        transform: translateY(0);
    }
    10% {
        height: 30px;
        width: 30px;
        background-color: #E98973;
    }
    30% {
        height: 40px;
        width: 40px;
    }
    50% {
        height: 30px;
        width: 57px;
        background-color: #FF8882;
        transform: translateY(120px);
    }
    60 {
        height: 40px;
        width: 50px;
    }
    75% {
        height: 35px;
        width: 40px;
    }
    90% {
        transform: translateY(0);
    }
    100% {
        background-color: #E98973;
        transform: translateY(0);
    }
`

const typing  = keyframes`
    from { width: 0ch }
    to { width: 13ch }  
`

const blinkCaret = keyframes`
    from, to { border-color: transparent }
    50% { border-color: orange; }
`

export const PageContainer = styled.div`
    display: flex;
    justify-content: end;
    align-items: center;
    flex-direction: column;
    height: 40vh;
`

export const Ballcontainer = styled.div`
    margin-left: 15px;

`

export const Ball = styled.div`
    background-color: #E98973;
    height: 25px;
    width: 25px;
    border-radius: 50%;
    animation-timing-function: linear;
    animation: ${bounce} 1.0s infinite;
`


export const Title = styled.div`
    font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans";;
    font-size: 2rem;
    font-weight: 800;
    background-image: linear-gradient(to right, #E98973, #FF8882, #E98973);
    background-size: 200% auto;
    -webkit-animation: ${gradientAnimation} 2s linear infinite;
    animation: ${gradientAnimation} 2s linear infinite;
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    margin: 0;
    transform: translateY(100px);
    margin-left: 15px;
`

export const Typewriter = styled.h1`
    color: #000000;
    font-size: 1.5rem;
    font-family: monospace;
    font-weight: 800;
    overflow: hidden;
    border-right: .15em solid orange;
    white-space: nowrap;
    letter-spacing: .15em;
    transform: translateY(100px);
    margin-left: 15px;
    margin-top: 150px;
    width: 13ch;
    animation: 
    ${typing} 1.75s 1,
    ${blinkCaret} .75s step-end infinite;
`
export const ErrorMessage = styled.h1`
    color: #000000;
    font-size: 1.25rem;
    font-family: monospace;
    font-weight: 800;
    overflow: hidden;
    white-space: nowrap;
    letter-spacing: .15em;
    transform: translateY(100px);
    margin-left: 10px;
    margin-top: 150px;
    text-align: center;
`

