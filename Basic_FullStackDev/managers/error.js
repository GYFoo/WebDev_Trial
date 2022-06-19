module.exports.UserExistsError = class UserExistsError extends Error {
    constructor(username) {
        super(`user ${username} already exists`);
    }
};