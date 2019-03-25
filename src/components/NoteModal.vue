<template>
    <div v-if="noteModal">
        <!-- this is the modal to notify client of status -->
      <b-modal v-model="modal"  hide-footer title="Add Note">
        <form class="text-right">
           <vue-editor v-model="note" :editorToolbar="customToolbar"></vue-editor>
           <div class="d-flex justify-content-between mt-3">
               <button :disabled="processing" type="button" class="btn btn-primary btn-sm" @click="addNote">
                    <span v-if="processing">Adding note...</span>
                    <span v-if="!processing">Add Note</span>
                </button>
               <button type="button" class="btn btn-secondary btn-sm" @click="closeModal">Cancel</button>
           </div>
        </form>
      </b-modal>
    </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
import { mapGetters } from 'vuex';
import bModal from 'bootstrap-vue/es/components/modal/modal';
import bModalDirective from 'bootstrap-vue/es/directives/modal/modal';

export default {
    name: 'NoteModal',
    data() {
      return {
        modal: true,
        note: '',
        customToolbar: [
            ['bold', 'italic', 'underline'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }]
          ]
      }
    },
    components:{
        'b-modal': bModal,
        VueEditor
    },
    directives: {
        'b-modal': bModalDirective
    },
    computed: {
      ...mapGetters(['processing', 'noteModal', 'noteId'])
    },
    methods: {
        addNote() {
            this.$store.dispatch('addEngagementNote', {
                engagement_id: this.noteId,
                note: this.note
            })
            .then(() => {
                this.note = ''
            })
        },
        closeModal() {
            this.$store.commit('showNoteModal', '')
        }
    }
}
</script>

<style scoped>

</style>




