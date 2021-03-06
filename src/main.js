import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from '@/router'
import axios from '@/api'
import MyPlugin from '@/components'
import '@/style/index.less'

Vue.prototype.$http = axios

Vue.use(ElementUI)
Vue.use(MyPlugin)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
