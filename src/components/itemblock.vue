<template>
    <div id="item" @click="click">
        <img alt="img" v-bind:src="ItemImgUrl" id="item_img"/>
        <div id="item_name">{{ItemName}}</div>
        <div id="item_price">$ {{ItemPrice}}</div>
    </div>
</template>

<script>
export default {
    name: "ItemBlock",
    props: {
        ItemName: {
            type: String,
            required: true
        },
        ItemPrice: {
            type: Number,
            required: true
        },
        ItemImgUrl: {
            type: String,
            default(){return 'https://user-images.githubusercontent.com/24848110/33519396-7e56363c-d79d-11e7-969b-09782f5ccbab.png'}
        },
        ItemType: {
            type: String,
            required: true,
            validator: function(val){
                return [
                    'books',
                    'Shoes',
                    'clothes',
                    'pants',
                    'electronic devices',
                ].indexOf(val) !== -1
            }
        },
        ItemID: {
            type: String,
            required: true
        }
    },
    methods:{
        click: function()
        {
            this.$router.push('/items/' + this.ItemID + '/name/' + this.ItemName)
        }
    }
}
</script>

<style scoped>
#item
{
    width: 44%;
    float: left;
    margin-left: 4%;
    margin-top: 20px;
    border-style: solid;
    border-width: 1px;
    border-radius: 10px;
    padding-top: 5px;
    padding-bottom: 20px;
    background-color: rgb(253, 244, 220);
    cursor: pointer;
    transition: 0.5s ease;
    -webkit-transition: 0.5s ease;
}
#item_img
{
    width: 100%;
    height: 400px;
    image-rendering: optimizeSpeed;
    object-fit: contain;
    border-radius: 5px;
    transition-delay: 2s;
}
#item_name
{
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 28px;
    font-weight: bold;
    height: 80px;
    overflow: hidden;
}
#item_price
{
    font-size: 20px;
}
#item:hover
{
    background-color: rgb(139, 47, 4);
    color:rgb(253, 244, 220)
}
</style>