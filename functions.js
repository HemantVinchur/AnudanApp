const crypto = require('crypto');

const hashPassword = (Password) => {
    let obj = {};
    obj.salt = crypto.randomBytes(16).toString('hex');
    obj.hash = crypto.pbkdf2Sync(Password, obj.salt, 1000, 64, `sha512`).toString('hex');
    return obj;
}

const validatePassword = (salt, Password, hashPassword) => {
    let hash = crypto.pbkdf2Sync(Password, salt, 1000, 64, `sha512`).toString('hex');
    return hash === hashPassword;
}

module.exports = {
    hashPassword,
    validatePassword
}