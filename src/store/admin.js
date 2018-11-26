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
    async logoutByUser({ commit }, data) {
      await commit('SET_USERINFO', {})
      await commit('SET_TOKEN', '')
      await window.sessionStorage.removeItem('adminToken')
    }
  },
  getters: {
    token: state => state.token,
    userInfo: state => state.userInfo
  }
}