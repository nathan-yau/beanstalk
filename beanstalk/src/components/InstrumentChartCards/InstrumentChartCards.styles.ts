import styled, {keyframes} from 'styled-components';

const shimmer = keyframes`
    to {
        background-position: -100% 0%;
    }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const InstrumentChartPlaceholder = styled.div`
    width: min(96%, 490px);
    background-color: #fff;
    margin: auto;
    border: 0px solid #ccc;
    transform: translateY(-5px);
    position: relative;
    z-index: -999;
    transition: all 0.5s ease-in-out;
    border-width: 0 1px 1px 1px;
    box-shadow: 0 0 10px 0 rgba(0,0,0,0.2);
}`

export const InstrumentChartPlaceholderText = styled.div<{isExpanded: Boolean}>`
    background-image: linear-gradient(90deg, #CCC 0px, rgb(229 229 229 / 90%) 40px, #CCC 80px);
    background-size: 300%;
    background-position: 100% 0%;
    border-radius: 10px 10px 10px 10px;
    animation: ${shimmer} 1.5s infinite, ${fadeIn} 1.2s ease-in;
    margin-top: 2px;
    height: 100%;
    opacity: 0;
    animation-fill-mode: forwards;
    transition: opacity 0.5s ease-in-out ${props => props.isExpanded ? '0.5s' : '0'};
    &::after {
        content: "View Chart";
        opacity: ${props => props.isExpanded ? '0' : '1'};
        transform: translateY(-7px) translateX(50%);
        transition: opacity 0.5s ease-in-out ${props => props.isExpanded ? '0' : '0.5s'};
        position: absolute;
        font-size: 0.75em;
        font-weight: 600;
        color: grey;
    }
}`

