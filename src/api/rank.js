import request from '@/utils/request'

export const getRank = () => {
  return request({
    url: '/users/rank',
    method: 'get'
  })
}
