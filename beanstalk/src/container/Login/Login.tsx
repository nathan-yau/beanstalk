import { PageConatiner, LoginContainer, LoginHeading, LoginButton } from "./Login.styles";
import InputField from "../../components/Login/InputField";
import { useState, useEffect } from "react";
import handleInternalLogin from "../../utils/Login"

const Login = ({authorized}: {authorized: boolean}) => {
    const [acceptableInput, setAcceptableInput] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [LoginErrorMessage, setLoginrErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    if (authorized) {
        window.location.href = "/";
        return null;
    }
    
    useEffect(() => {
        if (username.length >= 5 && password.length >= 5) {
            setAcceptableInput(true);
        } else {
            setAcceptableInput(false);
        }
    }, [username, password]);

    // Pending Loading Screen
    if (isLoading) {
        return ( <div>Loading...</div>)
    }

    return (
        <PageConatiner>
            <LoginContainer>
                <LoginHeading></LoginHeading>
                <InputField inputlabel={'username'} setValue={setUsername}></InputField>
                <InputField inputlabel={'password'} setValue={setPassword}></InputField>
                <LoginButton enabled={acceptableInput} disabled={!acceptableInput} onClick={() => handleInternalLogin(username, password, setLoginrErrorMessage, setIsLoading)}>Sign In</LoginButton>
                <p>{LoginErrorMessage}</p>
            </LoginContainer>
        </PageConatiner>
    );
  };
  

export default Login;