import InputField from "./InputField";
import { useState } from 'react';

interface passwordProps {
    inputlabel: string;
    description: string[];
    // reference: React.RefObject<HTMLInputElement>;
    handleTooltipToggle: React.MouseEventHandler<HTMLImageElement>;
    activeTooltip: boolean;
    validating: boolean;
    setValidating: React.Dispatch<React.SetStateAction<boolean>>;
    acceptable: boolean;
    setAcceptable: React.Dispatch<React.SetStateAction<boolean>>;
    errorMessage: string | null;
    setErrorMessage: React.Dispatch<React.SetStateAction<string>> | React.Dispatch<React.SetStateAction<null>>;
}


const PasswordField = ({acceptablePassword, setAcceptablePassword, setAcceptableConfirmPassword} : {acceptablePassword: any, setAcceptablePassword: any, setAcceptableConfirmPassword:any}) => {
    
    const [activeTooltipPassword, setactiveTooltipPassword] = useState(false);
    const [validatingPassword, setValidatingPassword] = useState(false);
    const [errorMessagePassword, setErrorMessagePassword] = useState(null);
    
    // const usernameRef = useRef(null);
    const handleTooltipToggle = () => {
        setactiveTooltipPassword(!activeTooltipPassword);
    };
    
    const passwordProps: passwordProps = {
        inputlabel: "password", 
        description: ['Must be at least 8 characters', 'Must contain upper and lower case character', 'Must contain a number', 'Must contain a special character (@$!%*?&)'],
        // reference: usernameRef,
        handleTooltipToggle: handleTooltipToggle,
        activeTooltip: activeTooltipPassword,
        validating: validatingPassword,
        setValidating: setValidatingPassword,
        acceptable: acceptablePassword,
        setAcceptable: setAcceptablePassword,
        errorMessage: errorMessagePassword,
        setErrorMessage: setErrorMessagePassword,
    }

    const confirmPasswordInput  = document.querySelector('input[name="Confirm Password"]') as HTMLInputElement;
    if (confirmPasswordInput && confirmPasswordInput.value === "") {
        setAcceptableConfirmPassword(false)
    }
    
    return (
        <InputField renderData={passwordProps}></InputField>
    );
}

export default PasswordField;