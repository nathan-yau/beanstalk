import { InputLabelSection, InputLabel, InputSection, Input } from './InputField.styles'

const InputField = ({inputlabel, setValue} : {inputlabel: any, setValue: any}) => {
  const handleValueUpdate = (event: any) => {
    if (event.target.value.length >= 1) {
      setValue(event.target.value);
    }
  }
  
  return (
    <>
        <InputLabelSection>
            <InputLabel>{inputlabel}</InputLabel>
        </InputLabelSection>
        <InputSection>
            <Input name={inputlabel} type={ inputlabel === "password"? `password` : `text`} onChange={handleValueUpdate}></Input>
        </InputSection>
    </>
  )
}

export default InputField