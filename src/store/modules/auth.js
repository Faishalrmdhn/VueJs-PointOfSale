import axios from 'axios'
import router from '../../router/index'
export default {
  state: {
    user: {},
    token: localStorage.getItem('token') || null
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload
      state.token = payload.token
      //   console.log(payLoad)
    },
    delUser(state) {
      state.user = {}
      state.token = null
    }
    // userRegist(state, payload){
    //   state
    // }
  },
  actions: {
    login(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post(`${process.env.VUE_APP_URL}users/login`, payload)
          .then(response => {
            console.log(response)
            context.commit('setUser', response.data.data)
            localStorage.setItem('token', response.data.data.token)
            resolve(response.data)
          })
          .catch(error => {
            reject(error.response)
          })
      })
    },
    register(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post(`${process.env.VUE_APP_URL}users/register`, payload)
          .then(response => {
            console.log(response.data)
            resolve(response.data)
          })
          .catch(error => {
            reject(error.response)
          })
      })
    },
    interceptorRequest(context) {
      console.log('interceptor works!')
      axios.interceptors.request.use(
        function(config) {
          config.headers.authorization = `Bearer ${context.state.token}`
          // Do something before request is sent
          return config
        },
        function(error) {
          // Do something with request error
          return Promise.reject(error)
        }
      )
    },
    logout(context) {
      localStorage.removeItem('token')
      context.commit('delUser')
      router.push('/login')
    },
    interceptorResponse(context) {
      axios.interceptors.response.use(
        function(response) {
          // Any status code that lie within the range of 2xx cause this function to trigger
          // Do something with response data
          return response
        },
        function(error) {
          console.log(error.response)
          if (error.response.status === 403) {
            if (
              error.response.data.msg === 'invalid token' ||
              error.response.data.msg === 'invalid signature!'
            ) {
              localStorage.removeItem('token')
              context.commit('delUser')
              router.push('/login')
              alert('Sorry your token is invalid! cannot pass this section!')
            } else if (error.response.data.msg === 'jwt expired') {
              localStorage.removeItem('token')
              context.commit('delUser')
              router.push('/login')
              alert('Sorry your token is invalid! cannot pass this section!')
            }
          }
          return Promise.reject(error)
        }
      )
    }
  },
  getters: {
    isLogin(state) {
      return state.token !== null
    },
    getUser(state) {
      return state.user
    }
  }
}
