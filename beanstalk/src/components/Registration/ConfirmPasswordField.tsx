import InputField from "./InputField";
import { useState } from 'react';

interface confirmPasswordProps {
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


const ConfirmPasswordField = ({acceptableConfirmPassword, setAcceptableConfirmPassword} : {acceptableConfirmPassword: any, setAcceptableConfirmPassword: any}) => {
    
    const [activeTooltipConfirmPassword, setactiveTooltipConfirmPassword] = useState(false);
    const [validatingConfirmPassword, setValidatingConfirmPassword] = useState(false);
    const [errorMessageConfirmPassword, setErrorMessageConfirmPassword] = useState(null);
    
    // const usernameRef = useRef(null);
    const handleTooltipToggle = () => {
        setactiveTooltipConfirmPassword(!activeTooltipConfirmPassword);
    };
    
    const confirmPasswordProps: confirmPasswordProps = {
        inputlabel: "Confirm Password", 
        description: ['Must match with password'],
        // reference: usernameRef,
        handleTooltipToggle: handleTooltipToggle,
        activeTooltip: activeTooltipConfirmPassword,
        validating: validatingConfirmPassword,
        setValidating: setValidatingConfirmPassword,
        acceptable: acceptableConfirmPassword,
        setAcceptable: setAcceptableConfirmPassword,
        errorMessage: errorMessageConfirmPassword,
        setErrorMessage: setErrorMessageConfirmPassword,
    }


    return (
        <InputField renderData={confirmPasswordProps}></InputField>
    );
}

export default ConfirmPasswordField;