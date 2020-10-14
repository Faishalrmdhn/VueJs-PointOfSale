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
        .then((response) => {
          this.userTable = response.data.data
        })
        .catch((error) => {
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
</style>
