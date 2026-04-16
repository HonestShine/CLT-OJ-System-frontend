import request from '@/utils/request'

export const getProblemDetail = (id) => {
  return request({
    url: `/problems/${id}`,
    method: 'get'
  })
}

export const searchProblems = (keyword, page = 1, pageSize = 10, tags = []) => {
  return request({
    url: '/problems/search',
    method: 'get',
    params: { keyword, page, pageSize, tags }
  })
}

export const getProblemsSize = () => {
  return request({
    url: '/problems/size',
    method: 'get'
  })
}

export const getProblemsByPage = (page, pageSize = 10, tags = []) => {
  return request({
    url: '/problems/page',
    method: 'get',
    params: { page, pageSize, tags }
  })
}

export const filterProblems = (difficulty, page = 1, pageSize = 10, tags = []) => {
  return request({
    url: '/problems/filter',
    method: 'get',
    params: { difficulty, page, pageSize, tags }
  })
}

export const getRecommendedProblems = () => {
  return request({
    url: '/problems/recommend',
    method: 'get'
  })
}

// 管理员修改题目
export const updateProblem = (problemId, data) => {
  return request({
    url: `/admin/problems`,
    method: 'put',
    data: {
      id: problemId,
      ...data
    }
  })
}

// 管理员删除题目
export const deleteProblem = (problemId) => {
  return request({
    url: `/admin/problems/${problemId}`,
    method: 'delete'
  })
}

// 管理员添加题目
export const addProblem = (data) => {
  return request({
    url: `/admin/problems`,
    method: 'post',
    data
  })
}

// AI生成题目
export const generateProblem = (promptWord) => {
  return request({
    url: `/admin/ai`,
    method: 'get',
    params: { promptWord }
  })
}
