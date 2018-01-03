<template>
  <div id="app">
    <keep-alive>
        <router-view v-wechat-title="$route.meta.title" v-if="$route.meta.hasOwnProperty('keepAlive')"></router-view>
    </keep-alive>
        <router-view v-wechat-title="$route.meta.title" v-if="!$route.meta.hasOwnProperty('keepAlive')"></router-view>
    <footers></footers>
  </div>
</template>

<script>
//css公共引入
import './assets/css/common.css'
//css字体图标样式
import './assets/iconfont/iconfont.css'
//js
import { UINFO } from './assets/js/api.js'
import footers from './components/footer'
export default {
  name: 'app',
  components:{
    footers
  },
  mounted(){
    this.getData();
  },
  methods:{
    getData(){
      UINFO().then(data => {
        this.$store.commit('saveinfo', data.result);
      })
    }
  }
}
</script>
<style>

</style>
