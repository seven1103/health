/**
 * @desc 通用过滤器文件
 * 
 * 
 * @author seven
 * 
 * 
 * @date 2017-12-26
 * 
 * 
 */



/**
 * @desc 图片预载过滤器
 * @param {String} src
 * @return {String}
 */
let filSrc = src => {
    let srcApi = '/static/'
    //判断当前图片是否是是本地服务器的图片类型
    let len = src.split('http');
    let lan = src.split('base64,');//图片预览情况
    if(len.length>1 || lan.length>1){
        return src;
    }else{
        return srcApi + src;
    }
}

/**
 * 测试
 */
let test = a => {
    return '过滤了'+ a;
}

/**
 * @desc 手机号码过滤器
 * @params {Number} num
 *  
 */
let checkPhone = num => {
    let reg = /^1[3|4|5|8][0-9]\d{4,8}$/;  
    if(!reg.test($.trim(phone))){  
      $("#tip").html("请输入有效的手机号！");  
    }else{  
       $("#tip").html("");  
    } 
}

// 载入
export { filSrc , test , checkPhone}