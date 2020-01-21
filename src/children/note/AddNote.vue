<template>
    <div class="container card-body bg-light">
        <form @submit.prevent="addNewNote" class="d-flex-column justify-content-center">

            <div class="form-group">
                <vue-editor v-model="note.note" :editorToolbar="customToolbar"></vue-editor>
            </div>


            <div class="d-flex justify-content-between">
              <button type="submit" class="btn btn-primary d-flex justify-content-start">Create</button>
              <router-link v-bind:to="'/contact/' +client.id+'/notes' " class="btn btn-secondary float-right">Cancel</router-link>
            </div>
      
        </form>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { VueEditor } from "vue2-editor";

export default {
    name: 'AddNote',
    components: {
        VueEditor
    },
    data() {
        return {
            note: {
                note: ''
            },
            customToolbar: [
            ['bold', 'italic', 'underline'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }]
          ]
        }
    },
    computed: {
    ...mapGetters(
        [
          'client',
        ]
      ),
  },
  methods: {
    ...mapActions(['addNote']),
    
    addNewNote() {
      if(!this.note ) return;
      
      this.addNote({
        id: this.idForNote,
        client_id: this.client.id,
        note: this.note.note,
      })   
      .then(() => {
        this.note = "" 
        this.idForNote++
        this.$router.push({path: '/contact/' +this.client.id+ '/notes', query: {alert: 'A new note has been added!'}});
      })
    },
  },

}
</script>


<style>

</style>

