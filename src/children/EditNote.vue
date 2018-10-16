<template>
    <div class="container card-body bg-light">
        <form @submit.prevent="editThisNote" class="d-flex-column justify-content-center">

            <div class="form-group">
                <vue-editor v-model="note.note"></vue-editor>
            </div>


            <div class="d-flex justify-content-between">
              <button type="submit" class="btn btn-primary d-flex justify-content-start">Save Changes</button>
              <router-link v-bind:to="'/contact/' +client.id+'/notes' " class="btn btn-secondary float-right">Cancel</router-link>
            </div>
      
        </form>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { VueEditor } from "vue2-editor";

export default {
    name: 'EditQuestion',
    components: {
      VueEditor
    },
    computed: {
    ...mapGetters(
        [
          'note',
          'client'
        ]
      ),
  },
  methods: {
    ...mapActions(['updateNote']),
    
    editThisNote() {
      if(!this.note.note ) return;
      
      this.updateNote({
        id: this.note.id,
        client_id: this.client.id,
        note: this.note.note,
      })   
      .then(() => {
        this.$router.push({path: '/contact/' +this.client.id+'/notes', query: {alert: 'The note has been edited!'}});
      })
    },
  },
  created: function(){
    this.$store.dispatch('getNote', this.$route.params.note);
  }

}
</script>


<style>

</style>

