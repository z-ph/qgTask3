import fs from "fs";
import { getUserList } from "./userList.js";
let userList = getUserList();
function processLogin(bodyInfo, res) {
  const { name, password, action } = bodyInfo;
  //处理登录
  if (action === '登录') {
    const user = userList.find(user => user.name === name && user.password === password);
    if (user) {
      res.json({
        code: 200,
        message: '登录成功',
        data: user.data,
        token: user.token
      })
    } else {
      res.json({
        code: 400,
        message: '用户名或密码错误',
        data: null
      })
    }
  }

}
function processRegister(bodyInfo, res) {
  const { name, password, action } = bodyInfo;
  //处理注册
  if (action === '注册') {
    const user = userList.find(user => user.name === name);
    if (user) {
      res.json({
        code: 400,
        message: '用户名已存在',
        data: null
      })
    }
    else {
      const newInfo = {
        name,
        password,
        token: "abcdefghijklmnopqrstuvwxyz",
        data: []
      }
      addNewUserInfo(newInfo)
      res.json({
        code: 200,
        message: '注册成功',
        data: [],
        token: newInfo.token
      })
    }
  }
}
function processToken(bodyInfo, res) {
  const { token } = bodyInfo;
  const user = userList.find(user => {
    return user.token === token;
  });
  if (user) {
    console.log('验证成功')
    res.json({
      code: 200,
      message: '验证成功',
      data: user.data,
      token: user.token
    })
  }
  else {
    console.log('验证失败')
    res.json({
      code: 400,
      message: '验证失败',
      data: null
    })
  }
}
function modifyUserList(user, data) {
  user.data = data;
  saveUserList();
}
function saveUserList() {
  fs.writeFileSync(dataPath, JSON.stringify(userList, null, 2));
  userList = getUserList();
}
function getUser(key, value) {
  return userList.find(user => user[key] === value)
}
function addNewUserInfo(newInfo) {
  userList.push(newInfo);
  saveUserList();
}
function resetToken() {
  console.log('重置了所有token')
  userList.forEach(user => {
    user.token = user.name;
  })
  saveUserList();
}
function modifyAllToken() {
  console.log(new Date().toLocaleString())
  console.log('修改所有token')
  userList.forEach(user => {
    user.token += '1'
  })
  saveUserList();
}
export {
  processLogin,
  processRegister,
  processToken,
  modifyUserList,
  saveUserList,
  addNewUserInfo,
  resetToken,
  modifyAllToken,
  getUser
};