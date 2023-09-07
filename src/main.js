import Vue from 'vue';
// eslint-disable-next-line import/no-extraneous-dependencies
import ElementUI from 'element-ui';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'element-ui/lib/theme-chalk/index.css';
import App from './app.vue';
import './components';
import './assets/styles/main.less';
import './mixins/global';
import store from './store';
import router from './router';

Vue.config.productionTip = false;
Vue.use(ElementUI);

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount('#app');
