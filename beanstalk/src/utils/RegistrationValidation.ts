
const validateRegistration = (event: any, ValidationProp: any) => {
    const inputValue = event.target.value;
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
            fetch('/api/testing', {
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

export default validateRegistration;
