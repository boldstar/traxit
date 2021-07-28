import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
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
import downloads from './modules/downloads'
import setup from './modules/setup'
import tsheets from './modules/tsheets'
import invoice from './modules/invoice'
import inbox from './modules/inbox'
import portal from './modules/portal'
import business from './modules/business'
import bookkeeping from './modules/bookkeeping'
import history from './modules/history'
import customizations from './modules/customizations'
import settings from './modules/settings'
import browserhistory from './modules/browserhistory'
import rubex from './modules/rubex'
import automations from './modules/automations'
import calllist from './modules/calllist'

// this is for the abilities plug in.
import { abilityPlugin, ability as appAbility } from './ability'
import storage from './storage'
export const ability = appAbility

Vue.use(Vuex)

//this is the inital settings for axios requests dependent on local storage state
localStorage.getItem('fqdn_api_url')!= null ? axios.defaults.baseURL = 'http://' + localStorage.getItem('fqdn_api_url') + '/api' : axios.defaults.baseURL = 'http://traxit-laravel.test/api';
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token');


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
    search,
    downloads,
    setup,
    tsheets,
    invoice,
    inbox,
    portal,
    business,
    bookkeeping,
    history,
    customizations,
    settings,
    browserhistory,
    rubex,
    automations,
    calllist
  },
  state: {
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
    averagedays: null,
    engagementFilter: 'All',
    contactFilter: 'All',
    timesheet: false,
    show_update_status_modal: false,
    delete_modal: false,
    delete_modal_details: null,
    sessionEndedMsg: null
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
    errorAlert(state) {
      return state.resetError
    },
    successAlert(state) {
      return state.successAlert
    },
    errorMsgAlert(state) {
      return state.errorAlert
    },
    sessionEndedMsg(state) {
      return state.sessionEndedMsg
    },
    loading(state) {
      return state.loading
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
    },
    engagementFilter(state) {
      return state.engagementFilter
    },
    contactFilter(state) {
      return state.contactFilter
    },
    timesheet(state) {
      return state.timesheet
    },
    showUpdateStatusModal(state) {
      return state.show_update_status_modal
    },
    deleteModal(state) {
      return state.delete_modal
    },
    deleteModalDetails(state) {
      return state.delete_modal_details
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
    sessionEndedMsg(state, message) {
      state.sessionEndedMsg = message
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
    statusModal(state) {
      state.statusmodal = !state.statusmodal
    },
    averageDays(state, data) {
      state.averagedays = data
    },
    changeEngagementFilter(state, filter) {
      state.engagementFilter = filter
    },
    changeContactFilter(state, filter) {
      state.contactFilter = filter
    },
    toggleTimesheet(state) {
      state.timesheet = !state.timesheet
    },
    showUpdateStatusModal(state) {
      state.show_update_status_modal = !state.show_update_status_modal
    },
    toggleDeleteModal(state, data) {
      state.delete_modal = !state.delete_modal
      state.delete_modal_details = data
    }
  },
  actions: {
    toggleSidebar({commit}) {
      commit('toggleSidebar')
    },
    toggleTimesheet({commit}) {
      commit('toggleTimesheet')
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

