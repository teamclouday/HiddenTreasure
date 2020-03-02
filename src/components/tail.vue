<template>
<div class="tail">
    <div id="copyright_buttons">
        <router-link type="button" id="copyright_button" to="/info#info_help">Help</router-link>
        <router-link type="button" id="copyright_button" to="/info#info_info">Information</router-link>
        <button type="button" id="copyright_button" onclick="location.href='https\:\/\/stockx.com/'">Reference</button>
        <button type="button" id="copyright_button" onclick="location.href='https\:\/\/github.com/teamclouday/HiddenTreasure'">Support</button>
        <button type="button" id="copyright_button" onclick="location.href='mailto:teamclouday@gmail.com'">Contact Sida</button>
    </div>
    <div id="tail_copyright">&copy; 2020 CIS 454 Group 4</div>
</div>
</template>

<script>
export default {
    name:"Tail",
    methods:{
        
    }
}
</script>

<style scoped>
.tail
{
    background-image: url("https://www.caf.com/media/2244219/50a-banners-tyt_1583x480.jpg?anchor=center&amp;mode=crop&amp;width=1421&amp;height=386&amp;rnd=132230413070000000");
    background-attachment: scroll;
    margin: 0;
    padding: 0;
    height: 100px;
}

#copyright_buttons
{
    height: 100%;
    width: 50%;
    float: left;
    line-height: 100px;
    overflow: hidden;
}

#copyright_button
{
    background-color: transparent;
    border-style: none;
    text-align: center;
    text-decoration: underline;
    
    color: rgb(4, 12, 17);
    margin: 4px 2px;
    outline: none;
    cursor: pointer;
    margin-left: 15px;
    padding: 5px;
    
    font-size: 20px;
    font-weight: bold;
    font-family: 'Times New Roman', Times, serif;
}

#tail_copyright
{
    float: right;
    height: 100%;
    text-align: center;
    line-height: 100px;
    font-size: 25px;
    font-family: 'Times New Roman', Times, serif;
    margin-right: 5%;
    overflow: hidden;
}
</style>