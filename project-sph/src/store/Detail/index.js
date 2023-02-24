import { reqGoodInfo, addShoppingCart } from "@/network"
import { userId } from "@/utils"
const detail = {
    state: {
        goodInfo: {},
        userId: userId()
    },
    getters: {
        categoryView(state) {
            return state.goodInfo.categoryView || {}
        },
        skuInfo(state) {
            return state.goodInfo.skuInfo || {}
        },
        spuSaleAttrList(state) {
            return state.goodInfo.spuSaleAttrList || {}
        }
    },
    mutations: {
        GETDETAIL(state, res) {
            state.goodInfo = res
            
        }
    },
    actions: {
        getDetail(context, id) {
            reqGoodInfo(id).then((res) => {
            context.commit('GETDETAIL', res.data.data)
          })
        },
        async addShoppingCart(context, {skuId, skuNum}) {
            console.log(123);
            let result = await addShoppingCart(skuId, skuNum)
            if(result.data.code == 200) {
                return 'ok'
            }else {
                return Promise.reject(new Error('faile'))
            }
        }
    }
}

export default detail