import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VeeValidate from 'vee-validate';
import moment from 'moment';
import VueCharts from 'vue-chartjs';
import jQuery from 'jquery';
import Popper from 'popper.js';
import VueCarousel from 'vue-carousel';
import VCalendar from 'v-calendar';
import 'v-calendar/lib/v-calendar.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { Button } from 'bootstrap-vue/es/components';
import { abilitiesPlugin } from '@casl/vue';
import { ability } from './ability';
global.jQuery = jQuery;
global.Popper = Popper;

//this is importing the global layout and breadcrumb files
import Default from './layouts/Default.vue';
import Landing from "./layouts/Landing.vue";
import Admin from "./layouts/Admin.vue";
import ResetPassword from "./layouts/ResetPassword.vue";
import Breadcrumb from "./components/Breadcrumb.vue";

//these are global layout components and global breadcrumb
Vue.component('default-layout', Default);
Vue.component('landing-layout', Landing);
Vue.component('admin-layout', Admin);
Vue.component('reset-layout', ResetPassword);
Vue.component('breadcrumb', Breadcrumb);

//this is registering third party packages
Vue.config.productionTip = false;
Vue.use(Button);
Vue.use(VeeValidate);
Vue.use(VueCharts);
Vue.use(VueCarousel);
Vue.use(abilitiesPlugin, ability);
Vue.use(VCalendar, {
  firstDayOfWeek: 2,  // 2 = Monday
  //defaults go here
});

//this is a filter for dates
Vue.filter('formatDate', function(created_at) {
  if(created_at) {
    return moment(String(created_at)).format('MM/DD/YYYY')
  }
});


//this is route protection
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
  }else if (to.matched.some(record => record.meta.requiresVisitor)) {
    // this route requires auth, check if logged in
    // if yes, redirect to home page.
    if (store.getters.loggedIn) {
      next({
        path: '/',
      })
    } else {
      next()
    }
  } else if(to.matched.some(record => record.meta.passwordReset)) {
    if(store.getters.loggedIn || !store.getters.loggedIn) {
      next()
    }
  }
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
