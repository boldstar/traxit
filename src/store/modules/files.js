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
                link.setAttribute('download', 'file.zip');
                document.body.appendChild(link);
                link.click();
           }).catch(error => {
               console.log(error.response.data)
           })
       },
       archiveClientFiles(context, id) {
           axios.patch('/archive-client-files/' + id)
           .then(response => {
               context.commit('UPDATE_FILES', id)
           }).catch(error => {
               console.log(error.response.data)
           })
       }
    }
}