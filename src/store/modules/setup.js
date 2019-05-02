import axios from 'axios'

export default {
    state: {
        complete: false,
        setup: false,
        modal: false,
        workflowmodal: false,
        message: '',
        setupDone: localStorage.getItem('setup-done'),
        tours: null
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
        setUp(state) {
            return state.setupDone
        },
        setupTour(state) {
            return state.tours
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
        setTours(state, tours) {
            state.tours = tours[0]
        }
    },
    actions: {
        getTours(context) {
            axios.get('/tours')
            .then(response => {
                console.log(response.data)
                context.commit('setTours', response.data)
            })
            .catch(error => {
                console.log(error.response.data)
            })
        },
        completeSetup(context) {
            axios.post('/complete-setup-tour')
            .then(response => {
                console.log(response.data)
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
                console.log(response.data)
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
                console.log(response.data)
                context.commit('successMessage', response.data.message)
            })
            .catch(error => {
                context.commit('setupState')
                console.log(error.response.data)
                context.commit('successMessage', error.response.data)
            })           
        },
    }
}