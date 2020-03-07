<template>
    <div>
        <Simplert :useRadius="true"
                  :useIcon="true"
                  ref="simplert">
        </Simplert>
        <vue-tabs
            active-tab-color="#e74c3c" 
            active-text-color="white"
            type="pills"
            :start-index="1"
            direction="vertical"
            class="content">
            <v-tab title="Profile" class="content_inside">
                <div v-if="!currentUser.emailVerified" id="verify">You have not verified your email yet!</div>
                <img id="avatar" src="" alt="avatar" width="150px" height="150px" @click="updateAvatar"/>
                <div id="name">{{userProfile.name}}</div>
                <label for="bio" id="bio_label" @mouseover="toggleBioLabel" @mouseleave="toggleBioLabel" @click="updateUserBio">Bio</label>
                <textarea name="bio" rows="2" maxlength="100" placeholder="Enter Your Bio Here" wrap="soft" autocomplete="on" id="bio_text" v-on:keydown.enter="limitBioRows" v-model="userProfile.bio"></textarea>
                <!-- <button id="bio_update">Update</button> -->
            </v-tab>
            <v-tab title="History" class="content_inside">
                Nothing here yet
            </v-tab>
            <v-tab title="Security" class="content_inside">
                change password? delete account?
            </v-tab>
        </vue-tabs>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import Simplert from 'vue2-simplert/src/Simplert'
const fb = require('../firebaseConfig')

export default {
    name: "DashBoardContent",
    computed: {
        ...mapState(['userProfile', 'currentUser']),
    },
    methods:{
        limitBioRows: function(e){
            let rows = this.userProfile.bio.length ? this.userProfile.bio.split(/\r\n|\r|\n/).length : 0
            if(rows >= 2)
            {
                e.preventDefault()
            }
        },
        updateAvatar: function(){
            var ref = this
            let obj = {
                title: 'Update Avatar',
                message: "Randomize a new one?",
                type: 'info',
                useConfirmBtn: true,
                customCloseBtnText: 'Cancel',
                customConfirmBtnText: 'OK',
                onClose: function(){
                    window.location.reload()
                },
                onConfirm: function(){
                    ref.$store.commit('setUserAvatar', ref.randomAvatar())
                    ref.updateUserProfile()
                },
                showXclose: true
            }
            this.$refs.simplert.openSimplert(obj)
        },
        updateUserProfile: function()
        {
            fb.usersCollection.doc(this.currentUser.uid).set(this.userProfile).then(()=>{
                let obj = {
                    title: 'Profile Updated',
                    message: "Your profile has been updated",
                    type: 'success',
                    customCloseBtnText: 'OK',
                    onClose: function(){
                        window.location.reload()
                    },
                    showXclose: true
                }
                this.$refs.simplert.openSimplert(obj)
            }).catch(err => {
                this.popupError(err.message)
            })
        },
        randomAvatar: function()
        {
            var canvas = document.createElement("canvas")
            canvas.width = 3
            canvas.height = 3
            var imageData = new ImageData(3, 3)
            imageData.data.set(imageData.data.map(() => Math.floor(Math.random()*256)))
            canvas.getContext("2d").putImageData(imageData, 0, 0)
            return canvas.toDataURL()
        },
        popupError: function(msg)
        {
            let obj = {
                title: 'Error',
                message: msg,
                type: 'error',
                customCloseBtnText: 'OK',
                onClose: function(){
                    window.location.reload()
                },
                showXclose: true
            }
            this.$refs.simplert.openSimplert(obj)
        },
        toggleBioLabel: function()
        {
            document.getElementById("bio_label").innerText = (document.getElementById("bio_label").innerText == "Bio") ? "Update Bio" : "Bio"
        },
        updateUserBio: function()
        {
            this.$store.commit('setUserBio', document.getElementById("bio_text").value)
            this.updateUserProfile()
        }
    },
    mounted: function(){
        document.getElementById("avatar").setAttribute("src", this.userProfile.avatar)
    },
    updated: function(){
        document.getElementById("avatar").setAttribute("src", this.userProfile.avatar)
    },
    components:{
        Simplert
    }
}
</script>

<style scoped>
.content{
    width: 70%;
    height: 700px;
    margin-top: 20px;
    margin-bottom: 20px;
    margin-left: auto;
    margin-right: auto;
    background-color: rgb(251, 228, 217);
    font-size: 24px;
    border-style: solid;
    border-radius: 5px;
    border-color: rgb(255, 154, 71);
    padding: 5px;
}
.content_inside{
    display: block;
    margin: 10px;
    height: 98%;
    overflow: hidden;
    /* border-style: dashed; */
}
#verify{
    text-align: center;
    font-size: 20px;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    border-style: solid;
    border-radius: 10px;
    border-color: rgb(251, 101, 31);
    border-width: 2px;
    width: 60%;
    margin-left: auto;
    margin-right: auto;
    background-color: rgb(226, 62, 62);
    color: aliceblue;
    margin-top: 5px;
    margin-bottom: 5px;
    overflow: hidden;
}
#avatar
{
    display: block;
    image-rendering: pixelated;
    border-style: solid;
    border-radius: 5px;
    border-color: rgb(92, 24, 24);
    border-width: 2px;
    margin-top: 10px;
    margin-left: auto;
    margin-right: auto;
    width: 150px;
}
#avatar:hover
{
    border-width: 10px;
    cursor: pointer;
}
#name
{
    width: 60%;
    text-align: center;
    margin-top: 20px;
    margin-left: auto;
    margin-right: auto;
    font-size: 30px;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    display: block;
}
#bio_label
{
    display: block;
    width: 80%;
    margin-top: 50px;
    margin-left: auto;
    margin-right: auto;
}
#bio_label:hover{
    cursor: pointer;
    color: rgb(136, 51, 30);
    font-weight: bold;
}
#bio_text
{
    resize: none;
    width: 80%;
    height: 50px;
    display: block;
    margin-left: auto;
    margin-right: auto;
    font-size: 20px;
    outline: none;
    border-radius: 10px;
}
/* #bio_update{
    display: block;
    position: relative;
    height: 30px;
    width: 90px;
    font-size: 15px;
    margin-top: 10px;
    margin-right: 10%;
    margin-left: auto;
    border-radius: 5px;
    outline: none;
    cursor: pointer;
} */
</style>

<style>
.tab-content.right-text-tabs{
    width: 100%;
}
.left-vertical-tabs{
    width: 20%;
    overflow: hidden;
}
</style>