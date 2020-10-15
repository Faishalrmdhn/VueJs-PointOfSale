<template>
  <div class="home">
    <!-- <Navbar /> -->
    <!-- <navTop /> -->
    <b-container fluid>
      <b-alert :show="alert" class="m-3" variant="success">{{ isMsg }}</b-alert>
      <b-alert :show="delAlert" class="m-3" variant="danger">
        {{ delMsg }}
      </b-alert>

      <b-row>
        <b-col sm="8">
          <NavTop />

          <b-container fluid class="px-0">
            <!-- wrap baris ke-2 -->
            <b-row
              class="text-center"
              style="background: rgba(190, 195, 202, 0.3)"
            >
              <b-col cols="12" sm="12">
                <b-row align-v="center" class="container-sort">
                  <b-col cols="3" class="text-left pr-0">
                    <b-form v-on:submit.prevent="searchProducts()">
                      <input
                        v-model="search"
                        type="search"
                        placeholder="Search Item"
                      />
                    </b-form>
                  </b-col>
                  <b-col cols="4" class="text-left pl-0">
                    <b-dropdown
                      variant="info"
                      size="sm"
                      id="dropdown-1"
                      text="Sort By"
                      class="m-md-3"
                    >
                      <b-dropdown-item @click="sortByNameAsc()"
                        >Name | A-Z</b-dropdown-item
                      >
                      <b-dropdown-item @click="sortByNameDesc()"
                        >Name | Z-A</b-dropdown-item
                      >
                      <b-dropdown-item @click="sortByLowPrice()"
                        >Low Price</b-dropdown-item
                      >
                      <b-dropdown-item @click="sortByHighPrice()"
                        >High Price</b-dropdown-item
                      >
                      <b-dropdown-item @click="sortByCategory()"
                        >Category</b-dropdown-item
                      >
                    </b-dropdown>
                  </b-col>
                </b-row>
                <!-- <b-container class="mt-2"> -->
                <!-- ======================================================================================================= -->
                <b-container fluid>
                  <b-row>
                    <b-col
                      sm="4"
                      v-for="(item, index) in products"
                      :key="index"
                    >
                      <b-card
                        style="font-family: 'Montaga', serif, sans-serif"
                        v-bind:title="item.product_name"
                        :img-src="url_API + item.product_image"
                        img-alt="Image"
                        title-tag="h5"
                        img-top
                        img-height="185"
                        tag="article"
                        class="mb-2"
                      >
                        <!-- pakai div dan style utk selected -->
                        <!-- <p v-if="checkCart(item)">
                        <img src="../assets/tick.png" alt />
                        </p>-->
                        <!-- pakai div dan style utk selected -->
                        <b-card-text>Rp.{{ item.product_price }}</b-card-text>

                        <b-button
                          size="sm"
                          variant="outline-info"
                          @click="addToCart(item)"
                          class="mr-3"
                        >
                          <img src="../assets/cart.png" alt />
                        </b-button>

                        <!-- ================================UPDATE============================================ -->
                        <span @click="$bvModal.show('bv-modal-update')">
                          <b-button
                            class="mr-3"
                            v-if="user.user_role === 1"
                            size="sm"
                            variant="outline-warning"
                            id="show-btn"
                            @click="setProduct(item)"
                          >
                            <img src="../assets/update.png" alt />
                          </b-button>
                        </span>

                        <!-- ================================UPDATE============================================ -->
                        <b-button
                          v-if="user.user_role === 1"
                          size="sm"
                          variant="outline-danger"
                          @click="deleteProduct(item)"
                        >
                          <img src="../assets/delete.png" alt />
                        </b-button>
                      </b-card>
                    </b-col>
                    <b-modal id="bv-modal-update" hide-footer style>
                      <template v-slot:modal-title>Update Item</template>
                      <b-form v-on:submit.prevent>
                        <b-input
                          type="text"
                          v-model="form.product_name"
                          placeholder="Product Name"
                        />
                        <br />
                        <b-input
                          type="number"
                          v-model="form.product_price"
                          placeholder="Product Price"
                        />
                        <br />
                        <b-input
                          type="number"
                          v-model="form.product_status"
                          placeholder="Product status"
                        />
                        <br />
                        <b-input
                          type="number"
                          v-model="form.category_id"
                          placeholder="Product category id"
                        />
                        <br />

                        <input type="file" @change="handleFile" />
                        <br />

                        <div @click="$bvModal.hide('bv-modal-update')">
                          <b-button
                            type="button"
                            class="mt-3"
                            variant="info"
                            block
                            @click="patchProduct()"
                            v-show="isUpdate"
                            >Update</b-button
                          >
                        </div>
                        <div>
                          <b-button
                            class="mt-3"
                            variant="secondary"
                            block
                            @click="$bvModal.hide('bv-modal-update')"
                            >Cancel</b-button
                          >
                        </div>
                      </b-form>
                    </b-modal>
                  </b-row>
                </b-container>
                <!-- ======================================================================================================= -->
                <!-- ==============================PAGINATION STARTS================================== -->
                <b-row align-h="center">
                  <b-col sm="6">
                    <b-pagination
                      v-model="currentPage"
                      :total-rows="totalData"
                      :per-page="limit"
                      aria-controls="my-table"
                      @change="handlePageChange"
                    ></b-pagination>
                  </b-col>
                </b-row>
                <!-- ==============================PAGINATION ENDS================================== -->
                <!-- </b-container> -->
              </b-col>
              <!-- wrap item ends-->
            </b-row>
          </b-container>
        </b-col>
        <!-- ====================================CART STARTS================================================= -->
        <b-col sm="4">
          <b-row class="text-center container-cart">
            <b-col sm class="m-auto">
              <div>
                Cart
                <span class="badge">{{ count }}</span>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm class="text-center">
              <div v-show="isAdded">
                <img src="../assets/food.png" alt />
                <div class="desc">
                  <h3>Your cart is empty</h3>
                  <p>Please add some item from the menu</p>
                </div>
              </div>
              <!-- =========================COLUMN ADDTOCART START============================ -->
              <b-container v-show="!isAdded" class="mt-2">
                <div v-for="(value, index) in cart" :key="index">
                  <b-row class="m-2 modals">
                    <b-col sm="4">
                      <img
                        :src="url_API + value.product_image"
                        alt
                        style="width: 100%"
                      />
                    </b-col>
                    <b-col sm="4">
                      <b-row>{{ value.product_name }}</b-row>
                      <b-row>
                        <b-input-group>
                          <b-input-group-prepend>
                            <b-button
                              size="sm"
                              variant="outline-success"
                              @click="decrementCart(value)"
                              >-</b-button
                            >
                          </b-input-group-prepend>

                          <b-form-input
                            size="md"
                            type="text"
                            :value="value.order_qty"
                          ></b-form-input>

                          <b-input-group-append>
                            <b-button
                              size="sm"
                              variant="outline-success"
                              @click="incrementCart(value)"
                              >+</b-button
                            >
                          </b-input-group-append>
                        </b-input-group>
                      </b-row>
                    </b-col>
                    <b-col sm="4"
                      >Rp.{{ value.product_price * value.order_qty }}</b-col
                    >
                  </b-row>
                  <!-- <b-row class="m-5">
                  <h3>total :{{value.totalPrice}}</h3>
                  </b-row>-->
                </div>
                <b-row class="modals">
                  <b-col class="text-left">Total:</b-col>
                  <b-col>Rp.{{ totals }}</b-col>
                </b-row>
                <b-row>
                  <b-col class="text-left" style="font-size: 13px"
                    >*Belum termasuk ppn</b-col
                  >
                </b-row>

                <!-- ==============================================CHECKOUT MODAL STARTS======================================== -->
                <b-row
                  id="show-btn"
                  @click="$bvModal.show('checkOutModals')"
                  class="mb-2"
                >
                  <b-button block @click="checkOut()" variant="info"
                    >Checkout</b-button
                  >

                  <b-modal id="checkOutModals" hide-footer class="m-auto">
                    <template v-slot:modal-title>CheckOut</template>
                    <div>
                      <b-row class="mb-3">
                        <b-col class="text-left"
                          >Cashier : {{ user.user_name }}</b-col
                        >
                        <b-col class="text-right"
                          >Receipt no: #{{ invoice }}</b-col
                        >
                      </b-row>
                    </div>
                    <div
                      class="d block text-center modals"
                      v-for="(value, index) in modalCekot"
                      :key="index"
                    >
                      <b-row class="mb-2">
                        <b-col class="text-left">
                          {{ value.product_name }}
                          {{ value.order_qty }}x
                        </b-col>
                        <b-col class="text-right"
                          >Rp.{{ value.order_qty * value.product_price }}</b-col
                        >
                      </b-row>
                    </div>

                    <b-row>
                      <b-col class="text-right modals"
                        >Total + ppn 10%: Rp.{{ subTotal }}</b-col
                      >
                    </b-row>
                    <div class="modals">Payment : Cash</div>
                    <b-row>
                      <b-col @click="$bvModal.hide('checkOutModals')">
                        <b-button
                          class="mt-3"
                          variant="info"
                          block
                          @click="downloadPDF()"
                          >Print</b-button
                        >
                      </b-col>
                    </b-row>

                    <div class="text-center">Or</div>
                    <b-row>
                      <b-col @click="cancel()">
                        <b-button block variant="warning">Sent Email</b-button>
                      </b-col>
                    </b-row>
                  </b-modal>
                </b-row>
                <!-- ==============================================CHECKOUT MODAL ENDS========================================== -->

                <b-row>
                  <b-button variant="warning" block @click="cancel()"
                    >Cancel</b-button
                  >
                </b-row>
              </b-container>
              <!-- =========================COLUMN ADDTOCART END============================ -->
            </b-col>
          </b-row>
        </b-col>
        <!-- ====================================CART ENDS================================================= -->
      </b-row>
    </b-container>
    <b-form v-on:submit.prevent="checkOut">
      <b-input></b-input>
      <b-input></b-input>
    </b-form>
  </div>
</template>

<script>
// import Navbar from '../components/_base/Navbar'
// import ProductList from '../components/_base/ProductList'
import NavTop from '../components/_base/navTop'
import JsPDF from 'jspdf'
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'
import axios from 'axios'

export default {
  name: 'Home',
  components: {
    // Navbar,
    NavTop
    // ProductList
  },
  data() {
    return {
      url_API: process.env.VUE_APP_URL,
      // count: 0,
      invoice: 0,
      // cart: [],
      form: {
        product_name: '',
        product_price: '',
        product_status: '',
        category_id: '',
        product_image: {}
      },
      search: '',
      alert: false,
      isMsg: '',
      isUpdate: false,
      product_id: '',
      delAlert: false,
      delMsg: '',
      isAdded: true,
      isSearch: true,
      currentPage: 1,
      subTotal: 0,
      modalCekot: {}
    }
  },
  computed: {
    ...mapState(['count']),
    ...mapGetters({
      products: 'getProduct',
      limit: 'getLimit',
      totalData: 'getTotalData',
      cart: 'getCart',
      totals: 'getTotalsCart',
      count: 'getCount',
      user: 'getUser'
    })
  },
  created() {
    this.getProducts()
  },
  updated() {
    console.log(`page : ${this.$route.query.page}`)
    console.log(`sort by : ${this.$route.query.sort}`)
    console.log(`limit : ${this.$route.query.limit}`)
    console.log(`search : ${this.$route.query.name}`)
    // this.get_product()
  },
  methods: {
    ...mapActions([
      'addProducts',
      'updateProducts',
      'deleteProducts',
      'getProducts',
      'searchProductStore'
      // 'checkOutStore'
    ]),
    ...mapMutations([
      'changePage',
      'searchMutation',
      'sortProduct',
      'addToCartStore',
      'incrementCart',
      'decrementCountStore',
      'ascdscProduct',
      'resetCount'
    ]),

    sortByNameAsc() {
      // this.$router.push(
      //   `?sort=product_name&page=${this.page}&limit=${this.limit}&ascdsc=asc`
      // )
      this.ascdscProduct('asc')
      this.sortProduct('product_name')
      this.getProducts()
    },
    sortByNameDesc() {
      // this.$router.push(
      //   `?sort=product_name&page=${this.page}&limit=${this.limit}&ascdsc=asc`
      // )
      this.ascdscProduct('desc')
      this.sortProduct('product_name')
      this.getProducts()
    },
    sortByLowPrice() {
      // this.$router.push(
      //   `?sort=product_price&page=${this.page}&limit=${this.limit}&ascdsc=asc`
      // )
      this.ascdscProduct('asc')
      this.sortProduct('product_price')
      this.getProducts()
    },
    sortByHighPrice() {
      // this.$router.push(
      //   `?sort=product_price&page=${this.page}&limit=${this.limit}&ascdsc=asc`
      // )
      this.ascdscProduct('desc')
      this.sortProduct('product_price')
      this.getProducts()
    },
    sortByCategory() {
      this.sortProduct('category_id')
      this.getProducts()
    },
    ppn() {
      let tax = 0
      this.cart.map((value) => {
        tax += value.product_price * value.order_qty
        tax = tax * 0.1
      })
      return tax
    },
    handlePageChange(numberPage) {
      this.$router.push(`?page=${numberPage}`)
      this.changePage(numberPage)
      // this.page = numberPage
      this.getProducts()
    },

    cancel() {
      this.isAdded = true
      this.cart.length = 0
      this.resetCount()
    },
    decrementCart(data) {
      const decrementData = this.cart.find(
        (value) => value.product_id === data.product_id
      )
      decrementData.order_qty -= 1
      if (decrementData.order_qty <= 0) {
        this.isAdded = true
      } else {
        this.isAdded = false
      }
      this.decrementCountStore()
    },
    addToCart(data) {
      this.isAdded = false
      this.addToCartStore(data)
      //  // console.log(data)
      // this.isAdded = false
      // const setCart = {
      //   product_id: data.product_id,
      //   product_name: data.product_name,
      //   order_qty: 1,
      //   product_price: data.product_price,
      //   totalPrice: data.product_price
      // }
      // this.count += 1
      // this.cart = [...this.cart, setCart]
    },
    checkCart(data) {
      return this.cart.some((item) => item.product_id === data.product_id)
    },

    searchProduct() {
      this.isSearch = false
    },
    searchProducts() {
      // this.$router.push(`?name=${this.search}&limit=${this.limit}`)
      console.log(this.search)
      this.searchMutation(this.search)
      this.searchProductStore()
      if (this.search.length < 1) {
        this.isSearch = true
      }
    },

    handleFile(event) {
      this.form.product_image = event.target.files[0]
      console.log(event.target.files)
    },
    // addProduct() {
    //   const data = new FormData()
    //   data.append('product_name', this.form.product_name)
    //   data.append('category_id', this.form.category_id)
    //   data.append('product_price', this.form.product_price)
    //   data.append('product_status', this.form.product_status)
    //   data.append('product_image', this.form.product_image)

    //   this.addProducts(data)
    //     .then((response) => {
    //       console.log(response)
    //       this.alert = true
    //       this.isMsg = response.msg
    //       setTimeout(() => {
    //         this.alert = false
    //       }, 2000)
    //       this.getProducts()
    //     })
    //     .catch((error) => {
    //       console.log(error)
    //     })
    // },
    checkOut() {
      console.log(this.url_API)
      // this.$router.push('?checkout')
      const setCart = {
        history: [...this.cart]
      }
      // this.checkOutStore()
      axios
        .post(`${this.url_API}history/CheckOut`, setCart)
        .then((response) => {
          this.modalCekot = response.data.data.orders
          this.invoice = response.data.data.invoice
          this.subTotal = response.data.data.subtotal
          console.log(this.modalCekot)
          console.log(this.invoice)
          console.log(this.subTotal)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    // setProduct(data) {
    //   console.log(data)
    //   this.form = {
    //     product_name: data.product_name,
    //     product_price: data.product_price,
    //     product_status: data.product_status,
    //     category_id: data.category_id,
    //     product_image: data.product_image
    //   }
    //   this.isUpdate = true
    //   this.product_id = data.product_id
    // },
    // patchProduct() {
    //   console.log(this.product_id)
    //   console.log(this.form)
    //   this.isUpdate = false
    //   const data = new FormData()
    //   data.append('product_name', this.form.product_name)
    //   data.append('category_id', this.form.category_id)
    //   data.append('product_price', this.form.product_price)
    //   data.append('product_status', this.form.product_status)
    //   data.append('product_image', this.form.product_image)
    //   const setData = {
    //     product_id: this.product_id,
    //     form: data
    //   }
    //   this.updateProducts(setData)
    //     .then((response) => {
    //       console.log(response)
    //       this.alert = true
    //       this.isMsg = response.msg
    //       setTimeout(() => {
    //         this.alert = false
    //       }, 2000)
    //       this.getProducts()
    //     })
    //     .catch((error) => {
    //       console.log(error)
    //     })
    // },
    // deleteProduct(data) {
    //   // console.log(data)
    //   this.deleteProducts(data.product_id)
    //     .then((response) => {
    //       this.delAlert = true
    //       this.delMsg = response.msg
    //       setTimeout(() => {
    //         this.delAlert = false
    //       }, 2000)
    //       this.getProducts()
    //     })
    //     .catch((error) => {
    //       console.log(error)
    //     })
    // },
    downloadPDF() {
      const doc = new JsPDF()
      doc.setFontSize(14)
      doc.text(
        `   Check Out Print
      Date : ${new Date()}
      ---------------------------------------------------
      Cashier : Rp. ${this.user.user_name}
      Invoice no. #${this.invoice}

      ${this.modalCekot.product_name} ${this.modalCekot.order_qty}x
      Total Price : Rp. ${
        this.modalCekot.order_qty * this.modalCekot.product_price
      }
      Total + ppn 10% : Rp. ${this.subtotal}
      Payment : Cash
      ---------------------------------------------------
      Thank you ! `,
        15,
        15
      )

      doc.save('pdf.pdf')
    }
  }
}
</script>

<style scoped>
* {
  box-sizing: border-box;
}
@import url('https://fonts.googleapis.com/css2?family=Montaga&display=swap');

.home {
  text-align: center;
}

.container-sort {
  margin-top: 8px;
  color: black;
  width: auto;
  height: auto;
  /* background: rgb(35, 162, 77); */
  font-size: 18px;
}

.modals {
  font-weight: bold;
  font-family: 'Montaga', serif, sans-serif;
}

.container-cart {
  font-family: 'Montaga', serif, sans-serif;
  width: auto;
  height: 100px;
  font-size: 25px;
  background: #ffffff;
  box-shadow: 0px 4px 2px rgba(0, 0, 0, 0.25);
}

.badge {
  color: white;
  background-color: rgb(87, 199, 187);
}

.container-side {
  width: 100%;
  height: auto;
  display: flex;
  flex-flow: row wrap;
  background: #ffffff;
  box-shadow: 0px 4px -5px rgba(0, 0, 0, 0.25);
  align-content: flex-start;
}

.container-item {
  font-family: 'Montaga', serif, sans-serif;
  height: auto;
  display: flex;
  flex-flow: row wrap;
  align-content: center;
}

img {
  width: auto;
}

.desc {
  font-family: 'Montaga', serif, sans-serif;
}

.desc p {
  color: #cecece;
}

input {
  border: 1px solid transparent;
}

input::placeholder {
  font-size: 14px;
}
</style>
