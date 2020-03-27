import axios from 'axios'
import router from '../../routes/router'

export default {
    state: {
        engagements: [],
        engagement: [],
        enotes: '',
        questions: [],
        question: [],
        clientengagements: [],
        engagementquestions: [],
        history: [],
        noteToEdit: '',
        archiving: false,
        noteModal: false,
        noteId: '',
        alert: '',
        successAlert: '',
        errorAlert: '',
        createdEngagements: [],
        completedEngagements: [],
        editNoteModal: false,
        returntypes: '',
        engagement_workflow: '',
        status_modal: false
    },
    getters: {
        allEngagements(state) {
            return state.engagements;
        },
        engagementHistory(state) {
            return state.history;
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
        archiving(state) {
            return state.archiving
        },
        noteModal(state) {
            return state.noteModal
        },
        editNoteModal(state) {
            return state.editNoteModal
        },
        noteId(state) {
            return state.noteId
        },
        engagementNotes(state) {
            return state.enotes
        },
        noteToEdit(state) {
            return state.noteToEdit
        },
        completedEngagements(state) {
            return state.completedEngagements
        },
        createdEngagements(state) {
            return state.createdEngagements
        },
        returnTypes(state) {
            return state.returntypes
        },
        engagementWorkflow(state) {
            return state.engagement_workflow
        },
        engagementStatusModal(state) {
            return state.status_modal
        }
    },
    mutations: {
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
        //this is to push client engagement into the client engagements view
        addClientEngagement(state, engagement) {
            state.clientengagements.push(engagement)
        },
        // this is to view the engagement
        getEngagement(state, engagement) {
            state.engagement = engagement
        },
        engagementsHistory(state, history) {
            state.createdEngagements = history.created
            state.completedEngagements = history.completed
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
        showNoteModal(state, id) {
            state.noteModal = !state.noteModal
            state.noteId = id
        },
        editNoteModal(state) {
            state.editNoteModal = !state.editNoteModal
        },
        engagementNotes(state, notes) {
            state.enotes = notes
        },
        deleteENote(state, id) {
            const index = state.enotes.findIndex(note => note.id == id)
            state.enotes.splice(index, 1)
        },
        engagementNoteToEdit(state, note) {
            state.noteToEdit = note
        },
        updateENote(state, note) {
            const index = state.enotes.findIndex(item => item.id == note.id)
            state.enotes.splice(index, 1, note)
        },
        updateReceivedDate(state, history) {
            const index = state.history.findIndex(item => item.id == history.id);
            state.history.splice(index, 1, history);
        },
        successAlert(state, alert) {
            state.successAlert = alert
        },
        errorMsgAlert(state, alert) {
            state.errorAlert = alert
        },
        archivingEngagement(state) {
            state.archiving = !state.archiving
        },
        returnTypes(state, returns) {
            state.returntypes = returns
        },
        engagementWorkflow(state, workflow) {
            state.engagement_workflow = workflow
        },
        showStatusModal(state, bool) {
            state.status_modal = bool
        }
    },
    actions: {
        retrieveEngagements(context) {
            axios.get('/engagements')
            .then(response => {
              context.commit('retrieveEngagements', response.data)
            })
            .catch(error => {
              console.log(error)
            })
        },
        getEngagementsHistory(context) {
            axios.get('/engagements-history')
            .then(response => {
                context.commit('engagementsHistory', response.data)
            })
            .catch(error => {
                console.log(error.response.data)
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
        updateReceivedDate(context, history) {
            axios.patch('/updatereceiveddate', {
                id: history.id,
                date: history.date
            })
            .then(response => {
                context.commit('updateReceivedDate', response.data.history)
                context.commit('successAlert', response.data.message)
            })
            .catch(error => {
                console.log(error.response.data)
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
            context.commit('startProcessing')
            axios.post(('/engagements'), engagement)
            .then(response => {
                context.commit('addClientEngagement', response.data.engagement)
                context.commit('successAlert', response.data.message)
                context.commit('stopProcessing')
                if(router.history.current.path == '/add/engagement/form') {
                    router.push('/add')
                } else {
                    router.push('/contact/' + engagement.client_id + '/engagements')
                }
            })
            .catch(error => {
                console.log(error.response.data)
                context.commit('stopProcessing')
                context.commit('errorMsgAlert', error.response.data.message)
            })
        },
        updateEngagement(context, engagement) {
            context.commit('startProcessing')

            return new Promise((resolve, reject) => {
                axios.patch('/engagements/' + engagement.id, {
                    name: engagement.name,
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
                    done: engagement.done,
                    in_progress: false,
                    paid: engagement.paid,
                    estimated_date: engagement.estimated_date,
                    priority: engagement.priority
                })
                .then(response => {
                    context.commit('updateEngagement', response.data.engagement)
                    context.commit('successAlert', response.data.message)
                    context.commit('stopProcessing')
                    router.push({ path: '/engagement/' + response.data.engagement.id + '/details'})
                    resolve(response)
                })
                .catch(error => {
                    console.log(error)
                    context.commit('errorMsgAlert', error.response.data.message)
                    context.commit('stopProcessing')
                    reject(error)
                })           
            })
        },
        updateCheckedEngagements(context, checkedEngagements) {
            context.commit('startProcessing')
            axios.patch('/engagementsarray', {
                engagements: checkedEngagements.engagements,
                assigned_to: checkedEngagements.assigned_to,
                status: checkedEngagements.status,
                due_date: checkedEngagements.due_date
            })
            .then(response => {
                context.commit('updateCheckedEngagements', response.data.engagements)
                context.commit('successAlert', response.data.message)
                context.commit('stopProcessing')
            })
            .catch(error => {
                console.log(error)
                context.commit('errorMsgAlert', error.response.data.message)
                context.commit('stopProcessing')
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
                console.log(error)
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
              context.commit('showUpdateStatusModal')
            })
            .catch(error => {
              console.log(error)
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
                context.commit('showUpdateStatusModal')
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
                console.log(response.data)
                context.commit('updateAnswer', response.data)
                context.commit('showUpdateStatusModal')
            })
            .catch(error => {
                console.log(error)
                context.commit('errorMsgAlert', error.response.data.message)
            })           
        },
        editAnswer(context, question) {
            axios.patch('/editquestionsanswer/' + question.id, {
              answer: question.answer,
              answered: question.answered,
            })
            .then(response => {
                context.commit('updateAnswer', response.data)
                context.commit('showUpdateStatusModal')
            })
            .catch(error => {
                console.log(error)
                context.commit('errorMsgAlert', error.response.data.message)
            })           
        },
        addEngagementNote(context, note) {
            context.commit('startProcessing')
            axios.post('/add-e-note', {
              engagement_id: note.engagement_id,
              note: note.note
            })
            .then(response => {
              context.commit('stopProcessing')
              context.commit('showNoteModal', '')
              context.commit('engagementNotes', response.data.notes)
              context.commit('successAlert', response.data.message)
              setTimeout(() => {
                  context.commit('showUpdateStatusModal')
              }, 500)
            })
            .catch(error => {
              context.commit('stopProcessing')
              console.log(error)
            })
        },
        getEngagementNotes(context, id) {
            axios.get('/e-notes/' + id)
            .then(response => {
              context.commit('engagementNotes', response.data)
            })
            .catch(error => {
              console.log(error)
            })
        },
        deleteEngagementNote(context, id) {
            axios.delete('/delete-e-note/' + id)
            .then(response => {
              context.commit('deleteENote', id)
              context.commit('successAlert', response.data)
            })
            .catch(error => {
              console.log(error)
            })
        },
        editEngagementNote(context, note) {
            context.commit('startProcessing')
            axios.patch('/edit-e-note', {
              id: note.id,
              engagement_id: note.engagement_id,
              note: note.note
            })
            .then(response => {
              context.commit('stopProcessing')
              context.commit('editNoteModal')
              context.commit('updateENote', response.data.note)
              context.commit('successAlert', response.data.message)
            })
            .catch(error => {
              context.commit('stopProcessing')
              console.log(error)
            })
        },
        showEngagementNote(context, id) {
            axios.get('/show-e-note/' + id)
            .then(response => {
              context.commit('engagementNoteToEdit', response.data)
            })
            .catch(error => {
              console.log(error)
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
        engagementViewProgress(context, id) {
            axios.patch('/engagement-progress/' + id)
            .then(response => {
                context.commit('updateEngagement', response.data.engagement)
                context.commit('successAlert', response.data.message)
            })
            .catch(error => {
                console.log(error)
                context.commit('errorMsgAlert', error.response.data.message)
            })
        },
    }
}