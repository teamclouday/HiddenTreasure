<template>
    <div>
        <vue-headful
            title="404"
        />
        <div class="page" @click="goHome">Error 404: Page NotFound</div>
    </div>
</template>

<script>
export default {
    methods:{
        goHome: function()
        {
            this.$router.push('/')
        }
    }
}
</script>

<style scoped>
.page
{
    position: absolute;
    font-size: 50px;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    width: 600px;
    top: 50%;
    left: 50%;
    margin-top: -80px;
    margin-left: -300px;
    text-align: center;
    background-color: rgb(255, 226, 209);
    border-radius: 10px;
    cursor: pointer;
}
</style>