const jwt = require('jsonwebtoken');
const util = require('util');
const signAsync = util.promisify(jwt.sign);

const privateKey = process.env.JWT_PRIVATE_KEY;

module.exports.create = (username) => {
    return signAsync({ username }, privateKey);
}