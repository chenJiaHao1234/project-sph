import { reqUserLogin, getUserInfo, reqLogout } from "@/network";
const login = {
    state: {
        token: localStorage.getItem('TOKEN'),
        userInfo: {}
    },
    getters: {},
    mutations: {
        USERLOGIN(state, result) {
            state.token = result
        },
        USERINFO(state, result) {
            state.userInfo = result
            
        },
        LOGOUT(state) {
            state.token = ''
            state.userInfo = {}
            localStorage.removeItem('TOKEN')
        }
    },
    actions: {
        async userLogin(context, user) {
            let result = await reqUserLogin(user)
            console.log(result.data.data);
            if (result.data.code == 200) {
                context.commit('USERLOGIN', result.data.data.token)
                localStorage.setItem('TOKEN', result.data.data.token)
                return 'ok'
            } else {
                return Promise.reject(new Error('用户名或密码不正确'))
            }
        },

        async userInfo(context) {
            let result = await getUserInfo()
            console.log(result);
            if(result.data.code == 200) {
                context.commit('USERINFO', result.data.data)
            }
        },

        async logout(context) {
            let result = await reqLogout()
            if (result.data.code == 200) {
                context.commit('LOGOUT')
            }
        }
    }
}
export default login