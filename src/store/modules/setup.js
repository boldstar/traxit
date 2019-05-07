import axios from 'axios'

export default {
    state: {
        complete: false,
        setup: false,
        modal: false,
        workflowmodal: false,
        message: '',
        setupTour: false,
        tours: null,
        accountState: false
    },
    getters: {
        isComplete(state) {
            return state.complete
        },
        successMessage(state) {
            return state.message
        },
        setupState(state) {
            return state.setup
        },
        modalState(state) {
            return state.modal
        },
        workflowModalState(state) {
            return state.workflowmodal
        },
        setupTour(state) {
            return state.setupTour
        },
        accountSuccess(state) {
            return state.accountState
        }
    },
    mutations: {
        completeStep(state) {
            state.complete = true
        },
        successMessage(state, message) {
            state.message = message
        },
        setupState(state) {
            state.setup = !state.setup
        },
        uploadModal(state) {
            state.modal = !state.modal
        },
        clearSetupMessage(state) {
            state.message = ''
        },
        setupWorkflowModal(state) {
            state.workflowmodal = !state.workflowmodal
        },
        setupTourState(state, tours) {
            state.setupTour = !tours[0].setup_tour
        },
        clearTour(state) {
            state.tours = null
        },
        accountSuccess(state) {
            state.accountState = !state.accountState
        }
    },
    actions: {
        getTours(context) {
            axios.get('/tours')
            .then(response => {
                context.commit('setupTourState', response.data)
            })
            .catch(error => {
                console.log(error.response.data)
            })
        },
        completeSetup(context) {
            axios.post('/complete-setup-tour')
            .then(response => {
                context.commit('setTours', response.data)
                document.location.reload(true)
            })
            .catch(error => {
                console.log(error.response.data)
            })
        },
        uploadContactsOnSetup(context, file) {
            context.commit('setupState')
            let formData = new FormData();
            formData.append('file', file)
            axios.post('/importclientsonsetup', formData, { headers: {
                'Content-Type': 'multipart/form-data'
            }})
            .then(response => {
                context.commit('setupState')
                context.commit('successMessage', response.data.message)
            })
            .catch(error => {
                context.commit('setupState')
                console.log(error.reponse.data)
            })
        },
        createWorkflowOnSetup(context, workflow) {
            context.commit('setupState')
            axios.post('/createworkflowonsetup', {
                name: workflow.name,
                statuses: workflow.statuses,
            })
            .then(response => {
                context.commit('setupState')
                context.commit('successMessage', response.data.message)
            })
            .catch(error => {
                context.commit('setupState')
                console.log(error.response.data)
                context.commit('successMessage', error.response.data)
            })           
        },
        setupAccountDetails(context, account) {
            context.commit('setupState')
            axios.post('/accountsetup', {
                business_name: account.business_name,
                email: account.email,
                phone: account.phone
            })
            .then(response => {
                context.commit('setupState')
                context.commit('accountSuccess', response.data.message)
            })
            .catch(error => {
                context.commit('setupState')
                console.log(error.response.data)
                context.commit('accountSuccess', response.data.message)
            })
        }
    }
}