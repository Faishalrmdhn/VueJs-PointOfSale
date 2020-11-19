<template>
  <b-container fluid>
    <b-row>
      <b-col sm="12">
        <!-- <NavTop /> -->
        <!-- ---wrap icon navbar-->
        <b-row class="text-center container-nav">
          <div class="nav1" v-b-toggle.sidebar-variant>
            <img src="../assets/hamburger.png" alt />
            <b-sidebar
              id="sidebar-variant"
              title
              bg-variant="light"
              text-variant="dark"
              shadow
            >
              <div class="px-3 py-2">
                <img src="../assets/account.png" style="max-width: 50px" alt />
                <h5>{{ user.user_name }}</h5>
                <hr />
                <router-link style="color: black; text-decoration: none" to="/">
                  <div class="side mt-2">
                    <img
                      src="../assets/fork32.png"
                      style="max-width: 50px"
                      alt
                    />
                    Food Items
                  </div>
                </router-link>
                <router-link
                  style="color: black; text-decoration: none"
                  to="/History"
                >
                  <div class="side mt-2">
                    <img
                      src="../assets/clipboard32.png"
                      style="max-width: 50px"
                      alt
                    />History
                  </div>
                </router-link>
                <div
                  v-if="user.user_role === 1"
                  class="side"
                  @click="userPage()"
                >
                  <img
                    src="../assets/control32.png"
                    style="max-width: 50px"
                    alt
                  />
                  User Control
                </div>
                <div class="side" @click="$bvModal.show('modalLogout')">
                  <img
                    src="../assets/logout32.png"
                    style="max-width: 50px"
                    alt
                  />
                  Logout
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
              </div>
            </b-sidebar>
          </div>
          <div class="nav2">History</div>
        </b-row>
        <b-container fluid class="px-0">
          <!-- wrap row-2 start-->
          <b-row class="text-center">
            <!-- wrap Main start -->
            <b-col sm="12" class="mt-3">
              <b-row>
                <!-- wrap Card Start -->
                <b-col sm class="container-card">
                  <div class="rect1">
                    <p>Today's Income</p>
                    <h3>Rp.{{ formatPrice(todayIncome) }}</h3>
                    <p>+2% Yesterday</p>
                    <div class="decor">
                      <img src="../assets/circle.png" class="circle1" />
                      <img src="../assets/circle.png" class="circle2" />
                      <img src="../assets/circle.png" class="circle3" />
                    </div>
                  </div>
                  <div class="rect2">
                    <p>Orders</p>
                    <h3>{{ orders }}</h3>
                    <p>+5% Last Week</p>
                    <div class="decor">
                      <img src="../assets/circle.png" class="circle1" />
                      <img src="../assets/circle.png" class="circle2" />
                      <img src="../assets/circle.png" class="circle3" />
                    </div>
                  </div>
                  <div class="rect3">
                    <p>This Year Income</p>
                    <h4>Rp. {{ formatPrice(yearIncome) }}</h4>
                    <p>+10% Last Year</p>
                    <div class="decor">
                      <img src="../assets/circle.png" class="circle1" />
                      <img src="../assets/circle.png" class="circle2" />
                      <img src="../assets/circle.png" class="circle3" />
                    </div>
                  </div>
                </b-col>
                <!-- wrap Card End -->
              </b-row>
              <!-- Revenue start-->
              <b-row>
                <b-col sm="12" class="mt-5">
                  <div class="revenue">
                    <b-row class="p-4">
                      <b-col cols="6" sm="10" class="text-left">
                        <h3>Revenue</h3>
                      </b-col>
                      <b-col cols="6" sm="2" class="text-center">
                        <b-dropdown variant="info" text="Filter By">
                          <b-dropdown-item @click="getAllHistory()"
                            >Month</b-dropdown-item
                          >
                          <b-dropdown-item @click="getHistoryYear()"
                            >Year</b-dropdown-item
                          >
                        </b-dropdown>
                      </b-col>
                    </b-row>

                    <line-chart
                      v-show="popM"
                      xtitle="Date"
                      ytitle="Total"
                      :data="chartMonth"
                    ></line-chart>
                    <line-chart
                      v-show="popY"
                      xtitle="Month"
                      ytitle="Total"
                      :data="chartYear"
                    ></line-chart>
                  </div>
                </b-col>
              </b-row>
              <!-- Revenue end-->
              <!-- Recent Order start-->
              <b-row class="mt5">
                <b-col xl="12" class="mt-5 table-container">
                  <div class="recent">
                    <b-row class="p-4">
                      <b-col cols="6" sm="10" class="text-left">
                        <h3>Recent Order</h3>
                      </b-col>
                      <b-col cols="6" sm="2" class="text-center">
                        <div>
                          <b-dropdown
                            variant="info"
                            id="dropdown-1"
                            text="Select"
                            class="m-md-2"
                          >
                            <b-dropdown-item>Today</b-dropdown-item>
                            <b-dropdown-item>Yesterday</b-dropdown-item>
                          </b-dropdown>
                        </div>
                      </b-col>
                    </b-row>
                    <div class="table-responsive-md">
                      <table class="table">
                        <thead>
                          <tr>
                            <th scope="col">INVOICE</th>
                            <th scope="col">CASHIER</th>
                            <th scope="col">DATE</th>
                            <th scope="col">ORDERS</th>
                            <th scope="col">Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(value, index) in recent" :key="index">
                            <!-- <th scope="row">1</th> -->
                            <td>#{{ value.invoice }}</td>
                            <td>PEVITA</td>
                            <td>{{ value.history_created_at.slice(0, 10) }}</td>
                            <td>
                              <ul
                                v-for="(value, index) in value.orders"
                                :key="index"
                              >
                                <li>{{ value.product_name }}</li>
                              </ul>
                            </td>
                            <td>{{ value.history_subtotal }}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <!-- <b-row align-h="center">
                      <b-col sm="6">
                        <b-pagination
                          v-model="currentPage"
                          :total-rows="totalData"
                          :per-page="limit"
                          aria-controls="my-table"
                          @change="handlePageChange"
                        ></b-pagination>
                      </b-col>
                    </b-row> -->
                  </div>
                </b-col>
              </b-row>
              <!-- Recent Order end-->
            </b-col>
            <!-- wrap Main end -->
          </b-row>
          <!-- wrap row-2 end-->
        </b-container>
      </b-col>
    </b-row>

    <!-- <b-button @click="recentOrderHistory()">TESTING</b-button> -->
  </b-container>
</template>

<script>
// import NavTop from '../components/_base/navTop'
import axios from 'axios'
import { mapActions, mapGetters, mapMutations } from 'vuex'
export default {
  name: 'history',
  components: {
    // NavTop
  },
  data() {
    return {
      name: 'history',
      url_API: process.env.VUE_APP_URL,
      chartYear: [],
      chartMonth: [],
      popM: true,
      popY: false,
      yearIncome: null
      // todayIncome: 0
    }
  },
  computed: {
    ...mapGetters({
      user: 'getUser',
      recent: 'getOrderData',
      orders: 'getOrders',
      todayIncome: 'getTodayIncome'
    })
  },
  created() {
    this.getAllHistory()
    this.getTotalOrder()
    this.todayIncomeHistory()
    this.yearIncomeHistory()
    this.recentOrderData()
  },
  methods: {
    ...mapActions([
      'logout',
      'allHistory',
      'totalOrder',
      'todayIncomeAction',
      'recentOrderData'
    ]),
    ...mapMutations(['setHistory']),
    userPage() {
      this.$router.push('/user')
    },
    getAllHistory() {
      this.popM = true
      this.popY = false
      this.allHistory()
        .then((response) => {
          console.log(response)
          const month = response.data.pagination.getMonth
          month.map((item) => this.chartMonth.push([item.date, item.subtotal]))
        })
        .catch((error) => {
          console.log(error)
        })
    },
    getHistoryYear() {
      this.popM = false
      this.popY = true

      this.allHistory()
        .then((response) => {
          const year = response.data.pagination.getYear
          year.map((item) => this.chartYear.push([item.month, item.subtotal]))
          console.log(year)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    getTotalOrder() {
      this.totalOrder()
    },
    // ===========================================
    todayIncomeHistory() {
      this.todayIncomeAction()
      // axios
      //   .get(`${this.url_API}history/income/today`)
      //   .then((response) => {
      //     console.log(response.data)
      //     this.todayIncome = response.data.data[0].subtotal
      //   })
      //   .catch((error) => {
      //     console.log(error)
      //   })
    },
    yearIncomeHistory() {
      axios
        .get(`${this.url_API}history/income/year`)
        .then((response) => {
          this.yearIncome = response.data.data[0].subtotal
        })
        .catch((error) => {
          console.log(error)
        })
    },
    formatPrice(value) {
      const val = (value / 1).toFixed(2).replace('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    },
    handlePageChange(numberPage) {
      this.$router.push(`?page=${numberPage}`)
      this.changePage(numberPage)
      this.getProducts()
    }
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
  flex: 11;
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

.container-side {
  width: 100%;
  height: auto;
  display: flex;
  flex-flow: row wrap;
  background: #ffffff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  align-content: flex-start;
}

.side {
  text-align: left;
  font-family: 'Montaga', serif, sans-serif;
  font-size: 15px;
  margin: auto;
  padding: 15px 0px;
  flex: 1;
}

.container-card {
  height: auto;
  display: flex;
  flex-flow: row wrap;
  align-content: center;
  font-family: 'Montaga', serif, sans-serif;
  text-align: left;
}

.rect1 {
  margin: 4px;
  padding: 20px;

  min-width: 200px;
  max-height: 213px;
  flex: 1;
  background: linear-gradient(
    278.29deg,
    #fbb2b4 30.05%,
    rgba(255, 143, 178, 0) 133.19%
  );
  filter: drop-shadow(10px 15px 10px rgba(255, 143, 178, 0.25));
  border-radius: 10px;
}

.rect2 {
  margin: 4px;
  padding: 20px;

  min-width: 200px;
  max-height: 213px;
  flex: 1;
  background: linear-gradient(
    278.29deg,
    #29dfff 30.05%,
    rgba(41, 223, 255, 0) 133.19%
  );
  filter: drop-shadow(10px 15px 10px rgba(41, 223, 255, 0.25));
  border-radius: 10px;
}

.rect3 {
  margin: 4px;
  padding: 20px;

  min-width: 200px;
  max-height: 213px;
  flex: 1;
  background: linear-gradient(
    278.29deg,
    #ab84c8 30.05%,
    rgba(241, 201, 236, 0) 133.19%
  );
  filter: drop-shadow(10px 15px 10px rgba(241, 201, 236, 0.25));
  border-radius: 10px;
}

.decor {
  position: absolute;
  width: 178px;
  height: 141px;
  left: 50%;
  top: 0px;
}

.circle1 {
  width: 75px;
  position: relative;
  top: 30%;
}

.circle2 {
  width: 75px;
  position: relative;
  top: 10%;
  right: 30%;
}

.circle3 {
  width: 75px;
  position: relative;
  top: -5%;
  right: 10%;
}

img {
  width: auto;
}

.revenue {
  min-width: auto;
  height: auto;

  background: #ffffff;
  box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
}

.recent {
  height: 100%;
  background: #ffffff;
  box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
}

table {
  width: 100%;
  height: 100%;
}

/* optional */
/* td,
ul {
  list-style-type: none;
} */
</style>
