import InputField from "./InputField";
import { useState } from 'react';

interface UsernameProps {
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


const UsernameField: React.FC = () => {
    
    const [activeTooltipUsername, setactiveTooltipUsername] = useState(false);
    const [validatingUsername, setValidatingUsername] = useState(false);
    const [acceptableUsername, setAcceptableUsername] = useState(false);
    const [errorMessageUsername, setErrorMessageUsername] = useState(null);
    
    // const usernameRef = useRef(null);
    const handleTooltipToggle = () => {
        setactiveTooltipUsername(!activeTooltipUsername);
    };
    
    const usernameProps: UsernameProps = {
        inputlabel: "username", 
        description: ['Must be at least 5 characters', 'Must not contain space', 'Must not contain special characters'],
        // reference: usernameRef,
        handleTooltipToggle: handleTooltipToggle,
        activeTooltip: activeTooltipUsername,
        validating: validatingUsername,
        setValidating: setValidatingUsername,
        acceptable: acceptableUsername,
        setAcceptable: setAcceptableUsername,
        errorMessage: errorMessageUsername,
        setErrorMessage: setErrorMessageUsername,
    }


    return (
        <InputField renderData={usernameProps}></InputField>
    );
}

export default UsernameField;