const config = require('../config.json');
const expressJwt = require('express-jwt');
const userService = require('..users/user.service');

function jwt() {
    const secret = config.secret;
    return expressJwt({secret,isRevoked}).unless({
        path: [
            'users/authenticate',
            'users/register'
        ]
    });
}

async function isRevoked(req,payload,done) {
    const user = await userService.getById(payload.sub);
    if (!user) {
        return done(null,true);
    }
    done();
};

module.exports = jwt;