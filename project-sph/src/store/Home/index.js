import { TypeNavList, bannerList, floorList } from '@/network'
const home = {
    state: {
        TypeNavList: [],
        bannerList: [],
        floorList: []
    },
    getters: {},
    mutations: {
        TYPENAVLIST(state, res) {
            state.TypeNavList = res
        },

        BANNERLIST(state, res) {
            state.bannerList = res
        },

        FLOORLIST(state, res) {
            // console.log(res);
            state.floorList = res
        }
    },
    actions: {
        // context 就是 $store
        TypeNavList(context) {
            TypeNavList().then(res => {
                context.commit('TYPENAVLIST', res.data.data)
            })
        },

        bannerList(context) {
            bannerList().then(res => {
                context.commit('BANNERLIST', res.data.data)
            })
        },

        floorList(context) {
            floorList().then((res) => {
                context.commit('FLOORLIST', res.data.data)
            })
        }
    },
}
export default home