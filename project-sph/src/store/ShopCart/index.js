import { reqCartList, reqChangeIsChecked, reqDelShop } from "@/network"
const shopCart = {
    state: {
        cartList: []
    },
    getters: {
        cartList(state) {
            return state.cartList[0] || {}
        },
    },
    mutations: {
        GETCARTLIST(state, result) {
            state.cartList = result
            // console.log(state.cartList);
        }
    },
    actions: {
        // 购物车列表
        async getCartList(context) {
            let result = await reqCartList()
            if (result.data.code == 200) {
                context.commit('GETCARTLIST', result.data.data)
            }
        },
        // 切换选中状态
        async getChangeIsChecked(context, {skuId, isChecked}) {
            let result = await reqChangeIsChecked(skuId, isChecked)
            if(result.data.code == 200) {
                return 'ok'
            }else {
                return Promise.reject(new Error('faile'))
            }
        },
        // 删除购物车商品
        async delShop(context, skuId) {
            let result = await reqDelShop(skuId)
            if(result.data.code == 200) {
                return 'ok'
            }else {
                return Promise.reject(new Error('faile'))
            }
        },
        // 删除选中的所有商品
        delAllShop(context) {
            let promiseAll = []
            context.getters.cartList.cartInfoList.forEach(cartInfo => {
                // console.log(cartInfo);
                if(cartInfo.isChecked) {
                    let result = context.dispatch('delShop', cartInfo.skuId)
                    promiseAll.push(result)
                }
            });
            return Promise.all(promiseAll)
        },
        // 全选和取消全选
        isCheckedAllSelect(context, checked) {
            let promiseAll = []
            context.getters.cartList.cartInfoList.forEach(cartInfo => {
                let result = context.dispatch('getChangeIsChecked', {skuId: cartInfo.skuId, isChecked:checked})
                promiseAll.push(result)
            })
            return Promise.all(promiseAll)
        },
        
    }
}

export default shopCart