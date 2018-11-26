export default {
  state: {
    token: '',
    userInfo: {}
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo
    }
  },
  actions: {
    async loginByUser({ commit }, data) {
      await commit('SET_USERINFO', data.user)
      await commit('SET_TOKEN', data.token)
      await window.sessionStorage.setItem('adminToken', data.token)
    },
    logoutByUser({ commit }) {
      commit('SET_USERINFO', {})
      commit('SET_TOKEN', '')
      window.sessionStorage.removeItem('adminToken')
      window.sessionStorage.removeItem('activeName')
    }
  },
  getters: {
    token: state => state.token,
    userInfo: state => state.userInfo
  }
}