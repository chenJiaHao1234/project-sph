import axios from 'axios'
import store from '@/store'

// axios二次封装
// 目的：添加请求拦截器和响应拦截器
const request = axios.create({
    baseURL: 'http://gmall-h5-api.atguigu.cn',
    timeout: 5000
})

// 请求拦截器：发送请求前可以检测到。可以在发送请求前做某些操作
request.interceptors.request.use(function(config) {
    // config: 配置对象。里面有一个重要属性：hrader请求头
    // console.log(store.state.detail.userId);
    // 如果 store.state.detail.userId 有值让请求头携带一个字段(由后台顶，不可以随便写，这里定的是userTempId)
    if(store.state.detail.userId) {
        config.headers.userTempId = store.state.detail.userId
    }

    if(localStorage.getItem('TOKEN')) {
        config.headers.token = localStorage.getItem('TOKEN')
    }
    return config
})

// 响应拦截器：服务器数据返回前可以检测到。可以在发送请求前做某些操作
request.interceptors.response.use((res) => {
    return res
}, (error) => {

})

export default request