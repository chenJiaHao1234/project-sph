import Vue from 'vue'
import Vuex from 'vuex'
import home from './Home'
import search from './Search'
import detail from './Detail'
import shopCart from './ShopCart'
import register from './Register'
import login from './Login'
import trade from './Trade'
import pay from './pay'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    home,
    search,
    detail,
    shopCart,
    register,
    login,
    trade,
    pay
  }
})
