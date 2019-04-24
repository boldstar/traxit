import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import moment from 'moment'
import router from '../router'
import auth from './modules/auth'
import engagements from './modules/engagements'
import contact from './modules/contact'
import tasks from './modules/tasks'
import workflows from './modules/workflows'
import users from './modules/users'
import passwords from './modules/passwords'

import { abilityPlugin, ability as appAbility } from './ability'
import storage from './storage'
export const ability = appAbility

Vue.use(Vuex)
if(localStorage.getItem('fqdn_api_url')!= null) {
  axios.defaults.baseURL = 'https://' + localStorage.getItem('fqdn_api_url') + '/api'
}else {
  axios.defaults.baseURL = 'https://traxit.pro/api'
}
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token')


export default new Vuex.Store({
  plugins: [
    storage({
        storedKeys: ['rules', 'token'],
        destroyOn: ['destroySession']
    }),
        abilityPlugin
  ],
  modules: {
    auth,
    engagements,
    contact,
    tasks,
    workflows,
    users,
    passwords
  },
  state: {
    result: '',
    resetToken: '',
    returntypes: '',
    account: '',
    processing: false,
    loading: false,
    sidebarOpen: true,
    alert: '',
    successAlert: '',
    errorAlert: '',
    chartData: '',
    subscribe: null,
    invoices: '',
    plan: '',
    plans: '',
    subscription: '',
    grace: null,
    stripekey: null,
    notify: false,
    tasknotify: '',
    statusesnotupdated: '',
    templates: '',
    statusmodal: false,
    status: '',
    role: localStorage.getItem('role'),
    links: false,
    averagedays: ''
  },
  getters: {
    chartDataLength(state) {
      return state.chartData
    },
    sidebarOpen(state) {
      return state.sidebarOpen;
    },
    mobileLinks(state) {
      return state.links
    },
    resetToken(state) {
      return state.resetToken
    },
    processing(state) {
      return state.processing
    },
    returnTypes(state) {
      return state.returntypes
    },
    searchResults(state) {
      return state.result
    },
    errorAlert(state) {
      return state.resetError
    },
    successAlert(state) {
      return state.successAlert
    },
    errorMsgAlert(state) {
      return state.errorAlert
    },
    loading(state) {
      return state.loading
    },
    accountDetails(state) {
      return state.account
    },
    subscribeView(state) {
      return state.subscribe
    },
    invoices(state) {
      return state.invoices
    },
    plan(state) {
      return state.plan
    },
    plans(state) {
      return state.plans
    },
    subscription(state) {
      return state.subscription
    },
    grace(state) {
      return state.grace
    },
    stripekey(state) {
      return state.stripekey
    },
    notify(state) {
      return state.notify
    },
    taskForNotification(state) {
      return state.tasknotify
    },
    statusesNotUpdated(state) {
      return state.statusesnotupdated
    },
    templates(state) {
      return state.templates
    },
    statusModal(state) {
      return state.statusmodal
    },
    statusMessage(state) {
      return state.status
    },
    averageDays(state) {
      return state.averagedays
    }
  },
  mutations: {
    changeChartLength(state, length) {
      state.chartData = length
    },
    toggleSidebar(state) {
      state.sidebarOpen = !state.sidebarOpen
    },
    mobileLinks(state) {
      state.links = !state.links
    },
    accountDetails(state, account) {
      state.account = account[0]
    },
    addAccountDetails(state, account) {
      state.account = account
    },
    updateAccountDetails(state, account) {
      state.account = account
    },
    returnTypes(state, returns) {
      state.returntypes = returns
    },
    startProcessing(state) {
      state.processing = true
    },
    archivingEngagement(state) {
      state.archiving = !state.archiving
    },
    resetToken(state, token) {
      state.resetToken = token
    },
    stopProcessing(state) {
      state.processing = false
    },
    notifyClientModal(state, task) {
      state.notify = !state.notify
      state.tasknotify = task
    },
    notifyClientMessage(state, status) {
      state.status = status
    },
    searchDatabase(state, keyword) {
      state.result = keyword;
    },
    errorAlert(state, alert) {
      state.errorAlert = alert
    },
    successAlert(state, alert) {
      state.successAlert = alert
    },
    errorMsgAlert(state, alert) {
      state.errorAlert = alert
    },
    clearAlert(state) {
      state.alert = ''
      state.resetError = ''
      state.resetSuccess = ''
      state.successAlert = ''
      state.errorAlert = ''
    },
    notifyEmailSent(state, alert) {
      state.emailAlert = alert
    },
    loading(state) {
      state.loading = !state.loading
    },
    subscribeView(state, data) {
      state.subscribe = data
    },
    subscriptionInvoices(state, data) {
      state.invoices = data
    },
    subscriptionPlan(state, data) {
      state.plan = data
    },
    subscriptionPlans(state, data) {
      state.plans = data
    },
    subscriptionSub(state, data) {
      state.subscription = data
    },
    gracePeriod(state, data) {
      state.grace = data
    },
    stripeKey(state, data) {
      state.stripekey = data
    },
    clearAccountDetails(state) {
      state.account = ''
    },
    emailTemplates(state, templates) {
      state.templates = templates
    },
    statusModal(state) {
      state.statusmodal = !state.statusmodal
    },
    engagementWorkflow(state, workflow) {
      state.workflow = workflow
    },
    averageDays(state, data) {
      state.averagedays = data
    }
  },
  actions: {
    toggleSidebar({commit}) {
      commit('toggleSidebar')
    },
    notifyClient(context, task) {
      context.commit('startProcessing')
      axios.post('/notify-client', {
        id: task.task.id,
        send_to: task.send_to
      })
      .then(response => {
        context.commit('stopProcessing')
        context.commit('notifyClientModal')
        context.commit('successAlert', 'The Contact Has Been Notified')
      })
      .catch(error => {
        context.commit('stopProcessing')
        console.log(error.response.data)
      })
    },
    sendEmail(context, id) {
      context.commit('startProcessing')

      axios.post(('/questionsEmail'), {
        id: id
      })
      .then(response => {
        context.commit('updateQuestion', response.data.question)
        context.commit('successAlert', response.data.message)
        context.commit('stopProcessing')
      })
      .catch(error => {
        console.log(error.response.data)
        context.commit('errorMsgAlert', error.response.data.message)
        context.commit('stopProcessing')
      })
    },
    searchDatabase(context, data) {
      context.commit('startProcessing')
      axios.post('/search', {
        keyword: data.keyword,
        category: data.category
      }).then(response => {
        context.commit('searchDatabase', response.data)
        context.commit('stopProcessing')
      }).catch(error => {
        context.commit('stopProcessing')
        console.log(error)
      })
    },
    downloadEngagements(context) {
      axios.get('/downloadengagements', {responseType: 'blob'})
      .then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'engagements.xlsx');
        document.body.appendChild(link);
        link.click();
      })
      .catch(error => {
        console.log(error)
      })
    },
    downloadContacts(context) {
      axios.get('/downloadclients', {responseType: 'blob'})
      .then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'contacts.xlsx');
        document.body.appendChild(link);
        link.click();
      })
      .catch(error => {
        console.log(error.response.data)
      })
    },
    getReturnTypes(context) {
      axios.get('/engagementReturnTypes')
      .then(response => {
        context.commit('returnTypes', response.data)
      })
      .catch(error => {
        console.log(error)
      })
    },
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
    requestReport(context, data) {
      context.commit('startProcessing')
      axios.post('/reports', {
        year: data.year,
        type: data.type,
        fromValue: data.fromValue,
        toValue: data.toValue,
        workflow_id: data.workflow_id,
        status: data.status,
        action: data.action,
          return_type: data.return_type
        },
        {
          responseType: 'blob'
        }
      )
      .then(response => {
        context.commit('stopProcessing')
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'engagements_report.xlsx');
        document.body.appendChild(link);
        link.click();
      })
      .catch(error => {
        context.commit('stopProcessing')
        console.log(error.response.data)
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
    getInvoices(context) {
      axios.get('/subscription')
      .then(response => {
        context.commit('subscriptionInvoices', response.data)
      })
      .catch(error => {
        console.log(error.response.data)
      })
    },
    getPlans(context) {
      axios.get('/plans')
      .then(response => {
        context.commit('subscriptionPlan', response.data.plan);
        context.commit('subscriptionPlans', response.data.plans);
        context.commit('subscriptionSub', response.data.subscription);
      })
      .catch(error => {
        console.log(error.response.data)
      })
    },
    swapPlan(context, plan) {
      context.commit('startProcessing')
      axios.post('/upgrade-subscription', {
        product: plan.product
      })
      .then(response => {
        context.commit('stopProcessing')
        router.push('/administrator/subscription')
        context.commit('successAlert', response.data.message)
      })
      .catch(error => {
        context.commit('stopProcessing')
        console.log(error.response.data)
      })
    },
    cancelSubscription(context) {
      axios.post('/cancel-subscription')
      .then(response => {
        context.commit('subscribeView', response.data)
      })
      .catch(error => {
        console.log(error.response.data)
      })
    },
    resumeSubscription(context) {
      context.commit('startProcessing')
      axios.post('/resume-subscription')
      .then(response=> {
        context.commit('stopProcessing')
        context.commit('successAlert', response.data.message)
        context.commit('subscriptionSub', response.data.subscription)
      })
      .catch(error => {
        context.commit('stopProcessing')
        console.log(error.response.data)
      })
    },
    checkGracePeriod(context) {
      axios.get('/grace')
      .then(response => {
        if(response.data != false) {
          context.commit('gracePeriod', response.data)
        }
      })
      .catch(error => {
        console.log(error.response.data)
      })
    },
    updateCard(context, card) {
      context.commit('startProcessing')
      axios.post('/update-card', {
        name: card.name_on_card,
        stripeToken: card.stripeToken
      })
      .then(response => {
        context.commit('stopProcessing')
        router.push('/administrator/subscription')
        context.commit('successAlert', response.data.message)
      })
      .catch(error => {
        context.commit('stopProcessing')
        console.log(error.response.data)
      })
    },
    getStripeKey(context) {
      axios.get('/stripe-key')
      .then(response => {
        context.commit('stripeKey', response.data)
      })
      .catch(error => {
        console.log(error.response.data)
      })
    },
    getTemplates(context) {
      axios.get('/templates')
      .then(response => {
        context.commit('emailTemplates', response.data)
      })
      .catch(error => {
        console.log(error.response.data)
      })
    },
    sendTestMail(context, id) {
      context.commit('startProcessing')
      axios.post('/send-test-mail', {
        id: id
      })
      .then(response => {
        context.commit('stopProcessing')
        context.commit('successAlert', response.data)
      })
      .catch(error => {
        context.commit('stopProcessing')
        context.commit('successAlert', error.response.data)
        console.log(error.response.data)
      })
    },
    averageEngagementDays(context) {
      axios.get('/engagementaverage')
      .then(response => {
        context.commit('averageDays', response.data)
      })
      .catch(error => {
        console.log(error.response.data)
      })
    } 
  }, 
})

