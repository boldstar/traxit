import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { abilityPlugin, ability as appAbility } from '@/utils/ability.js'
import storage from '@/utils/storage.js'

export const ability = appAbility
Vue.use(Vuex)
axios.defaults.baseURL = 'https://aewcpa.traxit.pro/api'
axios.defaults.headers.common['header1'] = {
  'X-Requested-With': 'XMLHttpRequest',
}

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
    clients: [],
    client:[],
    engagements: [],
    engagement: [],
    clientengagements: [],
    engagementquestions: [],
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
    resetError:'',
    resetSuccess: '',
    passwordAlert: '',
  },
  getters: {
    sidebarOpen(state) {
      return state.sidebarOpen;
    },
    user(state) {
      return state.user
    },
    loggedIn(state) {
      return state.token != null;
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
    }
  },
  mutations: {
    toggleSidebar(state) {
      state.sidebarOpen = !state.sidebarOpen
    },
    accountDetails(state, account) {
      state.account = account[0]
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
      const index = state.engagements.findIndex(item => item.id == engagement.id);
      state.engagements.splice(index, 1, {
        'id': engagement.id,
        'client_id': engagement.client_id,
        'workflow_id': engagement.workflow_id,
        'return_type': engagement.return_type,
        'year': engagement.year,
        'assigned_to': engagement.assigned_to,
        'status': engagement.status,
        'done': false           
      })
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
      state.engagement.questions.splice(index, 1, {
        'id': question.id,
        'engagement_id': question.engagement_id,
        'question': question.question,
        'answered': false           
      })
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
      state.resetSucess = alert
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
            context.commit('destroyToken')
            context.commit('destroySession')
            resolve(response)
          })
          .catch(error => {
            localStorage.removeItem('access_token')
            context.commit('destroyToken')
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
          })
          .then(response => {
              const token = response.data.access_token

              localStorage.setItem('access_token', token)
              commit('createSession', response.data)
              resolve(response)
          })
          .catch(error => {
              console.log(error.response.data)
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
      })
      .then(response => {
          context.commit('updateTask', response.data)
      })
      .catch(error => {
          console.log(error.response.data)
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
    addClient(context, client) {
      axios.post('/clients', {
        id: client.id,
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
        context.commit('getDetails', response.data)
      })
      .catch(error => {
        console.log(error.response.data)
      })
    },
    updateClient(context, client) {
      axios.patch('/clients/' + client.id, {
        id: client.id,
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
          context.commit('updateClient', response.data)
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
        commit('getEngagement', response.data)
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
      axios.post(('/engagements'), {
        category: engagement.category,
        client_id: engagement.client_id,
        name: engagement.name,
        workflow_id: engagement.workflow_id,
        return_type: engagement.return_type,
        year: engagement.year,
        assigned_to: engagement.assigned_to,
        status: engagement.status,
        done: false
      })
      .then(response => {
        context.commit('addClientEngagement', response.data.engagement)
        context.commit('successAlert', response.data.message)
      })
      .catch(error => {
        console.log(error.response.data)
      })
    },
    updateEngagement(context, engagement) {
      axios.patch('/engagements/' + engagement.id, {
        client_id: engagement.client_id,
        return_type: engagement.return_type,
        year: engagement.year,
        assigned_to: engagement.assigned_to,
        status: engagement.status,
        done: false
      })
      .then(response => {
          context.commit('updateEngagement', response.data)
      })
      .catch(error => {
          console.log(error.response.data)
      })           
    },
    updateCheckedEngagements(context, checkedEngagements) {  
      axios.patch('/engagementsarray', {
        engagements: checkedEngagements.engagements,
        assigned_to: checkedEngagements.assigned_to,
        status: checkedEngagements.status
      })
      .then(response => {
          context.commit('updateCheckedEngagements', response.data)
      })
      .catch(error => {
          console.log(error.response.data)
      })           
    },
    deleteEngagement(context, id) {
      axios.delete('/engagements/' + id)
      .then(() => {
          context.commit('deleteEngagement', id)
      })
      .catch(error => {
          console.log(error.response.data)
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
        business_type: business.business_type,
        address: business.address,
        city: business.city,
        state: business.state,
        postal_code: business.postal_code,
        email: business.email,
        phone_number: business.phone_number,
        fax_number: business.fax_number
      })
      .then(response => {
        context.commit('addBusiness', response.data.business)
        context.commit('successAlert', response.data.message)
      })
      .catch(error => {
        console.log(error)
      })
    },
    updateBusiness(context, business) {
      axios.patch(('/businesses/' + business.id ), {
        client_id: business.client_id,
        business_name: business.business_name,
        business_type: business.business_type,
        address: business.address,
        city: business.city,
        state: business.state,
        postal_code: business.postal_code,
        email: business.email,
        phone_number: business.phone_number,
        fax_number: business.fax_number
      })
      .then(response => {
        console.log(response.data)
        context.commit('updateBusiness', response.data)
      })
      .catch(error => {
        console.log(error.response.data)
      })
    },
    deleteBusiness(context, id) {
      axios.delete('/businesses/' + id)
      .then(() => {
        context.commit('deleteBusiness', id)
      })
      .catch(error => {
        console.log(error.response.data)
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
      axios.post(('/questions'), {
        engagement_id: question.engagement_id,
        question: question.question,
        answered: false
      })
      .then(response => {
        context.commit('addQuestion', response.data)
      })
      .catch(error => {
        console.log(error)
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
      })           
    },
    retrieveWorkflows(context) {
      axios.get('/workflowstatuses')
      .then(response => {
        context.commit('retrieveWorkflows', response.data)
      })
      .catch(error => {
        console.log(error.response.data)
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
        name: workflow.name
      })
      .then(response => {
        context.commit('addWorkflow', response.data)
      })
      .catch(error => {
        console.log(error.response.data)
      })
    },
    editWorkflow(context, payload) {
      axios.patch('/workflowstatuses/' + payload.id, {
        workflow: payload.workflow,
        statuses: payload.statuses,
        newStatuses: payload.newStatuses
      })
      .then(response => {
          context.commit('editWorkflow', response.data)
      })
      .catch(error => {
          context.commit('editWorkflow', error.response.data.workflow)
          context.commit('errorAlert', error.response.data.message)
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
          console.log(error.response.data)
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
        console.log(error.response.data)
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
        console.log(error.response.data)
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
        console.log(error.response.data)
        context.commit('stopProcessing')
      })
    },
    getReturnTypes(context) {
      axios.get('/engagementReturnTypes')
      .then(response => {
        context.commit('returnTypes', response.data)
      })
      .catch(error => {
        console.log(error.response.data)
      })
    },
    getAccountDetails(context) {
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
        logo: account.logo,
        subscription: account.subscription
      })
      .then(response => {
        context.commit('addAccountDetails', response.data)
      })
      .catch(error => {
        console.log(error.response.data)
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
        logo: account.logo,
        subscription: account.subscription
      })
      .then(response => {
        context.commit('updateAccountDetails', response.data)
      })
      .catch(error => {
        console.log(error.response.data)
      })
    }
  }, 
})

