
const express = require('express');
const router = express.Router();
const dashboardUser = require('../controller/dashboard/user');

let UserManagerApi = (appApi) => {
    router.post('/login',dashboardUser.login);
    router.get('/isLogined', dashboardUser.isLogined);
    router.get('/overview', dashboardUser.overview);
    router.get('/getAllUser', dashboardUser.getAll);
    router.post('/edit', dashboardUser.update);
    router.post('/add',dashboardUser.addUser);
    router.get('/getUserByPhone/:mobile',dashboardUser.getUserByPhone);
    router.get("/getUserById/:id",dashboardUser.getById);
    router.delete('/:id', dashboardUser._delete);
    return appApi.use("/user",router);
}

module.exports = UserManagerApi;

