import axios from 'axios'
// import router from '../../router/index'
export default {
  state: {
    urlAPI: process.env.VUE_APP_URL,
    user: {},
    token: localStorage.getItem('token') || null,
    allUser: []
  },
  mutations: {
    setAllUser(state, payload) {
      state.allUser = payload
    }
  },
  actions: {
    getAllUser(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${context.state.urlAPI}users`, payload)
          .then(response => {
            context.commit('setAllUser', response.data.data)
            resolve(response.data)
          })
          .catch(error => {
            reject(error.response)
          })
      })
    },
    activateAccount(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .patch(`${context.state.urlAPI}users/admin`, payload)
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            reject(error.response)
          })
      })
    }
  },
  getters: {
    getAllUser(state) {
      return state.allUser
    }
  }
}
