import styled, {keyframes} from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    background-color: rgba(255, 255, 255, 0.6);
    padding: 0.5em 1em;
    margin-bottom: 1em;
    border-radius: 1.50em;
    box-shadow: 0 0 0.5em rgba(200, 200, 2000, 0.5);
    transition: background-color 0.5s, box-shadow 0.5s;
    width: min(100%, 700px);
    transition: transform 0.5s;
`;

export const Heading = styled.span`
    font-size: 1rem;
    font-weight: 600;
    color: grey;
`

export const ContainerRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    transition: background-color 0.5s;
`

export const ToggleDiv = styled.div`
    display: flex;
    flex-direction: row;
    gap: 5px;
`

export const SwitchDiv = styled.div`
`


export const Switch = styled.input`
    `

export const DailyChanges = styled.span<{changes: string}>`
    font-size: 1.2rem;
    font-weight: 600;
    color: ${props => Number(props.changes.replace(",","")) > 0 ? "green" : Number(props.changes.replace(",","")) == 0? "grey": "red"};
`

export const DailyBalance = styled.span`
    font-size: 1.5rem;
    font-weight: 600;
`

export const LastUpdate= styled.div`
    font-size: 0.65rem;
    font-weight: 600;
    width: 100%;
    text-align: left;
    &:before {
        content: "Last Update: ";
    }
`;

const shimmer = keyframes`
    to {
        background-position: -100% 0%;
    }
`;


export const PlaceholderText = styled.div`
    background-image: linear-gradient(90deg, #CCC 0px, rgb(229 229 229 / 90%) 40px, #CCC 80px);
    background-size: 300%;
    background-position: 100% 0%;
    border-radius: 2px;
    animation: ${shimmer} 1.5s infinite;
    margin-top: 0.5em;
    height: 40%;
}`
