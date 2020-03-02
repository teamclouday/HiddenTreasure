<template>
  <div>
    <vue-headful
      title="Hidden Treasure Info"
    />
    <TitleBar/>
    <InfoContent/>
    <Tail/>
  </div>
</template>

<script>
import TitleBar from '../components/titlebar.vue'
import InfoContent from '../components/infocontent.vue'
import Tail from '../components/tail.vue'

export default {
  name: 'InfoPage',
  components: {
    TitleBar,
    InfoContent,
    Tail
  }
}
</script>

<style>
</style>