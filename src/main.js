// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import {InfiniteScroll,Spinner,TabContainer, TabContainerItem} from 'mint-ui';
import axios from 'axios';
import App from './App'
import router from './router'

//引入全局样式
import './css/global.css';

/**引入mint ui组件库和样式 */
import 'mint-ui/lib/style.css'
Vue.use(InfiniteScroll);
Vue.component(Spinner.name, Spinner);
Vue.component(TabContainer.name, TabContainer);
Vue.component(TabContainerItem.name, TabContainerItem);

Vue.config.productionTip = false;



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

/**将axios挂载到vue原型上 */
Vue.prototype.axios=axios;