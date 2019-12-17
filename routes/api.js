const express = require("express");
const router = express.Router();
const apiDevice = require("../routes/device");
const AuthMiddleWare = require("../middleware/AuthMiddleware");