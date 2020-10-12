<template>
  <div class="container-logout">
    <a class="logout" @click="handleLogout">Logout</a>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Navbar',
  methods: {
    ...mapActions({ handleLogout: 'logout' })
    // handleLogout() {
    //   console.log('logout clicked')
    // }
  }
}
</script>

<style scoped>
.logout {
  cursor: pointer;
  position: sticky;
  right: 100px;
}
.container-logout {
  text-align: right;
}
</style>
