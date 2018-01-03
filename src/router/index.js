import Vue from 'vue'
import Router from 'vue-router'
import Today from '@/views/today/today'
import Test from '@/views/test/test'
import Health from '@/views/health/health'
import us from '@/views/us/us'
import H_a_publish from '@/views/health/a_publish'
import H_b_publish from '@/views/health/b_publish'
import H_a_detail from '@/views/health/a_detail'
import H_b_detail from '@/views/health/b_detail'
import Result from '@/views/test/result'
import info from '@/views/us/info'
Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/index',
      name: 'Test',
      meta:{
        title:'肥胖测试'
      },
      component: Test
    },
    {
      path: '/',
      name: 'Test',
      meta:{
        title:'肥胖测试',
        keepAlive:true
      },
      component: Test
    },
    {
      path: '/Today',
      name: 'Today',
      meta:{
        title:'今日食谱',
        keepAlive:true
      },
      component: Today
    },
    {
      path: '/Health',
      name: 'Health',
      meta:{
        title:'健康日报',
        keepAlive:true
      },
      component: Health
    },
    {
      path: '/Health/a_publish',
      name: 'Health_Pa',
      meta:{
        title:'发布'
      },
      component: H_a_publish
    },
    {
      path: '/Health/a_detail',
      name: 'Health_d',
      meta:{
        title:'饮食日报'
      },
      component: H_a_detail
    },
    {
      path: '/Health/b_publish',
      name: 'Health_Pb',
      meta:{
        title:'发布'
      },
      component: H_b_publish
    },
    {
      path: '/Health/b_detail',
      name: 'Health_d',
      meta:{
        title:'综合日报'
      },
      component: H_b_detail
    },
    {
      path: '/Test',
      name: 'Test',
      meta:{
        title:'肥胖测试'
      },
      component: Test
    },
    {
      path: '/Test/result',
      name: 'result',
      meta:{
        title:'评估结果'
      },
      component: Result
    },
    {
      path: '/us',
      name: 'us',
      meta:{
        title:'个人中心',
        keepAlive:true
      },
      component: us
    },
    {
      path: '/us/info',
      name: 'info',
      meta:{
        title:'个人资料'
      },
      component: info
    },
  ]
})
