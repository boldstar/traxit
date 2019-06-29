<template>
    <div class="w-100">
        <div class="card px-0 shadow-sm align-self-start note-div">
            <div class="card-header d-flex justify-content-between">
                <div class="font-weight-bold">
                <span class="align-self-center">Notes | <span class="text-primary">{{engagementNotes.length}}</span></span>
                </div>
                <button class="btn btn-primary btn-sm" @click="addNoteModal"><i class="far fa-plus-square"></i></button>
            </div>
        </div>
        <div v-if="engagementNotes.length <= 0" class="card-body shadow-sm border note-div">
            <span class="font-weight-bold">There are currrently no notes</span>
        </div>
        <div class="card-body py-0 text-left border note-div" v-for="(note, index) in engagementNotes" :key="index" v-if="engagementNotes.length > 0">
            <div class="note p-1">
            <div v-html="note.note"></div>
            <div class="d-flex justify-content-between">
                <div class="d-flex">
                <span class="note-date mr-1" v-if="note.username != null">Created By: {{ note.username }} | </span>
                <span class="note-date">{{ note.created_at | formatDate }}</span>
                </div>
                <div class="d-flex">     
                <button type="button" class="edit-btn" @click="editNote(note)">Edit</button>  
                <span v-if="deleteNote && note.id == selectedNote" class="note-span">Are you sure?</span>
                <button type="button" class="note-btn">
                    <span v-if="!deleteNote" @click="confirmDelete(note.id)">Delete</span>
                    <span v-if="deleteNote && note.id == selectedNote" @click="deleteENote(note.id)">Yes</span>
                </button>
                <button class="note-btn ml-2" v-if="deleteNote && note.id == selectedNote" @click="deleteNote = false">Cancel</button>
                </div>
            </div>  
            </div>
        </div>

        <note-modal></note-modal>
        <edit-note-modal :note="noteToEdit.id" v-if="editNoteModal"></edit-note-modal>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Alert from '@/components/Alert.vue'
import bModal from 'bootstrap-vue/es/components/modal/modal'
import bModalDirective from 'bootstrap-vue/es/directives/modal/modal'
import Spinner from '@/components/Spinner.vue'
import NoteModal from '@/components/NoteModal.vue'
import EditNoteModal from '@/components/EditNoteModal.vue'

export default {
    name: 'EngageNotes',
    props: ['engagement-notes'],
    components:{
        'b-modal': bModal,
        Alert,
        Spinner,
        NoteModal,
        EditNoteModal
    },
    directives: {
        'b-modal': bModalDirective
    },
    data() {
        return {
            deleteNote: false,
            selectedNote: null,
            noteToEdit: null,
        }
    },
    computed: {
        ...mapGetters(['engagement','question', 'successAlert', 'processing', 'errorMsgAlert', 'engagementWorkflow','archiving', 'engagementNotes', 'noteModal', 'editNoteModal']),
    },
    methods: {
        addNoteModal() {
            this.$store.commit('showNoteModal', this.engagement.id)
        },
        editNote(note) {
            this.noteToEdit = note
            this.$store.commit('editNoteModal')
        },
        deleteENote(id) {
            this.$store.dispatch('deleteEngagementNote', id)
            .then(() => {
                this.deleteNote = false
            })
        },
    }
}
</script>
