<template>
  <b-row class="text-center container-nav">
    <!-- <div>== {{ todayIncome }} ==</div> -->
    <div class="nav1" v-b-toggle.sidebar-variant>
      <img src="../../assets/hamburger.png" alt />
      <b-sidebar
        id="sidebar-variant"
        title
        bg-variant="light"
        text-variant="dark"
        shadow
      >
        <div class="px-3 py-2">
          <img src="../../assets/account.png" style="max-width: 50px" alt />
          <h5>{{ user.user_name }}</h5>
          <hr />
          <router-link style="color: black; text-decoration: none" to="/">
            <div class="side mt-2">
              <img src="../../assets/fork32.png" style="max-width: 50px" alt />
              Food Items
            </div></router-link
          >
          <router-link
            style="color: black; text-decoration: none"
            to="/History"
          >
            <div class="side mt-2">
              <img
                src="../../assets/clipboard32.png"
                style="max-width: 50px"
                alt
              />
              History
            </div></router-link
          >
          <div class="side mt-2" @click="$bvModal.show('bv-modal-examples')">
            <img src="../../assets/add32.png" style="max-width: 50px" alt />
            Add Item
            <b-modal id="bv-modal-examples" hide-footer style>
              <template v-slot:modal-title>Add Item</template>
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

                <div @click="$bvModal.hide('bv-modal-examples')">
                  <b-button
                    type="submit"
                    class="mt-3"
                    variant="info"
                    block
                    @click="addProduct()"
                    >Add</b-button
                  >
                </div>

                <div>
                  <b-button
                    class="mt-3"
                    variant="secondary"
                    block
                    @click="$bvModal.hide('bv-modal-examples')"
                    >Cancel</b-button
                  >
                </div>
              </b-form>
            </b-modal>
          </div>
          <div v-if="user.user_role === 1" class="side" @click="userPage()">
            <img src="../../assets/control32.png" style="max-width: 50px" alt />
            User Control
          </div>
          <div class="side" @click="$bvModal.show('modalLogout')">
            <img src="../../assets/logout32.png" style="max-width: 50px" alt />
            Logout
          </div>
        </div>
        <b-modal hide-footer hide-header id="modalLogout">
          <template>Are you sure want to logout?</template>
          <b-row class="text-center mt-5"
            ><b-col cols="12" md="6"
              ><b-button @click="logout" block variant="danger"
                >Yes</b-button
              ></b-col
            ><b-col cols="12" md="6"
              ><b-button
                @click="$bvModal.hide('modalLogout')"
                block
                variant="info"
                >No</b-button
              ></b-col
            ></b-row
          ></b-modal
        >
      </b-sidebar>
    </div>
    <div class="nav2">Food Items</div>

    <!-- <div v-show="isSearch" class="nav3 searchIcon" @click="searchProduct()">
      <img src="../../assets/search.png" alt />
    </div> -->
  </b-row>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import formMixins from '../mixins/formMixins'
export default {
  mixins: [formMixins],
  // name: 'NavTop',
  data() {
    return {
      counter: 0
      // todayIncome: 0
    }
  },
  methods: {
    ...mapActions([
      'logout',
      'searchProductStore',
      'addProducts',
      'getProducts'
    ]),
    ...mapMutations(['searchMutation']),
    handleFile() {
      this.form.product_image = event.target.files[0]
      console.log(event.target.files)
    },
    userPage() {
      this.$router.push('/user')
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
            title: 'Info ',
            variant: 'info',
            solid: true
          })
          this.getProducts()
        })
        .catch((error) => {
          console.log(error)
          this.$bvToast.toast(`${error.data.msg}`, {
            title: 'Info ',
            variant: 'danger',
            solid: true
          })
        })
    }
  },
  computed: {
    ...mapGetters({ user: 'getUser' })
  }
}
</script>

<style scoped>
.container-nav {
  width: auto;
  height: 100px;
  display: flex;
  flex-flow: row wrap;
  font-size: 30px;
  font-family: 'Montaga', serif, sans-serif;
  text-align: center;
  background: #ffffff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
}

.nav1 {
  padding: 5px;
  margin: auto;
  flex: 1;
}

.nav2 {
  margin: auto;
  flex: 10;
}

.nav2 a {
  color: black;
  text-decoration: none;
}

.nav2 a:hover {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

.nav3 {
  padding: 5px;
  margin: auto;
  flex: 1;
}

.side {
  text-align: left;
  font-family: 'Montaga', serif, sans-serif;
  font-size: 15px;
  margin: auto;
  padding: 15px 0px;
  flex: 1;
}

.side:hover {
  cursor: pointer;
}

.searchIcon:hover {
  cursor: pointer;
}
</style>
