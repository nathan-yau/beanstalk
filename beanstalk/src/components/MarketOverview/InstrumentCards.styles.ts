import styled from "styled-components";

export const TableRow = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
`;

export const TableHeader = styled.div`
    display: flex;
    border: 1px solid grey;
    padding: 0.4em 0em;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.3);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(9.4px);
    -webkit-backdrop-filter: blur(9.4px);
    margin: 0.2em 0em;
    justify-content: center;
    align-items: center;
`

export const TableCell = styled.span<{width: string}>`
    font-size: 0.8rem;
    font-weight: 600;
    flex-basis: ${props => props.width};
    text-align: center;
`

export const TableColumn = styled.div`
    display: flex;
    border: 1px solid grey;
    border-radius: 5px 5px 0px 0px;
    padding: 0.4em 0em;
    background: rgba(255, 255, 255, 0.3);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(9.4px);
    -webkit-backdrop-filter: blur(9.4px);
    margin: 0.2em 0em;
    justify-content: center;
    align-items: center;
`

export const ChangesContainer = styled.div`
    display: flex;
    justify-content: right;
`

export const ChangesCell = styled.div<{color: string}>`
    background-color: ${props => props.color};
    font-size: 0.8rem;
    white-space: nowrap; 
    overflow: hidden;
    border-radius: 5px;
    padding: 0.4em 0.5em;
    width: 85%;
`

export const ChangesText = styled.span`
    color: white;
`

export const ToolButton = styled.div`
    display: flex;
    justify-content: right;
`

export const ToolImage = styled.img`
`

export const ToolDropDown = styled.div`
  position: absolute;
  top: 4rem;
  right: 2rem;
  width: 9rem;
  background-color: #fff;
  border-radius: 0.5rem;
  padding: 0.5rem 0;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  transition: all 0.2s ease-in-out;
  display: block;
  z-index: 2;
`;

export const ToolDropDownItem = styled.a`
  display: block;
  padding: 0.2rem 1rem;
  text-decoration: none;
  color: #000;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  border-bottom: 1px solid #eee;
`