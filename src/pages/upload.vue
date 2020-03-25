<template>
    <div>
        <vue-headful
            title="Upload Your Item"
        />
        <TitleBar/>
        <Simplert :useRadius="true"
          :useIcon="true"
          ref="simplert">
        </Simplert>
        <div class="upload">
            <div id="upload_title">Upload Your Item for Selling</div>
            <form @submit.prevent>
            <div>
                <div style="width: 80%; margin-left:auto; margin-right:auto; font-size: 24px; margin-top: 20px; ">Image Preview</div>
                <img id="upload_img" alt="uploaded image" v-bind:src="img_url"/>
                <div style="display: flow-root;">
                    <textarea id="upload_img_url" rows="1" placeholder="Enter Image URL (Press Enter to Update Preview)" v-on:keydown.enter="limitRowsURL" v-model="img_input"/>
                    <div style="width: 80%; display: inline-block; margin-top: 50px; margin-left: 10%; text-align: center; font-size: 20px; overflow: hidden;">Or Upload from Local Computer</div>
                    <input v-on:input="uploadImageEvent" id="upload_img_local" style="margin-left: 10%; margin-top: 50px; font-size: 20px; display: inline-block;" type="file" accept="image/*"/>
                </div>
                <hr style="display: block; margin-top: 80px; margin-bottom: 80px; width: 90%;"/>
                <div style="text-align: center; font-size: 25px;">Set Item Name</div>
                <div style="display: flex;">
                    <textarea id="upload_name" rows="1" maxlength="80" v-on:keydown.enter="limitRows" v-model="item_name" placeholder="Enter Your Item Name (limit 80 characters)" required/>
                    <div style="width: 15%; margin-left: 2%; margin-top: 25px; position: absolute; font-size: 20px; text-align: right;">{{80 - item_name.length}}</div>
                </div>
                <div style="text-align: center; font-size: 25px; margin-top: 30px;">Set Item Price ($)</div>
                <input type="number" id="upload_price" min="0" max="99999999" step="any" v-model="item_price" required/>
                <div style="text-align: center; font-size: 25px; margin-top: 30px;">Select Type</div>
                <select v-model="item_type" id="upload_type">
                    <option value="Shoes">Shoes</option>
                    <option value="clothes">Clothes</option>
                    <option value="pants">Pants</option>
                    <option value="electronic devices">Electronic Devices</option>
                    <option value="books">Books</option>
                </select>
                <hr style="display: block; margin-top: 80px; margin-bottom: 80px; width: 90%;"/>
                <button id="upload_btn" @click="addItem">Upload Item</button>
            </div>
            </form>
        </div>
        <Tail/>
    </div>    
</template>

<script>
import TitleBar from '@/components/titlebar.vue'
import Simplert from 'vue2-simplert/src/Simplert'
import Tail from '@/components/tail.vue'
import {mapState} from 'vuex'
import firebase from 'firebase/app'
const fb = require('@/firebaseConfig')

export default {
    name: "Upload",
    components: {
        TitleBar,
        Simplert,
        Tail
    },
    computed:{
        ...mapState(['currentUser', 'userProfile'])
    },
    data(){
        return {
            img_url: 'https://user-images.githubusercontent.com/24848110/33519396-7e56363c-d79d-11e7-969b-09782f5ccbab.png',
            img_input: '',
            item_name: '',
            item_price: "0",
            item_type: "Shoes"
        }
    },
    methods:
    {
        limitRows: function(e)
        {
            e.preventDefault()
        },
        limitRowsURL: function(e)
        {
            this.img_url = (this.img_input == '') ? 'https://user-images.githubusercontent.com/24848110/33519396-7e56363c-d79d-11e7-969b-09782f5ccbab.png' : this.img_input
            document.getElementById("upload_img_local").value = "";
            e.preventDefault()
        },
        uploadImageEvent: function(e)
        {
            let img = e.srcElement.files[0]
            if(!img)
                return
            let fileReader = new FileReader()
            let ref = this
            let pref = "data:" + e.srcElement.files[0].type + ";base64,"
            fileReader.onloadend = function()
            {
                let url = pref + btoa(fileReader.result)
                ref.img_input = e.target.value
                ref.img_url = url
            }
            fileReader.readAsBinaryString(img)
        },
        addItem: function()
        {
            if(this.item_name == '')
            {
                let obj = {
                    title: 'Failed to Upload',
                    message: "Please enter a name for the item",
                    type: 'error',
                    customCloseBtnText: 'OK',
                }
                this.$refs.simplert.openSimplert(obj)
            }
            else
            {
                let data = {}
                let time = new Date()
                data["Item Name"] = this.item_name
                data["Item Price ($)"] = Number(this.item_price)
                data["Item Owner ID"] = this.currentUser.uid
                data["Item Comments"] = []
                data["Item Rating"] = 0
                data["Item Raters Count"] = 0
                data["Item Raters Ids"] = []
                data["Item Type"] = this.item_type
                data["Item URL (image)"] = this.img_url
                fb.itemsCollection.add(data).then(res => {
                    this.userProfile["items_sell"][res.id] = time.getTime()
                    fb.usersCollection.doc(this.currentUser.uid).update(this.userProfile).then(() => {
                        this.$store.dispatch('updateItems')
                        let obj = {
                            title: 'Upload Success',
                            message: "Successfully Uploaded the Item for Selling",
                            type: 'success',
                            customCloseBtnText: 'OK',
                        }
                        this.$refs.simplert.openSimplert(obj)
                    }).catch(err => {
                        this.showError(err.message)
                    })
                }).catch(err => {
                    this.showError(err.message)
                })
            }
        },
        showError: function(message)
        {
            let obj = {
                title: 'Failed to Upload',
                message: message,
                type: 'error',
                customCloseBtnText: 'OK',
            }
            this.$refs.simplert.openSimplert(obj)
        }
    }
}
</script>

<style scoped>
.upload
{
    border-style: solid;
    border-color: rgb(251, 156, 68);
    border-radius: 20px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 50px;
    margin-bottom: 50px;
    padding: 20px;
    width: 90%;
    background-color: rgb(255, 194, 166);
}

#upload_title
{
    width: 80%;
    text-align: center;
    font-size: 30px;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    font-weight: 600;
    margin-left: auto;
    margin-right: auto;
}

#upload_img_url
{
    margin-top: 20px;
    margin-left: 10%;
    width: 80%;
    font-size: 20px;
    height: 25px;
    resize: none;
    border-radius: 5px;
    padding: 5px;
    overflow: hidden;
    outline: none;
}

#upload_img
{
    margin-left: 10%;
    max-width: 300px;
    max-height: 300px;
    overflow: hidden;
    border-radius: 10px;
    float: left;
    background-color: white;
    text-align: center;
    border-style: solid;
    border-width: 5px;
    border-color: rgb(192, 62, 23);
    padding: 5px;
}

#upload_name
{
    display: block;
    width: 60%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 20px;
    font-size: 20px;
    padding: 5px;
    text-align: center;
    resize: none;
    outline: none;
    overflow: hidden;
    border-radius: 10px;
}

#upload_price
{
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-top: 20px;
    width: 20%;
    font-size: 20px;
    outline: none;
    overflow: hidden;
    border-radius: 10px;
    border-style: none;
    padding: 5px;
    text-align: center;
}

#upload_btn
{
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 40px;
    width: 200px;
    font-size: 25px;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    border-radius: 10px;
    border-style: solid;
    border-width: 4px;
    border-color: transparent;
    cursor: pointer;
    transition-duration: 0.5s;
    outline: none;
}

#upload_btn:hover
{
    border-color: tomato;
    color: white;
    background-color: rgb(116, 52, 0);
    font-size: 30px;
}

#upload_type
{
    outline: none;
    display: block;
    margin-top: 20px;
    margin-left: auto;
    margin-right: auto;
    width: 20%;
    font-size: 20px;
    overflow: hidden;
}
</style>