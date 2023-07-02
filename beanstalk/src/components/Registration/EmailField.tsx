import InputField from "./InputField";
import { useState } from 'react';

interface emailProps {
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


const EmailField: React.FC = () => {
    
    const [activeTooltipEmail, setactiveTooltipEmail] = useState(false);
    const [validatingEmail, setValidatingEmail] = useState(false);
    const [acceptableEmail, setAcceptableEmail] = useState(false);
    const [errorMessageEmail, setErrorMessageEmail] = useState(null);
    
    // const usernameRef = useRef(null);
    const handleTooltipToggle = () => {
        setactiveTooltipEmail(!activeTooltipEmail);
    };
    
    const emailProps: emailProps = {
        inputlabel: "email", 
        description: ['Must be a valid email address', `Must end with "com", "ca", "org"`],
        // reference: usernameRef,
        handleTooltipToggle: handleTooltipToggle,
        activeTooltip: activeTooltipEmail,
        validating: validatingEmail,
        setValidating: setValidatingEmail,
        acceptable: acceptableEmail,
        setAcceptable: setAcceptableEmail,
        errorMessage: errorMessageEmail,
        setErrorMessage: setErrorMessageEmail,
    }


    return (
        <InputField renderData={emailProps}></InputField>
    );
}

export default EmailField;