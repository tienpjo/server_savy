const config = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dbs = require('../_helpers/database');
const User = dbs.User;

// Thời gian sống của token
const accessTokenLife = process.env.ACCESS_TOKEN_LIFE || "1h";

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
        expiresIn: accessTokenLife,
      });
    return {
      // ...userWithoutHash,
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

async function refreshToken(req, res) {
  // User gửi mã refresh token kèm theo trong body
  const refreshTokenFromClient = req.body.refreshToken;
  // debug("tokenList: ", tokenList);

  // Nếu như tồn tại refreshToken truyền lên và nó cũng nằm trong tokenList của chúng ta
  if (refreshTokenFromClient && (tokenList[refreshTokenFromClient])) {
    try {
      // Verify kiểm tra tính hợp lệ của cái refreshToken và lấy dữ liệu giải mã decoded 
      const decoded = await userService.verifyToken(refreshTokenFromClient, refreshTokenSecret);
      // Thông tin user lúc này các bạn có thể lấy thông qua biến decoded.data
      // có thể mở comment dòng debug bên dưới để xem là rõ nhé.
      // debug("decoded: ", decoded);
      const userFakeData = decoded.data;
      debug(`Thực hiện tạo mã Token trong bước gọi refresh Token, [thời gian sống vẫn là 1 giờ.]`);
      const accessToken = await userService.generateToken(userFakeData, accessTokenSecret, accessTokenLife);
      // gửi token mới về cho người dùng
      return res.status(200).json({ accessToken });
    } catch (error) {
      // Lưu ý trong dự án thực tế hãy bỏ dòng debug bên dưới, mình để đây để debug lỗi cho các bạn xem thôi
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


