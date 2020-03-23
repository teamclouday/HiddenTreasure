// const functions = require('firebase-functions')
const algoliasearch = require('algoliasearch')

// const env = functions.config()

const client = algoliasearch("VYUYI92CLE", "03f83327fda555e8579016d3269af777")
const itemsIndex = client.initIndex(`items`) // <-- Index name

itemsIndex.setSettings({
    searchableAttributes: [
        'Item Name',
        'Item Type'
    ]
}).then(() => {
    console.log("done")
}).catch(err => {
    console.log(err)
})