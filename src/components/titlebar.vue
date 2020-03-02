<template>
<div id="logo_bar">
    <img src= "img/logo.png" id="title_logo_img" alt="treasure logo">
    <h2 id="title_logo">Hidden Treasure</h2>
    <div id="title_logo_buttons">
        <button class="title_logo_button" onclick="location.href='index.html'">Home</button>
    </div>
</div>
</template>

<script>
export default {
    name: "TitleBar"
}
</script>

<style scoped>
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
}

.title_logo_button:hover
{
    color: rgb(106, 159, 228);
}
</style>