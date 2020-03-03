<template>
    <div>
        <vue-headful
          title="Hidden Treasure Dashboard"
        />
        <TitleBar/>
        This is the dashboard
        <Tail/>
    </div>
</template>

<script>
import TitleBar from '../components/titlebar.vue'

import Tail from '../components/tail.vue'

export default {
    name: "DashBoard",
    components: {
        TitleBar,

        Tail
    }
}
</script>

<style scoped>
</style>