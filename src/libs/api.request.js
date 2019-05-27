import HttpRequest from '@/libs/axios'
import config from '@/config'

let url = window.location.href

// 通过 url地址判断 请求接口的地址，处理会好一些
let baseUrl = ''
if (url.indexOf('localhost') != -1) {
  baseUrl = config.baseUrl.local
} else {
  baseUrl = config.baseUrl.prod
}
// baseUrl = config.baseUrl.prod
// console.dir(baseUrl)

const axios = new HttpRequest(baseUrl)
export default axios
