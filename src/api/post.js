import axios from '@/libs/api.request'

export const getPostData = () => {
    return axios.request({
        url: 'http://homestead.laravel/api/admin/posts',
        method: 'get',
    })
}

export const deletePostData = (id) => {
    return axios.request({
        url: 'http://homestead.laravel/api/admin/posts/' + id,
        method: 'post',
        data: {
            _method: 'DELETE',
        }
    })
}