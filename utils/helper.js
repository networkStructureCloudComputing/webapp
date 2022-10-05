const bcrypt = require("bcrypt");

const generatePasswordHash = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    } catch (error) {
        console.log(error)
    }
}

const comparePassword = async (hashPassword, password) => {
    return await bcrypt.compare(password, hashPassword);
}

const basicAuth = (req) => {
    const auth = req.headers.authorization;
    //console.log(auth);
    if (!auth || auth.indexOf('Basic ') === -1) return res.status(403).json("Forbidden Request")
    // verify auth credentials
    const base64Credentials = auth.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    //console.log(credentials);
    return credentials.split(':');
}

const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

module.exports = {
    validateEmail,
    generatePasswordHash,
    basicAuth,
    comparePassword
};