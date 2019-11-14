import axios from 'axios'
import {formatFileName} from '../../plugins/filters.js'

export default {
    state: {
        allFiles: []
    },
    getters: {
        all_files(state) {
            return state.allFiles
        }
    },
    mutations: {
        ALL_FILES(state, files) {
            state.allFiles = files
        },
        UPDATE_FILES(state, id) {
            const index = state.allFiles.findIndex(file => file.id == id)
            state.allFiles.splice(index, 1)
        },
        DELETE_FILE(state, id) {
            const index = state.allFiles.findIndex(file => file.id == id)
            state.allFiles.splice(index, 1)
        }
    },
    actions: {
       getFiles(context) {
           axios.get('/files')
           .then(response => {
               context.commit('ALL_FILES', response.data)
           }).catch(error => {
               console.log(error.response.data)
           })
       },
       downloadClientFile(context, file) {
           axios.post('/download-client-file', file, {responseType: 'blob'})
           .then(response => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', formatFileName(file.name));
                document.body.appendChild(link);
                link.click();
           }).catch(error => {
               console.log(error.response.data)
           })
       },
       downloadClientFiles(context, id) {
           axios.get('/download-client-files/' + id, {responseType: 'arraybuffer'})
           .then(response => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'files.zip');
                document.body.appendChild(link);
                link.click();
           }).catch(error => {
               console.log(error.response.data)
           })
       },
       archiveClientFiles(context, id) {
           context.commit('startProcessing')
           axios.patch('/archive-client-files/' + id)
           .then(response => {
                context.commit('UPDATE_FILES', id)
                context.commit('stopProcessing')
                context.commit('successAlert', 'Files Archived')
            }).catch(error => {
                context.commit('stopProcessing')
                context.commit('errorMsgAlert', error.response.data.message)
                console.log(error.response.data)
            })
        },
        deleteFiles(context, id) {
            context.commit('startProcessing')
            axios.delete('/delete-files/' + id)
            .then(response => {
                context.commit('DELETE_FILE', id)
                context.commit('stopProcessing')
                context.commit('successAlert', 'Files Deleted')
            }).catch(error => {
                console.log(error.response.data)
                context.commit('errorMsgAlert', error.response.data.message)
                context.commit('stopProcessing')
           })
       }
    }
}