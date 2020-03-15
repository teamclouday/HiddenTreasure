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
                <input id="name" v-model="userProfile.name"/>
                <label for="bio" id="bio_label">Bio</label>
                <textarea name="bio" rows="2" maxlength="100" placeholder="Enter Your Bio Here" wrap="soft" autocomplete="on" id="bio_text" v-on:keydown.enter="limitBioRows" v-model="userProfile.bio"></textarea>
                <button id="bio_update" @click="updateUserBio">Update Profile</button>
            </v-tab>
            <v-tab title="Community" class="content_inside">
                Nothing here yet
            </v-tab>
            <v-tab title="Security" class="content_inside">
                <form class="reset" name="resetForm" @submit.prevent>
                <label id="reset_label">Update Password</label>
                <input type="password" class="reset_psw" id="psw1" placeholder="Enter Old Password" required>
                <input type="password" class="reset_psw" id="psw2" placeholder="Enter New Password" required>
                <button id="reset_btn" @click="updatePassword">Update</button>
                </form>
                <div id="reset_or">Or</div>
                <button id="reset_btn" @click="resetPassword">Send Reset Email</button>
                <hr style="margin-top: 50px;margin-bottom: 50px;"/>
                <button id="reset_destroy" @click="destroyUser">Destroy Account</button>
            </v-tab>
        </vue-tabs>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import Simplert from 'vue2-simplert/src/Simplert'
const fb = require('@/firebaseConfig')

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
        updateUserBio: function()
        {
            this.$store.commit('setUserBio', document.getElementById("bio_text").value)
            this.updateUserProfile()
        },
        resetPassword: function()
        {
            fb.auth().sendPasswordResetEmail(this.currentUser.email).then(() => {
                let ref = this
                let obj = {
                    title: 'Reset Link Sent',
                    message: "Reset link has been sent to your email address",
                    type: 'success',
                    customCloseBtnText: 'OK',
                    onClose: function(){
                        fb.auth().signOut().then(() => {
                            ref.$store.dispatch('clearData')
                            ref.$router.push('/').catch(() => {})
                        }).catch(err => {
                            console.log(err)
                        })
                    },
                    showXclose: true
                }
                this.$refs.simplert.openSimplert(obj)
            }).catch(err => {
                this.popupError(err.message)
            })
        },
        updatePassword: function()
        {
            fb.auth().currentUser.reauthenticateWithCredential(
                fb.auth.EmailAuthProvider.credential(
                    this.currentUser.email,
                    document.getElementById("psw1").value
                )
            ).then(() => {
                this.currentUser.updatePassword(document.getElementById("psw2").value).then(() => {
                    let ref = this
                    let obj = {
                        title: 'Password Updated',
                        message: "Your password has been updated successfully",
                        type: 'success',
                        customCloseBtnText: 'OK',
                        onClose: function(){
                            fb.auth().signOut().then(() => {
                                ref.$store.dispatch('clearData')
                                ref.$router.push('/').catch(() => {})
                            }).catch(err => {
                                console.log(err)
                            })
                        },
                        showXclose: true
                    }
                    this.$refs.simplert.openSimplert(obj)
                }).catch(err => {
                    this.popupError(err.message)
                })
            }).catch(err => {
                this.popupError(err.message)
            })
        },
        destroyUser: function()
        {
            let ref = this
            let obj = {
                title: 'Delete Account?',
                message: "Are you sure to delete your account?",
                type: 'error',
                useConfirmBtn: true,
                customCloseBtnText: 'Cancel',
                customConfirmBtnText: 'OK',
                onConfirm: function(){
                    ref.destroyUserConfirm()
                },
                onClose: function(){
                    window.location.reload()
                },
                showXclose: true
            }
            this.$refs.simplert.openSimplert(obj)
        },
        destroyUserConfirm: function()
        {
            console.log("here")
            let uid = this.currentUser.uid
            fb.usersCollection.doc(uid).delete().then(() => {
                this.currentUser.delete().then(() => {
                    let ref = this
                    let obj = {
                        title: 'Account Deleted',
                        message: "Your account has been successfully deleted",
                        type: 'success',
                        customCloseBtnText: 'OK',
                        onClose: function(){
                            fb.auth().signOut().then(() => {
                                ref.$store.dispatch('clearData')
                                ref.$router.push('/').catch(() => {})
                            }).catch(err => {
                                console.log(err)
                            })
                        },
                        showXclose: true
                    }
                    this.$refs.simplert.openSimplert(obj)
                }).catch(err => {
                    this.popupError(err.message)
                })
            }).catch(err => {
                this.popupError(err.message)
            })
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
    border-radius: 10px;
    border-color: rgb(92, 24, 24);
    border-width: 2px;
    margin-top: 10%;
    margin-left: auto;
    margin-right: auto;
    width: 150px;
    cursor: pointer;
    transition-duration: 0.2s;
}
#avatar:hover
{
    border-radius: 30%;
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
    background: transparent;
    border: none;
    outline: none;
}
#bio_label
{
    display: block;
    width: 80%;
    margin-top: 50px;
    margin-left: auto;
    margin-right: auto;
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
    padding: 5px;
}
#bio_update{
    display: block;
    position: relative;
    height: 40px;
    width: 200px;
    font-size: 18px;
    margin-top: 40px;
    margin-right: auto;
    margin-left: auto;
    border-radius: 5px;
    border-style: solid;
    border-width: 1px;
    border-color: black;
    outline: none;
    cursor: pointer;
    transition: 0.5s ease;
    -webkit-transition: 0.5s ease;
}
#bio_update:hover{
    border-width: 4px;
}
.reset{
    width: 80%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 8%;
}
#reset_label{
    display: block;
    width: 50%;
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 20px;
    font-size: 30px;
}
.reset_psw{
    display: block;
    width: 400px;
    height: 40px;
    margin-bottom: 20px;
    margin-left: auto;
    margin-right: auto;
    border-radius: 5px;
    outline: none;
    font-size: 20px;
    padding-left: 10px;
    padding-right: 10px;
}
#reset_btn{
    display: block;
    margin-top: 5px;
    margin-bottom: 5px;
    margin-left: auto;
    margin-right: auto;
    width: 200px;
    height: 35px;
    border-radius: 5px;
    font-size: 20px;
    outline: none;
    cursor: pointer;
}
#reset_or{
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 80%;
    text-align: center;
    margin-top: 5px;
    margin-bottom: 5px;
    font-size: 20px;
}
#reset_destroy{
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 300px;
    height: 80px;
    border-radius: 20px;
    border-style: solid;
    border-color: rgb(112, 22, 22);
    border-width: 4px;
    font-weight: bold;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    cursor: pointer;
    transition: 0.5s ease;
    -webkit-transition: 0.5s ease;
    outline: none;
    background-color: rgb(255, 175, 175);
    color: rgb(0, 0, 0);
    font-size: 30px;
}
#reset_destroy:hover{
    background-color: rgb(206, 52, 52);
    color: aliceblue;
    font-size: 35px;
}
.content >>> .tab-content.right-text-tabs{
    width: 100%;
}
.content >>> .left-vertical-tabs{
    width: 20%;
    overflow: hidden;
}
</style>