import { checkIsLoggedIn } from '../commons.js';

const payload = checkIsLoggedIn('../');

// display the name based on the token's payload
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('h1').textContent = payload.username;
});