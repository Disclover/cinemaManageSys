//adminAPI定义总经理部分的接口
import axios from 'axios'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
axios.defaults.baseURL = process.env.NODE_ENV === 'production'
  ? 'http://47.103.9.254:8000'
  : 'http://localhost:8000'

//获取员工列表
export const getRoles = () => {
  return axios.get('/role/getAll')
}



//添加员工
export const addRole =(username, password, category) => {
  return axios.post('/role/add?username=' + username + '&password=' + password + '&category=' + category)
}

//删除员工
export const deleteRole = (userId) => {
  return axios.post('/role/delete?userId=' + userId)
}

//修改员工信息
export const updateRole = (id, category) => {
  return axios.post('/role/update?id=' + id + '&category=' + category)
}

//获取用户信息

//


