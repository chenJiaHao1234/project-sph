import axios from 'axios'

const request = axios.create({
    baseURL: '/mock',
    timeout: 5000
})

// 请求拦截器：发送请求前可以检测到。可以在发送请求前做某些操作
request.interceptors.request.use(function(config) {
    // config: 配置对象。里面有一个重要属性：hrader请求头
    return config
})

// 响应拦截器：发送请求前可以检测到。可以在发送请求前做某些操作
request.interceptors.response.use((res) => {
    return res
}, (error) => {

})

export default request