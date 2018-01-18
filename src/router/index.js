import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import routerConfig from './mapping'

export default new Router({
  routes: routerConfig
})
