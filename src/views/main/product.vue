<template>
  <div class="pageProduct">
    <h1>Page Product</h1>
    <hr />
    <div class="addProduct">
      <h3>Add Product</h3>
      <b-form v-on:submit.prevent>
        <b-input v-model="form.product_name" type="text" placeholder="Product Name..."></b-input>
        <br />
        <b-input v-model="form.product_price" type="text" placeholder="Product Price..."></b-input>
        <br />
        <b-input v-model="form.category_id" type="text" placeholder="Product Category Id..."></b-input>
        <br />
        <b-input type="text" v-model="form.product_status" placeholder="Product Status..."></b-input>
        <input type="file" @change="handleFile" />
        <b-button @click.prevent="postProduct()">Submit</b-button>
        <!-- <b-button>Update</b-button> -->
      </b-form>
    </div>
    <hr />
    <!-- <div class="patchProduct">
      <form action>
        <input v-model="form.product_name" type="text" placeholder="Product Name..." />
        <br />
        <input v-model="form.product_price" type="text" placeholder="Product Price..." />
        <br />
        <input v-model="form.category_id" type="text" placeholder="Product Category Id..." />
        <br />
        <input type="text" v-model="form.product_status" placeholder="Product Status..." />
        <input type="file" @change="handleFile" />
        <button @click.prevent="postProduct()">Submit</button>
      </form>
    </div>-->
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Product',
  data() {
    return {
      form: {
        product_name: '',
        category_id: '',
        product_price: '',
        product_status: '',
        product_image: {}
      }
    }
  },
  methods: {
    ...mapActions(['addProducts']),
    handleFile(event) {
      this.form.product_image = event.target.files[0]
      console.log(event.target.files)
    },
    postProduct() {
      //   console.log(this.form)
      const data = new FormData()
      data.append('product_name', this.form.product_name)
      data.append('category_id', this.form.category_id)
      data.append('product_price', this.form.product_price)
      data.append('product_status', this.form.product_status)
      data.append('product_image', this.form.product_image)

      this.addProducts(data)
    }
  }
}
</script>
