<template>
    <div>
        <div>
            <h1>Hello, {{userProfile.name}}!</h1>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: "DashBoardContent",
    computed: {
        ...mapState(['userProfile'])
    }
}
</script>

<style scoped>

</style>