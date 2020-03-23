<template>
    <div>
    <vue-headful
        v-bind:title="itemname"
    />
    <Simplert :useRadius="true"
      :useIcon="true"
      ref="simplert">
    </Simplert>
    <TitleBar/>
    <div v-if="itemprice > 0" class="page">
        <div id="item_name">
            {{itemname}}
        </div>
        <div id="item_detail">
            <img id="item_img" alt="item image" v-bind:src="itemimgurl"/>
            <div id="item_price">
                Price:
                $ {{itemprice}}
            </div>
            <StarRating id="item_stars" v-model="itemtmprating" v-bind:show-rating="true" v-bind:max-rating="5" v-bind:fixed-points="1" v-bind:increment="0.1" @rating-selected="updateRating"/>
            <div id="item_numraters">
                {{itemnumraters}} people have rated this
            </div>
            <div id="item_seller" @click="gotoSeller">
                Seller: {{itemownername}}
            </div>
        </div>
        <div id="item_comments">
            <div id="item_no_comment" v-if="itemcomments.length <= 0">
                <br/>This item currently has no comments
            </div>
            <div v-if="itemcomments.length > 0">
                <div v-for="(item, index) in itemcomments" v-bind:key="index">
                    <textarea-autosize v-model="item.comment" readonly id="other_comment_txt"></textarea-autosize>
                    <div style="width:90%; text-align: right; margin-top: 10px; font-size: 20px;">By <b style="cursor:pointer; text-decoration:underline;" @click="jumpToUser(item.user, item.username)">{{item.username}}</b></div>
                    <div style="width:90%; text-align: right;">On <i>{{convertDate(item.time)}}</i></div>
                    <button v-if="currentUser && currentUser.uid == item.user" id="comment_delete" @click="removeComment(index, item.comment, item.user, item.time)">Delete Comment</button>
                </div>
            </div>
            <hr style="width:90%;"/>
            <div style="width:100%; height: 250px; margin-top:30px;">
                <textarea id="item_my_comment" placeholder="Add your comment here" v-model="usercomment" v-bind:maxlength="commentchlimit"></textarea>
                <div> Remaining<br/>Characters:<p style="margin: 0;" v-text="commentchlimit - usercomment.length"></p></div>
                <button id="comment_btn" @click="addComment">Comment</button>
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
import StarRating from 'vue-star-rating'
import firebase from 'firebase/app'
import { mapState } from 'vuex'
const fb = require('@/firebaseConfig')

export default {
    name: "ItemDetail",
    data(){
        return {
            itemname: '',
            itemid: '',
            itemimgurl: 'https://user-images.githubusercontent.com/24848110/33519396-7e56363c-d79d-11e7-969b-09782f5ccbab.png',
            itemprice: 0.0,
            itemrating: 0.0,
            itemtmprating: 0.0,
            itemnumraters: 0,
            itemraterids: [],
            itemownerid: '',
            itemownername: 'error',
            itemcomments: [],
            commentchlimit: 500,
            usercomment: ''
        }
    },
    created(){
        this.itemname = this.$route.params.itemname
        this.itemid = this.$route.params.itemid
        fb.itemsCollection.doc(this.$route.params.itemid).get().then(data => {
            let ref = data.data()
            this.itemimgurl = ref["Item URL (image)"]
            this.itemprice = ref["Item Price ($)"]
            this.itemname = ref["Item Name"]
            this.itemrating = ref["Item Rating"]
            this.itemtmprating = this.itemrating
            this.itemraterids = ref["Item Raters Ids"]
            this.itemnumraters = ref["Item Raters Count"]
            this.itemownerid = ref["Item Owner ID"]
            this.itemcomments = ref["Item Comments"]
            fb.usersCollection.doc(this.itemownerid).get().then(data => {
                this.itemownername = data.data()["name"]
            }).catch(err => {
                console.log(err.message)
            })
        }).catch(err => {
            let ref = this
            let obj = {
                title: 'Error: Item Not Found',
                message: err.message,
                type: 'error',
                customCloseBtnText: 'OK',
                onClose: function(){
                    ref.$router.push('/')
                },
                showXclose: true
            }
            this.$refs.simplert.openSimplert(obj)
        })
    },
    components: {
        TitleBar,
        Tail,
        Simplert,
        StarRating
    },
    methods:
    {
        updateRating: async function(newRating)
        {
            let result = await this.checkRater()
            if(result)
            {
                let sum = this.itemrating * this.itemnumraters + newRating
                this.itemnumraters += 1
                sum /= this.itemnumraters
                this.itemrating = sum
                fb.itemsCollection.doc(this.itemid).update({
                    "Item Rating": this.itemrating,
                    "Item Raters Count": this.itemnumraters,
                    "Item Raters Ids": this.itemraterids
                }).catch(err => {
                    console.log(err.message)
                })
            }
            else
            {
                this.itemtmprating = this.itemrating
            }
        },
        gotoSeller: function()
        {
            this.$router.push('/dashboard/' + this.itemownerid + "/name/" + this.itemownername)
        },
        jumpToUser: function(id, name)
        {
            this.$router.push('/dashboard/' + id + "/name/" + name)
        },
        checkRater: function()
        {
            if(this.currentUser == null)
            {
                let ref = this
                let obj = {
                    title: 'Failed to Rate',
                    message: "Please login to rate",
                    type: 'error',
                    customCloseBtnText: 'OK',
                    onClose: function()
                    {
                        ref.$router.push('/login')
                    }
                }
                this.$refs.simplert.openSimplert(obj)
                return false
            }
            else
            {
                if(this.itemraterids.indexOf(this.currentUser.uid) !== -1)
                {
                    let obj = {
                        title: 'Failed to Rate',
                        message: "You've already rated",
                        type: 'info',
                        customCloseBtnText: 'OK'
                    }
                    this.$refs.simplert.openSimplert(obj)
                    return false
                }
                else
                {
                    this.itemraterids.push(this.currentUser.uid)
                    return true
                }
            }
        },
        addComment: function()
        {
            if(this.usercomment.length == 0 || this.usercomment == '')
            {
                let ref = this
                let obj = {
                    title: 'Failed to Comment',
                    message: "Your comment is empty",
                    type: 'info',
                    customCloseBtnText: 'OK',
                    onClose: function()
                    {
                        ref.usercomment = ''
                    }
                }
                this.$refs.simplert.openSimplert(obj)
            }
            else if(this.currentUser == null)
            {
                let ref = this
                let obj = {
                    title: 'Failed to Comment',
                    message: "Please login to comment",
                    type: 'error',
                    customCloseBtnText: 'OK',
                    onClose: function()
                    {
                        ref.$router.push('/login')
                    }
                }
                this.$refs.simplert.openSimplert(obj)
            }
            else
            {
                let date = new Date()
                let newData = {
                    comment: this.usercomment,
                    user: this.currentUser.uid,
                    username: this.userProfile.name,
                    time: date.getTime()
                }
                this.itemcomments.push(newData)
                fb.itemsCollection.doc(this.itemid).update({
                    "Item Comments": firebase.firestore.FieldValue.arrayUnion(newData)
                }).then(() => {
                    let ref = this
                    let obj = {
                        title: 'Comment Success',
                        message: "Your comment is published successfully",
                        type: 'success',
                        customCloseBtnText: 'OK',
                        onClose: function()
                        {
                            ref.usercomment = ''
                        }
                    }
                    this.$refs.simplert.openSimplert(obj)
                }).catch(err => {
                    let obj = {
                        title: 'Failed to Comment',
                        message: err.message,
                        type: 'error',
                        customCloseBtnText: 'OK'
                    }
                    this.$refs.simplert.openSimplert(obj)
                })
            }
        },
        convertDate(rawdate)
        {
            let date = new Date()
            date.setTime(rawdate)
            return date.toLocaleString()
        },
        removeComment(index, content, userid, date)
        {
            fb.itemsCollection.doc(this.itemid).update({
                "Item Comments": this.itemcomments.filter(x => {
                    x.comment != content &&
                    x.user != userid &&
                    x.time != date
                })
            }).then(() => {
                this.itemcomments.splice(index, 1)
            }).catch(err => {
                console.log(err.message)
            })
        }
    },
    computed: {
        ...mapState(['currentUser', 'userProfile']),
    }
}
</script>

<style scoped>
#item_name
{
    width: 80%;
    height: 30px;
    font-size: 28px;
    font-weight: bold;
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    margin-top: 50px;
    margin-bottom: 50px;
}

#item_detail
{
    width: 80%;
    border-style: solid;
    border-radius: 10px;
    border-width: 2px;
    background-color: rgb(253, 210, 185);
    margin-left: auto;
    margin-right: auto;
    overflow: hidden;
    margin-bottom: 50px;
}

#item_img
{
    width: 50%;
    float: left;
}

#item_price
{
    float: none;
    text-align: center;
    margin-top: 20px;
    height: 30px;
    font-size: 25px;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}

#item_stars
{
    border-radius: 10px;
    width: 300px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 30px;
    padding: 5px;
    background-color: aliceblue;
}

#item_numraters
{
    text-align: center;
    margin-top: 10px;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}

#item_seller
{
    text-align: center;
    font-size: 25px;
    margin-top: 30px;
    cursor: pointer;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    transition-duration: 0.5s;
}

#item_seller:hover
{
    color: rgb(30, 159, 182);
}

#item_comments
{
    border-style: solid;
    border-radius: 10px;
    border-width: 2px;
    width: 80%;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 20px;
    background-color: rgb(253, 210, 185);
}

#item_no_comment
{
    font-size: 30px;
    text-align: center;
    height: 110px;
}

#item_my_comment
{
    resize: none;
    padding: 10px;
    width: 80%;
    margin-left: 9%;
    margin-bottom: 30px;
    display: block;
    height: 200px;
    font-size: 20px;
    border-radius: 10px;
    outline: none;
    float: left;
}

#comment_btn
{
    float: none;
    display: block;
    margin-top: 130px;
    margin-left: auto;
    margin-right: auto;
    width: 8%;
    height: 25px;
    font-size: 18px;
    outline: none;
    border-radius: 5px;
    border-style: solid;
    transition-duration: 0.5s;
    cursor: pointer;
}

#comment_btn:hover
{
    border-width: 2px;
    border-color: black;
}

#other_comment_txt
{
    display: block;
    margin-top: 40px;
    margin-left: auto;
    margin-right: auto;
    resize: none;
    width: 80%;
    padding: 10px;
    border-radius: 10px;
    outline: none;
    cursor: default;
    font-size: 20px;
}

#comment_delete
{
    display: block;
    margin-left: auto;
    margin-right: 10%;
    font-size: 18px;
    border-style: none;
    border-radius: 5px;
    border-style: solid;
    cursor: pointer;
    transition-duration: 0.5s;
    outline: none;
}

#comment_delete:hover
{
    border-width: 2px;
    border-color: black;
}
</style>