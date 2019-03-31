<template>
    <div v-if="editNoteModal">
        <!-- this is the modal to notify client of status -->
      <b-modal v-model="modal"  hide-footer title="Edit Note">
        <form class="text-right">
           <vue-editor v-model="noteToEdit.note" :editorToolbar="customToolbar"></vue-editor>
           <div class="d-flex justify-content-between mt-3">
               <button :disabled="processing" type="button" class="btn btn-primary btn-sm" @click="editNote">
                    <span v-if="processing">Editing note...</span>
                    <span v-if="!processing">Edit Note</span>
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
    name: 'EditNoteModal',
    props: ['note'],
    data() {
      return {
        modal: true,
        customToolbar: [
            ['bold', 'italic', 'underline'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }]
          ],
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
      ...mapGetters(['processing', 'editNoteModal', 'noteToEdit']),
    },
    methods: {
        editNote() {
            this.$store.dispatch('editEngagementNote', {
                id: this.noteToEdit.id,
                engagement_id: this.noteToEdit.engagement_id,
                note: this.noteToEdit.note
            })
            .then(() => {
                
            })
        },
        closeModal() {
            this.$store.commit('editNoteModal')
        }
    },
    created() {
        this.$store.dispatch('showEngagementNote', this.note)
    }
}
</script>

<style scoped>

</style>




