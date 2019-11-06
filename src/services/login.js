import axios from 'axios'
const baseUrl = '/api/login'

const login = async creditionals => {
  const response = await axios.post(baseUrl, creditionals)
  return response.data
}

export default { login }