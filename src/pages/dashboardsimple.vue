<template>
    <div>
        <vue-headful
          v-bind:title="'Hidden Treasure Dashboard - ' + username" 
        />
        <Simplert :useRadius="true"
            :useIcon="true"
            ref="simplert">
        </Simplert>
        <TitleBar/>
            <img id="avatar" v-bind:src="useravatar" alt="avatar" width="150px" height="150px"/>
            <input id="name" v-model="username" disabled="true"/>
            <div id="follow">
                <div style="float:left; width:50%;">
                Followers: {{numfollowers}}
                </div>
                <div style="float:none;">
                Following: {{numfollowing}}
                </div>
            </div>
            <button id="follow_btn" @click="follow">Follow</button>
            <label for="bio" id="bio_label">Bio</label>
            <textarea name="bio" rows="2" maxlength="100" placeholder="Enter Your Bio Here" wrap="soft" id="bio_text" v-model="userbio" readonly></textarea>
            <div id="activity_title">Recent Activity</div>
            <div id="activity">
                <div id="activity_none" v-if="recentitems.length <= 0"><br/>No recent activity</div>
                <div id="activity_show" v-if="recentitems.length > 0">
                    <div v-for="(item, index) in recentitems" v-bind:key="index" id="activity_detail">
                        Started a selling of
                        <div id="activity_name" @click="jumpToItem(item.id, item.name)">{{item.name}}</div>
                        <div>at price of <b>${{item.price}}</b></div>
                        <div>on <i>{{item.time}}</i></div>
                    </div>
                </div>
            </div>
        <Tail/>
    </div>
</template>

<script>
import TitleBar from '@/components/titlebar.vue'
import Tail from '@/components/tail.vue'
import Simplert from 'vue2-simplert/src/Simplert'
import firebase from 'firebase/app'
import { mapState } from 'vuex'
const fb = require('@/firebaseConfig')

export default {
    name: "DashBoardSimple",
    components: {
        TitleBar,
        Simplert,
        Tail
    },
    data(){
        return {
            userid: '',
            username: '',
            userbio: '',
            useravatar: '',
            numfollowing: 0,
            numfollowers: 0,
            recentitems: []
        }
    },
    created()
    {
        this.userid = this.$route.params.otheruserid
        this.username = this.$route.params.othername
        if(this.userid == this.currentUser.uid)
        {
            this.$router.push('/dashboard')
        }
        fb.usersCollection.doc(this.userid).get().then(async (data) => {
            let ref = data.data()
            this.userbio = ref["bio"]
            this.useravatar = ref["avatar"]
            this.numfollowing = Object.keys(ref["following"]).length
            this.numfollowers = Object.keys(ref["followers"]).length
            let allitems = ref["items_sell"]
            let tmpitems = Object.keys(allitems).sort(function(a, b){return (allitems[b] - allitems[a])}).slice(0, 10)
            tmpitems = tmpitems.map((x) => {return [x, allitems[x]]})
            await this.processData(tmpitems)
        }).catch(err => {
            console.log(err.message)
        })
    },
    computed: {
        ...mapState(['currentUser']),
    },
    methods:{
        processData(data)
        {
            let date = new Date()
            for(let i = 0; i < data.length; i++)
            {
                let item = data[i]
                fb.itemsCollection.doc(item[0]).get().then(dd => {
                    date.setTime(item[1])
                    let itemtime = date.toLocaleString()
                    this.recentitems.push({
                        name: dd.data()["Item Name"],
                        price: dd.data()["Item Price ($)"],
                        time: itemtime,
                        id: dd.id
                    })
                }).catch(err => {
                    console.log(err.message)
                })
            }
        },
        jumpToItem(itemid, itemname)
        {
            this.$router.push('/items/' + itemid + '/name/' + itemname)
        },
        follow()
        {
            if(this.currentUser == null)
            {
                let ref = this
                let obj = {
                    title: 'Failed to follow',
                    message: "Please login to follow",
                    type: 'error',
                    customCloseBtnText: 'OK',
                    onClose: function()
                    {
                        ref.$router.push('/login')
                    }
                }
                this.$refs.simplert.openSimplert(obj)
            }
            else if(this.currentUser.uid == this.userid)
            {
                let obj = {
                    title: 'Failed to follow',
                    message: "You cannot follow yourself",
                    type: 'info',
                    customCloseBtnText: 'OK'
                }
                this.$refs.simplert.openSimplert(obj)
            }
            else
            {
                let newdata = {}
                let date = new Date()
                newdata[this.currentUser.uid] = date.getTime()
                console.log(this.userid)
                fb.usersCollection.doc(this.userid).update({
                    followers: firebase.firestore.FieldValue.arrayUnion(newdata)
                }).catch(err => {
                    console.log(err.message)
                })
            }
        }
    }
}
</script>

<style scoped>
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
    cursor: default;
    transition-duration: 0.2s;
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
    cursor: default;
    color: black;
}
#bio_label
{
    display: block;
    width: 60%;
    margin-top: 50px;
    margin-left: auto;
    margin-right: auto;
    font-size: 20px;
}
#bio_text
{
    resize: none;
    width: 60%;
    height: 50px;
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 50px;
    font-size: 20px;
    outline: none;
    border-radius: 10px;
    padding: 5px;
    cursor: default;
}
#follow
{
    width: 350px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 20px;
    text-align: center;
    font-size: 25px;
    overflow: hidden;
}
#follow_btn
{
    display: block;
    width: 200px;
    height: 50px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 40px;
    border-radius: 10px;
    border-style: solid;
    font-size: 25px;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    cursor: pointer;
    transition-duration: 0.5s;
    outline: none;
}
#follow_btn:hover
{
    border-radius: 50px;
    border-width: 3px;
    border-color: black;
}
#activity_title
{
    width: 300px;
    margin-left: auto;
    margin-right: auto;
    font-size: 30px;
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
    text-align: center;
    margin-bottom: 20px;
}
#activity
{
    width: 60%;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 50px;
    border-style: solid;
    border-width: 2px;
    border-radius: 10px;
    background-color: antiquewhite;
}
#activity_none
{
    height: 90px;
    text-align: center;
    font-size: 25px;
}
#activity_detail
{
    width: 90%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 20px;
    margin-bottom: 20px;
    font-size: 25px;
}
#activity_name
{
    text-decoration: underline;
    cursor: pointer;
    font-weight: bold;
    transition-duration: 0.5s;
    width: auto;
}
#activity_name:hover
{
    color:rgb(255, 232, 232);
    background-color: rgb(59, 15, 15);
}
</style>