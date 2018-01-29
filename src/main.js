// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import echarts from 'echarts'

import {http} from './common/http'

Vue.config.productionTip = false

/**
 * 注册全局的http对象
 */
Vue.prototype.$http = http

/**
 * 注册全局的echarts图表
 */
Vue.prototype.$echarts = echarts;


/**
 * 切换路由之前先验证权限
 */
router.beforeEach((to,from,next) =>{
  if(to.meta && to.meta.requireAuth){
    http('get','https://mlogin.hc360.com/get/ssohelper',{
      
    }).then((res) =>{
      if(res.islogin && res.islogin>0){
        //给路由传递参数（用户级别）
        to.query.level = res.usersession.userlevel;
        next()
      }else{
        location.href="https://mlogin.hc360.com/login.html?flag=m&ReturnURL=http://mlogin.hc360.com/manager/mindex.html"
      }
    })
  }else{
    next();
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
