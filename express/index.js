import express from "express";
import cors from 'cors';
import { getUserList, dataPath } from "./src/userList.js";
import {
  processLogin,
  processRegister,
  processToken,
  modifyUserList,
  resetToken,
  modifyAllToken,
  getUser
} from "./src/functions.js";
const app = express();
const port = 3000;
let userList = getUserList();


app.use(cors()); // 允许所有跨域请求
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.post('/login', (req, res) => {
  console.log(new Date().toLocaleString())
  console.log(req.body)
  processLogin(req.body, res)
})
app.post('/register', (req, res) => {
  console.log(new Date().toLocaleString())
  console.log(req.body)
  processRegister(req.body, res)
})
app.post('/login/token', (req, res) => {
  console.log(new Date().toLocaleString())
  console.log(req.body)
  processToken(req.body, res)
})
app.post('/save', (req, res) => {
  console.log(new Date().toLocaleString())
  console.log(req.body)
  modifyUserList(getUser('token', req.body.token), req.body.templatesList)
  res.status(200).json({
    code: 200,
    message: '保存成功',
    data: null
  })
})
const timer = setInterval(modifyAllToken, 100000)
const timer2 = setInterval(resetToken, 300000)