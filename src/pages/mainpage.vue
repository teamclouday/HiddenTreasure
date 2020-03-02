<template>
  <div>
    <MainTitleBar/>
    <MainContent/>
    <hr>
    <Tail/>
  </div>
</template>

<script>
import MainTitleBar from '../components/maintitlebar.vue'
import MainContent from '../components/maincontent.vue'
import Tail from '../components/tail.vue'

export default {
  name: 'MainPage',
  components: {
    MainTitleBar,
    MainContent,
    Tail
  }
}
</script>

<style>
</style>
