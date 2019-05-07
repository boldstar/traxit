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
  var number = value.replace(/[^a-zA-Z0-9 ]/g, "").replace(/\s+/g,'' ).replace(/^\s/,'').replace(/\s$/,'')
  console.log(parseFloat(number))
  if(value && parseFloat(number) > 100000000) {
    value = value.replace(/[^0-9]/g, '')
                  .replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')    
    return value
  }
  return value
}

export function formatDob(value) {
  var number = value.replace(/[^a-zA-Z0-9 ]/g, "").replace(/\s+/g,'' ).replace(/^\s/,'').replace(/\s$/,'')
  if(value && parseFloat(number) < 100000000) {
    value = value.replace(/[^0-9]/g, '')
                  .replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3')
    return value;
  }
  return value
}