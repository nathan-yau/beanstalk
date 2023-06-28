import styled, {keyframes} from 'styled-components';

const shimmer = keyframes`
    to {
        background-position: -100% 0%;
    }
`;

export const InstrumentOverviewPlaceholder = styled.div`
    width: min(100%, 500px);
    height: 80px;
    background-color: #fff;
    padding: 10px;
    border-radius: 0.25em;
    margin-top: 10px;
}`

export const InstrumentOverviewPlaceholderText = styled.div`
    background-image: linear-gradient(90deg, #CCC 0px, rgb(229 229 229 / 90%) 40px, #CCC 80px);
    background-size: 300%;
    background-position: 100% 0%;
    border-radius: inherit;
    animation: ${shimmer} 1.5s infinite;
    height: 60%;
}`

export const InstrumentOverviewPlaceholderTitle = styled.div`
    background-image: linear-gradient(90deg, #CCC 0px, rgb(229 229 229 / 90%) 40px, #CCC 80px);
    background-size: 300%;
    background-position: 100% 0%;
    border-radius: inherit;
    animation: ${shimmer} 1.5s infinite;
    height: 25%;
    width: 50%;
    margin-bottom: 10px;
}`

