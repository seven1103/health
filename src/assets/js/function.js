//这里是公共使用函数
class S{
    constructor(){
        this.author = 'seven';
        this.HOST = '';
        this.API = {
            UINFO:this.HOST + '/user/user_info/',//获取个人信息
            FREEAPPLY:this.HOST + '/user/apply_free_consultation/',//申请免费咨询
            RECIPELIST:this.HOST + '/user/today_recipes/',//我的食谱列表
            DDAILYLIST:this.HOST + '/user/dietetic_daily_list/',//我的饮食日报列表
            PDDAILY:this.HOST + '/user/create/dietetic_daily/',//发布饮食日报
            DDAILYDETAIL:this.HOST + '/user/get/dietetic_daily_info/<diet_id>/',//饮食日报详情
            CDAILYLIST:this.HOST + '/user/get/user_comprehensive_daily/',//我的综合日报列表
            CDAILYDETAIL:this.HOST + '/user/get/user_comprehensive_info/<comprehensive_id>/',//综合日报详情
            PCDAILY:this.HOST + '/user/add_comprehensive_daily/',//添加综合日报
            OTEST:this.HOST + '/user/obesity_test/',//肥胖测试
            UPLOAD:this.HOST + '/user/files_upload/',//文件上传接口
            UPDATEINFO:this.HOST + '/user/update_user/',//修改个人资料
        }
    };
    /**
     * 检查字符串出现的次数
     */
    patch(re,s){
        re = eval("/"+re+"/g");
        return s.match(re).length;
    };
    patch_x(s){
        return s.match(/\//g).length;
    };
    test(){
        console.log('this is a test');
    };
    /**
     * 类上与jq的siblings方法
     */
    siblings(elm){
        var a = [];
        var p = elm.parentNode.children;
        for(var i =0,pl= p.length;i<pl;i++) {
            if(p[i] !== elm) a.push(p[i]);
        }
        return a;
    };
    /**
     * 文件预览预处理
     */
    onFileChange(e,self){
        var files = e.target.files || e.dataTransfer.files;
        if (!files.length)return; 
        this.createImage(files,self);
    };
    /**
     * self为当前父元素，指向this的图片数组
     */
    createImage(file,self){
        if(typeof FileReader==='undefined'){
            alert('您的浏览器不支持图片上传，请升级您的浏览器');
            return false;
        }
        let image = new Image(),
        leng = file.length;
        for(let i=0;i<leng;i++){
            let reader = new FileReader();
            reader.readAsDataURL(file[i]);
            reader.onload = function(e){
                self.push(e.target.result);
            }
        }

    }
    /**
     * 时间格式转换
     */
    transDate(timed){
        let date = new Date(timed*1000),
        days = parseInt((new Date().getTime() - timed*1000) / 86400000),
        today = new Date().getDate(),
        day = date.getDate(),
        year = date.getFullYear(),
        mouth = date.getMonth(),
        offset = Math.abs(today - day),
        result;
        if (days < 4&&offset<3) {
    　　　　　　　if (offset === 0) {
            result = "今天";
            } else if (offset === 1) {
            result = "昨天";
            } else if (offset === 2) {
            result = "前天";
            }
        } else {
            result = year + "-" + mouth + "-" + day;
        }
        return result;
    }
    /**
     * 返回前三天的对象
     * @list1 前三天数组
     * @list2 其后数组
     * @obj 返回数据待处理
     */
    Getlately(obj,list1,list2){
        // let obj = [{id:651456545,timed:1513555680},{id:651456544,timed:1513327383}]
        // let list1 = {today:'',yesterday:'',beforyes:''}
        // let list2 = [];
        obj.forEach(item=>{
            let key = this.transDate(item.timed);
            switch (key) {
                case '今天':
                    list1.today = item;
                    break;
                case '昨天':
                    list1.yesterday = item;
                    break;
                case '前天':
                    list1.yesterday = item;
                    break;
                default:
                    item.timed = this.transDate(item.timed);
                    list2.push(item);
                    break;
            }
        })
    }
    
    /**
     * @desc 应用在饮食日报列表和综合日报列表第一次上拉刷新，前三天显示状况数据装载
     * @param {data[array]} 第一次请求数据的列表数组
     */
    replaceData(data,type){
        //判断当前列表类型
        if(type==0){
            if(data.length>0){
                if(data[0].timed!='今天'){data.splice(0,0,{_id:'',ispublish:true,timed:'今天'})}
                if(data[1].timed!='昨天'){data.splice(1,0,{_id:'',ispublish:true,timed:'昨天'})}
                if(data[2].timed!='前天'){data.splice(2,0,{_id:'',ispublish:true,timed:'前天'})}
            }else{
                data.splice(0,3,{_id:'',ispublish:true,timed:'今天'},{_id:'',ispublish:true,timed:'昨天'},{_id:'',ispublish:true,timed:'前天'})
            }
        }else{
            if(data.length>0){
                if(data[0].timed!='今天'){data.splice(0,0,{_id:'',show:false,timed:'今天'})}
                if(data[1].timed!='昨天'){data.splice(1,0,{_id:'',show:false,timed:'昨天'})}
                if(data[2].timed!='前天'){data.splice(2,0,{_id:'',show:false,timed:'前天'})}
            }else{
                data.splice(0,3,{_id:'',show:false,timed:'今天'},{_id:'',show:false,timed:'昨天'},{_id:'',show:false,timed:'前天'})
            }
        }
        return data;
    }
};
//导入对象
//module.exports = new S();
//注册Vue全局插件
export default {install(Vue){ Vue.prototype.S = new S(Vue) }}