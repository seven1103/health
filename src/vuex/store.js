import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    //记录当前
    count:0,
    //记录用户当前健康指标参数
    u_name:'',
    u_age:'',
    u_height:'',
    u_weight:'',
    u_sex:'',
    u_phone:'',
    u_address:'',
    u_avater:'',
    u_assess:'',
    u_sport:''
}
const getters = {
    getSex:function(state){
        
    }
}
const mutations = {
    saveinfo(state,info){
        state.u_name = info.name;
        state.u_age = info.age;
        state.u_height = info.height;
        state.u_weight = info.weight;
        state.u_sex = info.sex;
        state.u_sport = info.sport||state.u_sport;
        state.u_avater = info.avatar;
        state.u_assess = info.new_assessment;
        state.u_phone = info.phone;
        state.u_address = info.address;
    },
    updateinfo(state,info){
        state.u_name = info.name;
        state.u_age = info.age;
        state.u_height = info.height;
        state.u_weight = info.weight;
        state.u_sex = info.sex;
        state.u_avater = info.avatar;
        state.u_phone = info.phone;
        state.u_address = info.address;
    }
}

const actions = {
    saveInfo({commit},info){
        commit('saveinfo', info)
    }
}

export default new Vuex.Store({
    state,getters,mutations,actions
})