import Vue from 'vue'
import moment from 'moment';

//this is a filter for dates
Vue.filter('formatDate', function(created_at) {
    if(created_at) {
      const date = new Date(created_at)  
      return moment(date).format('MM/DD/YYYY')
    }
});

// this is a function use to format phone numbers on the form.vue component
export function formatNumber(value) {
  //regex removes special characters and white space so that the number can be compared
  var number = value.replace(/[^a-zA-Z0-9 ]/g, "").replace(/\s+/g,'' ).replace(/^\s/,'').replace(/\s$/,'')
  if(value.indexOf(',') > 0) return value
  if(value && parseFloat(number) > 100000000) {
    if(isNaN(value) && value.indexOf(',') > 0) return value
    value = value.replace(/[^0-9]/g, '')
                  .replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')    
    return value
  }
  return value
}

//this function formats dates on the form.vue component
export function formatDob(value) {
  //regex removes special characters and white space so that the number can be compared
  var number = value.replace(/[^a-zA-Z0-9 ]/g, "").replace(/\s+/g,'' ).replace(/^\s/,'').replace(/\s$/,'')
  if(value.indexOf(',') > 0) return value
  if(value && parseFloat(number) < 100000000) {
    if(isNaN(value)) return value
    value = value.replace(/[^0-9]/g, '')
                  .replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3')
    return value;
  }
  return value
}

export function formatFileName(name) {
  const index = name.indexOf('.')
  return name.slice(index + 1)
}