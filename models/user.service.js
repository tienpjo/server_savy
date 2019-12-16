const config = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dbs = require('../_helpers/database');
const User = dbs.User;

module.exports = {
    authenticate,
    getAll,
    getById,
    create,
    update,
    verifyToken,
    delete: _delete
}

async function authenticate({ mobile, password,tokenLife }) {
    const mobi = await User.findOne({ mobile });
    console.log(mobi);
    if (!mobi) {
        res.status(400).json({message: 'User Not Found'});
    }
    if (mobi && bcrypt.compareSync(password, mobi.hash)) {
         const { hash, ...mobiWithoutHash } = mobi.toObject();
        const token = jwt.sign(
        { sub: mobi.id },
         config.secret,
         {
             algorithm: "HS256",
             expiresIn: tokenLife,
         });
        return {
            // ...userWithoutHash,
            token
        };
    }
}

async function getAll() {
    return await User.find().select('-hash');
}

async function getById(id) {
    return await User.findById(id).select('-hash');
}

async function create(userParam) {
    if (await User.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }

    const user = new User(userParam);

    //hash PassWord

    if (userParam.password) {
        user.hash = bcrypt.hashSync(userParam.password, 10);
    }

    await user.save();
}

async function update(id, userParam) {
    const user = await User.findById(id);

    if (!user) throw 'User not found';
    if (user.username !== userParam.username && await User.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }
    if (userParam.password) {
        userParam.hash = bcrypt.hashSync(userParam.password, 10);
    }

    Object.assign(user, userParam);
    await user.save;
}

async function _delete(id) {
    await User.findByIdAndRemove(id);
}

async function verifyToken(token, secretKey) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secretKey, (error, decoded) => {
            if (error) {
                return reject(error);
            }
            resolve(decoded);
        });
    });
}