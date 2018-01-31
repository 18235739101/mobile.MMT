import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

let store=new Vuex.Store({
    state:{
        componentname:'ShopOrder',
    },
    mutations:{
        changeComponent(state,name){
           state.componentname=name;
        }
    }
})

export default store;