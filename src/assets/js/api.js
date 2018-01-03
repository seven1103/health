/**
 * 健康管理接口文件
 * author:seven
 * date:2018.1.2
 */
import axios from 'axios';
import { Toast,Indicator  } from 'mint-ui';

//let HOST = 'https://easy-mock.com/mock/5a4b47388228ba43283e0aa4/example';
let HOST = '/api'

//超时时间
axios.defaults.timeout = 5000

//axios拦截器设置
//http请求拦截器
axios.interceptors.request.use(config => {
    Indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
    });
    return config
},error => {
    Toast('加载超时');
    return Promise.reject(error)
})

//http响应拦截器
axios.interceptors.response.use(data => {
    Indicator.close();
    //判断返回的结果code
    if(data.data.code==0)return data;
    else{Toast('请求出错:'+data.data.mag);return Promise.reject(data.data.mag);}
},error => {
    Indicator.close();
    Toast('服务器报错:'+error);
    return Promise.reject(error);
})

/**
 * @desc 测试使用
 * @type GET
 */
export const TEST = params => { return axios.get(`${HOST}/mock`,params).then(res => res.data)};

/**
 * @desc 获取个人信息
 * @type GET
 * @param {} params 
 */
export const UINFO = params => { return axios.get(`${HOST}/user/user_info/`,params).then(res => res.data)};

/**
 * @desc 申请免费咨询
 * @type POST
 * @param {estimated_times[str],ply_weight[float],name[str],phone[str]} 预计时间(月)，申请减重(KG),姓名，电话  
 */
export const FREEAPPLY = params => { return axios.post(`${HOST}/user/apply_free_consultation/`,params).then(res => res.data)};

/**
 * @desc 我的食谱列表
 * @type GET
 * @param {next_start[str]} 分页页码  
 */
export const RECIPELIST = params => { return axios.get(`${HOST}/user/today_recipes/`,{ params: params }).then(res => res.data)};

/**
 * @desc 我的饮食日报列表
 * @type GET
 * @param {next_start[str]} 分页页码  
 */
export const DDAILYLIST = params => { return axios.get(`${HOST}/user/dietetic_daily_list/`,{ params: params }).then(res => res.data)};

/**
 * @desc 发布饮食日报
 * @type POST
 * @param {type[int],content[str],images[list]} 类别：[0=早餐/1=午餐/2=晚餐],内容，饮食图片资料数组
 */
export const PDDAILY = params => { return axios.post(`${HOST}/user/create/dietetic_daily/`).then(res => res.data)}

/**
 * @desc 饮食日报详情
 * @type GET
 * @param {diet_id[str]} 饮食日报ID
 */
export const DDAILYDETAIL = params => { return axios.get(`${HOST}/user/get/dietetic_daily_info/<diet_id>/`).then(res => res.data)} 

/**
 * @desc 我的综合日报列表
 * @type GET
 * @param {next_start[str]} 分页起始ID 默认值: null
 */
export const CDAILYLIST = params => { return axios.get(`${HOST}/user/get/user_comprehensive_daily/`,{ params: params }).then(res => res.data)}

/**
 * @desc 综合日报详情
 * @type GET
 * @param {comprehensive_id[str]} 用户ID
 */
export const CDAILYDETAIL = params => { return axios.get(`${HOST}/user/get/user_comprehensive_info/<comprehensive_id>/`).then(res => res.data)}

/**
 * @desc 添加综合日报
 * @type POST
 * @param {weight[double],waist[double],day[long],images[str]} 体重，腰围，时间戳，运动量图片
 */
export const PCDAILY = params => { return axios.post(`${HOST}/user/add_comprehensive_daily/`).then(res=> res.data)}

/**
 * @desc 肥胖测试
 * @type POST
 * @param {sex[int],age[int],height[int],local_weight[double],sport[str]} 性别，年龄，身高，体重，运动量
 */
export const OTEST = params => { return axios.post(`${HOST}/user/obesity_test/`).then(res => res.data)}

/**
 * @desc 文件上传接口
 * @type POST
 * @param {images[list]} 图片数组
 */
export const UPLOAD = params => { return axios.post(`${HOST}/user/files_upload/`).then(res => res.data)} 

/**
 * @desc 修改个人资料
 * @type POST
 * @param {avatar[str],name[str],sex[int],phone[str],address[str]} 头像，姓名，性别，电话，地址
 */
export const UPDATEINFO = params => { return axios.post(`${HOST}/user/update_user/`).then(res => res.data)} 