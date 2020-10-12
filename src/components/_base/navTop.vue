<template>
  <b-container fluid>
    <b-row class="container-nav">
      <b-col sm="1">
        <img src="../../assets/hamburger.png" />
      </b-col>
      <b-col sm="6">
        <router-link to="/">Food Items</router-link>
      </b-col>
      <b-col sm="1">
        <img src="../../assets/search.png" />
      </b-col>
      <b-col sm="4" class="text-center container-cart">
        Cart
        <span class="badge">3</span>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: 'navTop'
}
</script>

<style scoped>
.container-nav {
  width: auto;
  height: 100px;
  display: flex;
  flex-flow: row wrap;
  font-size: 30px;
  font-family: 'Airbnb Cereal App Medium', Arial, Helvetica, sans-serif;
  text-align: center;
  background: #ffffff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
}
</style>
