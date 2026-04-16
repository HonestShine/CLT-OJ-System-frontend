import request from '@/utils/request'

export const getUsers = () => {
  return request({
    url: '/users',
    method: 'get'
  })
}

export const getUserDetail = (id) => {
  return request({
    url: `/users/${id}`,
    method: 'get'
  })
}

export const getCurrentUser = () => {
  return request({
    url: '/users/me',
    method: 'get'
  })
}

export const updateUser = (data) => {
  return request({
    url: '/users',
    method: 'put',
    data
  })
}

export const uploadAvatar = (formData) => {
  return request({
    url: '/users/upload',
    method: 'post',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export const deleteUser = () => {
  return request({
    url: '/users/',
    method: 'delete'
  })
}
