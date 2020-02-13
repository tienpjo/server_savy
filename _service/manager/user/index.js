const dbs = require('../../../_helpers/database');
const User = dbs.User;
module.exports = {
  getAll,
  update,
  _delete,
  getById,
  addUser,
  findUserByPhone,
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
  await User.findByIdAndRemove(id);
}

async function getAll() {
  return await User.find();
}

async function getById(id) {
  return await User.findById(id);
}

async function addUser(userParam) {
  if (await User.findOne({ mobile: userParam.mobile })) {
    throw 'Mobile "' + userParam.mobile + '" is already';
  }
  const userAdd = new User(userAdd);
  await userAdd.save();
}

async function findUserByPhone(userParam) {
  return await User.find({ mobile: userParam.mobile })
}