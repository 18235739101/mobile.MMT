// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import {InfiniteScroll,Spinner,TabContainer, TabContainerItem,Toast} from 'mint-ui';
import axios from 'axios';
import App from './App'
import router from './router'
import echarts from 'echarts'
import http from './common/http';
import vueAwesomeSwiper from 'vue-awesome-swiper';
import store from './store';

/**引入mint ui组件库和样式 */
import 'mint-ui/lib/style.css'
Vue.use(InfiniteScroll);
Vue.component(Spinner.name, Spinner);
Vue.component(TabContainer.name, TabContainer);
Vue.component(TabContainerItem.name, TabContainerItem);

/**swiper组件 */
import 'swiper/dist/css/swiper.css'
Vue.use(vueAwesomeSwiper);
Vue.config.productionTip = false;



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
    duration: 1500
  });
},


/**
 * 切换路由之前先验证权限
 */
router.beforeEach((to,from,next) =>{
    /**
     * 如果不需要判断是否登录直接跳转路由
     */
    if(to.meta.requireAuth==false){
      next()
      return;
    }
    /**
     * 调用接口判断是否登录
     */
    http('get','https://mlogin.hc360.com/get/ssohelper',{
      
    }).then((res) =>{
        /** 
         * 判断是否登录
         */
        if(res.islogin && res.islogin>0){
          /**
           * 已经购买，判断是否需要小程序授权
           */
          if(res.isbuy && res.isbuy>0){
            //给路由传递参数（用户级别）
            to.query.level = res.usersession.userlevel;
            //是否需要小程序授权
            if(to.meta.requireXCXAuth){
              http('get','//madata.hc360.com/mobileapp/wx/isAuth?callback=',{
                params:{
                  imid:res.usersession.username
                }
              }).then(res1 =>{
                  if(res1.state && res1.state>1){
                      location.href='#/xcxManage/authen'
                  }else{
                      location.href='#/xcxManage/unAuthen'
                  }
              })
            }else{
              next()
            }
          }else{
            /**
             * 未购买进入宣传页
             */
            next('/notice')
          }
        }else{
          /**
           * 未登录进入登录页
           */
          location.href="https://mlogin.hc360.com/mobilemmt/login.html"
        }
    })
  
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})



