import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import moment from 'moment';
import { abilityPlugin, ability as appAbility } from './ability'
import storage from './storage'
import router from './router'

export const ability = appAbility
Vue.use(Vuex)
if(localStorage.getItem('fqdn_api_url')!= null) {
  axios.defaults.baseURL = 'http://' + localStorage.getItem('fqdn_api_url') + '/api'
}else {
  axios.defaults.baseURL = 'http://traxit.test/api'
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
  state: {
    rules: '',
    client: [],
    clients: [],
    engagements: [],
    engagement: [],
    clientengagements: [],
    engagementquestions: [],
    history: [],
    dependent: [],
    dependents: [],
    questions: [],
    question: [],
    note: [],
    notes: [],
    clientnotes: [],
    users: [],
    tasks: [],
    task: [],
    workflows: [],
    workflow: [],
    businesses: [],
    business: '',
    user: '',
    result: '',
    resetToken: '',
    returntypes: '',
    account: '',
    processing: false,
    loading: false,
    token: localStorage.getItem('access_token') || null,
    sidebarOpen: true,
    alert: '',
    successAlert: '',
    errorAlert: '',
    resetError:'',
    resetSuccess: '',
    passwordAlert: '',
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
    archiving: false
  },
  getters: {
    chartDataLength(state) {
      return state.chartData
    },
    sidebarOpen(state) {
      return state.sidebarOpen;
    },
    user(state) {
      return state.user
    },
    loggedIn(state) {
      return state.token != null || undefined;
    },
    resetToken(state) {
      return state.resetToken
    },
    processing(state) {
      return state.processing
    },
    users(state) {
      return state.users;
    },
    tasks(state) {
      return state.tasks;
    },
    returnTypes(state) {
      return state.returntypes
    },
    allClients(state) {
      return state.clients;
    },
    allEngagements(state) {
      return state.engagements;
    },
    engagementHistory(state) {
      return state.history;
    },
    client(state) {
      return state.client;
    },
    dependent(state) {
      return state.dependent;
    },
    clientDependents(state) {
      return state.dependents
    },
    engagement(state) {
      return state.engagement;
    },
    clientEngagements(state) {
      return state.clientengagements
    },
    question(state) {
      return state.question;
    },
    engagementQuestions(state) {
      return state.engagementquestions
    },
    business(state) {
      return state.business
    },
    clientNotes(state) {
      return state.clientnotes
    },
    note(state) {
      return state.note
    },
    notes(state) {
      return state.notes
    },
    allWorkflows(state) {
      return state.workflows
    },
    workflow(state) {
      return state.workflow
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
    resetSuccess(state) {
      return state.resetSuccess
    },
    resetError(state) {
      return state.resetError
    },
    passwordAlert(state) {
      return state.passwordAlert
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
    archiving(state) {
      return state.archiving
    }
  },
  mutations: {
    changeChartLength(state, length) {
      state.chartData = length
    },
    toggleSidebar(state) {
      state.sidebarOpen = !state.sidebarOpen
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
    createSession(state, session) {
      state.rules = session[0]
      state.token = session.access_token
    },
    destroySession(state) {
      state.rules = ''
    },
    retrieveTasks(state, tasks) {
      state.tasks = tasks
    },
    updateTask(state, task) {
      const index = state.tasks.findIndex(item => item.id == task.id);
      state.tasks.splice(index, 1);
    },
    batchUpdateTasks(state, checkedTasks) {
      checkedTasks.forEach((id) => {
        const index = state.tasks.findIndex(e => e.id === id);
        state.tasks.splice(index, 1)
      })
    },
    notifyClientModal(state, task) {
      state.notify = !state.notify
      state.tasknotify = task
    },
    notifyClientMessage(state, status) {
      state.status = status
    },
    addUser(state, user) {
      state.users.push(user)
    },
    updateUser(state, user) {
      const index = state.users.findIndex(item => item.id == user.id);
      state.users.splice(index, 1, user);
    },
    retrieveUsers(state, users) {
      state.users = users
    },
    retrieveClients(state, clients) {
      state.clients = clients
    },
    //this is for all engagements
    retrieveEngagements(state, engagements) {
      state.engagements = engagements
    },
    engagementHistory(state, history) {
      state.history = history
    },
    //this is for all engagements belonging to client
    getClientEngagements(state, clientengagements) {
      state.clientengagements = clientengagements
    },
    getEngagementQuestions(state, engagementquestions) {
      state.engagementquestions = engagementquestions
    },
    addClient(state, client) {
      state.clients.push(client)
    },
    //this is to push client engagement into the client engagements view
    addClientEngagement(state, engagement) {
      state.clientengagements.push(engagement)
    },
    deleteClient(state, id) {
      const index = state.clients.findIndex(client => client.id == id);
      state.clients.splice(index, 1);
    },
    getDetails(state, client) {
      state.client = client
    },
    editDetails(state, client) {
      state.client = client
    },
    updateClient(state, client) {
      const index = state.clients.findIndex(item => item.id == client.id);
      state.clients.splice(index, 1, {
        'id': client.id,
        'category': client.category,
        'referral_type': client.referral_type,
        'first_name': client.first_name,
        'middle_initial': client.middle_initial,
        'last_name': client.last_name,
        'occupation': client.occupation,
        'dob': client.dob,
        'email': client.email,
        'cell_phone': client.cell_phone,
        'work_phone': client.work_phone,
        'has_spouse': client.has_spouse,
        'spouse_first_name': client.spouse_first_name,
        'spouse_middle_initial': client.spouse_middle_initial,
        'spouse_last_name': client.spouse_last_name,
        'spouse_occupation': client.spouse_occupation,
        'spouse_dob': client.spouse_dob,
        'spouse_email': client.spouse_email,
        'spouse_cell_phone': client.spouse_cell_phone,
        'spouse_work_phone': client.spouse_work_phone,
        'street_address': client.street_address,
        'city': client.city,
        'state': client.state,
        'postal_code': client.postal_code,           
      })
    },
    // this is to view the engagement
    getEngagement(state, engagement) {
      state.engagement = engagement
    },
    updateEngagement(state, engagement) {
      state.engagement = engagement
    },
    updateCheckedEngagements(state, checkedEngagements) {
      checkedEngagements.forEach((engagement) => {
        const o = state.engagements.find((e) => e.id === engagement.id);
        Object.assign(o, engagement, {done:false}) 
      })
    },
    deleteEngagement(state, id) {
      const index = state.engagements.findIndex(engagement => engagement.id == id);
      state.engagements.splice(index, 1);
    },
    getBusiness(state, business) {
      state.business = business
    },
    addBusiness(state, business) {
      state.client.businesses.push(business);
    },
    deleteBusiness(state, id) {
      const index = state.client.businesses.findIndex(business => business.id == id)
      state.client.businesses.splice(index, 1)
    },
    updateBusiness(state, business) {
      const index = state.client.businesses.findIndex(item => item.id == business.id)
      state.client.businesses.splice(index, 1, business)
    },
    getDependent(state, dependent){
      state.dependent = dependent
    },
    addDependent(state, dependent) {
      state.client.dependents.push(dependent);
    },
    deleteDependent(state, id) {
      const index = state.client.dependents.findIndex(dependent => dependent.id == id);
      state.client.dependents.splice(index, 1);
    },
    updateDependent(state, dependent) {
      const index = state.client.dependents.findIndex(item => item.id == dependent.id);
      state.client.dependents.splice(index, 1, {
        'id': dependent.id,
        'client_id': dependent.client_id,
        'first_name': dependent.first_name,
        'middle_name': dependent.middle_name,
        'last_name': dependent.last_name,
        'dob': dependent.dob,      
      })
    },
    getQuestion(state, question) {
      state.question = question
    },
    addQuestion(state, question) {
      state.engagement.questions.push(question);
    },
    deleteQuestion(state, id) {
      const index = state.engagement.questions.findIndex(question => question.id == id);
      state.engagement.questions.splice(index, 1);
    },
    updateQuestion(state, question) {
      const index = state.engagement.questions.findIndex(item => item.id == question.id);
      state.engagement.questions.splice(index, 1, question)
    },
    updateAnswer(state, question) {
      const index = state.engagement.questions.findIndex(item => item.id == question.id);
      state.engagement.questions.splice(index, 1, question)
    },
    getClientNotes(state, clientnotes) {
      state.clientnotes = clientnotes
    },
    getNote(state, note) {
      state.note = note
    },
    addNote(state, note) {
      state.notes.push(note);
    },
    deleteNote(state, id) {
      const index = state.notes.findIndex(note => note.id == id);
      state.notes.splice(index, 1);
    },
    updateNote(state, note) {
      const index = state.notes.findIndex(item => item.id == note.id);
      state.notes.splice(index, 1, {
        'id': note.id,
        'client_id': note.client_id,
        'note': note.note,           
      })
    },
    destroyToken(state) {
      state.token = null
      state.expiresIn = null
    },
    retrieveWorkflows(state, workflows) {
      state.workflows = workflows
    },
    getWorkflow(state, workflow) {
      state.workflow = workflow
    },
    addWorkflow(state, workflow) {
      state.workflows.push(workflow);
    },
    editWorkflow(state, workflow) {
      const index = state.workflows.findIndex(item => item.id == workflow.id);
      state.workflows.splice(index, 1, workflow)
    },
    statusesNotUpdated(state, statuses) {
      state.statusesnotupdated = statuses
    },
    deleteWorkflow(state, id) {
      const index = state.workflows.findIndex(workflow => workflow.id == id);
      state.workflows.splice(index, 1);
    },
    removeDataFromWorkflow(state) {
      state.workflow = []
    },
    statusOrder(state, statuses) {
      state.workflow.statuses = statuses
    },
    deleteStatus(state, id) {
      const index = state.workflow.statuses.findIndex(status => status.id == id);
      state.workflow.statuses.splice(index, 1);
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
    userDetails(state, user) {
      state.user = user[0]
    },
    notifyEmailSent(state, alert) {
      state.emailAlert = alert
    },
    resetSuccess(state, alert) {
      state.resetSuccess = alert
    },
    resetError(state, error) {
      state.resetError = error
    },
    passwordAlert(state, alert) {
      state.passwordAlert = alert
      state.loading = false
    },
    loading(state) {
      state.loading = !state.loading
    },
    clearResetToken(state) {
      state.resetToken = ''
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
    }
  },
  actions: {
    toggleSidebar({commit}) {
      commit('toggleSidebar')
    },
    retrieveUser(context) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token

      axios.get('/userProfile')
      .then(response => {
        context.commit('userDetails', response.data)
      })
      .catch(error => {
        console.log(error.response.data)
      })
    },
    retrieveUserToUpdate(context, id) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token

      axios.get('/userToUpdate/' + id)
      .then(response => {
        context.commit('userDetails', response.data)
      })
      .catch(error => {
        console.log(error.response.data)
      })
    },
    updateUser(context, data) {
      axios.patch('/users/' +data.id, {
        name: data.name,
        email: data.email,
        role: data.role
      })
      .then(response => {
        context.commit('updateUser', response.data)
      })
      .catch(error => {
        console.log(error.response.data)
      })
    },
    addUser(context, data) {
        axios.post('/register', {
          name: data.name,
          email: data.email,
          password: data.password,
          role: data.role
        })
        .then(response => {
          context.commit('addUser', response.data)
        })
        .catch(error => {
          console.log(error.response.data)
        })
    },
    requestReset(context, email) {
      axios.post('/password/create', {
        email: email
      })
      .then(response => {
        context.commit('passwordAlert', response.data)
      })
      .catch(error => {
        console.log(error.response.data)
      })
    },
    forgotReset(context, email) {
      context.commit('loading')
      axios.post('/password/create', {
        email: email.email
      })
      .then(response => {
        context.commit('passwordAlert', response.data)
      })
      .catch(error => {
        console.log(error.response.data)
        context.commit('passwordAlert', error.response.data)
      })
    },
    retrieveResetToken(context, token) {
      axios.get('/password/find/' + token)
      .then(response => {
        context.commit('resetToken', response.data)
      })
      .catch(error => {
        console.log(error.response.data)
      })
    },
    updatePassword(context, data) {
      context.commit('clearAlert')
      context.commit('loading')
      axios.post('/password/reset', {
        email: data.email,
        password: data.password,
        password_confirmation: data.password_confirmation,
        token: data.token
      })
      .then(response => {
        context.commit('resetSuccess', response.data)
        context.commit('loading')
      })
      .catch(error => {
        context.commit('loading')
        context.commit('resetError', error.response.data)
      })
    },
    destroyToken(context) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token

      if (context.getters.loggedIn) {
        return new Promise((resolve, reject) => {
          axios.post('/logout')
          .then(response => {
            
            localStorage.removeItem('access_token')
            localStorage.removeItem('expires_on')
            context.commit('destroyToken')
            context.commit('destroySession')
            router.push('/login')
            resolve(response)
          })
          .catch(error => {
            localStorage.removeItem('access_token')
            localStorage.removeItem('expires_on')
            context.commit('destroyToken')
            router.push('/login')
            reject(error)
          })
        })
      }
    },
    retrieveToken({ commit }, credentials) {

      return new Promise((resolve, reject) => {
          axios.post('/login', {
              username: credentials.username,
              password: credentials.password,
              fqdn: localStorage.getItem('fqdn_api_url')
          })
          .then(response => {
            commit('clearAlert')
            commit('clearAccountDetails')
            const token = response.data.rules.access_token
            const fqdn = response.data.fqdn
            if(token != null || token != undefined && fqdn != null || fqdn != undefined) {
              localStorage.removeItem('fqdn_api_url')
              const date = new Date(moment().add(1, 'day').toDate());
              localStorage.setItem('fqdn_api_url', response.data.fqdn)
              localStorage.setItem('expires_on', date);
              axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
              axios.defaults.baseURL = 'http://' + response.data.fqdn + '/api'
              setTimeout(() => {
                commit('createSession', response.data.rules);
                localStorage.setItem('access_token', token);
                router.push('/')
              }, 2000)
              }
              resolve(response)
          })
          .catch(error => {
              console.log(error.response.data)
              commit('errorAlert', error.response.data)
              reject(error)
          })
      })
    },
    retrieveTasks(context) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token

      axios.get('/tasks')
      .then(response => {
        context.commit('retrieveTasks', response.data)
      })
      .catch(error => {
        console.log(error)
      })
    },
    updateTask(context, task) {
      axios.patch('/tasks/' + task.id, {
        user_id: task.user_id,
        status: task.status,
        done: task.done
      })
      .then(response => {
        if(response.data.notify) {
          context.commit('notifyClientModal', response.data.task)
          context.commit('notifyClientMessage', response.data.status)
        }
          context.commit('updateTask', response.data.task)
          context.commit('successAlert', response.data.message)
      })
      .catch(error => {
          console.log(error.response.data)
      })           
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
    batchUpdateTasks(context, tasks) {
      axios.patch('/batchUpdateTasks', {
        tasksToUpdate: tasks.tasksToUpdate,
        user_id: tasks.user_id,
        status: tasks.status
      })
      .then(response => {
        context.commit('successAlert', response.data.message)
        context.commit('batchUpdateTasks', response.data.tasks)
      })
      .catch(err => {
        console.log(err)
        context.commit('errorMsgAlert', err.response.data.message)
      })
    },
    retrieveUsers(context) {
      axios.get('/users')
      .then(response => {
        context.commit('retrieveUsers', response.data)
      })
      .catch(error => {
        console.log(error)
      })
    },
    retrieveClients(context) {
      axios.get('/clients')
      .then(response => {
        context.commit('retrieveClients', response.data)
      })
      .catch(error => {
        console.log(error)
      })
    },
    retrieveClientsWithBusinesses(context) {
      axios.get('/clientsWithBusinesses')
      .then(response => {
        context.commit('retrieveClients', response.data)
      })
      .catch(error => {
        console.log(error.response.data)
      })
    },
    getDetails({commit}, id) {
      axios.get('/clients/'+id)
      .then(response => {
        commit('getDetails', response.data)
      })
      .catch(error => {
        console.log(error)
      })
    },
    editDetails({commit}, id) {
      axios.get('/clients/'+id)
      .then(response => {
        const client = response.data
        const taxpayer_dob = moment(String(client.dob)).format('MM/DD/YYYY')
        const spouse_dob = moment(String(client.spouse_dob)).format('MM/DD/YYYY')
        client.dob = taxpayer_dob
        client.spouse_dob = spouse_dob
        commit('editDetails', client)
      })
      .catch(error => {
        console.log(error)
      })
    },
    addClient(context, client) {
      axios.post('/clients', {
        id: client.id,
        active: true,
        category: client.category,
        referral_type: client.referral_type,
        first_name: client.first_name,
        middle_initial: client.middle_initial,
        last_name: client.last_name,
        occupation: client.occupation,
        dob: client.dob,
        email: client.email,
        cell_phone: client.cell_phone,
        work_phone: client.work_phone,
        has_spouse: client.has_spouse,
        spouse_first_name: client.spouse_first_name,
        spouse_middle_initial: client.spouse_middle_initial,
        spouse_last_name: client.spouse_last_name,
        spouse_occupation: client.spouse_occupation,
        spouse_dob: client.spouse_dob,
        spouse_email: client.spouse_email,
        spouse_cell_phone: client.spouse_cell_phone,
        spouse_work_phone: client.spouse_work_phone,
        street_address: client.street_address,
        city: client.city,
        state: client.state,
        postal_code: client.postal_code,
      })
      .then(response => {
        context.commit('addClient', response.data.contact)
        context.commit('successAlert', response.data.message)
      })
      .catch(error => {
        console.log(error.response.data)
      })
    },
    updateClient(context, client) {
      axios.patch('/clients/' + client.id, {
        id: client.id,
        active: client.active,
        category: client.category,
        referral_type: client.referral_type,
        first_name: client.first_name,
        middle_initial: client.middle_initial,
        last_name: client.last_name,
        occupation: client.occupation,
        dob: client.dob,
        email: client.email,
        cell_phone: client.cell_phone,
        work_phone: client.work_phone,
        has_spouse: client.has_spouse,
        spouse_first_name: client.spouse_first_name,
        spouse_middle_initial: client.spouse_middle_initial,
        spouse_last_name: client.spouse_last_name,
        spouse_occupation: client.spouse_occupation,
        spouse_dob: client.spouse_dob,
        spouse_email: client.spouse_email,
        spouse_cell_phone: client.spouse_cell_phone,
        spouse_work_phone: client.spouse_work_phone,
        street_address: client.street_address,
        city: client.city,
        state: client.state,
        postal_code: client.postal_code,
      })
      .then(response => {
          context.commit('updateClient', response.data.client)
          context.commit('successAlert', response.data.message)
      })
      .catch(error => {
          console.log(error)
      })           
    },
    deleteClient(context, id) {
      axios.delete('/clients/' + id)
      .then(() => {
          context.commit('deleteClient', id)
          context.commit('successAlert', 'Client Deleted Succesfully')
      })
      .catch(error => {
          console.log(error)
      })                
    },
    retrieveEngagements(context) {
      axios.get('/engagements')
      .then(response => {
        context.commit('retrieveEngagements', response.data)
      })
      .catch(error => {
        console.log(error)
      })
    },
    getEngagement({commit}, id) {
      axios.get('/clientengagement/'+id)
      .then(response => {
        commit('getEngagement', response.data.engagement)
        commit('engagementWorkflow', response.data.workflow)
      })
      .catch(error => {
        console.log(error.response.data)
      })
    },
    getEngagementHistory({commit}, id) {
      axios.get('/engagementhistory/'+id)
      .then(response => {
        commit('engagementHistory', response.data)
      })
      .catch(error => {
        console.log(error)
      })
    },
    getClientEngagements({commit}, id) {
      axios.get('/engagements/'+id)
      .then(response => {
        commit('getClientEngagements', response.data)
      })
      .catch(error => {
        console.log(error)
      })
    },
    getEngagementQuestions({commit}, id) {
      axios.get('/engagementquestions/'+id)
      .then(response => {
        commit('getEngagementQuestions', response.data)
      })
      .catch(error => {
        console.log(error)
      })
    },
    addEngagement(context, engagement) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token

      axios.post(('/engagements'), {
        category: engagement.category,
        client_id: engagement.client_id,
        type: engagement.type,
        title: engagement.title,
        description: engagement.description,
        name: engagement.name,
        workflow_id: engagement.workflow_id,
        return_type: engagement.return_type,
        year: engagement.year,
        assigned_to: engagement.assigned_to,
        status: engagement.status,
        difficulty: engagement.difficulty,
        done: false
      })
      .then(response => {
        context.commit('addClientEngagement', response.data.engagement)
        context.commit('successAlert', response.data.message)
      })
      .catch(error => {
        console.log(error.response.data)
        context.commit('errorMsgAlert', error.response.data.message)
      })
    },
    updateEngagement(context, engagement) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
      context.commit('startProcessing')

      axios.patch('/engagements/' + engagement.id, {
        client_id: engagement.client_id,
        workflow_id: engagement.workflow_id,
        type: engagement.type,
        title: engagement.title,
        description: engagement.description,
        return_type: engagement.return_type,
        year: engagement.year,
        assigned_to: engagement.assigned_to,
        status: engagement.status,
        difficulty: engagement.difficulty,
        fee: engagement.fee,
        balance: engagement.balance,
        owed: engagement.owed,
        done: engagement.done
      })
      .then(response => {
          context.commit('updateEngagement', response.data.engagement)
          context.commit('successAlert', response.data.message)
          context.commit('stopProcessing')
          router.push({ path: '/engagement/' + response.data.engagement.id})
      })
      .catch(error => {
          console.log(error.response.data)
          context.commit('errorMsgAlert', error.response.data.message)
          context.commit('stopProcessing')
      })           
    },
    updateCheckedEngagements(context, checkedEngagements) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token

      axios.patch('/engagementsarray', {
        engagements: checkedEngagements.engagements,
        assigned_to: checkedEngagements.assigned_to,
        status: checkedEngagements.status
      })
      .then(response => {
          context.commit('updateCheckedEngagements', response.data)
      })
      .catch(error => {
          console.log(error)
          context.commit('errorMsgAlert', error.response.data.message)
      })           
    },
    archiveEngagement(context, id) {
      context.commit('archivingEngagement')
      axios.post('/archive', {
        id: id
      })
      .then(response => {
        context.commit('updateEngagement', response.data.engagement)
        context.commit('successAlert', response.data.message)
        context.commit('archivingEngagement')
      })
      .catch(error => {
        context.commit('archivingEngagement')
        context.commit('errorMsgAlert', error.response.data.message)
        console.log(error.response.data)
      })
    },
    deleteEngagement(context, id) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token

      axios.delete('/engagements/' + id)
      .then(() => {
          context.commit('deleteEngagement', id)
      })
      .catch(error => {
          console.log(error)
      })                
    },
    getBusiness({commit}, id) {
      axios.get('/businesses/'+ id)
      .then(response => {
        commit('getBusiness', response.data)
      })
      .catch(error => {
        console.log(error)
      })
    },
    addBusiness(context, business) {
      axios.post(('/businesses'), {
        client_id: business.client_id,
        business_name: business.business_name,
        address: business.address,
        city: business.city,
        state: business.state,
        postal_code: business.postal_code,
        email: business.email,
        phone_number: business.phone_number,
        fax_number: business.fax_number
      })
      .then(response => {
        context.commit('successAlert', response.data.message)
      })
      .catch(error => {
        console.log(error)
        context.commit('errorMsgAlert', error.response.data.message)
      })
    },
    updateBusiness(context, business) {
      axios.patch(('/businesses/' + business.id ), {
        client_id: business.client_id,
        business_name: business.business_name,
        address: business.address,
        city: business.city,
        state: business.state,
        postal_code: business.postal_code,
        email: business.email,
        phone_number: business.phone_number,
        fax_number: business.fax_number
      })
      .then(response => {
        context.commit('updateBusiness', response.data)
      })
      .catch(error => {
        console.log(error)
        context.commit('errorMsgAlert', error.response.data.message)
      })
    },
    deleteBusiness(context, id) {
      axios.delete('/businesses/' + id)
      .then(response => {
        context.commit('deleteBusiness', id)
        context.commit('successAlert', response.data)
      })
      .catch(error => {
        console.log(error)
      })
    },
    getDependent({commit}, id) {
      axios.get('/dependents/'+ id)
      .then(response => {
        commit('getDependent', response.data)
      })
      .catch(error => {
        console.log(error)
      })
    },
    addDependent(context, dependent) {
      axios.post(('/dependents'), {
        client_id: dependent.client_id,
        first_name: dependent.first_name,
        middle_name: dependent.middle_name,
        last_name: dependent.last_name,
        dob: dependent.dob,
      })
      .then(response => {
        context.commit('addDependent', response.data)
      })
      .catch(error => {
        console.log(error)
        context.commit('errorMsgAlert', error.response.data.message)
      })
    },
    deleteDependent(context, id) {
      axios.delete('/dependents/' + id)
      .then(() => {
          context.commit('deleteDependent', id)
      })
      .catch(error => {
          console.log(error)
      })                
    },
    updateDependent(context, dependent) {
      axios.patch('/dependents/' + dependent.id, {
        client_id: dependent.client_id,
        first_name: dependent.first_name,
        middle_name: dependent.middle_name,
        last_name: dependent.last_name,
        dob: dependent.dob,
      })
      .then(response => {
          context.commit('updateDependent', response.data)
      })
      .catch(error => {
          console.log(error)
          context.commit('errorMsgAlert', error.response.data.message)
      })           
    },
    getQuestion({commit}, id) {
      axios.get('/questions/'+ id)
      .then(response => {
        commit('getQuestion', response.data)
      })
      .catch(error => {
        console.log(error)
      })
    },
    addQuestion(context, question) {
      if(question.email_sent) {
        context.commit('startProcessing')
      }
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token

      axios.post(('/questions'), {
        engagement_id: question.engagement_id,
        question: question.question,
        email: question.email,
        email_sent: false,
        send_to: question.send_to,
        answered: false
      })
      .then(response => {
        context.commit('addQuestion', response.data.question)
        context.commit('successAlert', response.data.message)
        context.commit('stopProcessing')
      })
      .catch(error => {
        console.log(error.response.data)
        context.commit('errorMsgAlert', error.response.data.message)
        context.commit('stopProcessing')
      })
    },
    sendEmail(context, id) {
      context.commit('startProcessing')
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token

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
    deleteQuestion(context, id) {
      axios.delete('/questions/' + id)
      .then(() => {
          context.commit('deleteQuestion', id)
      })
      .catch(error => {
          console.log(error)
      })                
    },
    updateQuestion(context, question) {
      axios.patch('/questions/' + question.id, {
        engagement_id: question.engagement_id,
        question: question.question,
        answered: false,
      })
      .then(response => {
          context.commit('updateQuestion', response.data)
      })
      .catch(error => {
          console.log(error)
          context.commit('errorMsgAlert', error.response.data.message)
      })           
    },
    updateAnswer(context, question) {
      axios.patch('/questionsanswer/' + question.id, {
        answer: question.answer,
        answered: question.answered,
      })
      .then(response => {
          context.commit('updateAnswer', response.data)
      })
      .catch(error => {
          console.log(error)
          context.commit('errorMsgAlert', error.response.data.message)
      })           
    },
    getClientNotes({commit}, id) {
      axios.get('/clientnotes/'+id)
      .then(response => {
        commit('getClientNotes', response.data)
      })
      .catch(error => {
        console.log(error)
      })
    },
    getNote({commit}, id) {
      axios.get('/notes/'+ id)
      .then(response => {
        commit('getNote', response.data)
      })
      .catch(error => {
        console.log(error)
      })
    },
    addNote(context, note) {
      axios.post(('/notes'), {
        client_id: note.client_id,
        note: note.note,
      })
      .then(response => {
        context.commit('addNote', response.data)
      })
      .catch(error => {
        console.log(error)
        context.commit('errorMsgAlert', error.response.data.message)
      })
    },
    deleteNote(context, id) {
      axios.delete('/notes/' + id)
      .then(() => {
          context.commit('deleteNote', id)
      })
      .catch(error => {
          console.log(error)
      })                
    },
    updateNote(context, note) {
      axios.patch('/notes/' + note.id, {
        client_id: note.client_id,
        note: note.note,
      })
      .then(response => {
          context.commit('updateNote', response.data)
      })
      .catch(error => {
          console.log(error)
          context.commit('errorMsgAlert', error.response.data.message)
      })           
    },
    retrieveWorkflows(context) {
      axios.get('/workflowstatuses')
      .then(response => {
        context.commit('retrieveWorkflows', response.data)
      })
      .catch(error => {
        console.log(error)
      })
    },
    getWorkflow({commit}, id) {
      axios.get('/workflowstatuses/'+ id)
      .then(response => {
        commit('getWorkflow', response.data)
      })
      .catch(error => {
        console.log(error)
      })
    },
    addWorkflow(context, workflow) {
      axios.post(('/workflowstatuses'), {
        name: workflow.name,
        copy_workflow: workflow.copy_workflow,
        workflow_id: workflow.workflow_id,
      })
      .then(response => {
        context.commit('addWorkflow', response.data)
      })
      .catch(error => {
        console.log(error)
      })
    },
    editWorkflow(context, payload) {
      axios.patch('/workflowstatuses/' + payload.id, {
        workflow: payload.workflow,
        statuses: payload.statuses,
        newStatuses: payload.newStatuses
      })
      .then(response => {
          context.commit('editWorkflow', response.data.workflow)
          context.commit('successAlert', response.data.message)
        })
        .catch(error => {
          console.log(error)
          context.commit('editWorkflow', error.response.data.workflow)
          context.commit('errorAlert', error.response.data.message)
          context.commit('statusesNotUpdated', error.response.data.statuses)
      })           
    },
    deleteWorkflow(context, id) {
      axios.delete('/workflow/' + id.id)
      .then(response => {
        context.commit('deleteWorkflow', id.id)
        context.commit('successAlert', response.data)
      }).catch(error => {
          console.log(error.response.data)
          context.commit('errorAlert', error.response.data)
      })
    },
    workflowStatusOrder(context, payload) {
      axios.put('/workflowstatuses', {
        id: payload.id,
        statuses: payload.statuses,
      })
      .then(response => {
          context.commit('statusOrder', response.data)
      })
      .catch(error => {
          console.log(error)
      })           
    },
    deleteStatus(context, id) {
      axios.delete('/workflowstatuses/' + id.id )
      .then(response => {
          context.commit('deleteStatus', id.id)
          context.commit('successAlert', response.data)
      })
      .catch(error => {       
          context.commit('errorAlert', error.response.data)
          console.log(error)
      })                
    },
    saveStatusMessage(context, status) {
      context.commit('startProcessing')
      axios.post('/message', {
        id: status.id,
        message: status.message
      })
      .then(response => {
        context.commit('stopProcessing')
        context.commit('editWorkflow', response.data.workflow)
        context.commit('successAlert', response.data.message)
        context.commit('statusModal')
        router.push('/administrator/workflows')
      })
      .catch(error => {
        context.commit('stopProcessing')
        console.log(error.response.data)
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
        console.log(error)
      })
    },
    uploadContacts(context, file) {
      context.commit('startProcessing')
      let formData = new FormData();
      formData.append('file', file)
      axios.post('/importclients', formData, { headers: {
        'Content-Type': 'multipart/form-data'
      }})
      .then(response => {
        context.commit('successAlert', response.data )
        context.commit('stopProcessing')
      })
      .catch(error => {
        console.log(error)
        context.commit('stopProcessing')
        context.commit('errorMsgAlert', error.response.data.message)
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
      axios.post('/reports', {
          type: data.type,
          fromValue: data.fromValue,
          toValue:  data.toValue,
          filters: data.filters,
          return_type: data.return_type,
          workflow: data.workflow,
          status: data.status
        },
        {
          responseType: 'blob'
        }
      )
      .then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'engagements_report.xlsx');
        document.body.appendChild(link);
        link.click();
      })
      .catch(error => {
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
    } 
  }, 
})

