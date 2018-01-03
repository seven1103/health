<template>
        <div class="us">
                <div class="binfo">
                        <img :src="$store.state.u_avater | filSrc" alt="">
                        <span>{{$store.state.u_name}}</span>
                        <img src="../../assets/images/boy.png" v-show="$store.state.u_sex==1" alt="">
                        <img src="../../assets/images/girl.png" v-show="$store.state.u_sex==2" alt="">
                        <img @click="toinfo()" src="../../assets/images/editor.png" alt="">
                </div>
                <div class="operation">
                        <ul class="s-table-view">
                                <li class="s-table-view-cell" @click="openPicker()">
                                        <span><img src="../../assets/images/nl.png" alt="">年龄</span>
                                        <span>{{age}}<small>周岁</small><i class="iconfont icon-xiangyoulajiantou"></i></span>
                                </li>
                                <li class="s-table-view-cell" @click="modify(0)">
                                        <span><img src="../../assets/images/sg.png" alt="">身高</span>
                                        <span>{{height}}<small>cm</small><i class="iconfont icon-xiangyoulajiantou"></i></span>
                                </li>
                                <li class="s-table-view-cell" @click="modify(1)">
                                        <span><img src="../../assets/images/t.png" alt="">体重</span>
                                        <span>{{weight}}<small>KG</small><i class="iconfont icon-xiangyoulajiantou"></i></span>
                                </li>
                                <li class="s-table-view-cell">
                                        <span><img src="../../assets/images/pg.png" alt="">当前评估</span>
                                        <span>{{assess}}</span>
                                </li>
                        </ul>
                </div>
        </div>
</template>
<script>
        import {Cell,DatetimePicker,MessageBox,Toast} from 'mint-ui'
        export default {
                components:{Cell,DatetimePicker},
                data(){
                        return{
                        avater:this.$store.state.u_avater,
                        age:this.$store.state.u_age,
                        sexs:this.$store.state.u_sex,
                        name:this.$store.state.u_name,
                        weight:this.$store.state.u_weight,
                        height:this.$store.state.u_height,
                        phone:this.$store.state.u_phone,
                        address:this.$store.state.u_address,
                        assess : this.$store.state.u_assess,
                        startDate: new Date(315504000),
                        endDate: new Date()
                        }
                },
                methods:{
                        openPicker(){

                        },
                        modify(ev){

                        }  
                }
        }
</script>
<style scoped>
        .binfo{
                padding: 4vh 5vw;
        }
        .binfo>img:nth-child(1){
                border-radius: 50%;
                width: 12vh;
                vertical-align:middle;
                margin: 0
        }
        .binfo>img{
                width: 4vw;
                margin: 0 1vw;
                vertical-align: middle;
        }
        .exit{
                margin-top: 10vh;
                width: 100%;
                background: #fff;
                color: red;
        }
        li.s-table-view-cell{
                display: flex;
                justify-content: space-between;
        }
        li.s-table-view-cell>span:nth-child(2)>i{
                color: #ccc;
        }
</style>