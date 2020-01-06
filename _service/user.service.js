const config = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dbs = require('../_helpers/database');
const User = dbs.User;
const Token = dbs.Token;
// Thời gian sống của token

const refreshTokenLife = process.env.REFRESH_TOKEN_LIFE || "3650d";
module.exports = {
  authenticate,
  getAll,
  getById,
  create,
  update,
  refreshToken,
  verifyToken,
  delete: _delete
}

async function authenticate({ mobile, password }) {
  const user_mobi = await User.findOne({ mobile });
  const userData = {
    _id: user_mobi.id,
    name: user_mobi.mobile,
    other: "client-to-savy-team"
  };
  if (user_mobi && bcrypt.compareSync(password, user_mobi.hash)) {
    // const { hash, ...userWithoutHash } = user.toObject();
    const token = jwt.sign(
      { sub: userData },
      config.secret,
      {
        algorithm: "HS256",
        expiresIn: refreshTokenLife,
      });
    return {
      token,
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
  if (await User.findOne({ mobile: userParam.mobile })) {
    throw 'Mobile "' + userParam.mobile + '" is already';
  }
  const user = new User(userParam);
  if (userParam.password) {
    user.hash = bcrypt.hashSync(userParam.password, 10);
  }
  await user.save();
}

async function update(id, userParam) {
  const user = await User.findById(id);
  if (!user) throw 'User not found';
  if (user.mobile !== userParam.mobile && await User.findOne({ mobile: userParam.mobile })) {
    throw 'Mobile "' + userParam.mobile + '" is already';
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

async function refreshToken(req, res) {
  // User gửi mã refresh token kèm theo trong body
  const refreshTokenFromClient = req.body.refreshToken;

  if (refreshTokenFromClient && (tokenList[refreshTokenFromClient])) {
    try {
      const decoded = await userService.verifyToken(refreshTokenFromClient, refreshTokenSecret);
      const userFakeData = decoded.data;
      const accessToken = await userService.generateToken(userFakeData, accessTokenSecret, accessTokenLife);
      // gửi token mới về cho người dùng
      return res.status(200).json({ accessToken });
    } catch (error) {
      debug(error);
      res.status(403).json({
        message: 'Invalid refresh token.',
      });
    }
  } else {
    // Không tìm thấy token trong request
    return res.status(403).send({
      message: 'No token provided.',
    });
  }
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


