const moment  = require('moment')
module.exports = {
    destroyToken: () => {
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
    },

    destroy: () => {
        // I will use this to remove any local storage Items
    },

    start: () => {
        // I will use this to create the app session just dont know how yet
    }
}