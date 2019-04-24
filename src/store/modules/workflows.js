import axios from 'axios'
import moment from 'moment';
import router from '../../router'

export default {
    state: {
        workflows: [],
        workflow: [],
    },
    getters: {
        allWorkflows(state) {
            return state.workflows
        },
        workflow(state) {
            return state.workflow
        },
    },
    mutations: {
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
    },
    actions: {
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
    }
}