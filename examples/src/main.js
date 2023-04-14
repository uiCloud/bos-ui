import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {Switch} from '@bos-ui/bos-ui/src'

import '@bos-ui/bos-ui/dist/theme-default/index.css'

Vue.config.productionTip = false
Vue.use(Switch)

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
