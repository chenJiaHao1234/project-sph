//利用uuid生成未登录用户临时标识符
import { v4 as uuidv4 } from 'uuid';
export const userId = () => {
    // 获取本地存储的游客信息(查看是否有游客信息)
    let uuidToken = localStorage.getItem('UUIDTOKEN')

    if(!uuidToken) {
        // 生成一个游客信息
        uuidToken = uuidv4()
        // 把信息存入本地存储
        localStorage.setItem('UUIDTOKEN', uuidToken)
    }
    return uuidToken
}