import axios from 'axios'
import moment from 'moment';
import router from '../../router'

export default {
    state: {
        tasks: [],
        task: [],
    },
    getters: {
        tasks(state) {
            return state.tasks;
        },
    },
    mutations: {
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
    },
    actions: {
        retrieveTasks(context) {

            axios.get('/tasks')
            .then(response => {
              context.commit('retrieveTasks', response.data)
            })
            .catch(error => {
              console.log(error)
            })
        },
        updateTask(context, task) {
            context.commit('startProcessing')
            axios.patch('/tasks/' + task.id, {
                user_id: task.user_id,
                status: task.status,
                done: task.done
            })
            .then(response => {
                if(response.data.notify) {
                context.commit('notifyClientModal', response.data.task)
                context.commit('notifyClientMessage', response.data.status)
                context.commit('stopProcessing')
            }
                context.commit('updateTask', response.data.task)
                context.commit('successAlert', response.data.message)
                context.commit('stopProcessing')
            })
            .catch(error => {
                console.log(error.response.data)
            })           
        },
        batchUpdateTasks(context, tasks) {
            context.commit('startProcessing')
            axios.patch('/batchUpdateTasks', {
                tasksToUpdate: tasks.tasksToUpdate,
                user_id: tasks.user_id,
                status: tasks.status
            })
            .then(response => {
                context.commit('successAlert', response.data.message)
                context.commit('batchUpdateTasks', response.data.tasks)
                context.commit('stopProcessing')
            })
            .catch(err => {
                console.log(err)
                context.commit('errorMsgAlert', err.response.data.message)
                context.commit('stopProcessing')
            })
        },
    }
}