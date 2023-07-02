import UsernameField from "../../components/Registration/UsernameField";
import EmailField from "../../components/Registration/EmailField";
import PasswordField from "../../components/Registration/PasswordField";
import ConfirmPasswordField from "../../components/Registration/ConfirmPasswordField";
import { PageConatiner, RegistrationContainer, RegistrationHeading, RegistrationButton, SignUpError } from "./Registration.styles";

const Registration: React.FC = () => {

    return (
        <PageConatiner>
            <RegistrationContainer>
                <RegistrationHeading></RegistrationHeading>
                <UsernameField></UsernameField>
                <EmailField></EmailField>
                <PasswordField></PasswordField>
                <ConfirmPasswordField></ConfirmPasswordField>
                <SignUpError></SignUpError>
                <RegistrationButton>Register</RegistrationButton>
            </RegistrationContainer>
        </PageConatiner>
    );
  };
  

export default Registration;