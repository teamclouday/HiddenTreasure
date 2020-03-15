import Vue from 'vue'
import Vuex from 'vuex'
const fb = require('@/firebaseConfig')

Vue.use(Vuex)

fb.auth().onAuthStateChanged(user => {
    if(user)
    {
        store.commit('setCurrentUser', user)
        store.dispatch('fetchUserProfile')
    }
})

export const store = new Vuex.Store({
    state:{
        currentUser: null,
        userProfile: {},
        itemsnap: [{"ID": null, "ItemName": null, "ItemPrice": null, "ItemURL": null, "ItemType": null}]
    },
    actions:{
        fetchUserProfile({commit, state}){
            fb.usersCollection.doc(state.currentUser.uid).get().then(res => {
                commit('setUserProfile', res.data())
            }).catch(err => {
                console.log(err)
            })
        },
        clearData({commit}){
            commit('setCurrentUser', null)
            commit('setUserProfile', {})
        },
        updateItems({commit, state})
        {
            commit('setItems', [])
            fb.itemsCollection.get().then(snap => {
                snap.forEach(item => {
                    let ref = item.data()
                    let data = {}
                    data["ID"] = item.id
                    data["ItemName"] = ref["Item Name"]
                    data["ItemPrice"] = ref["Item Price ($)"]
                    data["ItemURL"] = ref["Item URL (image)"]
                    data["ItemType"] = ref["Item Type"]
                    state.itemsnap.push(data)
                })
            }).catch(err => {
                console.log(err)
            })
        }
    },
    mutations:{
        setCurrentUser(state, val)
        {
            state.currentUser = val
        },
        setUserProfile(state, val)
        {
            state.userProfile = val
        },
        setUserAvatar(state, val)
        {
            state.userProfile.avatar = val
        },
        setUserName(state, val)
        {
            state.userProfile.name = val
        },
        setUserBio(state, val)
        {
            state.userProfile.bio = val
        },
        setItems(state, val)
        {
            state.itemsnap = val
        }
    }
    // getters:{
    //     getItem: state => id => {
    //         return state.itemsnap.filter(x => x.ItemType === id)
    //     },
    //     getItemByIndex: state => index => {
    //         return state.itemsnap[index]
    //     }
    // }
})