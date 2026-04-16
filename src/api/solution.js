import request from '@/utils/request'

export const getSolutions = () => {
  return request({
    url: '/solutions',
    method: 'get'
  })
}

export const createSolution = (data) => {
  return request({
    url: '/solutions',
    method: 'post',
    data
  })
}

export const updateSolution = (data) => {
  return request({
    url: '/solutions',
    method: 'put',
    data
  })
}

export const deleteSolution = (id) => {
  return request({
    url: `/solutions/${id}`,
    method: 'delete'
  })
}

export const getSolutionComments = (id) => {
  return request({
    url: `/solutions/getSolutionComments/${id}`,
    method: 'get'
  })
}

export const likeSolution = (id) => {
  return request({
    url: `/solutions/likeSolution/${id}`,
    method: 'put'
  })
}

export const likeComment = (id) => {
  return request({
    url: `/solutions/likeComment/${id}`,
    method: 'put'
  })
}

export const cancelLikeSolution = (id) => {
  return request({
    url: `/solutions/cancelLikeSolution/${id}`,
    method: 'put'
  })
}

export const cancelLikeComment = (id) => {
  return request({
    url: `/solutions/cancelLikeComment/${id}`,
    method: 'put'
  })
}

export const commentSolution = (data) => {
  return request({
    url: '/solutions/commentSolution',
    method: 'post',
    data
  })
}

export const commentComment = (data) => {
  return request({
    url: '/solutions/commentComment',
    method: 'post',
    data
  })
}

export const deleteComment = (solutionId, commentId) => {
  return request({
    url: `/solutions/deleteComment/${solutionId}/${commentId}`,
    method: 'delete'
  })
}