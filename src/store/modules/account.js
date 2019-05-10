import axios from 'axios'

export default {
    state: {
        account: '',
        subscribe: null
    },
    getters: {
        accountDetails(state) {
            return state.account
        },
        subscribeView(state) {
          return state.subscribe
        },
    },
    mutations: {
        accountDetails(state, account) {
            state.account = account[0]
        },
        addAccountDetails(state, account) {
            state.account = account
        },
        updateAccountDetails(state, account) {
            state.account = account
        },
        subscribeView(state, data) {
          state.subscribe = data
        },
    },
    actions: {
        getAccountDetails(context) {
            axios.get('/account')
            .then(response => {
              if(typeof(response.data) === 'object') {
                context.commit('accountDetails', response.data)
              } else {
                context.commit('subscribeView', response.data)
              }
            })
            .catch(error => {
              console.log(error.response.data)
            })
        },
        getAccount(context) {
          axios.get('/account')
          .then(response => {
              context.commit('accountDetails', response.data)
            })
            .catch(error => {
              console.log(error.response.data)
            })
        },
        addAccountDetails(context, account) {
            axios.post('/account', {
              business_name: account.business_name,
              email: account.email,
              phone_number: account.phone_number,
              fax_number: account.fax_number,
              address: account.address,
              city: account.city,
              state: account.state,
              postal_code: account.postal_code,
            })
            .then(response => {
              context.commit('addAccountDetails', response.data)
            })
            .catch(error => {
              console.log(error)
            })
        },
        updateAccountDetails(context, account) {
            axios.patch('/account/' +account.id, {
              business_name: account.business_name,
              email: account.email,
              phone_number: account.phone_number,
              fax_number: account.fax_number,
              address: account.address,
              city: account.city,
              state: account.state,
              postal_code: account.postal_code,
            })
            .then(response => {
              context.commit('updateAccountDetails', response.data)
            })
            .catch(error => {
              console.log(error)
            })
        },
        uploadLogo(context, file) {
            context.commit('startProcessing')
            let formData = new FormData();
            formData.append('file', file)
            axios.post('/uploadLogo', formData, { headers: {
              'Content-Type': 'multipart/form-data'
            }})
            .then(res => {
              context.commit('stopProcessing')
              context.commit('addAccountDetails', res.data)
            })
            .catch(err => {
              context.commit('stopProcessing')
              console.log(err.response.data)
            })
        },
    }
}