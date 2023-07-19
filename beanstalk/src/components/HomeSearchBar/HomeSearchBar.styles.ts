import styled from 'styled-components';

export const SearchArea = styled.input`
display: block;
width: 100%;
padding: 0.5rem 0.75rem;
border: none;
border-radius: 0.50em;
&:focus {
    border: none;
    outline: none;
    box-shadow: none;
}
`

export const SearchBar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  `

export const SearchLabel = styled.label`
  font-weight: 600;
  margin-bottom: 0.5rem;
  text-align: left;
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
  box-shadow: 0 0 10px 0 rgba(0,0,0,0.2);
`;
