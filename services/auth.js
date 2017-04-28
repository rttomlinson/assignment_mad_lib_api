const url = require('url');
const express = require('express');
const app = express();

///////////
///Authenticate Session
//////////
app.use((req, res, next) => {
    //Check for sessionId on session
    if (!req.session.sessionId) {
        //Go to next middleware
    }
    next();
    return;
});

//if sessionId, get email and signature




module.exports = app;