<template>
    <div class="w-100 mb-3">
        <div class="card px-0 shadow-sm align-self-start note-div">
            <div class="card-header d-flex justify-content-between py-2">
                <div class="font-weight-bold align-self-center">
                <span class="align-self-center">Notes | <span class="text-primary">{{engagementNotes.length}}</span></span>
                </div>
                <button class="btn btn-primary btn-sm" @click="addNoteModal"><i class="far fa-plus-square"></i></button>
            </div>
            <div v-if="engagementNotes.length <= 0" class="card-body shadow-sm note-div">
                <span class="font-weight-bold">There are currrently no notes</span>
            </div>
            <div v-if="engagementNotes.length > 0">
                <div class="card-body border-bottom py-0 text-left note-div" v-for="(note, index) in engagementNotes" :key="index">
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
            </div>
        </div>

        <note-modal :key="noteModal"></note-modal>
        <edit-note-modal :key="`${editNoteModal} + '1'`" :note="noteToEdit.id" v-if="editNoteModal"></edit-note-modal>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import bModal from 'bootstrap-vue/es/components/modal/modal'
import bModalDirective from 'bootstrap-vue/es/directives/modal/modal'
import Spinner from '@/components/loaders/Spinner.vue'
import NoteModal from '@/components/engagement/NoteModal.vue'
import EditNoteModal from '@/components/engagement/EditNoteModal.vue'

export default {
    name: 'EngageNotes',
    props: ['engagement-notes', 'engagement'],
    components:{
        'b-modal': bModal,
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
        ...mapGetters(['successAlert', 'processing', 'errorMsgAlert', 'noteModal', 'editNoteModal']),
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
        confirmDelete(id) {
            this.selectedNote = id
            this.deleteNote = true
        },
    }
}
</script>