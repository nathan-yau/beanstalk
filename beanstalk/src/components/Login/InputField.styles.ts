import styled, {css, keyframes} from 'styled-components';


export const ErrorMessage = styled.span`
    color: #ff0000;
    padding: 0 0.25rem;
    font-size: 0.75rem;
    `;

export const InputLabelSection = styled.div`
    display: flex;
    margin: 0.50rem 0;
`;

export const InputLabel = styled.span`
    text-transform: capitalize;
    font-size: 1rem;
    font-weight: 500;
    margin-right: 0.5rem;
`;

export const TooltipImage = styled.div`
    text-align: left;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const TooltipSection = styled.div`
    text-align: left;

    .tooltiptext {
        opacity: 1;
        visibility: visible;
        position: unset;
        transition: all 0.5s ease-in-out;
    }
`;

export const Tooltip = styled.div`
    opacity: 0;
    display: inline-block;
    max-width: 500px;
    color: #000000;
    text-align: left;
    transition: all 0.5s ease-in-out;
    margin-bottom: 0.50rem;
    font-size: 0.85rem;
    visibility: hidden;
    position: absolute;
    transition: none;

    div {
        display: flex;
    }

    div span:nth-child(2) {
        margin-left: 0.5rem;
    }
`;

const running = keyframes`
    0% {
        transform: translateX(0);
    }
    25% {
        transform: translateX(10px);
    }
    75% {
        transform: translateX(-10px);
    }
    100% {
        transform: translateX(0);
    }
`


const animation = (props: any) => css`
    0.3s ease-in-out 0s normal none 1 ${props.isError ? running: ''};
  `

export const InputSection = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0.50em;
    background-color: #fff;
    border: 1px solid #ccc;
    padding-right: 0.5rem;
    margin-bottom: 0.50rem;
    &:focus-within {
        border: 1px solid '#0561ee';
        transition: all 0.5s ease-in-out;
        animation: ${animation};
    }
`;



export const Input = styled.input`
    display: block;
    width: 100%;
    padding: 0.375rem 0.75rem;
    border: none;
    border-radius: 0.50em;
    &:focus {
        border: none;
        outline: none;
        box-shadow: none;
    }
`;
