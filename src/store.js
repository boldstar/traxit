import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
axios.defaults.baseURL = 'http://traxit.test/api'

export default new Vuex.Store({
  state: {
    clients: [],
    client:[],
    engagements: [],
    engagement: [],
    clientengagements: [],
    dependent: [],
    dependents: [],
    questions: [],
    question: [],
    token: localStorage.getItem('access_token') || null,
    sidebarOpen: true,
    loading: false,
  },
  getters: {
    sidebarOpen(state) {
      return state.sidebarOpen
    },
    loggedIn(state) {
      return state.token != null
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
      return state.questions;
    }
  },
  mutations: {
    toggleSidebar(state) {
      state.sidebarOpen = !state.sidebarOpen
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
    getEngagementQuestions(state, questions) {
      state.questions = questions
    },
    addClient(state, client) {
      state.clients.push({
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
    },
    //this is to create new engagement
    addEngagement(state, engagement) {
      state.engagements.push ({
        id: engagement.id,
        client_id: engagement.client_id,
        return_type: engagement.return_type,
        year: engagement.year,
        assigned_to: engagement.assigned_to,
        status: engagement.status,
        done: false
      })
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
        'return_type': engagement.return_type,
        'year': engagement.year,
        'assigned_to': engagement.assigned_to,
        'status': engagement.status,
        'done': false           
      })
    },
    deleteEngagement(state, id) {
      const index = state.engagements.findIndex(engagement => engagement.id == id);
      state.engagements.splice(index, 1);
    },
    addDependent(state, dependent) {
      state.client.dependents.push(dependent);
    },
    deleteDependent(state, id) {
      const index = state.dependents.findIndex(dependent => dependent.id == id);
      state.dependents.splice(index, 1);
    },
    addQuestion(state, question) {
      state.engagement.questions.push(question);
    },
    deleteQuestion(state, id) {
      const index = state.engagement.questions.findIndex(question => question.id == id);
      state.engagement.questions.splice(index, 1);
    },
    retrieveToken(state, token) {
      state.token = token
    },
    destroyToken(state) {
      state.token = null
    },
  },
  actions: {
    toggleSidebar({commit, state}) {
      commit('toggleSidebar')
    },
    retrieveName(context) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token


        return new Promise((resolve, reject) => {
          axios.get('/user')
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
        })
    },
    register(context, data) {
      return new Promise((resolve, reject) => {
        axios.post('/register', {
          name: data.name,
          email: data.email,
          password: data.password,
        })
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
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
    retrieveToken(context, credentials) {

      return new Promise((resolve, reject) => {
          axios.post('/login', {
              username: credentials.username,
              password: credentials.password,
          })
          .then(response => {
              const token = response.data.access_token

              localStorage.setItem('access_token', token)
              context.commit('retrieveToken', token)
              resolve(response)
          })
          .catch(error => {
              console.log(error)
              reject(error)
          })
      })
    },
    retrieveClients(context) {
      this.loading = true
      axios.get('/clients')
      .then(response => {
        this.loading = false
        context.commit('retrieveClients', response.data)
      })
      .catch(error => {
        this.loading = false
        console.log(error)
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
        console.log(error)
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
      .then(response => {
          context.commit('deleteClient', id)
      })
      .catch(error => {
          console.log(error)
      })                
    },
    addEngagement(context, engagement) {
      axios.post(('/engagements'), {
        client_id: engagement.client_id,
        return_type: engagement.return_type,
        year: engagement.year,
        assigned_to: engagement.assigned_to,
        status: engagement.status,
        done: false
      })
      .then(response => {
        context.commit('addClientEngagement', response.data)
      })
      .catch(error => {
        console.log(error)
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
          console.log(error)
      })           
    },
    deleteEngagement(context, id) {
      axios.delete('/engagements/' + id)
      .then(response => {
          context.commit('deleteEngagement', id)
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
      .then(response => {
          context.commit('deleteDependent', id)
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
      .then(response => {
          context.commit('deleteQuestion', id)
      })
      .catch(error => {
          console.log(error)
      })                
    },
  }
})

