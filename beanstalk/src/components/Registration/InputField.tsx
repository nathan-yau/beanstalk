import { ErrorMessage, InputLabelSection, InputLabel, TooltipSection, Tooltip, InputSection, Input, TooltipImage } from './InputField.styles'
import validateRegistration from '../../utils/RegistrationValidation'
import { useState } from 'react'

const InputField = ({renderData} : {renderData: any}) => {
  const [timerId, setTimerId] = useState(null);

  interface ValidationProp {
    category: string;
    timerId: any;
    setTimerId: React.Dispatch<React.SetStateAction<any>>;
    setValidating: React.Dispatch<React.SetStateAction<boolean>>;
    setAcceptable: React.Dispatch<React.SetStateAction<boolean>>;
    setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  }

  const ValidationProp = {
    category: renderData.inputlabel,
    timerId: timerId,
    setTimerId: setTimerId,
    setValidating: renderData.setValidating,
    setAcceptable: renderData.setAcceptable,
    setErrorMessage: renderData.setErrorMessage,
  }
  console.log(renderData.acceptable, renderData.validating , renderData.errorMessage)

  return (
    <>
        <InputLabelSection>
            <InputLabel>{renderData.inputlabel}</InputLabel>
            <TooltipImage onClick={renderData.handleTooltipToggle}>
                <img src="/icons/info-register.svg" alt="" width={15} height={15} className='info-icon' />
            </TooltipImage>
        </InputLabelSection>
        <TooltipSection>
          <Tooltip className={renderData.activeTooltip ? 'tooltiptext' : ''}>
            {renderData.description.map((item: string) => (
            <div key={item}>
            <span>{renderData.acceptable? `✅`:`⭕` } </span>
              <span>{item}<br /></span>
              </div>
              ))}
          </Tooltip>
        </TooltipSection>
        <InputSection>
            <Input onChange={(event) => validateRegistration(event, ValidationProp)}></Input>
            {renderData.validating && <img src="/icons/loading-validation.svg" alt="" width={25} height={25} className='validated'></img>}
            {renderData.acceptable && !renderData.validating ? <img src={`/icons/success-validation.svg`} alt="" width={25} height={25} className='validated'></img> : null}
        </InputSection>
      {/* <div>
        <div className='d-flex justify-content-center align-items-center border bg-white'>
          <input ref={props.reference} type={props.inputType === "password" && props.showPassword ? "text" : props.inputType} className="input-control" placeholder={props.inputlabel} value={props.inputValue} onChange={(event) => props.handleInputChange(event, props.setInput, props.inputlabel, props.setElement)} onFocus={props.handleFocus} onBlur={props.handleBlur} />
          <img src="/assets/icons/tick.svg" alt="" width={25} height={25} className={`${props.data && props.data.target === props.inputlabel.replace(/ /g, '') && props.data.status === "success" ? 'validated' : 'unvalidated'}`} />
        </div>
        {props.inputlabel === "password" ? <div className='d-flex align-self-center show-password'><input type="checkbox" data-toggle="toggle" data-size="mini" onChange={props.handleShowPassword} /><span className='mx-2'>Show Password</span></div> : null}
        {props.data && props.data.target === props.inputlabel.replace(/ /g, '') && props.data.status === "error" ? <label className='text-danger validation-error'>{props.data.message}</label> : props.loading && props.focus === props.inputlabel ? <LoadingSpinner></LoadingSpinner> : null}
      </div> */}
      {!renderData.acceptable && !renderData.validating && renderData.errorMessage ? <ErrorMessage>{renderData.errorMessage}</ErrorMessage> : null}
    </>
  )
}

export default InputField