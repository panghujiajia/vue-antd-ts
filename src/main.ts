import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './directive/acl-role.directive';
import './styles/common.less';

import { idEncrypt, mobileEncrypt } from './utils/tools.util';
// 手机号脱敏
Vue.filter('mobileEncrypt', (val: string) => mobileEncrypt(val));
// 身份证脱敏
Vue.filter('idEncrypt', (val: string) => idEncrypt(val));
Vue.config.productionTip = false;

new Vue({
	router,
	store,
	render: h => h(App),
}).$mount('#app');
