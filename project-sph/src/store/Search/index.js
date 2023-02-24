import { searchList } from "@/network" 
const search = {
    state: {
        searchList: {}
    },
    getters: {
        attrsList(state) {
            return state.searchList.attrsList
        },

        goodsList(state) {
            return state.searchList.goodsList
        },

        trademarkList(state) {
            return state.searchList.trademarkList
        }
    },
    mutations: {
        SEARCHLIST(state, res) {
            state.searchList = res
        }
    },
    actions: {
        SearchList(context, data) {
            searchList(data).then(res => {
                context.commit('SEARCHLIST', res.data.data)
            })
        }
    }
}

export default search