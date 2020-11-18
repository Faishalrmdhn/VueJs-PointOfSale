import axios from 'axios'
// import { resolve } from 'core-js/fn/promise'
export default {
  state: {
    page: 1,
    limit: 5,
    history: [],
    sort: 'history_id',
    totalData: null,
    search: '',
    ascdsc: 'DESC',
    orders: 0,
    todayIncome: 0,
    orderData: [],
    // ===================
    invoice: 0,
    subTotal: 0
  },
  mutations: {
    setHistory(state, payload) {
      console.log(payload)
      state.history = payload.data.data
      if (payload.pagination) {
        state.totalData = payload.pagination.totalData
      }
    },
    setOrder(state, payload) {
      console.log(payload)
      state.orders = payload.data.data[0].totalOrders
    },
    setOrderData(state, payload) {
      console.log(payload.data.data)
      state.orderData = payload.data.data
    },
    // ==============================================================
    setTodayIncome(state, payload) {
      state.todayIncome = payload.data.data[0].subtotal
    },
    changePage(state, payload) {
      state.page = payload
    },
    searchMutation(state, payload) {
      console.log(payload)
      state.search = payload
    },
    sortProduct(state, payload) {
      state.sort = payload
    },
    ascdscProduct(state, payload) {
      console.log(payload)
      state.ascdsc = payload
    },
    checkOutMutation(state, payload) {
      state.invoice = payload.invoice
      state.modalCekot = payload.orders
      state.subTotal = payload.subtotal
    }
  },
  actions: {
    allHistory(context) {
      return new Promise((resolve, reject) => {
        axios
          .get(
              `${process.env.VUE_APP_URL}history?sort=${context.state.sort}&page=${context.state.page}&ascdsc=${context.state.ascdsc}&limit=${context.state.limit}`
          )
          .then(response => {
            resolve(response)
            context.commit('setHistory', response)
          })
          .catch(error => {
            reject(error.response)
          })
      })
    },
    totalOrder(context) {
      axios
        .get(`${process.env.VUE_APP_URL}history/order/total`)
        .then(response => {
          console.log(response)
          context.commit('setOrder', response)
        })
        .catch(error => {
          console.log(error.response)
        })
    },
    todayIncomeAction(context) {
      axios
        .get(
            `${process.env.VUE_APP_URL}history/income/today`)
        .then(response => {
          console.log(response.data)
          context.commit('setTodayIncome', response)
        })
        .catch(error => {
          console.log(error)
        })
    },
    recentOrder(context) {
      axios
        .get(`${process.env.VUE_APP_URL}history/order/total`)
        .then(response => {
          console.log(response)
          context.commit('setOrder', response)
        })
        .catch(error => {
          console.log(error.response)
        })
    },
    recentOrderData(context) {
      axios
        .get(`${process.env.VUE_APP_URL}history/order/recent`)
        .then(response => {
          console.log(response)
          context.commit('setOrderData', response)
        })
        .catch(error => {
          console.log(error.response)
        })
    },
    // =====================================================
    searchProductStore(context) {
      axios
        .get(
          `${process.env.VUE_APP_URL}product/search/name?name=${context.state.search}&limit=${context.state.limit}`
        )
        .then(response => {
          context.commit('setProduct', response.data)
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  getters: {
    getLimitHistory(state) {
      return state.limit
    },
    getHistory(state) {
      return state.history
    },
    getTotalDataHistory(state) {
      return state.totalData
    },
    getOrders(state) {
      return state.orders
    },
    getOrderData(state) {
      return state.orderData
    },
    getTodayIncome(state) {
      return state.todayIncome
    },
    // =================================
    getSearchHistory(state) {
      return state.search
    },
    getInvoiceHistory(state) {
      return state.invoice
    },
    getSubtotalHistory(state) {
      return state.subTotal
    }
  }
}
