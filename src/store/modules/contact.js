import axios from 'axios'
import moment from 'moment';
import router from '../../router'

export default {
    state: {
        client: [],
        clients: [],
        dependent: [],
        dependents: [],
        note: [],
        notes: [],
        clientnotes: [],
        businesses: [],
        business: '',
    },
    getters: {
        allClients(state) {
            return state.clients;
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
    },
    mutations: {
        retrieveClients(state, clients) {
            state.clients = clients
        },
        addClient(state, client) {
            state.clients.push(client)
        },
        deleteClient(state, id) {
            const index = state.clients.findIndex(client => client.id == id);
            state.clients.splice(index, 1);
        },
        getDetails(state, client) {
            state.client = client
        },
        editDetails(state, client) {
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
    },
    actions: {
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
        editDetails({commit}, id) {
            axios.get('/clients/'+id)
            .then(response => {
                const client = response.data
                if(client.dob != null && client.dob != '') {
                const taxpayer_dob = moment(String(client.dob)).format('MM/DD/YYYY')
                client.dob = taxpayer_dob
                }
                if(client.spouse_dob != null && client.spouse_dob != '') {
                const spouse_dob = moment(String(client.spouse_dob)).format('MM/DD/YYYY')
                client.spouse_dob = spouse_dob
                }
                commit('editDetails', client)
            })
            .catch(error => {
                console.log(error)
            })
        },
        addClient(context, client) {
            axios.post('/clients', {
                id: client.id,
                active: true,
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
                context.commit('addClient', response.data.contact)
                context.commit('successAlert', response.data.message)
            })
            .catch(error => {
                console.log(error.response.data)
            })
        },
        updateClient(context, client) {
            axios.patch('/clients/' + client.id, {
                id: client.id,
                active: client.active,
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
                context.commit('updateClient', response.data.client)
                context.commit('successAlert', response.data.message)
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
                address: business.address,
                city: business.city,
                state: business.state,
                postal_code: business.postal_code,
                email: business.email,
                phone_number: business.phone_number,
                fax_number: business.fax_number
            })
            .then(response => {
                context.commit('successAlert', response.data.message)
            })
            .catch(error => {
                console.log(error)
                context.commit('errorMsgAlert', error.response.data.message)
            })
        },
        updateBusiness(context, business) {
            axios.patch(('/businesses/' + business.id ), {
                client_id: business.client_id,
                business_name: business.business_name,
                address: business.address,
                city: business.city,
                state: business.state,
                postal_code: business.postal_code,
                email: business.email,
                phone_number: business.phone_number,
                fax_number: business.fax_number
            })
            .then(response => {
                context.commit('updateBusiness', response.data)
            })
            .catch(error => {
                console.log(error)
                context.commit('errorMsgAlert', error.response.data.message)
            })
        },
        deleteBusiness(context, id) {
            context.commit('startProcessing')
            axios.delete('/businesses/' + id)
            .then(response => {
                context.commit('deleteBusiness', id)
                context.commit('successAlert', response.data)
                context.commit('stopProcessing')
            })
            .catch(error => {
                context.commit('stopProcessing')
                console.log(error)
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
                console.log(error.response.data)
                context.commit('errorMsgAlert', error.response.data.message)
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
                context.commit('errorMsgAlert', error.response.data.message)
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
              context.commit('errorMsgAlert', error.response.data.message)
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
                context.commit('errorMsgAlert', error.response.data.message)
            })           
        },
    }
}