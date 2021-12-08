import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './styles/index.less'

import Vant from 'vant'
import 'vant/lib/index.css'
// 加载动态设置 REM 基准值
// import 'amfe-flexible'
import {
  NavBar,
  Form,
  Field,
  Toast,
  Image,
  Grid,
  GridItem,
  Dialog,
  Tab,
  Tabs,
  List,
  PullRefresh,

} from 'vant';

Vue.use(PullRefresh)
Vue.use(List)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(Dialog)
Vue.use(Grid)
Vue.use(GridItem)
Vue.use(Image)
Vue.use(Toast)
Vue.use(Form);
Vue.use(Field);
Vue.use(NavBar);
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
