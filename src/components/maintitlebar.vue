<template>
<div class="title">
    <div id="logo_bar">
        <img src= "../assets/logo.png" id="title_logo_img" alt="treasure logo">
        <h2 id="title_logo">Hidden Treasure</h2>
        <div id="title_logo_buttons">
            <button class="title_logo_button" onclick="location.href='login.html'">Login</button>
            <button class="title_logo_button" onclick="location.href='signup.html'">Signup</button>
            <router-link class="title_logo_button" to="/info#info_help">Help</router-link>
        </div>
    </div>
    <div style="clear: both;">
        <label id="title_label">Buy & Sell</label>
        <div id="title_search_cover">
            <form method="get">
                <div class="tb">
                <div class="td">
                    <input type="text" placeholder="Search" required>
                </div>
                <div class="td" id="coverer">
                  <button type="submit">
                    <div id="circler"></div>
                    <span></span>
                  </button>
                </div>
                </div>
            </form>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: "MainTitleBar"
}
</script>

<style scoped>
.title
{
    background-image: url("https://www.simplyss.com/blog/wp-content/uploads/2018/09/sell-and-donate-your-stuff-illustration.png");
    background-size: contain;
    background-attachment: scroll;
    width: 100%;
    height: 50%;
}

#logo_bar
{
    background-color: rgba(255, 158, 102, 0.8);
    height: 120px;
    position: sticky;
    width: 100%;
    top: 0;
    z-index: 10;
    overflow: hidden;
}

#title_logo
{
    margin-left: 20px;
    margin-top: 30px;
    font-weight: bold;
    font-size: 50px;
    font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
    color: rgb(255, 96, 68);
    float: left;
}

#title_logo_img
{
    margin-left: 20px;
    margin-top: 20px;
    height: 80px;
    width: 80px;
    float: left;
}

#title_logo_buttons
{
    float: right;
    height: 100%;
    width: 50%;
}

.title_logo_button
{
    float: right;
    height: 100%;
    margin-right: 20px;
    font-size: 30px;
    font-weight: bold;
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
    outline: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    text-decoration: none;
    color: #fff;
}

.title_logo_button:hover
{
    color: rgb(106, 159, 228);
}

#title_label
{
    font-size: 50px;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    font-weight: bolder;
    margin-top: 50px;
    margin-left: auto;
    margin-right: auto;
    display: block;
    text-align: center;
    
}

#title_search_cover .tb
{
    display: table;
    width: 100%;
}

#title_search_cover .td
{
    display: table-cell;
    vertical-align: middle;
}

#title_search_cover input, button
{
    color: #fff;
    font-family: Nunito;
    padding: 0;
    margin: 0;
    border: 0;
    background-color: transparent;
}

#title_search_cover
{
    width: 50%;
    padding: 30px;
    margin: 20px auto 0 auto;
    background-color: #ff8b5d;
    border-radius: 20px;
    box-shadow: 0 10px 40px #ff7c7c, 0 0 0 20px #ffffffeb;
    transform: scale(0.6);
}

#title_search_cover form
{
    height: 80px;
}

#title_search_cover input[type="text"]
{
    width: 100%;
    height: 100%;
    font-size: 60px;
    line-height: 1;
}

#title_search_cover input[type="text"]::placeholder
{
    color: #aa4545;
}

#title_search_cover input[type="text"], textarea, select { 
    outline: none;
}

#title_search_cover #coverer
{
    width: 1px;
    padding-left: 35px;
}

#title_search_cover button
{
    position: relative;
    display: block;
    width: 100%;
    height: 96px;
    cursor: pointer;
}

#title_search_cover #circler
{
    position: relative;
    top: -8px;
    left: 0;
    width: 43px;
    height: 43px;
    margin-top: 0;
    border-width: 15px;
    border: 15px solid #fff;
    background-color: transparent;
    border-radius: 50%;
    transition: 0.5s ease all;
}

#title_search_cover button span
{
    position: absolute;
    top: 68px;
    left: 43px;
    display: block;
    width: 45px;
    height: 15px;
    background-color: transparent;
    border-radius: 10px;
    transform: rotateZ(52deg);
    transition: 0.5s ease all;
}

#title_search_cover button span:before, button span:after
{
    content: '';
    position: absolute;
    bottom: 0;
    right: 0;
    width: 45px;
    height: 15px;
    background-color: #fff;
    border-radius: 10px;
    transform: rotateZ(0);
    transition: 0.5s ease all;
}

#title_search_cover #coverer:hover #circler
{
    top: -1px;
    width: 67px;
    height: 15px;
    border-width: 0;
    background-color: #fff;
    border-radius: 20px;
}

#title_search_cover #coverer:hover span
{
    top: 50%;
    left: 56px;
    width: 25px;
    margin-top: -9px;
    transform: rotateZ(0);
}

#title_search_cover #coverer:hover button span:before
{
    bottom: 11px;
    transform: rotateZ(52deg);
}

#title_search_cover #coverer:hover button span:after
{
    bottom: -11px;
    transform: rotateZ(-52deg);
}
#title_search_cover #coverer:hover button span:before, #coverer:hover button span:after
{
    right: -6px;
    width: 40px;
    background-color: #fff;
}
</style>