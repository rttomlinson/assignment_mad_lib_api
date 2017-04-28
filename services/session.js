const SECRET = process.env.secret || "puppies";
const md5 = require('md5');


const SessionService = {};

SessionService.createSignedSessionId = (email) => {
    const signature = SessionService.createSignature(email);
    return `${email}:${signature}`; 
};

SessionService.createSignature = (email) => {
    return md5(`${email}${ SECRET }`);
};


module.exports = SessionService;
