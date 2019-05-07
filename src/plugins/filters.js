import Vue from 'vue'
import moment from 'moment';

//this is a filter for dates
Vue.filter('formatDate', function(created_at) {
    if(created_at) {
      const date = new Date(created_at)  
      return moment(date).format('MM/DD/YYYY')
    }
});

// this is a function use to format phone numbers on forms
export function formatNumber(value) {
  if(value && parseFloat(value) > 100000000) {
    value = value.replace(/[^0-9]/g, '')
                  .replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')    
    return value
  }
  return value
}