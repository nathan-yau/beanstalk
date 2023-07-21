import styled, {keyframes} from "styled-components";

const pulse = keyframes`
    0% {
        transform: scale(0.8);
        box-shadow: 0 0 0 0 rgba(5, 97, 238, 0.7);
    }
    70% {
        transform: scale(1);
        box-shadow: 0 0 0 80px rgba(5, 97, 238, 0);
    }
    100% {
        transform: scale(0.8);
        box-shadow: 0 0 0 0 rgba(5, 97, 238, 0);
    }
`

const textPulse = keyframes`
    0% {
        opacity: 0.5;
    }
    70% {
        opacity: 1.0;
    }
    100% {
        opacity: 0.5;
    }
`

export const PulseInnerDiv = styled.div`
    background: rgb(255,255,255);
    background: radial-gradient(circle, rgba(255,255,255,0.5) 0%, rgba(151,192,255,0.48) 63%);
    border-radius: 50%;
    margin: 10px;
    height: 200px;
    width: 200px;

    box-shadow: 0 0 0 0 rgba(0, 0, 0, 1);
    transform: scale(1);
    animation: ${pulse} 2s infinite;
`

export const PulseOuterDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 75vh;
    position: relative;
`

export const PulseText = styled.span`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    font-size: 1.5rem;
    font-weight: 600;
    animation: ${textPulse} 2s infinite;
    color: #O561EE;
`