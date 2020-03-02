<template>
<div>
    <div id="login_background"></div>
    <TitleBar/>
    <LoginForm/>
    <Tail/>
</div>
</template>

<script>
import TitleBar from '../components/titlebar.vue'
import LoginForm from '../components/loginform.vue'
import Tail from '../components/tail.vue'

export default {
    name: "Login",
    components:{
        TitleBar,
        LoginForm,
        Tail
    }
}
</script>

<style scoped>
#login_background {
    background-image: url("https://images.pexels.com/photos/358904/pexels-photo-358904.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260");
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
    filter: blur(5px);
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: -1;
}
</style>