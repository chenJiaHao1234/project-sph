import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/mock/mockServe'
import {Button, MessageBox} from 'element-ui'
Vue.component(Button.name, Button)
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  beforeCreate(){
		Vue.prototype.$bus = this	//安装全局事件总线
	},
}).$mount('#app')
