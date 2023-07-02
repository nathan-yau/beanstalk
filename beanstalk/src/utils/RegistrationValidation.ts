
const validateRegistration = (event: any, ValidationProp: any) => {
    const inputValue = event.target.value;
    const passwordInput  = document.querySelector('input[name="password"]') as HTMLInputElement;
    const confirmPasswordInput  = document.querySelector('input[name="Confirm Password"]') as HTMLInputElement;
    
    if (ValidationProp.category === "Confirm Password" && inputValue !== "" && inputValue.length >= 5 && passwordInput !== null) {
        ValidationProp.setValidating(true)
        clearTimeout(ValidationProp.timerId)
        const newTimerId = window.setTimeout(() => {
            if ( passwordInput && inputValue !== passwordInput.value) {
                ValidationProp.setValidating(false)
                ValidationProp.setAcceptable(false)
                ValidationProp.setErrorMessage("Passwords do not match")
            } else {
                ValidationProp.setValidating(false)
                ValidationProp.setAcceptable(true)
                ValidationProp.setErrorMessage(null)
            }}, 500)
        ValidationProp.setTimerId(newTimerId)
    } else {
        { passwordInput && confirmPasswordInput && ValidationProp.category === "password"
            ? confirmPasswordInput.value = "" : null }
        var input = {[ValidationProp.category]: inputValue}
        // Cancel the previous timeout
        clearTimeout(ValidationProp.timerId)
        // Make sure the input is not empty and has at least 5 characters
        if (inputValue !== "" && inputValue.length >= 5) {
            ValidationProp.setValidating(true)
            ValidationProp.setAcceptable(false)
            ValidationProp.setErrorMessage(null)
            // Send Fetching request to the server after 500 ms
            const newTimerId = window.setTimeout(() => {
                fetch('/api/validation', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(input)
                }).then((res) => res.json()).then((data) => {
                        console.log("After", data)
                        ValidationProp.setAcceptable(data.success)
                        {!data.success ? ValidationProp.setErrorMessage(data.data.message) : null}
                    }).catch((err) => console.log(err)).finally(() => {
                        ValidationProp.setValidating(false)
                    })
                }, 500)

            // Store the timeout for possible cancellation
            ValidationProp.setTimerId(newTimerId)
        } else {
            ValidationProp.setValidating(false)
            ValidationProp.setAcceptable(false)
            ValidationProp.setErrorMessage(null)
        }
    }
}

export default validateRegistration;
