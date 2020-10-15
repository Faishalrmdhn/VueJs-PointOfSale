<template>
  <b-row>
    <b-col sm="4" v-for="(item, index) in products" :key="index">
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
          <img src="../../assets/cart.png" alt />
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
            <img src="../../assets/update.png" alt />
          </b-button>
        </span>

        <!-- ================================UPDATE============================================ -->
        <b-button
          v-if="user.user_role === 1"
          size="sm"
          variant="outline-danger"
          @click="deleteProduct(item)"
        >
          <img src="../../assets/delete.png" alt />
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
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import formMixins from '../mixins/formMixins'
export default {
  mixins: [formMixins],
  name: 'ProductList',
  data() {
    return {
      url_API: process.env.VUE_APP_URL,
      isUpdate: false
    }
  },
  computed: {
    ...mapGetters({ products: 'getProduct', user: 'getUser' })
  },
  created() {
    this.getProducts()
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
    ...mapMutations(['addToCartStore']),
    handleFile(event) {
      this.form.product_image = event.target.files[0]
      console.log(event.target.files)
    },
    addProduct() {
      const data = new FormData()
      data.append('product_name', this.form.product_name)
      data.append('category_id', this.form.category_id)
      data.append('product_price', this.form.product_price)
      data.append('product_status', this.form.product_status)
      data.append('product_image', this.form.product_image)

      this.addProducts(data)
        .then((response) => {
          console.log(response)
          this.$bvToast.toast(`${response.msg}`, {
            title: 'Status: ',
            variant: 'info',
            solid: true
          })
          this.getProducts()
        })
        .catch((error) => {
          console.log(error)

          this.$bvToast.toast(`${error.msg}`, {
            title: 'Status: ',
            variant: 'danger',
            solid: true
          })
        })
    },
    setProduct(data) {
      console.log(data)
      this.form = {
        product_name: data.product_name,
        product_price: data.product_price,
        product_status: data.product_status,
        category_id: data.category_id,
        product_image: data.product_image
      }
      this.isUpdate = true
      this.product_id = data.product_id
    },
    patchProduct() {
      console.log(this.product_id)
      console.log(this.form)
      this.isUpdate = false
      const data = new FormData()
      data.append('product_name', this.form.product_name)
      data.append('category_id', this.form.category_id)
      data.append('product_price', this.form.product_price)
      data.append('product_status', this.form.product_status)
      data.append('product_image', this.form.product_image)
      const setData = {
        product_id: this.product_id,
        form: data
      }
      this.updateProducts(setData)
        .then((response) => {
          console.log(response)
          this.alert = true
          this.isMsg = response.msg
          setTimeout(() => {
            this.alert = false
          }, 2000)
          this.getProducts()
        })
        .catch((error) => {
          console.log(error)
        })
    },
    deleteProduct(data) {
      // console.log(data)
      this.deleteProducts(data.product_id)
        .then((response) => {
          this.delAlert = true
          this.delMsg = response.msg
          setTimeout(() => {
            this.delAlert = false
          }, 2000)
          this.getProducts()
        })
        .catch((error) => {
          console.log(error)
        })
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
    }
  }
}
</script>

<style scoped>
.c-container {
  height: 200px;
  width: 150px;
  border-radius: 5px;
  border: 1px solid black;
}
</style>
