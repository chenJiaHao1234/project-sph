import request from "./request";
import mockRequest from "./mockReqest";

// 对网络请求的统一管理
const TypeNavList = function () {
    return request({
        url: '/api/product/getBaseCategoryList',
    })
}
// 轮播图
const bannerList = function() {
    return mockRequest({
        url: '/banner'
    })
}
// 首页楼层
const floorList = function() {
    return mockRequest({
        url: '/floor'
    })
}
// 搜索页
const searchList = function(data) {
    return request({
        url: '/api/list',
        method: 'post',
        data
    })
}
// 商品信息
const reqGoodInfo = function(id) {
    return request({
        url: '/api/item/' + id
    })
}
// 添加到购物车
const addShoppingCart = function(skuId, skuNum) {
    return request({
        url: `/api/cart/addToCart/${ skuId }/${ skuNum }`,
        method: 'post',
        
    })
}
// 获取购物车列表
const reqCartList = function() {
    return request({
        url: '/api/cart/cartList',
    })
}
// 切换商品选中状态(购物车)
const reqChangeIsChecked = function(skuId, isChecked) {
    return request({
        url: `/api/cart/checkCart/${skuId}/${isChecked}`
    })
}
// 删除购物车商品
const reqDelShop = function(skuId) {
    return request({
        url: `/api/cart/deleteCart/${skuId}`,
        method: 'delete'
    })
}
// 注册页获取验证码 /api/user/passport/sendCode/{phone}
const reqPassport = function(phone) {
    return request({
        url: `/api/user/passport/sendCode/${phone}`
    })
}
// 用户注册
const reqUserRegister = function(data) {
    return request({
        url: '/api/user/passport/register',
        method: 'post',
        data,
    })
}
// 用户登录
const reqUserLogin = function(data) {
    return request({
        url: '/api/user/passport/login',
        method: 'post',
        data
    })
}
// 携带token获取用户信息
const getUserInfo = function() {
    return request({
        url: '/api/user/passport/auth/getUserInfo',
        method: 'get'
    })
}
// 退出登录
const reqLogout = function() {
    return request({
        url: '/api/user/passport/logout',
        method: 'get'
    })
}
// 获取用户地址信息 /api/user/userAddress/auth/findUserAddressList
const reqAddressList = function() {
    return mockRequest({
        url: '/addressList'
    })
}

// 获取订单交易页信息
const reqTrade = function() {
    return request({
        url: '/api/order/auth/trade',
        method: 'get'
    })
}
// 提交订单
const reqSubmitOrder = function(tradeNo, data) {
    return request({
        url: `/api/order/auth/submitOrder?tradeNo=${tradeNo}`,
        method: 'post',
        data
    })
}
// 获取订单支付信息
const reqOrderPayInfo = function(orderId) {
    return request({
        url: `/api/payment/weixin/createNative/${orderId}`,
        method: 'get'
    })
}

// 查询支付订单状态 /api/payment/weixin/queryPayStatus/{orderId}
const reqQueryPayStatus = function(orderId) {
    return request({
        url: `/api/payment/weixin/queryPayStatus/${orderId}`,
        method: 'get'
    })
}

export { 
    TypeNavList, 
    bannerList, 
    floorList, 
    searchList, 
    reqGoodInfo, 
    addShoppingCart,
    reqCartList,
    reqChangeIsChecked,
    reqDelShop,
    reqPassport,
    reqUserRegister,
    reqUserLogin,
    getUserInfo,
    reqLogout,
    reqTrade,
    reqAddressList,
    reqSubmitOrder,
    reqOrderPayInfo,
    reqQueryPayStatus
}