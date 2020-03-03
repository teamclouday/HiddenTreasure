<template>
<form class="login" style="z-index: 5; position: relative;" method="post">
    <center style="color: rgb(92, 55, 255);"><h3>Manage Your Account</h3></center>
    <label for="ename"><b>Email</b></label>
    <input v-model.trim="loginForm.email" type="email" placeholder="Enter Your Email" name="ename" required>
    <label for="psw" id="password" v-on:click="togglePassword()"><b>Password</b></label>
    <input v-model.trim="loginForm.password" type="password" placeholder="Enter Password" name="psw" required>
    <a id="forget">Forget Your Password?</a>
    <button type="submit" @click="login">Log In</button>
</form>
</template>

<script>
var $ = require('jquery')
const fb = require('../firebaseConfig')

export default {
    name: "LoginForm",
    data(){
        return{
            loginForm:{
                email: '',
                password: ''
            }
        }
    },
    methods:{
        login: function()
        {
            this.performingRequest = true
            fb.auth.signInWithEmailAndPassword(this.loginForm.email, this.loginForm.password).then(user=>{
                this.$store.commit('setCurrentUser', user)
                this.$store.dispatch('fetchUserProfile')
                this.performingRequest = false
                this.$router.push('/dashboard')
            }).catch(err => {
                console.log(err)
                this.performingRequest = false
            })
        },
        togglePassword: function()
        {
            if($('input[name="psw"]').prop('type') == 'password')
            {
                $('input[name="psw"]').attr('type', 'text')
            }
            else
            {
                $('input[name="psw"]').attr('type', 'password')
            }
        }
    }
}

</script>

<style scoped>
.login
{
    border-style: groove;
    border-radius: 10px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 20px;
    margin-bottom: 20px;
    width: 500px;
    height: 700px;
    background-color: antiquewhite;

    font-family: Arial, Helvetica, sans-serif;
    font-size: 25px;
}
.login label{
    display: block;
    position: relative;
    margin-top: 50px;
    margin-left: auto;
    margin-right: auto;
    width: 55%;
    text-align: center;
    font-size: 20px;
}
.login input{
    display: block;
    position: relative;
    margin-top: 20px;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    width: 55%;
    height: 40px;
    font-size: 25px;
    border-style: none;
    border-radius: 10px;
    outline: none;
}
.login button{
    display: block;
    position: relative;
    margin-left: auto;
    margin-right: auto;
    margin-top: 80px;
    color: rgb(255, 255, 255);
    border-style: none;
    border-color: black;
    border-width: 3px;
    border-radius: 5px;
    background-color: #509e2f;
    width: 55%;
    height: 50px;
    font-size: 20px;
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
    font-weight: bold;
    outline: none;
    cursor: pointer;
}
.login button:hover{
    background-color: #203d13;
}
.login #forget
{
    display: block;
    position: relative;
    margin-left: auto;
    margin-right: auto;
    width: 55%;
    height: 30px;
    text-align: right;
    margin-top: 10px;
    font-size: 15px;
    cursor: pointer;
    color: rgb(67, 133, 2);
    font-weight: bold;
}
.login #forget:hover{
    color: rgb(133, 28, 2);
}
</style>