<template>
    <div class="health">
        <div class="tab">
            <span :class="{'active':tab == 0}" @click="clicktab(0)">饮食日报</span>
            <span :class="{'active':tab == 1}" @click="clicktab(1)">综合日报</span>
        </div>
        <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">
                <div class="item" :class="{'active':tab == 0}">
                    <ul class="s-table-view">
                        <!-- 遍历列表 -->
                        <li class="s-table-view-cell" v-for="(item,index) in pagelist[0]"  @click="to_detail(0,item._id)">
                            <span><img src="../../assets/images/r.png" alt="">{{item.timed}}</span>
                            <div class="r-part">
                                    <span @click="publish(0)" v-show="item.ispublish==true&&index==0" class="pbtn">发布</span>
                                    <span v-show="item.ispublish==true&&index!=0" class="warn">未报</span>
                                    <span v-show="!item.ispublish">已报</span>
                            </div>
                        </li>
    
                    </ul>
                </div>
                <div class="item" :class="{'active':tab == 1}">
                       <div class="today">
                            <span>原始体重:<small>{{local_weight}}KG</small></span>
                            <!-- <span>已减重:<small>2.6KG</small></span> -->
                            <span v-show="arrange_weight>0">已减重:<small>{{arrange_weight}}KG</small></span>
                            <span v-show="arrange_weight<0" class="warn">已超重:<small>{{Math.abs(arrange_weight)}}KG</small></span>
                            <span>今日体重:<small>{{today_weight}}KG</small></span>
                       </div>
                       <ul class="s-table-view">
                            <!-- 列表渲染 -->
                            <li class="s-table-view-cell" v-for="(item,index) in pagelist[1]" @click="to_detail(1,item._id)">
                                <span><img src="../../assets/images/c.png" alt="">{{item.timed}}</span>
                                <div class="r-part">
                                        <span class="pbtn" v-show="index==0">发布</span>
                                        <span class="warn" v-show="item.show==false&&index!=0">未报</span>
                                        <span v-show="item.weight">体重{{item.weight}} 
                                            <small v-if="item.arrange_weight>0" class="reduce">-{{item.arrange_weight}}KG</small>
                                            <small v-else class="add">+{{Math.abs(item.arrange_weight)}}KG</small>
                                        </span>
                                </div>
                            </li>
                       </ul>
                </div>
            </mt-loadmore>
        <div class="addcontent"></div>
    </div>
</template>
<script>
    import { DDAILYLIST, CDAILYLIST } from '../../assets/js/api.js'
    import { Toast} from 'mint-ui';
    export default{
        data(){
            return{
                tab:0,
                pagelist:[[],[]],
                next_start:[0,0],
                allLoaded:false,
                local_weight:'',
                today_weight:'',
                arrange_weight:'',
                lateList:[{
                    today:'',
                    yesterday:'',
                    beforyes:''
                },{
                    today:'',
                    yesterday:'',
                    beforyes:''
                }],
            }
        },
        mounted(){
            this.loadPageList(0)
        },
        methods:{
            clicktab(ev){
                this.tab = ev;
                if(ev==1&&this.next_start[1]==0&&this.next_start[1]==0){
                    this.loadPageList(1);
                }
            },
            loadPageList(tab){
                if(tab==0){
                    DDAILYLIST({next_start:this.next_start[0]}).then(data => {
                        let arr = data.result;
                        if(data.result.length>0){
                            arr.forEach(item => {
                                item.timed = this.S.transDate(item.timed);
                            })
                        }else{
                            Toast('已经到底了')
                        }
                        //判断当前是否第一次拉取tab0数据
                        if(this.pagelist[0].length==0){
                            this.pagelist[0] = this.S.replaceData(this.pagelist[0],0)
                        }else{
                            arr.forEach(item => {
                                this.pagelist[0].push(item);
                            })
                        }
                    })
                }else{
                    CDAILYLIST({next_start:this.next_start[1]}).then(data => {
                        let arr = data.comprehensive;
                        if(data.comprehensive.length>0){
                            arr.forEach(item => {
                                item.timed = this.S.transDate(item.timed);
                            })
                        }else{
                            Toast('已经到底了')
                        }
                        //判断是否是第一次拉取tab1数据
                        if(this.pagelist[1].length==0){
                            //获取历史体重、今日体重、增减体重
                            this.arrange_weight = data.arrange_weight;
                            this.local_weight = data.local_weight;
                            this.today_weight = data.today_weight;
                            this.pagelist[1] = this.S.replaceData(this.pagelist[1],1)
                        }else{
                            arr.forEach(item => {
                                this.pagelist[1].push(item);
                            })
                        }
                    })
                }
            },
            loadBottom(){
                if(this.tab==0){
                    this.loadPageList(0);
                }else{
                    this.loadPageList(1);
                }
                this.$refs.loadmore.onBottomLoaded();
            }
        }
    }
</script>
<style scoped>
        .health{
            height: 100vh;
            background: #fff;
        }
        .tab{
            display: flex;
            position: relative;
        }
        .tab:after{
            position: absolute;
            right: 0;
            bottom: 0;
            left: 0;
            height: 1px;
            content: '';
            -webkit-transform: scaleY(.5);
            transform: scaleY(.5);
            background-color: #ccc;
        }
        .tab>span{
            display: inline-block;
            width: 50vw;
            text-align: center;
            padding: 2vh;
            position: relative;
        }
        .tab>span.active{
            color: rgb(51,196,157);
            border-bottom: 1.5px solid rgb(51,196,157);
        }
        .tab>span:nth-child(1):after{
            content:"";
            width:1px;
            height:100%;
            -webkit-transform: scaleX(.5);
            transform: scaleX(.5);
            position:absolute;
            top:0;
            right:0;
            background-color: #ccc;
        }
        .today{
            font-size: 0.8rem;
            display: flex;
            justify-content: space-between;
            color: #999;
            line-height: 6vh;
            padding: 0 5vw;
        }
        .today small{
            margin-left: 0.5vh;
        }
        .today>span:nth-child(2){
            color:rgb(51,196,157);
        }
        .today>span:nth-child(2)>small{
            font-weight: 800;
            font-size: 1rem;
        }
        .item{
            display: none;
        }
        .item.active{
            display: block;
        }
        span.pbtn{
            background-color: rgb(51,196,157);
            color: #fff !important;
            padding: 0.8vh 3vw;
        }
        .r-part>span{
            color: #ccc;
            font-size: 0.88em;
        }
        .r-part>span:nth-child(2)>small.reduce{
            color: rgb(51,196,157);
            font-size: 1em;
        }
        .r-part>span:nth-child(2)>small.add{
            color: rgb(234,128,128);
            font-size: 1em;
        }
    </style>