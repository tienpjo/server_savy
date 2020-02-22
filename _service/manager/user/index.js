const dbs = require('../../../_helpers/database');
const bcrypt = require('bcryptjs');
const User = dbs.User;
const Device = dbs.Device;
const Admin = dbs.Admin;
module.exports = {
  getAll,
  update,
  _delete,
  getById,
  addUser,
  findUserByPhone,
  getOverView,
  login
}
async function login({ username, password }) {
  const admin= await Admin.findOne({ username });
  if (admin && bcrypt.compareSync(password, admin.password))
  {
    const Ok = "OK";
    return Ok;
  };
  // return 1;
}

async function getOverView() {                                      // delete Device (admin)
  const totalUser = await User.count({});
  const totalDevice = await Device.count({});
  var total = {
      totalUser:totalUser,
      totalDevice:totalDevice
  }
  return total;
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
  await user.save();
}

async function _delete(id) {
  await User.findOneAndDelete(id);
}

async function getAll() {
  return await User.find({}).select('-__v').select('-id');
}

async function getById(userId) {
  return await User.findOne(
    { _id: userId });
}

async function addUser(userParam) {
  if (await User.findOne({ mobile: userParam.mobile })) {
    throw 'Mobile "' + userParam.mobile + '" is already';
  }
  const userAdd = new User(userAdd);
  if (userAdd.password) {
    userAdd.hash = bcrypt.hashSync(userParam.password, 10);
  }
  await userAdd.save();
}

async function findUserByPhone(userParam) {
  return await User.find({ mobile: { $regex: `.*${userParam}.*` } })
}