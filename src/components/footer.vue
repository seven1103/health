<template>
        <ul class="footer">
            <li @click="router('Today',0)" :class="{'active':isActive == 0}">
                <!-- <i class="iconfont  icon-book"></i> -->
                <img src="../assets/images/nav1.png" alt="">
                <img src="../assets/images/nav1_active.png" alt="">
                <span>今日食谱</span>
            </li>
            <li @click="router('Health',1)" :class="{'active':isActive == 1}">
                <!-- <i class="iconfont  icon-ribao"></i> -->
                <img src="../assets/images/nav2.png" alt="">
                <img src="../assets/images/nav2_active.png" alt="">
                <span>健康日报</span>
            </li>
            <!-- <li @click="router('Test',2)" :class="{'active':isActive == 2}">
                <i class="iconfont  icon-feipangzu"></i>
                <img src="../assets/images/nav3.png" alt="">
                <img src="../assets/images/nav3_active.png" alt="">
                 <span>肥胖测试</span>
            </li> -->
            <li @click="router('us',3)" :class="{'active':isActive == 3}">
               <!-- <i class="iconfont  icon-gerenzhongxin"></i> -->
               <img src="../assets/images/nav4.png" alt="">
               <img src="../assets/images/nav4_active.png" alt="">
                 <span>个人中心</span>
            </li>
        </ul>
    </template>
    <script>
        export default{
            name:'footers',
            data(){
                return{
                    isActive:0 //默认第三个显示,
                }
            },
            mounted:function(){
                //页面发生刷新之后，从新判断当前位置
                this.change();
            },
            methods:{
                router(path,ev){
                    this.isActive = ev;
                    this.$router.push(path)
                },
                change(){
                    let arr = {'index':2,'us':3,'Health':1,'Today':0,'':0,'Test':2},
                    value = this.$route.path.split('/')[1];
                    this.isActive = arr[value];
                }
            },
            watch:{
                "$route":function(){
                    this.change();
                }
            }
        }
    </script>
    <style scoped>
        ul.footer{
            position: fixed;
            bottom: 0;
            width: 100%;
            background: #fff;
            display: table;
        }
        ul.footer li{
           list-style: none;
           text-align: center;
           display: table-cell;
           padding-top: 1vh;
        }
        ul.footer li>img{
            height: 4vh;
        }
        ul.footer li>img:nth-child(2){
            display: none;
        }
        ul.footer li.active>img:nth-child(1){
            display: none;
        }
        ul.footer li.active>img:nth-child(2){
            display: initial;
        }
        ul.footer li.active{
            color: rgb(51,196,157);
        }
        ul.footer>li>span{
            display: block;
            font-size: 0.8rem;
        }
    </style>