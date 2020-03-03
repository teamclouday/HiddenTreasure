<template>
<form class="login" style="z-index: 5; position: relative;" name="signup" @submit.prevent>
    <transition name="fade">
        <div v-if="performingRequest" class="loading"></div>
    </transition>
    <div v-bind:style="performingRequest ? 'filter: blur(5px);' : 'filter: none;'" >
        <center style="color: rgb(92, 55, 255);"><h3>Sign Up Your Account</h3></center>
        <label for="name"><b>Name</b></label>
        <input v-model.trim="signupForm.name" type="text" placeholder="Enter Your Name" name="name" required>
        <label for="uname"><b>Email</b></label>
        <input v-model.trim="signupForm.email" type="email" placeholder="Enter Your Email" name="ename" required>
        <label for="psw" id="password" v-on:click="togglePassword()"><b>Password</b></label>
        <input v-model.trim="signupForm.password" type="password" placeholder="Enter Password" name="psw" required>
        <!-- <label for="sec"><b>Security Question</b></label>
        <select v-model.trim="signupForm.sec_option" id="security" name="sec_option">
            <option value="name">Your Best Friend's Name</option>
            <option value="pet">Your Pet's Name</option>
            <option value="drive">Last 5 digit of Driver's Liscense</option>
            <option value="town">Town/City that Your Parents Meet</option>
        </select>
        <input v-model.trim="signupForm.sec" type="text" placeholder="Enter Your Answer" name="sec" required> -->
        <!-- <a id="forget">Forget Your Password?</a> -->
        
        <button id="signupBtn" @click="signup" disabled>Sign Up</button>
        <div id="agree">
            <input type="checkbox" name="agree" value="agree" id="signupAgree">
            <label for="agree">Click if you agree with <router-link type="button" to="/info#info_terms">Term of Privacy</router-link></label>
        </div>
    </div>
</form>
</template>

<script>
// import axios from 'axios'
var $ = require('jquery')
const fb = require('../firebaseConfig')

export default {
    name: "SignupForm",
    data(){
        return{
            signupForm:{
                email: '',
                password: '',
                name: ''
            }
        }
    },
    beforeCreate: function(){
        this.performingRequest = false
    },
    methods:{
        signup: function()
        {
            this.performingRequest = true
            fb.auth.createUserWithEmailAndPassword(this.signupForm.email, this.signupForm.password).then(user=>{
                this.$store.commit('setCurrentUser', user.user)
                fb.usersCollection.doc(user.user.uid).set({
                    name: this.signupForm.name
                }).then(() => {
                    this.$store.dispatch('fetchUserProfile')
                    this.performingRequest = false
                    this.$router.push('/dashboard')
                }).catch(err => {
                    console.log(err)
                    this.performingRequest = false
                })
            }).catch(err => {
                console.log(err)
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

// set event listener for checkbox
$(document).on('change', 'input[name="agree"]', function(){
    if(this.checked){
        $('#signupBtn').prop('disabled', false)
    }
    else{
        $('#signupBtn').prop('disabled', true)
    }
})

$(document).on("mouseenter mouseleave", "#password", function(e){
    if(e.type == "mouseenter")
    {
        if($('input[name="psw"]').prop('type') == 'password')
        {
            $('#password').html("<b>Show Password</b>")
        }
        else
        {
            $('#password').html("<b>Hide Password</b>")
        }
    }
    else
    {
        $('#password').html("<b>Password</b>")
    }
})

// $(document).ready(function(){
//     $('#password').hover(function(){
//         console.log('ready')
//         if($('input[name="psw"]').prop('type') == 'password')
//         {
//             $('#password').html("<b>Show Password</b>")
//         }
//         else
//         {
//             $('#password').html("<b>Hide Password</b>")
//         }
//     },
//     function(){
//         $('#password').html("<b>Password</b>")
//     })

//     $('#password').click(function(){
//         if($('input[name="psw"]').prop('type') == 'password')
//         {
//             $('input[name="psw"]').attr('type', 'text')
//         }
//         else
//         {
//             $('input[name="psw"]').attr('type', 'password')
//         }
//     })
// })

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
#signupBtn{
    display: block;
    position: relative;
    margin-left: auto;
    margin-right: auto;
    margin-top: 60px;
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
#signupBtn:hover{
    background-color: #203d13;
}
#signupBtn:disabled{
    background-color: #203d13;
    cursor: default;
}
.login #security{
    display: block;
    position: relative;
    margin-left: auto;
    margin-right: auto;
    margin-top: 10px;
    width: 55%;
    height: 30px;
    font-size: 15px;
    border-radius: 5px;
    font-family: Arial, Helvetica, sans-serif;
}
.login #agree{
    display: block;
    position: relative;
    margin-left: auto;
    margin-right: auto;
    margin-top: 20px;
    height: 30px;
    width: 55%;
}
.login #agree input{
    position: absolute;
    height: 20px;
    margin:0;
    width: 40%;
    top: 5px;
    cursor: pointer;
    z-index: 4;
}
.login #agree label{
    position: absolute;
    margin: 0;
    top: 8px;
    text-align: right;
    font-size: 12px;
    font-family: 'Times New Roman', Times, serif;
    width: 100%;
    height: 20px;
    z-index: 2;
}
.loading{
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -80px;
    margin-left: -80px;
    border: 30px solid #ff805a;
    border-top: 30px solid #ffea8f;
    border-radius: 50%;
    width: 100px;
    height: 100px;
    animation: loadspin 2s linear infinite;
    -webkit-animation: loadspin 2s linear infinite;
    z-index: 100;
}
@keyframes loadspin {
  0% { transform: rotate(0deg); }
  50% { transform: rotate(180deg); }
  100% { transform: rotate(360deg); }
}
@-webkit-keyframes loadspin {
  0% { -webkit-transform: rotate(0deg); }
  50% { transform: rotate(180deg); }
  100% { -webkit-transform: rotate(360deg); }
}
</style>