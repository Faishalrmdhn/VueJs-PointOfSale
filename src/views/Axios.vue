<template>
  <div class="axios">
    <!-- <h1>Axios Page</h1> -->
    <navTop />
    <b-container>
      <b-alert :show="alert" class="m-3" variant="success">{{isMsg}}</b-alert>
      <!-- <b-alert :show="delAlert" class="m-3" variant="danger">{{delMsg}}</b-alert> -->
      <form v-on:submit.prevent="addProduct">
        <input type="text" v-model="form.product_name" placeholder="Product Name" />
        <br />
        <input type="text" v-model="form.product_price" placeholder="Product Price" />
        <br />
        <input type="text" v-model="form.product_status" placeholder="Product status" />
        <br />
        <input type="text" v-model="form.category_id" placeholder="Product category id" />
        <br />
        <button type="submit" v-show="!isUpdate">Save</button>
        <button type="button" v-show="isUpdate" @click="patchProduct()">Update</button>
        <button type="button" v-show="isUpdate" @click="deleteProduct()">Delete</button>
      </form>
      <hr />
    </b-container>

    <b-container class="bv-example-row">
      <b-row>
        <b-col cols="4" v-for="(item, index) in products" :key="index">
          <b-card
            v-bind:title="item.product_name"
            img-src="https://picsum.photos/600/300/?image=25"
            img-alt="Image"
            img-top
            tag="article"
            style="max-width: 20rem;"
            class="mb-2"
          >
            <b-card-text>{{item.product_price}}</b-card-text>

            <b-button variant="primary" @click="addToCart(item)">Add To Cart</b-button>
            <b-button variant="success" @click="setProduct(item)">Update</b-button>
            <b-button variant="danger" @click="setProduct(item)">Delete</b-button>
          </b-card>
        </b-col>
      </b-row>
    </b-container>

    <!-- <Card nama="kopi" harga="2000" @increment="incrementCount" />
    <Card nama="susu" harga="3000" />
    <p>{{count}}</p>-->
  </div>
</template>

<script>
import navTop from '../components/_base/navTop'
import axios from 'axios'
// import Card from '../components/_base/Card'
export default {
  name: 'Axios',
  components: {
    // Card
    navTop
  },
  data() {
    return {
      count: 0,
      cart: [],
      page: 1,
      limit: 10,
      products: [],
      form: {
        product_name: '',
        product_price: '',
        product_status: '',
        category_id: ''
      },
      alert: false,
      isMsg: '',
      isUpdate: false,
      product_id: '',
      delAlert: false,
      delMsg: ''
    }
  },
  created() {
    this.get_product()
  },
  methods: {
    incrementCount(data) {
      this.count += data
    },
    addToCart(data) {
      const setCart = {
        product_id: data.product_id,
        qty: 1,
        product_price: data.product_price
      }
      this.cart = [...this.cart, setCart]
      console.log(this.cart)
    },
    get_product() {
      axios
        .get(
          `http://127.0.0.1:3001/product?page=${this.page}&limit=${this.limit}&ascdsc=asc`
        )
        .then((response) => {
          this.products = response.data.data
          console.log(this.products)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    addProduct() {
      console.log(this.form)
      axios
        .post('http://127.0.0.1:3001/product', this.form)
        .then((response) => {
          this.alert = true
          this.isMsg = response.data.msg
          setTimeout(() => {
            this.alert = false
          }, 2000)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    setProduct(data) {
      this.form = {
        product_name: data.product_name,
        product_price: data.product_price,
        product_status: data.product_status,
        category_id: data.category_id
      }
      this.isUpdate = true
      this.product_id = data.product_id
    },
    patchProduct() {
      console.log(this.product_id)
      console.log(this.form)
      this.isUpdate = false
      axios
        .patch(`http://127.0.0.1:3001/product/${this.product_id}`, this.form)
        .then((response) => {
          this.alert = true
          this.isMsg = response.data.msg
          setTimeout(() => {
            this.alert = false
          }, 2000)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    deleteProduct(data) {
      // this.product_id = data.product_id
      console.log(this.product_id)
      axios
        .delete(`http://127.0.0.1:3001/product/${this.product_id}`)
        .then((response) => {
          this.delAlert = true
          this.delMsg = response.data.msg
          setTimeout(() => {
            this.delAlert = false
          }, 2000)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>
