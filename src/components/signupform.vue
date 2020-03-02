<template>
<form class="login" style="z-index: 5; position: relative;" name="signup">
<center style="color: rgb(92, 55, 255);"><h3>Sign Up Your Account</h3></center>
<label for="uname"><b>Username</b></label>
<input type="text" placeholder="Enter Username" name="uname" required>
<label for="psw"><b>Password</b></label>
<input type="password" placeholder="Enter Password" name="psw" required>
<label for="sec"><b>Security Question</b></label>
<select id="security" name="sec_option">
    <option value="name">Your Best Friend's Name</option>
    <option value="pet">Your Pet's Name</option>
    <option value="drive">Last 5 digit of Driver's Liscense</option>
    <option value="town">Town/City that Your Parents Meet</option>
</select>
<input type="text" placeholder="Enter Your Answer" name="sec" required>
<!-- <a id="forget">Forget Your Password?</a> -->

<input type="submit" id="signupBtn" name="submit" value="Sign Up" onclick="" disabled>
<div id="agree">
    <input type="checkbox" name="agree" value="agree" id="signupAgree">
    <label for="agree">Click if you agree with <a href="info.html#info_terms">Term of Privacy</a></label>
</div>
</form>
</template>

<script>
import axios from 'axios'
var $ = require('jquery')

export default {
    name: "SignupForm"
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

// set event listener for submit button
$(document).on('click', 'input[name="submit"]', function(){
    var data = {
        "uname": $('input[name="uname"]').val(),
        "psw": $('input[name="psw"]').val(),
        "sec": $('input[name="sec"]').val(),
        "sec_option": $('input[name="sec_option"]:selected').val()
    }
    console.log(data)
    axios.post('../backend/signup.php', data).then(
        res => console.log(res.request.response)
    )
})

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
</style>