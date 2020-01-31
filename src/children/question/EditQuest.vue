<template>
    <div class="col-8 card mx-auto px-0 mb-3 shadow edit-question-form">
        <div class="card-header text-left">
          <span class="font-weight-bold">{{engagement.name}}</span>
        </div>
        <div class="text-left p-3">
          <h5>Edit Question:</h5>
        </div>
        <form @submit.prevent="editThisQuestion" class="d-flex-column justify-content-center px-3 mb-3">

            <div class="form-group">
                <vue-editor v-model="question.question" :editorToolbar="customToolbar"></vue-editor>
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
    data() {
      return {
         customToolbar: [
            ['bold', 'italic', 'underline'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }]
          ]
      }
    },
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
        this.$router.push({path: '/engagement/' +this.engagement.id + '/questions'});
      })
    },
  },
  created: function(){
    this.$store.dispatch('getQuestion', this.$route.params.question);
  }

}
</script>


<style scoped>
@media screen and (max-width: 1300px) {
  .edit-question-form {
    width: 100%!important;
    flex: 0 0 100%!important;
    max-width: 100%!important;
  }
}
</style>

