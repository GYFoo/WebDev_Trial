function decode(jwt) {
    const payloadBase64 = jwt.split('.')[1];
    const payload = JSON.parse(atob(payloadBase64));
    console.log(payload);
    return payload;
}

export function checkIsLoggedIn(redirect) {
    // check if jwt exists
    const token = localStorage.getItem('token');
    if (!token) {
        alert('No token found');
        window.location = redirect;
        return;
    }
    const payload = decode(token);
    const expiry = payload.exp;
    const now = Math.floor(new Date() / 1000);
    const isExpired = now > expiry;
    if (isExpired) {
        localStorage.removeItem('token');
        alert('Please Login Again!');
        window.location = redirect;
    }

    return payload;
}