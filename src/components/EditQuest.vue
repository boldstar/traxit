<template>
    <div class="container card-body bg-light">
        <form @submit.prevent="editThisQuestion" class="d-flex-column justify-content-center">

            <div class="form-group">
                <vue-editor v-model="question.question"></vue-editor>
            </div>


            <div class="d-flex justify-content-between">
              <button type="submit" class="btn btn-primary d-flex justify-content-start">Save Changes</button>
              <router-link v-bind:to="'/engagement/' +engagement.id " class="btn btn-secondary float-right">Cancel</router-link>
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
          'engagement',
          'question'
        ]
      ),
  },
  methods: {
    ...mapActions(['updateQuestion']),
    
    editThisQuestion() {
      if(!this.question ) return;
      
      this.updateQuestion({
        id: this.question.id,
        engagement_id: this.question.engagement_id,
        question: this.question.question,
      })   
      .then(() => {
        this.$router.push({path: '/engagement/' +this.engagement.id, query: {alert: 'The question has been edited!'}});
      })
    },
  },
  created: function(){
    this.$store.dispatch('getQuestion', this.$route.params.question);
  }

}
</script>


<style>

</style>

