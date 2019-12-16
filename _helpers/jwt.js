const config = require('../config.json');
const expressJwt = require('express-jwt');
const userService = require('../models/user.service');
module.exports = jwt;
    // jwt,
    // verifyToken,
// }
function jwt() {
    const secret = config.secret;
    return expressJwt({secret,isRevoked}).unless({
        path: [
            '/users/login',
            '/users/register'
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
