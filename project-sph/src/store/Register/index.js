import { reqPassport, reqUserRegister } from "@/network"
const register = {
    state: {
        passport: ''
    },
    getters: {},
    mutations: {
        GETPASSPORT(state, result) {
            state.passport = result
        }
    },
    actions: {
      async getPassport(context, phone) {
        let result = await reqPassport(phone)
        if (result.data.code == 200) {
            context.commit('GETPASSPORT', result.data.data)
        }
      },
      // 用户注册
      async userRegister(context, user) {
        let result = await reqUserRegister(user)
        console.log(result);
        if(result.data.code == 200) {
            return 'ok'
        }else {
            return Promise.reject(new Error('faile'))
        }
      }
    }
}
export default register