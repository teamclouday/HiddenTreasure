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
    <div>
        Item ID = 
        {{itemid}}
    </div>
    <img alt="item image" v-bind:src="itemimgurl"/>
    <div>
        Item Name =
        {{itemname}}
    </div>
    <div>
        Item Price =
        $ {{itemprice}}
    </div>
    <Tail/>
    </div>
</template>

<script>
import TitleBar from '@/components/titlebar.vue'
import Tail from '@/components/tail.vue'
import Simplert from 'vue2-simplert/src/Simplert'
const fb = require('@/firebaseConfig')

export default {
    name: "ItemDetail",
    data(){
        return {
            itemname: '',
            itemid: '',
            itemimgurl: 'https://user-images.githubusercontent.com/24848110/33519396-7e56363c-d79d-11e7-969b-09782f5ccbab.png',
            itemprice: 0.0
        }
    },
    created(){
        this.itemname = this.$route.params.itemname
        this.itemid = this.$route.params.itemid
        fb.itemsCollection.doc(this.$route.params.itemid).get().then(data => {
            this.itemimgurl = data.data()["Item URL (image)"]
            this.itemprice = data.data()["Item Price ($)"]
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
        Simplert
    }
}
</script>

<style scoped>

</style>