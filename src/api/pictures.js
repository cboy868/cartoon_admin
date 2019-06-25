import axios from '@/libs/api.request'

export const getPictureCategoryData = () => {
  return axios.request({
    url: 'pictures-category',
    method: 'get'
  })
}
/**
 * 取主图
 */
export const getPictureImagesData = (id) => {
  return axios.request({
    url: 'picture_images/' + id,
    method: 'get'
  })
}

/**
 * 删除主图
 */
export const deletePictureImageData = (id, img) => {
  return axios.request({
    url: 'picture-delete-img/' + id,
    data: { img: img },
    method: 'post',
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

export const getChaptersData = (params) => {
  let id = params['id'];
  delete params['id'];
  return axios.request({
    url: 'pictures/' + id,
    params: params,
    method: 'get'
  })
}


export const updateChapterData = (data) => {
  data['_method'] = 'put'
  return axios.request({
    url: 'cartoons/' + data['id'],
    data: data,
    method: 'post'
  })
}

export const recommend = (id) => {
  return axios.request({
    url: 'picture-recommend/' + data['id'],
    data: {},
    method: 'post'
  })
}

export const unrecommend = (id) => {
  return axios.request({
    url: 'picture-unrecommend/' + data['id'],
    data: {},
    method: 'post'
  })
}
