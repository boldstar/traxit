<template>
    <div class="container card bg-white p-3 shadow-sm">
        <div class="text-left">
            <h6 class="font-weight-bold mb-0">Business Note Form</h6>
            <p class="text-secondary">Add or edit note using this form</p>
        </div>

            <div class="form-group" v-if="note">
                <vue-editor v-model="note.note" :editorToolbar="customToolbar"></vue-editor>
            </div>
            <div class="form-group bg-white" v-else>
                <vue-editor v-model="newNote" :editorToolbar="customToolbar"></vue-editor>
            </div>


            <div class="d-flex justify-content-between">
              <button type="submit" class="btn btn-primary d-flex justify-content-start" @click="saveChanges">Save Changes</button>
              <router-link :to="'/business/' +business.id+'/notes' " class="btn btn-secondary float-right">Cancel</router-link>
            </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { VueEditor } from "vue2-editor";

export default {
    name: 'EditBusinessNote',
    props: ['business', 'note'],
    data() {
      return {
         customToolbar: [
            ['bold', 'italic', 'underline'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }]
          ],
          newNote: null
      }
    },
    components: {
      VueEditor
    },
  methods: {
    saveChanges() {
        this.$store.dispatch('updateBusinessNotes', {
            note: this.note ? this.note.note : this.newNote,
            business_id: this.business.id,
            id: this.note ? this.note.id : null
        })
    }
  },

}
</script>
