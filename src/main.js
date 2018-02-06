// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import {InfiniteScroll,Spinner,TabContainer, TabContainerItem,Toast} from 'mint-ui';
import axios from 'axios';
import App from './App'
import router from './router'
import echarts from 'echarts'
import http from './common/http';
import store from './store';

/**引入mint ui组件库和样式 */
import 'mint-ui/lib/style.css'
Vue.use(InfiniteScroll);
Vue.component(Spinner.name, Spinner);
Vue.component(TabContainer.name, TabContainer);
Vue.component(TabContainerItem.name, TabContainerItem);
Vue.config.productionTip = false;


/**
 * 注册全局的http对象
 */
Vue.prototype.$http = http

/**
 * 注册全局的echarts图表
 */
Vue.prototype.$echarts = echarts;

// 全局注册提示信息的方法
Vue.prototype.$toast=(mes)=>{
  Toast({
    message: mes,
    position: "middle",
    duration: 5000
  });
},



/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})


/**
 * 切换路由之前先验证权限
 */
router.beforeEach((to,from,next) =>{
  if(to.meta && to.meta.requireAuth){
    http('get','https://mlogin.hc360.com/get/ssohelper',{
      
    }).then((res) =>{
      if(res.islogin && res.islogin>0){
        if(res.isbuy && res.isbuy>0){
          //给路由传递参数（用户级别）
          to.query.level = res.usersession.userlevel;
          next()
        }else{
          //未购买进入宣传页
          location.href="#/notice"
        }
      }else{//未登录进入登录页
        location.href="https://mlogin.hc360.com/mobilemmt/login.html"
      }
    })
  }else{
    next();
  }
})

