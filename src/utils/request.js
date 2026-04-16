import axios from 'axios'

const request = axios.create({
  baseURL: '/api',
  timeout: 120000 // 增加超时时间到120秒（两分钟），以应对AI生成题目可能需要的较长时间
})

request.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.token = token
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

request.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    if (error.response) {
      const { status, data } = error.response
      if (status === 401) {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        const currentPath = window.location.pathname
        if (currentPath === '/profile' || currentPath.startsWith('/profile/')) {
          window.location.href = '/login'
        }
      }
      return Promise.reject(data)
    }
    return Promise.reject(error)
  }
)

export default request
