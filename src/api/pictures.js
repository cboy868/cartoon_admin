import axios from '@/libs/api.request'

export const getPictureCategoryData = () => {
  return axios.request({
    url: 'pictures-category',
    method: 'get'
  })
}

export const deletePictureCategoryData = (id) => {
  return axios.request({
    url: 'pictures-category/' + id,
    method: 'post',
    data: {
      _method: 'DELETE'
    }
  })
}

export const getPictureData = (params) => {
  return axios.request({
    url: 'pictures',
    params: params,
    method: 'get'
  })
}

export const updatePictureData = (data) => {
  data['_method'] = 'put'
  return axios.request({
    url: 'pictures/' + data['id'],
    data: data,
    method: 'post'
  })
}

export const deletePictureData = (id) => {
  return axios.request({
    url: 'pictures/' + id,
    method: 'get'
  })
}

export const getPictureItemsData = (id) => {
  return axios.request({
    url: 'pictures/' + id,
    method: 'get'
  })
}

export const deletePictureItemData = (id) => {
  return axios.request({
    url: 'pictures/' + id,
    method: 'get'
  })
}
