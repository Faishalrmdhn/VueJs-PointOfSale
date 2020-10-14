<template>
  <div id="app">
    <!-- <MessageList :messages="messages" /> -->
    <router-view />
  </div>
</template>

<script>
// import MessageList from './components/MessageList'
import { mapActions } from 'vuex'
export default {
  name: 'App',
  // data: () => ({ messages: ['Hey John', 'Howdy Paco'] }),
  // components: {
  //   MessageList
  // },
  methods: {
    ...mapActions(['interceptorRequest', 'interceptorResponse'])
  },
  created() {
    this.interceptorRequest()
    this.interceptorResponse()
  }
}
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
}
</style>
