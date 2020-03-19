<template>
    <div class="w-100 text-left engage-notes">
        <div class="d-flex justify-content-between">
            <div>
                <h4 class="mb-0">Engagement Notes</h4>
                <span class="title-description text-secondary">A list of notes for the engagement</span>
            </div>
            <button class="btn btn-sm btn-secondary font-weight-bold align-self-start" type="button" @click="addNoteModal">Add Note</button>
        </div>

        <div class="px-0 align-self-start note-div my-3">
            <div v-if="engagementNotes.length <= 0" class="card-body shadow-sm bg-white">
                <span class="font-weight-bold">There are currrently no notes</span>
            </div>
            <div v-if="engagementNotes.length > 0">
                <div class="card shadow-sm p-2 text-left note-div mb-3" v-for="(note, index) in engagementNotes" :key="index">
                    <div class="note p-1">
                        <div class="mb-2">
                            <h6 class="mb-0 font-weight-bold" v-if="note.username != null">Created By: {{ note.username }}</h6>
                            <span class="font-weight-bold text-secondary">Date: {{ note.created_at | formatDate }}</span>
                        </div>  
                        <div v-html="note.note"></div>
                        <div class="d-flex mt-2">     
                            <button type="button" class="btn btn-primary btn-sm font-weight-bold" @click="editNote(note)">Edit</button>  
                            <span v-if="deleteNote && note.id == selectedNote" class="note-span">Are you sure?</span>
                            <button type="button" class="btn btn-secondary btn-sm ml-3 font-weight-bold">
                                <span v-if="!deleteNote" @click="confirmDelete(note.id)">Delete</span>
                                <span v-if="deleteNote && note.id == selectedNote" @click="deleteENote(note.id)">Yes</span>
                            </button>
                            <button class="btn btn-sm btn-secondary ml-2 font-weight-bold" v-if="deleteNote && note.id == selectedNote" @click="deleteNote = false">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="card add-note" @click="addNoteModal">
            <div class="card-body d-flex justify-content-center">
                <div class="d-flex flex-column align-items-center add-note-btn-border">
                    <i class="fas fa-edit fa-3x mb-2"></i>
                    <span class="font-weight-bold">Add Note</span>
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

<style lang="scss">
    .add-note {
        border: 2px dashed lightgray;
        background: transparent!important;
        cursor: pointer;
        transition: all .5s;

        &:hover {
            background: white!important;
            box-shadow: 0 0 8px 0 rgba(0,0,0,.3);
        }

        .add-note-btn-border {

            i {
                color: lightgray!important;
            }

            span {
                color: lightgray!important;
            }
        }
    }

    .note {
        div {
            span {
                font-size: .8rem;
            }
        }
    }
</style>
