import axios from 'axios'
export default {
  state: {
    page: 1,
    limit: 6,
    products: [],
    sort: 'product_id',
    totalData: null,
    search: '',
    cart: [],
    count: 0,
    ascdsc: 'asc',
    modalCekot: {},
    invoice: 0,
    subTotal: 0
  },
  mutations: {
    resetCount(state, payload) {
      state.count = 0
    },
    setProduct(state, payload) {
      state.products = payload.data
      if (payload.pagination) {
        state.totalData = payload.pagination.totalData
      }
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
    addToCartStore(state, payload) {
      const setCart = {
        product_id: payload.product_id,
        product_name: payload.product_name,
        order_qty: 1,
        product_image: payload.product_image,
        product_price: payload.product_price,
        totalPrice: payload.product_price
      }
      const fixedData = [...state.cart, setCart]
      const addedItem = fixedData.find(
        item => item.product_id === payload.product_id
      )
      const existItem = state.cart.find(
        item => item.product_id === payload.product_id
      )
      if (existItem) {
        addedItem.product_total = payload.product_price * payload.qty
        addedItem.order_qty += 1
      } else {
        state.cart = [...state.cart, setCart]
      }
      state.count += 1
      // this.count += 1
      // this.cart = [...this.cart, setCart]
    },
    incrementCart(state, payload) {
      const incrementData = state.cart.find(
        value => value.product_id === payload.product_id
      )
      incrementData.order_qty += 1
      incrementData.product_total = payload.product_price * payload.order_qty
      state.count += 1
    },
    decrementCountStore(state, payload) {
      state.count -= 1
    },
    checkOutMutation(state, payload) {
      state.invoice = payload.invoice
      state.modalCekot = payload.orders
      state.subTotal = payload.subtotal
    }
  },
  actions: {
    getProducts(context) {
      axios
        .get(
          `${process.env.VUE_APP_URL}product?sort=${context.state.sort}&page=${context.state.page}&limit=${context.state.limit}&ascdsc=${context.state.ascdsc}`
        )
        .then(response => {
          console.log(response.data)
          context.commit('setProduct', response.data)
          // context.state.products = response.data.data
          // context.state.totalData = response.data.pagination.totalData
          // context.commit('changePage', response.data.pagination.page)
        })
        .catch(error => {
          console.log(error.response)
        })
    },
    addProducts(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post(`${process.env.VUE_APP_URL}product/`, payload)
          .then(response => {
            console.log(response.data.data)
            resolve(response.data)
            context.state.alert = true
            context.state.isMsg = response.data.msg
          })
          .catch(error => {
            reject(error.response)
            // console.log(error)
          })
      })
    },
    updateProducts(context, payload) {
      console.log(payload.product_id)
      console.log(payload.form)
      return new Promise((resolve, reject) => {
        axios
          .patch(
            `${process.env.VUE_APP_URL}product/${payload.product_id}`,
            payload.form
          )
          .then(response => {
            // console.log(response)
            resolve(response.data)
            context.state.alert = true
            context.state.isMsg = response.data.msg

            // this.get_product() kalo get productnya udh bener
          })
          .catch(error => {
            reject(error.response)
            console.log(error)
          })
      })
    },
    deleteProducts(context, payload) {
      console.log(payload)
      return new Promise((resolve, reject) => {
        axios
          .delete(`${process.env.VUE_APP_URL}product/${payload}`)
          .then(response => {
            console.log(response.data.msg)
            resolve(response.data)
          })
          .catch(error => {
            reject(error.response)
            console.log(error)
          })
      })
    },
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
    },
    checkOutStore(context, payload) {
      axios
        .post(`${process.env.VUE_APP_URL}history/CheckOut`, payload)
        .then(response => {
          context.commit('checkOutMutation', response.data.data)
        })
        .catch(error => {
          console.log(error.response)
        })
    }
  },
  getters: {
    getLimit(state) {
      return state.limit
    },
    getCart(state) {
      return state.cart
    },
    getProduct(state) {
      return state.products
    },
    getTotalData(state) {
      return state.totalData
    },
    getSearch(state) {
      return state.search
    },
    getTotalsCart(state) {
      let total = 0
      state.cart.map(value => (total += value.product_price * value.order_qty))
      return total
    },
    getCount(state) {
      return state.count
    },
    getModalCekot(state) {
      return state.modalCekot
    },
    getInvoice(state) {
      return state.invoice
    },
    getSubtotal(state) {
      return state.subTotal
    }
  }
}
