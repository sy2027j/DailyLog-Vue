import Vuex from 'vuex'
import persistedState from 'vuex-persistedstate'
 
const store = new Vuex.Store({
    state: {
       token: null,
       userInfo: null
    },
    mutations: {
        setToken(state, token) {
            state.token = token;
        },
        removeToken(state) {
            state.token = null;
            state.userInfo = null;
        },
        setUserInfo(state, userInfo) {
            state.userInfo = userInfo;
        }
    },
    plugins: [
        persistedState({
            paths: ['token', 'userInfo']
        })
    ]
})
 
export default store;