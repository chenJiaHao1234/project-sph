import { reqTrade, reqAddressList, reqSubmitOrder } from "@/network";
const trade = {
    state: {
        tradeInfo: {},
        addressList: [],
        orderId: ''
    },
    getters: {
        detailArrayList(state) {
            return state.tradeInfo.detailArrayList || []
        }
    },
    mutations: {
        TRADEINFO(state, result) {
            // console.log(result);
            state.tradeInfo = result
        },
        ADDRESSLIST(state, result) {
            state.addressList =result
        },
        SUBMITORDER(state, result) {
            state.orderId = result
        }
    },
    actions: {
        async tradeInfo(context) {
            let result = await reqTrade()
            // console.log(result.data.code);
            if(result.data.code) {
                context.commit('TRADEINFO', result.data.data)
            }
        },
        async addressList(context) {
            let result = await reqAddressList()
            // console.log(result.data);
            if(result.data.code == 200) {
                context.commit('ADDRESSLIST', result.data.data)
            }
        },
        async submitOrder(context, {tradeNo, data}) {
            let result = await reqSubmitOrder(tradeNo, data)
            if(result.data.code == 200) {
                context.commit('SUBMITORDER', result.data.data)
                return result.data.data
            }else {
                Promise.reject(new Error('提交订单失败'))
            }
        }
    }
}
export default trade