import request from '@/utils/request'

export const submitCode = (data) => {
  return request({
    url: '/submissions',
    method: 'post',
    data
  })
}

export const getSubmissions = () => {
  return request({
    url: '/submissions',
    method: 'get'
  })
}

export const getSubmissionDetail = (id) => {
  return request({
    url: `/submissions/${id}`,
    method: 'get'
  })
}

export const getProblemSubmissions = (problemId) => {
  return request({
    url: `/submissions/problem/${problemId}`,
    method: 'get'
  })
}
