<template>
  <div id="app">
    <Header></Header>
    <router-view></router-view>
    <Footer v-show="$route.meta.footerShow"></Footer>
  </div>
</template>
<script>
import Header from '@/components/Header';
import Footer from '@/components/Footer'
export default {
  components: {
    Header,
    Footer,
  },
  mounted() {
    this.$store.dispatch('TypeNavList')
  }
}
</script>

<style>

</style>
