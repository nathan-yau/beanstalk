const Registration = (setRegisterErrorMessage: any, setRegisterLoading: any) => {
    const usernameInput = document.querySelector('input[name="username"]') as HTMLInputElement;
    const emailInput = document.querySelector('input[name="email"]') as HTMLInputElement;
    const passwordInput  = document.querySelector('input[name="password"]') as HTMLInputElement;
    const confirmPasswordInput  = document.querySelector('input[name="Confirm Password"]') as HTMLInputElement;
    
    const input = {
        username: usernameInput.value,
        email: emailInput.value,
        password: passwordInput.value,
        confirmPassword: confirmPasswordInput.value
    }
    setRegisterLoading(true);

    fetch('/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(input)}).then((res) => res.json()).then((data) => {
            if (data.success) {
                setTimeout(() => {
                    window.location.href = "/";
                }, 2000);
            } else {
                setRegisterErrorMessage(data.data.message);
                setRegisterLoading(false);
            }
        }).catch((err) => console.log(err))
}

export default Registration;
