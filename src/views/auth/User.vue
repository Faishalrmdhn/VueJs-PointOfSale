<template>
  <b-row class="text-center control mx-0" align-v="center">
    <b-col>
      <div class="table-responsive-md">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">User Id</th>
              <th scope="col">User Email</th>
              <th scope="col">User Name</th>
              <th scope="col">user Role</th>
              <th scope="col">User Status</th>
              <th scope="col">Activation</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(value, index) in userTable" :key="index">
              <!-- <th scope="row">1</th> -->
              <td>{{ value.user_id }}</td>
              <td>{{ value.user_email }}</td>
              <td>{{ value.user_name }}</td>
              <td>{{ value.user_role }}</td>
              <td>{{ value.user_status }}</td>
              <td>
                <b-dropdown
                  variant="info"
                  size="sm"
                  id="dropdown-1"
                  text="Option"
                  class="m-md-3"
                >
                  <b-dropdown-item @click="activate()"
                    >Activate</b-dropdown-item
                  >
                  <b-dropdown-item @click="disabled()"
                    >Disable</b-dropdown-item
                  ></b-dropdown
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div></b-col
    >
  </b-row>

  <!-- <b-row align-v="center" align-h="center" class="container mx-0">
    <b-col sm="6" class="card">
      <b-row align-v="center" class="content-left"></b-row>
      <b-col>
        <h3>ELCAPP</h3>
        <p>Online Food Cashier Application</p></b-col
      >
      <b-form>
        Email
        <b-input
          type="email"
          v-model="form.user_email"
          placeholder="Input email"
        />User Name
        <b-input
          type="text"
          v-model="form.user_name"
          placeholder="Input name"
        />User Status
        <b-input
          type="number"
          v-model="form.user_status"
          placeholder="Input user status"
        />User Password
        <b-input
          type="password"
          v-model="form.user_password"
          placeholder="Input user password"
        />User Role
        <b-input
          type="number"
          v-model="form.user_role"
          placeholder="Input user role"
        />
        <b-button pill variant="outline-info" type="submit">Submit</b-button>
      </b-form>
    </b-col>
  </b-row> -->
</template>

<script>
import axios from 'axios'
// import { mapActions } from 'vuex'
export default {
  name: 'User',
  data() {
    return {
      userTable: []
    }
  },
  created() {
    this.getAllUser()
  },
  methods: {
    activate() {},
    disabled() {},
    // ...mapActions([''])
    getAllUser() {
      axios
        .get('http://127.0.0.1:3001/users')
        .then(response => {
          this.userTable = response.data.data
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montaga&display=swap');

.control {
  /* font-family: Helvetica, 'Numans', sans-serif; */
  color: white;
  font-family: 'Montaga', 'Numans', sans-serif;

  height: 100vh;
  width: 100%;
  text-align: center;
}

.card {
  /* height: 370px; */
  background-color: transparent;
  /* color: teal; */
  /* width: 400px; */
}

.regist:hover {
  cursor: pointer;
  color: rgb(87, 199, 187);
}

.regist {
  color: rgb(117, 115, 115);
}

.left {
  height: 100%;
  width: 100%;
  background-color: rgb(87, 199, 187);
}

.right {
  /* color: aqua; */
  height: 100%;
  width: 100%;
  background-color: rgb(47, 64, 84);
}

.content-left {
  height: 100%;
}

.content-right {
  height: 100%;
}
</style>
