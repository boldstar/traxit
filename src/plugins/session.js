import store from '../store/store'

const moment  = require('moment')
const axios = require('axios')

// used to check expiration of access token, if expired destroy token else continue.
export function destroyToken() {
    // get current date stored in local storage
    const expiresOn = localStorage.getItem('expires_on')
    // create current date to compare too
    const formDate = new Date(expiresOn)
    const expiresDate = moment(formDate).format('YYYYMMDDHHMMSS')
    // dont check date if expiresOn is null
    if(expiresOn == null) return;
    const current = new Date(moment())
    const currentDate = moment(current).format('YYYYMMDDHHMMSS')
    // if current date exceed expired date destroy token else don't
    if(currentDate >= expiresDate) {
        return true
    } else {
        return false
    };
}

// use to destroy session if logged out
export function  destroySession() {
    // I will use this to remove any local storage Items
    localStorage.removeItem('access_token')
    localStorage.removeItem('expires_on')
    localStorage.removeItem('role')
    localStorage.removeItem('rules')
    localStorage.removeItem('browser_history')
    return
}


// used to start the session when user logs in
export function  startSession(response) {
    // I will use this to create the app session just dont know how yet
    const token = response.data.rules.access_token
    const fqdn = response.data.fqdn
    const role = response.data.role[0][0].name
    // if token and fqdn are available set local storage items and return true
    if(token != null || token != undefined && fqdn != null || fqdn != undefined) {
    localStorage.removeItem('fqdn_api_url')
    const date = new Date(moment().add(1, 'day').toDate());
    localStorage.setItem('fqdn_api_url', fqdn)
    localStorage.setItem('expires_on', date);
    localStorage.setItem('role', role)
    // I have to set the base url here because it wont pick up the localStorage change until the page is refreshed
    // So only setting globally at this point does not work
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
    axios.defaults.baseURL = 'http://' + response.data.fqdn + '/api'
    return true
    // if data is not available return false.
    } else {
        return false
    }
}

export function trialPeriod(date) {

     const trialDate = new Date(date)
     const trialEndsOn = moment(trialDate).format('YYYYMMDDHHMMSS')

     const current = new Date(moment())
     const currentDate = moment(current).format('YYYYMMDDHHMMSS')

     if(currentDate >= trialEndsOn) {
         return false
     } else {
         return true
     };
}

export function checkIfExpired() {
     // get current date stored in local storage
     const expiresOn = JSON.parse(localStorage.getItem('rubex_access_tokens'))['.expires']
     // create current date to compare too
     const formDate = new Date(expiresOn)
     const expiresDate = moment(formDate).format('YYYYMMDDHHMMSS')
     // dont check date if expiresOn is null
     if(expiresOn == null) return;
     const current = new Date(moment())
     const currentDate = moment(current).format('YYYYMMDDHHMMSS')
     // if current date exceed expired date destroy token else don't
     const diff = expiresDate - currentDate 
     if(diff < 5000 && diff > 0) {
         store.dispatch('getRefreshToken')
         console.log('requested refresh token')
         return
     } else if(diff < 0) {
         store.dispatch('notifyRubexAdmins')
         console.log('connection expired')
         return
     } else {
         console.log('still good')
         return
     }
}