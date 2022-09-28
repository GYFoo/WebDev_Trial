function setIsDisabledForm(form, isDisabled) {
    form.querySelectorAll('input, button')
    .forEach((element) => (element.disabled = isDisabled));
}

// register user
function onSubmitRegisterForm (username, password) {
    return fetch(`http://localhost:3000/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username,
            password,
        }),
    })
    .then((response) => {
        if (response.ok) {
            alert('Successfully Registered');
            return {};
        } else {
            return response.json();
        }
    })
    .then((json) => {
        if (!json.error) return;
        throw new Error(json.error);
    })
    .catch((error) => {
        console.log(error);
        alert(error.message);
    });
}

// login user
function onSubmitLoginForm (username, password) {
    return fetch(`http://localhost:3000/sessions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username,
            password,
        }),
    })
    .then((response) => {
        return response.json();
    })
    .then((json) => {
        if (json.error) throw new Error(json.error);

        alert('Logged In Successfully!');
        // extract jwt
        const token = json.token;
        // set jwt in localstorage
        localStorage.setItem('token', token);
        window.location = '../FullStackDev_Client/profile/';
    })
    .catch((error) => {
        console.log(error);
        alert(error.message);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');
    const usernameRegister = registerForm.querySelector('#username-register');
    const passwordRegister = registerForm.querySelector('#password-register');
    const confirmRegister = registerForm.querySelector('#confirm-register');
    
    const loginForm = document.getElementById('login-form');
    const usernameLogin = loginForm.querySelector('#username-login');
    const passwordLogin = loginForm.querySelector('#password-login');

    registerForm.onsubmit = () => {
        const username = usernameRegister.value;
        const password = passwordRegister.value;
        const confirm = confirmRegister.value;

        console.log(password, confirm, password !== confirm);
        // check if the password is equal to the confirm password
        if (password !== confirm) {
            confirmRegister.setCustomValidity('Password does not match!');
            confirmRegister.reportValidity();
            return false;
        }

        setIsDisabledForm(registerForm, true);
        onSubmitRegisterForm(username, password)
        .finally(() => {
            setIsDisabledForm(registerForm, false);
        });
        
        // prevent default and propagation
        return false;
    }
    
    loginForm.onsubmit = () => {
        setIsDisabledForm(loginForm, true);

        const username = usernameLogin.value;
        const password = passwordLogin.value;
        onSubmitLoginForm(username, password)
        .finally(() => {
            setIsDisabledForm(loginForm, false);
        });
        
        // prevent default and propagation
        return false;
    }
});