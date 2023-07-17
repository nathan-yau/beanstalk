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
    // margin: 10px auto 0 auto;
    border: 1px solid #ccc;
    box-shadow: 0 0 10px 0 rgba(0,0,0,0.2);
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

export const InstrumentOverviewContainer = styled.div<{ changes: number }>`
    width: min(100%, 500px);
    height: 90px;
    ${props => props.changes > 0 ? 
    'background: rgb(255,255,255);background: linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(198,255,221, 1) 100%)' :
    props.changes == 0?
    'background: rgb(255,255,255);background: linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.5) 100%)':
    'background: rgb(255,255,255);background: linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(247,91, 91, 1) 100%)'};
    padding: 10px;
    border-radius: 0.50em;
    margin-top: 10px;
    // margin: 10px auto 0 auto;
    border: 1px solid #ccc;
    position: relative;
    box-shadow: 0 0 10px 0 rgba(0,0,0,0.2);
}`

export const OverviewHeading = styled.div`
    display: flex;
    justify-content: space-between;
`

export const OverviewHeadingText = styled.span`
    font-size: 1rem;
    font-weight: 600;
    display: block;
    margin-top: -3px;
`

export const OverviewText = styled.span<{ changes: number, currency: string }>`
    font-size: 1.25rem;
    font-weight: 600;
    display: block;
    color: ${props => props.changes > 0 ? '#00C781' : props.changes == 0? '#000' : '#FF3B30'};
    &::before{
        content: "${props => props.currency}";
        font-size: 0.75rem;
        font-weight: 600;
        margin-right: 0.25rem;
    }
`

export const OverviewFooter = styled.div`
    display: flex;
    justify-content: space-between;
`
export const OverviewSubtext = styled.span`
    margin-top: 0.25rem;
    font-size: 0.65rem;
    font-weight: 600;
    display: block;
`

export const OverviewFooterStat = styled.div`
    display: flex;
    justify-content: start;
    gap: 1rem;
    `

export const OverviewPrecentage = styled.span<{ changes: number }>`
    font-size: 0.80rem;
    font-weight: 600;
    margin-left: 0.7rem;
    &::before{
        content: "${props => props.changes > 0 ? '+' : ''}";
        color: ${props => props.changes > 0 ? '#00C781' : props.changes == 0? '#000' : '#FF3B30'};
    }
`

export const RefreshButton = styled.div`
    display: flex;
    position: absolute;
    gap: 0.25rem;
    right: 0;
    transform: translate(-50%, 0%);
    background-color: rgba(255, 255, 255, 0.7);
    border: 1px solid #ccc;
    border-radius: 100px;
    padding: 0.25rem 0.5rem 0.25rem 0.5rem;
    font-size: 0.75rem;
    font-weight: 600;
    cursor: pointer;
    &:hover{
        background-color: #ccc;
    }
`

export const RefreshText = styled.span`
    font-size: 0.65rem;
    font-weight: 600;
    display: block;
`