<template>
  <div class="c-container">
    <h4>{{nama}}</h4>
    <p>{{harga}}</p>
    <button type="button" @click="increment()">Add To Cart</button>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: ['nama', 'harga'],
  methods: {
    increment() {
      console.log('Clicked')
      this.$emit('increment', 1)
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
