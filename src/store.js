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
        userProfile: {}
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
        }
    }
})