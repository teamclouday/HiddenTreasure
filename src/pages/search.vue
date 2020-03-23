<template>
    <div>
        <vue-headful
            v-bind:title="'Search Result for ' + keyWords"
        />
        <Simplert :useRadius="true"
            :useIcon="true"
            ref="simplert">
        </Simplert>
        <TitleBar/>
        <div id="search_background">
        <div id="title_search_cover">
            <form @submit.prevent>
                <div class="tb">
                <div class="td">
                    <input type="text" placeholder="Search Again" v-model="searchContent" @keyup.enter="search">
                </div>
                <div class="td" id="coverer">
                  <button type="button" @click="search">
                    <div id="circler"></div>
                    <span></span>
                  </button>
                </div>
                </div>
            </form>
        </div>
        <div id="search_results">
            <div v-if="searchResults.length <= 0" id="search_no_found">
                Sorry, nothing found with <br/> "{{keyWords}}"
            </div>
            <div v-if="searchResults.length > 0">
                <div v-for="(item, index) in searchResults" v-bind:key="index" id="result_item" @click="gotoItem(item['objectID'], item['Item Name'])">
                    <img id="result_img" alt="img" v-bind:src="item['Item URL (image)']"/>
                    <div id="result_name">{{item["Item Name"]}}</div>
                    <div id="result_price">Price: ${{item["Item Price ($)"]}}</div>
                </div>
            </div>
            <div id="search_tail" @click="gotoAlgolia">
                <img src="https://res.cloudinary.com/hilnmyskv/image/upload/q_auto/v1584543140/Algolia_com_Website_assets/images/shared/algolia_logo/search-by-algolia-dark-background.png" alt="powered by algolia" style="width:200px;margin-top:20px;"/>
            </div>
        </div>
        </div>
        <!-- <ais-instant-search :search-client="searchClient" index-name="items">
            <ais-search-box />
            <ais-results>
                <template slot-scope="{ result }">
                    <p>
                        <ais-highlight :result="result" attribute-name="Item Name"></ais-highlight>
                    </p>
                </template>
            </ais-results>
        </ais-instant-search> -->
        <Tail/>
    </div>
</template>

<script>
import TitleBar from '@/components/titlebar.vue'
import Tail from '@/components/tail.vue'
import Simplert from 'vue2-simplert/src/Simplert'
import algoliasearch from 'algoliasearch/lite'
// import 'instantsearch.css/themes/algolia-min.css'

export default {
    name: "Search",
    components: {
        TitleBar,
        Simplert,
        Tail
    },
    data(){
        return{
            keyWords: '',
            searchResults: [],
            searchContent: '',
            searchIndex: algoliasearch(
                'VYUYI92CLE',
                '7adc93ee559dfc6426d25e647b6d8513'
            ).initIndex('items')
        }
    },
    created(){
        this.keyWords = this.$route.params.keywords
        this.searchResults.splice(0, this.searchResults.length)
        this.searchIndex.search(this.keyWords, {
            attributesToRetrieve: ['Item Name', 'Item URL (image)', 'Item Price ($)'],
            hitsPerPage: 50
        }).then(({hits}) => {
            // console.log(hits)
            for(let i = 0; i < hits.length; i++)
            {
                this.searchResults.push(hits[i])
            }
        })
    },
    methods: {
        search: function()
        {
            if(this.searchContent != '')
            {
                // this.$router.push('/search/' + this.searchContent).catch(_ => {})
                // this.$route.params.keywords = this.searchContent
                this.$router.replace({params: {keywords: this.searchContent}})
                window.location.reload()
            }
            else
            {
                let obj = {
                    title: 'Failed to search',
                    message: "Please enter your search key words",
                    type: 'info',
                    customCloseBtnText: 'OK'
                }
                this.$refs.simplert.openSimplert(obj)
            }
        },
        gotoAlgolia: function()
        {
            window.open("https://www.algolia.com/", "_blank")
        },
        gotoItem: function(itemid, itemname)
        {
            this.$router.push('/items/' + itemid + '/name/' + itemname)
        }
    }
}
</script>

<style scoped>
#result_item
{
    min-height: 200px;
    border-style: none;
    border-radius: 10px;
    background-color: #fbc988;
    width: 90%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 40px;
    padding: 10px;
    cursor: pointer;
    transition-duration: 0.5s;
}

#result_item:hover
{
    background-color: #b35000;
    color: white;
    border-style: solid;
    border-color: black;
}

#result_img
{
    height: 200px;
    float: left;
    border-radius: 5px;
    overflow: hidden;
}

#result_name
{
    display: block;
    font-size: 30px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    width: 100%;
    text-align: right;
    text-transform: capitalize;
}

#result_price
{
    display: block;
    margin-top: 30px;
    width: 100%;
    text-align: right;
    font-size: 20px;
    font-family: 'Times New Roman', Times, serif;
}

#search_results
{
    margin-top: 25px;
    border-style: solid;
    border-width: 0;
    border-radius: 15px;
    width: 90%;
    margin-left: auto;
    margin-right: auto;
    background-color: #ff9777;
    padding: 20px;
}

#search_no_found
{
    height: 300px;
    text-align: center;
    font-size: 30px;
    padding: 50px;
}

#search_background
{
    padding-bottom: 50px;
    padding-top: 10px;
    background-color: #ffc2b7;
}

#search_tail
{
    width: 200px;
    margin-left: auto;
    margin-right: auto;
    cursor: pointer;
}

#title_search_cover .tb
{
    display: table;
    width: 100%;
}

#title_search_cover .td
{
    display: table-cell;
    vertical-align: middle;
}

#title_search_cover input, button
{
    color: #fff;
    font-family: Nunito;
    padding: 0;
    margin: 0;
    border: 0;
    background-color: transparent;
}

#title_search_cover
{
    width: 90%;
    padding: 30px;
    margin: 20px auto 0 auto;
    background-color: #ff8b5d;
    border-radius: 20px;
    box-shadow: 0 10px 40px #ff7c7c, 0 0 0 20px #ffffffeb;
    transform: scale(0.6);
}

#title_search_cover form
{
    height: 80px;
}

#title_search_cover input[type="text"]
{
    width: 100%;
    height: 100%;
    font-size: 60px;
    line-height: 1;
}

#title_search_cover input[type="text"]::placeholder
{
    color: #aa4545;
}

#title_search_cover input[type="text"], textarea, select { 
    outline: none;
}

#title_search_cover #coverer
{
    width: 1px;
    padding-left: 35px;
}

#title_search_cover button
{
    position: relative;
    display: block;
    width: 100%;
    height: 96px;
    cursor: pointer;
}

#title_search_cover #circler
{
    position: relative;
    top: -8px;
    left: 0;
    width: 43px;
    height: 43px;
    margin-top: 0;
    border-width: 15px;
    border: 15px solid #fff;
    background-color: transparent;
    border-radius: 50%;
    transition: 0.5s ease all;
}

#title_search_cover button span
{
    position: absolute;
    top: 68px;
    left: 43px;
    display: block;
    width: 45px;
    height: 15px;
    background-color: transparent;
    border-radius: 10px;
    transform: rotateZ(52deg);
    transition: 0.5s ease all;
}

#title_search_cover button span:before, button span:after
{
    content: '';
    position: absolute;
    bottom: 0;
    right: 0;
    width: 45px;
    height: 15px;
    background-color: #fff;
    border-radius: 10px;
    transform: rotateZ(0);
    transition: 0.5s ease all;
}

#title_search_cover #coverer:hover #circler
{
    top: -1px;
    width: 67px;
    height: 15px;
    border-width: 0;
    background-color: #fff;
    border-radius: 20px;
}

#title_search_cover #coverer:hover span
{
    top: 50%;
    left: 56px;
    width: 25px;
    margin-top: -9px;
    transform: rotateZ(0);
}

#title_search_cover #coverer:hover button span:before
{
    bottom: 11px;
    transform: rotateZ(52deg);
}

#title_search_cover #coverer:hover button span:after
{
    bottom: -11px;
    transform: rotateZ(-52deg);
}
#title_search_cover #coverer:hover button span:before, #coverer:hover button span:after
{
    right: -6px;
    width: 40px;
    background-color: #fff;
}
</style>