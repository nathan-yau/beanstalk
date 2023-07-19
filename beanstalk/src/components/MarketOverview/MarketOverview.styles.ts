import styled from 'styled-components';

export const HeaderCell = styled.span<{width: string, selected: boolean}>`
font-size: 0.75rem;
font-weight: 600;
flex-basis: ${props => props.width};
text-align: center;
padding-bottom: 0.5em;
position: relative;

&::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background-color: rgba(50, 50, 100, 0.5);
  transform-origin: center;
  transition: transform 0.3s ease-in-out;
  transform: scaleX(${props => (props.selected ? "1" : "0")});
}
`;

export const TableHeader = styled.div`
    display: flex;
    padding: 0.25em 1.00em;
    border-radius: 0.50em;
    height: 50px;
    width: min(100%, 700px);
    justify-content: space-between;
    align-items: center;
    margin-top: 1.0em;
`
