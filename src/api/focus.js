import axios from '@/libs/api.request'

export const getFocusData = () => {
  return axios.request({
    url: 'focus',
    method: 'get'
  })
}

export const updateFocusItemData = (data) => {
  let id = data['id']
  return axios.request({
    url: 'edit-focus/' + id,
    data: data,
    method: 'post'
  })
}

export const deleteFocusItemData = (id) => {
  return axios.request({
    url: 'delete-focus/' + id,
    method: 'post'
  })
}