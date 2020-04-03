import axios from 'axios'

export default {
    state: {
      bookkeeping_accounts: null,
      account_modal: false
    },
    getters: {
        bookkeepingAccounts(state) {
          return state.bookkeeping_accounts
        },
        addAccountModal(state) {
            return state.account_modal
        }
    },
    mutations: {
        BOOKKEEPING_ACCOUNTS(state, data) {
          state.bookkeeping_accounts = data
        },
        ADD_BOOKKEEPING_ACCOUNT(state, account) {
            state.bookkeeping_accounts.push(account)
        },
        NEWYEAR_BOOKKEEPING_ACCOUNTS(state, data) {
            state.bookkeeping_accounts = data
        },
        UPDATE_BOOKKEEPING_MONTH(state, data) {
            const index = state.bookkeeping_accounts.findIndex(acct => acct.id == data.id)
            state.bookkeeping_accounts.splice(index, 1, data)
        },
        UPDATE_BOOKKEEPING_ACCOUNT(state, data) {
            const index = state.bookkeeping_accounts.findIndex(acct => acct.id == data.id)
            state.bookkeeping_accounts.splice(index, 1, data)
        },
        DELETE_BOOKKEEPING_ACCOUNT(state, id) {
            const index = state.bookkeeping_accounts.findIndex(acct => acct.id == id)
            state.bookkeeping_accounts.splice(index, 1)
        },
        DELETE_ALL_BOOKKEEPING_ACCOUNTS(state, data) {

        },
        TOGGLE_ACCOUNT_MODAL(state) {
            state.account_modal = !state.account_modal
        }
    },
    actions: {
        getBookkeepingAccounts(context) {
            axios.get('/bookkeeping-accounts')
            .then(response => {
            context.commit('BOOKKEEPING_ACCOUNTS', response.data)
            }).catch(error => {
            console.log(error.response.data)
            })
        },
        addBookkeepingAccount(context, account) {
            context.commit('startProcessing')
            return new Promise((resolve, reject) => {
                axios.post('/bookkeeping-account', account)
                .then(response => {
                    context.commit('stopProcessing')
                    context.commit('TOGGLE_ACCOUNT_MODAL')
                    context.commit('ADD_BOOKKEEPING_ACCOUNT', response.data)
                    context.commit('successAlert', 'New Bookkeeping Account Added')
                    resolve(response)
                }).catch(error => {
                    context.commit('errorMsgAlert', 'Error')
                    context.commit('stopProcessing')
                    console.log(error.response.data)
                    reject(error)
                })
            })
        },
        updateBookkeepingMonth(context, data) {
            context.commit('successAlert', null)
            context.commit('startProcessing')
            axios.patch('/update-bookkeeping-account-month/' + data.id, {
                mth: data.mth
            }).then(response => {
                context.commit('stopProcessing')
                context.commit('UPDATE_BOOKKEEPING_MONTH', response.data)
                context.commit('successAlert', 'Bookkeeping Accout Updated')
            }).catch(error => {
                console.log(error.response.data)
                context.commit('stopProcessing')
                context.commit('errorMsgAlert', 'Error')
            })
        },
        updateBookkeepingAccount(context, account) {
            context.commit('successAlert', null)
            context.commit('startProcessing')
            axios.patch('/bookkeeping-account/' + account.id, account)
            .then(response => {
                context.commit('UPDATE_BOOKKEEPING_ACCOUNT', response.data)
                context.commit('successAlert', 'Bookkeeping Account Updated')
                context.commit('stopProcessing')
            }).catch(error => {
                console.log(error.response.data)
                context.commit('stopProcessing')
                context.commit('errorMsgAlert', 'Error')
            })
        },
        startNewBookkeepingAccountYear(context, data) {
            context.commit('startProcessing')
            return new Promise((resolve, reject) => {
                axios.post('/bookkeeping-account-new-year', data)
                .then(response => {
                    context.commit('stopProcessing')
                    context.commit('NEWYEAR_BOOKKEEPING_ACCOUNTS', response.data)
                    context.commit('successAlert', 'New Year Started For ' + (JSON.parse(data.year) + 1))
                    resolve(response)
                }).catch(error => {
                    context.commit('stopProcessing')
                    context.commit('errorMsgAlert', 'Error')
                    console.log(error.response.data)
                    reject(error)
                })
            })
        },
        deleteBookkeepingAccount(context, id) {
            context.commit('startProcessing')
            axios.delete('/bookkeeping-account/' + id)
            .then(response => {
                context.commit('DELETE_BOOKKEEPING_ACCOUNT', id)
                context.commit('stopProcessing')
                context.commit('successAlert', 'Bookkeeping Account Deleted.')
                context.commit('toggleDeleteModal', null)
            }).catch(error => {
                console.log(error.response.data)
                context.commit('toggleDeleteModal', null)
                context.commit('errorMsgAlert', 'Error')
                context.commit('stopProcessing')
            })
        },
        deleteBookkeepingAccountYear(context, data) {
            context.commit('startProcessing')
            axios.post('/delete-bookkeeping-year',  data)
            .then(response => {
                context.commit('BOOKKEEPING_ACCOUNTS', response.data)
                context.commit('stopProcessing')
                context.commit('successAlert', 'Bookkeeping Year Deleted.')
                context.commit('toggleDeleteModal', null)
            }).catch(error => {
                console.log(error.response.data)
                context.commit('toggleDeleteModal', null)
                context.commit('errorMsgAlert', 'Error')
                context.commit('stopProcessing')
            })
        },
        deleteAllBookkeepingAccounts(context, name) {
            context.commit('startProcessing')
            axios.delete('/all-bookkeeping-accounts/' + name)
            .then(response => {
                context.commit('BOOKKEEPING_ACCOUNTS', response.data)
                context.commit('stopProcessing')
                context.commit('successAlert', 'Accounts Deleted')
                context.commit('toggleDeleteModal', null)
            }).catch(error => {
                console.log(error.response.data)
                context.commit('stopProcessing')
                context.commit('errorMsgAlert', 'Error')
            })
        }
    }
}