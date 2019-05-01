import axios from 'axios'

export default {
    state: {
        complete: false,
        setup: false,
        modal: false,
        workflowmodal: false,
        message: '',
        setupDone: localStorage.getItem('setup-done')
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
        }
    },
    actions: {
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