import Vue from 'vue'
import moment from 'moment';

//this is a filter for dates
Vue.filter('formatDate', function(created_at) {
    if(created_at) {
      const date = new Date(created_at)  
      return moment(date).format('MM/DD/YYYY')
    }
});