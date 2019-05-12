import axios from '@/libs/api.request'

//白骑士名单
export const getKnightData = (params) => {
  return axios.request({
    url: 'tongdun',
    params: params,
    method: 'get'
  })
}

//同盾黑名单
export const getTongdunData = (params) => {
  return axios.request({
    url: 'tongdun',
    params: params,
    method: 'get'
  })
}

//总体风控情况
export const getFengkongData = (params) => {
  return axios.request({
    url: 'all',
    params: params,
    method: 'get'
  })
}

