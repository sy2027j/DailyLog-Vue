import Vuex from 'vuex'
import persistedState from 'vuex-persistedstate'
 
const store = new Vuex.Store({
    state: {
       token: null,
       userInfo: null,
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
        },
        updateUserProfile(state, { profile, nickname }) {
            if (state.userInfo) {
                if (profile !== undefined) state.userInfo.profile = profile;
                if (nickname !== undefined) state.userInfo.nickname = nickname;
            }
        }
    },
    plugins: [
        persistedState({
            paths: ['token', 'userInfo'] 
        })
    ]
})
 
export default store;