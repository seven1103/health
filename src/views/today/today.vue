<template>
        <div>
                <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">
                        <ul class="s-table-view">
                                <li v-for="item in pageList" class="s-table-view-cell">
                                <span><img src="../../assets/images/f.png" alt="">{{item.timed}}</span>
                                <i class="iconfont icon-xiala" @click="Fold($event)"></i>
                                <div class="method hide">
                                        <p>{{item.content||'无'}}</p>
                                </div>
                                </li>
                                <!-- <li class="s-table-view-cell">
                                <span><img src="../assets/images/f.png" alt="">今天</span>
                                <i class="iconfont icon-xiala" @click="Fold($event)"></i>
                                <div class="method hide">
                                        <p>南瓜鸡蛋饼:用料：南瓜350克，面粉100克，糯米粉50克，鸡蛋2个，水约150毫升，生姜，葱适量；</p>
                                        <p>家常肉饼:材料：面粉200克，瘦肉200克，香菇50克，鸡蛋1个，葱25克，姜，胡椒粉，芝麻油，生抽各少许。</p>
                                </div>
                                </li> -->
                                
                                <!-- <li style="text-align: center;" v-if="pageList.length==0">暂无数据</li> -->
                        </ul>
                </mt-loadmore>
                <div class="addcontent"></div>
        </div>
</template>
<script>
        import { RECIPELIST } from '../../assets/js/api.js'
        import { Toast} from 'mint-ui';
        export default{
                data(){
                        return {
                                data: [],
                                busy: false,
                                allLoaded:false,
                                param:{next_start:0},
                                pageList:[],
                        }
                },
                mounted(){
                        this.loadPageList()
                },
                methods:{
                        Fold(ev){
                                let self = ev.target;
                                let fold = self.parentNode.getElementsByClassName('method')[0];
                                //通过箭头判断当前是否展开
                                if(!self.classList.contains('active')){
                                        self.classList.add('active'); 
                                //    fold.classList.remove('hide');   
                                //    fold.classList.add('show');
                                }else{
                                        self.classList.remove('active'); 
                                        // fold.classList.remove('show');
                                        // fold.classList.add('hide');
                                }
                                var height = fold.getBoundingClientRect().height
                                if (!!height) {
                                        fold.style.height = height + 'px'
                                        var f = document.body.offsetHeight
                                        fold.style.height = '0px'
                                } else {
                                        fold.style.height = 'auto'
                                        height = fold.getBoundingClientRect().height
                                        fold.style.height = '0'
                                        var f = document.body.offsetHeight
                                        fold.style.height = height + 'px'
                                }
                        },
                        loadTop(){
                                let param = {next_start:0};
                                RECIPELIST(param).then(data => {
                                        if(data.result.length>0){
                                                //判断当前pageList是否为空，将返回的第一个数据插入到pageList开头(更新只更新当天的一条)
                                                if(this.pageList.length>0){
                                                        //判断是否为最新
                                                        if(data.result[0].timed==this.pageList[0]){ Toast('当前已是最新数据') }
                                                        else{ data.result[0].timed = this.S.transDate(data.result[0].timed);this.pageList[0] = data.result[0] }
                                                }else{
                                                        let arr =  data.result;
                                                        arr.forEach(item => {
                                                                item.timed = this.S.transDate(item.timed);
                                                                this.pageList.push(item);
                                                        })
                                                }
                                        }else{
                                                Toast('暂无数据');
                                        }
                                        this.$refs.loadmore.onTopLoaded();
                                })
                        },
                        loadBottom(){
                                // 上拉加载  
                                this.loadPageList();// 上拉触发的分页查询  
                                this.$refs.loadmore.onBottomLoaded();// 固定方法，查询完要调用一次，用于重新定位
                        },
                        loadPageList(){
                                RECIPELIST(this.param).then(data => {
                                        if(data.result.length>0){
                                                this.param.next_start = this.param.next_start +1;
                                                let arr = data.result;
                                                arr.forEach(item => {
                                                        item.timed = this.S.transDate(item.timed);
                                                        this.pageList.unshift(item);
                                                });
                                        }else{
                                                this.allLoaded = true;
                                                Toast('已经到底了')
                                        }
                                })
                        }
                }
        }
</script>
<style scoped>
.mint-loadmore{
        height: 90vh;
}
.method{
        height: 0;
        overflow: hidden;
        padding-left: 10vw;
        text-align: justify;
        transition: height .5s;
        -moz-transition: height .5s;	/* Firefox 4 */
        -webkit-transition: height .5s;	/* Safari 和 Chrome */
        -o-transition: height .5s;	/* Opera */
}
/* .method.hide{
        height: 0;
        overflow: hidden;
}
.method.show{
        height: auto;
} */
li.s-table-view-cell i.iconfont{
        float: right;
}
i.iconfont:before{
        color: rgb(51,196,157);
        line-height: 7vh;
}
i.iconfont{
        transition: all 0.5s;
        -moz-transition: all 0.5s;	/* Firefox 4 */
        -webkit-transition: all 0.5s;	/* Safari 和 Chrome */
        -o-transition: all 0.5s;	/* Opera */
}
i.iconfont.active{
        transform: rotate(180deg);
        transform-origin: 50%;
}
i.iconfont.active:before{
        color: #ccc;
}
.method p{
        font-size: 0.8rem;
        margin-top: 1.5vh;
}
</style>
