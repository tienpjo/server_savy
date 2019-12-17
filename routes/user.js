const apiDevice = require("../routes/device");

let init_user_API = (app) => {
    router.post('/login', login);
    router.post('/register', register);
    router.use(AuthMiddleWare.isAuth);
    router.post('/add',add);
    router.get('/', getAll);
    router.get('/current', getCurrent);
    router.get('/:id', getById);
    router.get('/:id', update);
    router.delete('/:id', _delete);
    return app.use("/users", router);
}

module.exports = init_user_API;

