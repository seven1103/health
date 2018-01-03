/**
 * 自定义指令库
 * @author seven
 * @date 2017.12.27
 */

/**
 * @desc 注册一个全局自定义指令 v-focus
 */
let focus = {
    inserted:function(el,binding){
        el.focus(); 
    }
}

/**
 * 
 */

 // 载入
export { focus }