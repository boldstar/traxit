import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VeeValidate from 'vee-validate';
import moment from 'moment';
import VueCharts from 'vue-chartjs';
import jQuery from 'jquery';
import Popper from 'popper.js'
import 'bootstrap/dist/css/bootstrap.css';
import { Button } from 'bootstrap-vue/es/components';
import { abilitiesPlugin } from '@casl/vue';
import { ability } from './utils/ability';
global.jQuery = jQuery;
global.Popper = Popper;
let Bootstrap = require('bootstrap');


import Default from './layouts/Default.vue';
import Landing from "./layouts/Landing.vue";
import Admin from "./layouts/Admin.vue";
import Breadcrumb from "./components/Breadcrumb.vue";

Vue.component('default-layout', Default);
Vue.component('landing-layout', Landing);
Vue.component('admin-layout', Admin);
Vue.component('breadcrumb', Breadcrumb);

Vue.config.productionTip = false;
Vue.use(Button);
Vue.use(VeeValidate);
Vue.use(VueCharts);
Vue.use(abilitiesPlugin, ability);

Vue.filter('formatDate', function(created_at) {
  if(created_at) {
    return moment(String(created_at)).format('MM/DD/YYYY')
  }
});



router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.getters.loggedIn) {
      next({
        path: '/login',
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresVisitor)) {
    // this route requires auth, check if logged in
    // if yes, redirect to home page.
    if (store.getters.loggedIn) {
      next({
        path: '/',
      })
    } else {
      next()
    }
  }
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
