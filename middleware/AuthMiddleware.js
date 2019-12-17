const jwtHelper = require("../_helpers/jwt");
const userService = require('../_service/user.service');
const config = require('../config.json');
const debug = console.log.bind(console);
// Mã secretKey này phải được bảo mật tuyệt đối, các bạn có thể lưu vào biến môi trường hoặc file

/**
 * Middleware: Authorization user by Token
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
let isAuth = async (req, res, next) => {
  // Lấy token được gửi lên từ phía client, thông thường tốt nhất là các bạn nên truyền token vào header
  const tokenFromClient = req.body.token || req.query.token || req.headers["x-access-token"];
  if (tokenFromClient) {
    // Nếu tồn tại token
    try {
      // Thực hiện giải mã token xem có hợp lệ hay không?
      const decoded = await userService.verifyToken(tokenFromClient, config.secret);
      // Nếu token hợp lệ, lưu thông tin giải mã được vào đối tượng req, dùng cho các xử lý ở phía sau.
      req.jwtDecoded = decoded;
      // Cho phép req đi tiếp sang controller.
      // console.log(decoded);
      next();
    } catch (error) {
      // Nếu giải mã gặp lỗi: Không đúng, hết hạn...etc:
      // Lưu ý trong dự án thực tế hãy bỏ dòng debug bên dưới, mình để đây để debug lỗi cho các bạn xem thôi
      debug("Error while verify token:", error);
      return res.status(401).json({
        message: 'Unauthorized.',
      });
    }
  } else {
    // Không tìm thấy token trong request
    return res.status(403).send({
      message: 'No token provided.',
    });
  }
}

async function getToken (req,res,next) {
  const tokenFromClient = req.body.token || req.query.token || req.headers["x-access-token"];
  if (tokenFromClient) {
    const decoded = await userService.verifyToken(tokenFromClient, config.secret);
    // Nếu token hợp lệ, lưu thông tin giải mã được vào đối tượng req, dùng cho các xử lý ở phía sau.
    console.log(decoded.sub._id);
    return decoded.sub._id;
  }
}

module.exports = {
  isAuth: isAuth,
  getToken: getToken,
};