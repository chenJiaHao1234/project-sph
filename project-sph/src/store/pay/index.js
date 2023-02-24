import { reqOrderPayInfo, reqQueryPayStatus } from "@/network";
const pay = {
    state: {
        payInfo: {},
        code: ''
    },
    getters: {},
    mutations: {
        ORDERPAYINFO(state, result) {
            // console.log(result);
            state.payInfo = result
        },
        QUERYPAYSTATUS(state, result) {
            state.code = result
        }
    },
    actions: {
        async orderPayInfo(context, orderId) {
            // console.log(orderId);
            let result = await reqOrderPayInfo(orderId)
            console.log(result);
            if(result.data.code == 200) {
                context.commit('ORDERPAYINFO', result.data.data)
            }
        },
        async queryPayStatus(context, orderId) {
          let result = await reqQueryPayStatus(orderId)
          console.log(result);
          context.commit('QUERYPAYSTATUS', result.data.code)
        }
    }
}
export default pay