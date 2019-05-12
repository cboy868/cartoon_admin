import axios from '@/libs/api.request'

//数据列表
export const getCertData = (params) => {
  return axios.request({
    url: 'face',
    params: params,
    method: 'get'
  })
}

export const verify = (params) => {
  return axios.request({
    url: 'verify',
    data: params,
    method: 'post'
  })
}


export const clearFace = (params) => {
  return axios.request({
    url: 'clear_face',
    data: params,
    method: 'post'
  })
}

