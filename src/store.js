import Vuex from 'vuex'
 
const store = new Vuex.Store({
    state: {
       token: null
    },
    mutations: {
        setToken(state, token) {
            state.token = token;
        }
    }
})
 
export default store;