import styled from "styled-components";

export const TableRow = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
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
    font-size: 1rem;
    font-weight: 600;
    flex-basis: ${props => props.width};
    text-align: center;
`

export const TableColumn = styled.div`
    display: flex;
    border: 1px solid grey;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.3);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(9.4px);
    -webkit-backdrop-filter: blur(9.4px);
    margin: 0.2em 0em;
    justify-content: center;
    align-items: center;
`

export const ChangesCell = styled.div<{changes: string}>`
    display: flex;
    flex-direction: column;
    flex-basis: 30%;
    color: ${props => props.changes === "0.00" ? "grey": props.changes[0]!="-" ? "green" : "red"};
    align-items: center;
`