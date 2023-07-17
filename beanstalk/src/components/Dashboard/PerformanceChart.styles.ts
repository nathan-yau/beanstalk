import styled, {keyframes} from "styled-components";

export const Container = styled.div`
`

export const PeriodContain = styled.div`
    display: flex;
    gap: 15px;
    justify-content: center;
`

export const PeriodButton = styled.a<{selected: boolean}>`
    border: 1px solid #e6e6e6;
    background: rgba(255, 255, 255, 0.3);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(9.4px);
    -webkit-backdrop-filter: blur(9.4px);
    border-radius: 0.5em;
    padding: 0em 0.75em;
    cursor: pointer;
    text-decoration: none;
    font-weight: 600;
    color:  ${props => props.selected ? "black" : "grey"};
`