import Vuex from 'vuex'
import persistedState from 'vuex-persistedstate'
 
const store = new Vuex.Store({
    state: {
       token: null
    },
    mutations: {
        setToken(state, token) {
            state.token = token;
        },
        removeToken(state) {
            state.token = null;
        }
    },
    plugins: [
        persistedState({
            paths: ['token']
        })
    ]
})
 
export default store;