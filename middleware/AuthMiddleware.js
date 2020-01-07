const jwtHelper = require("../_helpers/jwt");
const userService = require('../_service/user.service');
const config = require('../config.json');
const debug = console.log.bind(console);
const { body, validationResult } = require('express-validator');

/**
 * Middleware: Authorization user by Token
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
let isAuth = async (req, res, next) => {

  const tokenFromClient = req.body.token || req.query.token || req.headers["x-access-token"] || req.headers["Bearer <Token>"];
  if (tokenFromClient) {
    // Nếu tồn tại token
    try {

      const decoded = await userService.verifyToken(tokenFromClient, config.secret);

      req.jwtDecoded = decoded;
      // Cho phép req đi tiếp sang controller.
      next();
    } catch (error) {
      // Nếu giải mã gặp lỗi: Không đúng, hết hạn...etc:
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

const userValidationRules = () => {
  return [
    // username must be an Phone
    body('mobile').isMobilePhone().withMessage('Số điện thoại nhập vào không đúng!'),
    // password must be at least 8 chars long
    body('password').isLength({ min: 8 }).withMessage('Mật khẩu cần 8 ký tự!'),
  ]
}

const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  var err = errors.msg;
   const extractedErrors = []
   errors.array().map(err => extractedErrors.push(err.msg))

  return res.status(422).json(extractedErrors)
}


module.exports = {
  isAuth: isAuth,
  userValidationRules,
  validate
};