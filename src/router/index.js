import Vue from 'vue'
import Router from 'vue-router'

/**
 * 安装路由插件
 */
Vue.use(Router)

import routerConfig from './mapping'

/**
 * 导出路由实例
 */
export default new Router({
  routes: routerConfig
})
