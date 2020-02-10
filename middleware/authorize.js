const expressJwt = require('express-jwt');
const {config} = require('../config.json');

module.exports = authorize;

function authorize(roles = []) {
   // [Role.Admin, Role.User] or ['Admin', 'User'])
    if (typeof roles === 'string') {
        roles = [roles];
    }

    return [
   
        expressJwt({ config }),
        // authorize based on user role
        (req, res, next) => {
            if (roles.length && !roles.includes(req.user.role)) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
            // authentication successful
            next();
        }
    ];
}