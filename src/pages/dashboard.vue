<template>
    <div>
        <vue-headful
          title="Hidden Treasure Dashboard"
        />
        <TitleBar/>
        <DashBoardContent/>
        <Tail/>
    </div>
</template>

<script>
import TitleBar from '../components/titlebar.vue'
import DashBoardContent from '../components/dashboardcontent.vue'
import Tail from '../components/tail.vue'

export default {
    name: "DashBoard",
    components: {
        TitleBar,
        DashBoardContent,
        Tail
    }
}
</script>

<style scoped>
</style>