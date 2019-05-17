import axios from '@/libs/api.request'

export const getFocusData = () => {
  return axios.request({
    url: 'focus',
    method: 'get'
  })
}