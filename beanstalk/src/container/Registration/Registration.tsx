import UsernameField from "../../components/Registration/UsernameField";
import EmailField from "../../components/Registration/EmailField";
import PasswordField from "../../components/Registration/PasswordField";
import ConfirmPasswordField from "../../components/Registration/ConfirmPasswordField";
import { PageConatiner, RegistrationContainer, RegistrationHeading, RegistrationButton, SignUpError, Seperator, SeperatorText } from "./Registration.styles";
import {GuestCardText, SignInLink} from "../Home/Home.styles";
import { useState } from 'react';
import internalRegistration from "../../utils/Registration"



const Registration = ({authorized}: {authorized: boolean}) => {
    const [acceptableEmail, setAcceptableEmail] = useState(false);
    const [acceptableUsername, setAcceptableUsername] = useState(false);
    const [acceptablePassword, setAcceptablePassword] = useState(false);
    const [acceptableConfirmPassword, setAcceptableConfirmPassword] = useState(false);
    const [internalRegister, setInternalRegister] = useState(false);
    //Pending Register Loading
    const [registerLoading, setRegisterLoading] = useState(false);
    const [registerErrorMessage, setRegisterErrorMessage] = useState("");
    
    const handleInternalRegister = () => {
        setInternalRegister(true);
    }

    const acceptableInput = acceptableEmail && acceptableUsername && acceptablePassword && acceptableConfirmPassword;
    if (authorized) {
        window.location.href = "/";
        return null;
    }
    return (
        <PageConatiner>
            <RegistrationContainer>
                <RegistrationHeading></RegistrationHeading>
                <EmailField acceptableEmail={acceptableEmail} setAcceptableEmail={setAcceptableEmail}></EmailField>
                <div style={{ visibility: internalRegister ? 'unset' : 'hidden', position: internalRegister ? 'relative' : 'absolute', left: internalRegister ? 0 : '20%', opacity: internalRegister ? 1 : 0, transition: 'left 0.5s ease-in-out, opacity 0.5s ease-in-out' }}>
                    <UsernameField acceptableUsername={acceptableUsername} setAcceptableUsername={setAcceptableUsername}></UsernameField>
                    <PasswordField acceptablePassword={acceptablePassword} setAcceptablePassword={setAcceptablePassword} setAcceptableConfirmPassword={setAcceptableConfirmPassword}></PasswordField>
                    <ConfirmPasswordField acceptableConfirmPassword={acceptableConfirmPassword} setAcceptableConfirmPassword={setAcceptableConfirmPassword}></ConfirmPasswordField>
                    <SignUpError>{registerErrorMessage}</SignUpError>
                    <RegistrationButton enabled={acceptableInput} disabled={!acceptableInput} onClick={() => internalRegistration(setRegisterErrorMessage)}>Register</RegistrationButton>
                </div>
                <div style={{display: internalRegister? 'none': 'unset'}}>
                    <RegistrationButton enabled={acceptableEmail} disabled={!acceptableEmail} onClick={handleInternalRegister}>Continue</RegistrationButton>
                    <GuestCardText style={{margin: 0, fontSize: '0.80rem',textAlign: 'center'}}>Already have an account? <SignInLink href="/signin" style={{marginLeft: `5px`}}>Sign in</SignInLink></GuestCardText>
                    <Seperator>
                        <SeperatorText></SeperatorText>
                    </Seperator>
                    <RegistrationButton enabled={acceptableInput} style={{backgroundColor: "#DB4437"}}>Continue with Google</RegistrationButton>
                </div>
            </RegistrationContainer>
        </PageConatiner>
    );
  };
  

export default Registration;