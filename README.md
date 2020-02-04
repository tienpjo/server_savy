### Mongod
  _helpers/database.js : init database
  _service : ham xu ly async chuc nang 
             device.service.js: xu ly cac async lquan den device
             user.service.js: xu ly cac async lquan den userToken
  _controller: UserController xu ly ham login
  middleware:
  AuthMiddlerware.js: Tao token va gui token cho user.
  routes:
    user.js: Cac router
### 
    pm2 start index.js:  run Server    