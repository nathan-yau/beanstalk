const Login = (username: string, password: string, setLoginrErrorMessage: any, setIsLoading: any) => {
    const input = {
        username: username,
        password: password
    }

    setIsLoading(true);
    fetch('/api/login', {
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
                setLoginrErrorMessage(data.data.message);
                setIsLoading(false);
            }
        }).catch((err) => console.log(err))
}

export default Login;
