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
              <th scope="col">User Role</th>
              <th scope="col">User Status</th>
              <th scope="col">Activation</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(value, index) in allUser" :key="index">
              <!-- <th scope="row">1</th> -->
              <td>{{ value.user_id }}</td>
              <td>{{ value.user_email }}</td>
              <td>{{ value.user_name }}</td>
              <td v-if="value.user_role === 1">Admin</td>
              <td v-if="value.user_role !== 1">Cashier</td>
              <td v-if="value.user_status === 1">Active</td>
              <td v-if="value.user_status !== 1">Non Active</td>
              <td>
                <b-dropdown
                  variant="info"
                  size="sm"
                  id="dropdown-1"
                  text="Option"
                  class="m-md-3"
                >
                  <b-dropdown-item @click="activate(value)"
                    >Activate</b-dropdown-item
                  >
                  <b-dropdown-item @click="disabled(value)"
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
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'User',
  data() {
    return {
      // userTable: []
    }
  },
  created() {
    this.getAllUser()
    this.getAllUser()
  },
  computed: {
    ...mapGetters({ allUser: 'getAllUser' })
  },
  methods: {
    ...mapActions(['getAllUser', 'activateAccount']),
    activate(data) {
      const setData = {
        user_email: data.user_email,
        user_name: data.user_name,
        user_role: data.user_role,
        user_status: 1
      }
      this.activateAccount(setData)
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
          console.log(error)
        })
      this.getAllUser()
    },
    disabled(data) {
      const setData = {
        user_email: data.user_email,
        user_name: data.user_name,
        user_role: data.user_role,
        user_status: 0
      }
      this.activateAccount(setData)
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
          console.log(error)
        })
      this.getAllUser()
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montaga&display=swap');

.control {
  /* font-family: Helvetica, 'Numans', sans-serif; */
  color: black;
  font-family: 'Montaga', 'Numans', sans-serif;
  height: 100vh;
  width: 100%;
  text-align: center;
}
</style>
