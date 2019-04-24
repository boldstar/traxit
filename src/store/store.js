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
import subscription from './modules/subscription'
import account from './modules/account'
import emails from './modules/emails'
import search from './modules/search'

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
    passwords,
    subscription,
    account,
    emails,
    search
  },
  state: {
    returntypes: '',
    processing: false,
    loading: false,
    sidebarOpen: true,
    alert: '',
    successAlert: '',
    errorAlert: '',
    chartData: '',
    notify: false,
    tasknotify: '',
    statusesnotupdated: '',
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
    processing(state) {
      return state.processing
    },
    returnTypes(state) {
      return state.returntypes
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
    subscribeView(state) {
      return state.subscribe
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
    returnTypes(state, returns) {
      state.returntypes = returns
    },
    startProcessing(state) {
      state.processing = true
    },
    archivingEngagement(state) {
      state.archiving = !state.archiving
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
    clearAccountDetails(state) {
      state.account = ''
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

