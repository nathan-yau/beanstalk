import styled, {keyframes} from 'styled-components';

const shimmer = keyframes`
    to {
        background-position: -100% 0%;
    }
`;

export const InstrumentOverviewPlaceholder = styled.div`
    width: min(100%, 500px);
    height: 90px;
    background-color: #fff;
    padding: 10px;
    border-radius: 0.50em;
    margin-top: 10px;
    border: 1px solid #ccc;
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

export const Overviewheading = styled.span`
    font-size: 1rem;
    font-weight: 600;
    display: block;
`

export const OverviewText = styled.span`
    font-size: 1.25rem;
    font-weight: 600;
    display: block;
`

export const OverviewFooter = styled.div`
    display: flex;
    justify-content: start;
    gap: 1rem;
`
export const OverviewSubtext = styled.span`
    margin-top: 0.25rem;
    font-size: 0.65rem;
    font-weight: 600;
    display: block;
`
