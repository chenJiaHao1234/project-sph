import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
const home = () => import('@/views/Home')
const login = () => import('@/views/Login')
const register = () => import('@/views/Register')
const search = () => import('@/views/Search')
const detail = () => import('@/views/Detail')
const addCartSuccess = () => import('@/views/AddCartSuccess')
const shopCart = () => import('@/views/ShopCart')
const trade = () => import('@/views/Trade')
const pay = () => import('@/views/Pay')

Vue.use(VueRouter)

// 解决编程式导航重复点击报错
let originPush = VueRouter.prototype.push
VueRouter.prototype.push = function (location, resolve, reject) {
  if(resolve && reject) {
    originPush.call(this, location, resolve, reject)
  } else {
    originPush.call(this, location, () => {}, () => {})
  }
}

const routes = [
  {
    path: '',
    redirect: '/home'
  },
  // 首页
  {
    name: 'home',
    path: '/home',
    component: home,
    meta: {
      footerShow: true,
      categoryShow: true,
    }
  },
  // 登录
  {
    name: 'login',
    path: '/login',
    component: login,
  },
  // 注册
  {
    name: 'register',
    path: '/register',
    component: register,
  },
  // 搜索
  {
    name: 'search',
    path: '/search/:keyword?',
    component: search,
    meta: {
      footerShow: true,
      categoryList: false,
    }
  },
  // 商品详情
  {
    name: 'detail',
    path: '/detail/:id',
    component: detail,
    meta: {
      footerShow: true,
    }
  },
  // 添加到购物车成功提示页面
  {
    name: 'addCartSuccess',
    path: '/addcartsuccess',
    component: addCartSuccess,
    meta: {
      footerShow: true,
    }
  },
  // 购物车
  {
    name: 'shopCart',
    path: '/shopcart',
    component: shopCart,
    meta: {
      footerShow: true,
    }
  },
  // 获取订单交易页信息
  {
    name: 'trade',
    path: '/trade',
    component: trade,
    meta: {
      footerShow: true,
    },
    beforeEnter: (to, from, next) => {
      if(from.path == '/shopcart') {
        next()
      }else {
        next(from.path)
      }
    }
  },
  // 提交订单页
  {
    name: 'pay',
    path: '/pay',
    component: pay,
    meta: {
      footerShow: true,
    },
    beforeEnter: (to, from, next) => {
      if(from.path == '/trade') {
        next()
      }else {
        next(from.path)
      }
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return { y: 0 }
  },
  routes
})

export default router

router.beforeEach(async (to, from, next) => {
  let token = store.state.login.token
  // console.log(token);

  if(token) {
    if(to.path == '/login' || to.path == '/register') {
      next('/home')
    }else {
      await store.dispatch('userInfo')
      next()
    }
  }else {
    if(to.path == '/addcartsuccess' || to.path == '/shopcart') {
      next('/login')
    }else {
      next()
    }

  }
})