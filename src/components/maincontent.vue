<template>
<div class="content">
    <div id="content_advs">
        <img id="img1" src="https://2app.kicksonfire.com/kofapp/upload/events_master_images/ipad_a6228e683e8b5b0bfa8730b2cf403a6e5e03ebe0eb7ff.jpg" alt="shoes" class="content_img_adv">
        <img id="img2" src="https://cdn.shopify.com/s/files/1/0071/3637/8998/articles/palace-hypebeast-mens-fashion-style-streetwear_1024x1024.jpg?v=1542114553" alt="clothes" class="content_img_adv">
        <img id="img3" src="https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2019%2F08%2Fsupreme-fall-winter-2019-pants-1.jpg?q=75&w=800&cbr=1&fit=max" alt="pants" class="content_img_adv">
        <img id="img4" src="https://www.samma3a.com/tech/en/wp-content/uploads/sites/2/2018/12/razer-blade-15-gaming-laptop-setup.png" alt="electronics" class="content_img_adv">
        <img id="img5" src="https://martijnscheijbeler.com/wp-content/uploads/books.jpg" alt="books" class="content_img_adv">
        <img>
    </div>

    <vue-tabs
        class="content_tabs"
        :start-index="1"
        active-tab-color="rgb(58, 78, 104)"
        active-text-color="white">
        <v-tab id="tab1" class="content_tab" title="Shoes">
        <!-- <div v-if="ItemShoes.length"> -->
        <ItemBlock v-for="item in randomItems(itemsnap.filter(x => x.ItemType === 'Shoes'))" v-bind:key="item['ID']" v-bind:ItemName="item['ItemName']" v-bind:ItemPrice="item['ItemPrice']" v-bind:ItemImgUrl="item['ItemURL']" v-bind:ItemType="item['ItemType']" v-bind:ItemID="item['ID']"/>
        <!-- </div> -->
        </v-tab>
        <v-tab id="tab2" class="content_tab" title="Clothes">
        <ItemBlock v-for="item in randomItems(itemsnap.filter(x => x.ItemType === 'clothes'))" v-bind:key="item['ID']" v-bind:ItemName="item['ItemName']" v-bind:ItemPrice="item['ItemPrice']" v-bind:ItemImgUrl="item['ItemURL']" v-bind:ItemType="item['ItemType']" v-bind:ItemID="item['ID']"/>
        </v-tab>
        <v-tab id="tab3" class="content_tab" title="Pants">
        <ItemBlock v-for="item in randomItems(itemsnap.filter(x => x.ItemType === 'pants'))" v-bind:key="item['ID']" v-bind:ItemName="item['ItemName']" v-bind:ItemPrice="item['ItemPrice']" v-bind:ItemImgUrl="item['ItemURL']" v-bind:ItemType="item['ItemType']" v-bind:ItemID="item['ID']"/>
        </v-tab>
        <v-tab id="tab4" class="content_tab" title="Electronic Devices">
        <ItemBlock v-for="item in randomItems(itemsnap.filter(x => x.ItemType === 'electronic devices'))" v-bind:key="item['ID']" v-bind:ItemName="item['ItemName']" v-bind:ItemPrice="item['ItemPrice']" v-bind:ItemImgUrl="item['ItemURL']" v-bind:ItemType="item['ItemType']" v-bind:ItemID="item['ID']"/>
        </v-tab>
        <v-tab id="tab5" class="content_tab" title="Books">
        <ItemBlock v-for="item in randomItems(itemsnap.filter(x => x.ItemType === 'books'))" v-bind:key="item['ID']" v-bind:ItemName="item['ItemName']" v-bind:ItemPrice="item['ItemPrice']" v-bind:ItemImgUrl="item['ItemURL']" v-bind:ItemType="item['ItemType']" v-bind:ItemID="item['ID']"/>
        </v-tab>
    </vue-tabs>
</div>
</template>

<script>
import { mapState } from 'vuex'
import ItemBlock from "@/components/itemblock.vue"

export default {
    name: "MainContent",
    components: {
        ItemBlock
    },
    computed: {
        ...mapState(['itemsnap'])
    },
    data: function()
    {
        return {
            randomItemNum: 6
        }
    },
    methods: {
        randomItems: function(items)
        {
            return items.sort(() => {return 0.5 - Math.random()}).slice(0, this.randomItemNum)
        }
    }
}
</script>

<style scoped>
.content_tabs
{
    margin-left: auto;
    margin-right: auto;
    margin-top: 0;
    width: 95%;
    text-align: center;
    overflow: hidden;
    font-size: 25px;
}

#content_advs
{
    height: 500px;
    width: 95%;
    display: flex;
    overflow-x: hidden;
    overflow-y: hidden;
    margin-left: auto;
    margin-right: auto;
    border-radius: 10px 10px 0px 0px;
    margin-top: 10px;
}

.content_img_adv
{
    width: 100%;
    object-fit: cover;
    flex-shrink: 0;
    height: 100%;
    animation-name: adv_slide;
    animation-duration: 50s;
    animation-direction: normal;
    animation-timing-function: ease;
    animation-iteration-count: infinite;
}

@keyframes adv_slide
{
    0% {transform: translateX(0);}
    20% {transform: translateX(-100%);}
    40% {transform: translateX(-200%);}
    60% {transform: translateX(-300%);}
    80% {transform: translateX(-400%);}
    100% {transform: translateX(0);}
}
.content_tabs >>> .tab
{
    width: 20%;
}
.content_tabs >>> .nav-tabs-navigation
{
    width: auto;
    margin-left: auto;
    margin-right: auto;
}
</style>