<template>
    <div class="answer-quest card p-0 col-8 shadow mb-3 edit-answer-form mx-auto">
      <div class="card-header text-left">
        <span class="font-weight-bold">{{engagement.name}}</span>
      </div>
        <div class="card-body text-left px-3">
          <div class="mb-3">
            <h5>Question</h5>
          </div>
          <span v-html="question.question"></span>
        </div>
    
          <form class="d-flex-column justify-content-center px-3">
          <div class="text-left">
            <h5>Answer</h5>
          </div>

          <div class="form-group py-3 mb-0">
              <vue-editor v-model="question.answer" :editorToolbar="customToolbar"></vue-editor>
          </div>


          <div class="d-flex justify-content-between mb-3">
            <button class="btn btn-primary d-flex justify-content-start font-weight-bold" type="button" @click="acceptAnswer">Save</button>
            <router-link v-bind:to="'/engagement/' +engagement.id+ '/questions' " class="btn btn-secondary font-weight-bold">Cancel</router-link>
          </div>

          </form>
    
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { VueEditor } from "vue2-editor";

export default {
  name: 'EditAnswer',
     components: {
      VueEditor
  },
    data() {
      return {
         answerQuestion: {
            answer: '',
            answered: true,
        },
         customToolbar: [
            ['bold', 'italic', 'underline'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }]
          ]
      }
    },
    computed: {
    ...mapGetters(['engagement', 'question']),
  },
  methods: {
    ...mapActions(['editAnswer']),

    acceptAnswer() {
      this.editAnswer({
        id: this.$route.params.question,
        answer: this.question.answer,
        answered: this.question.answered
      }).then(() => {
      this.$router.go(-1)
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
  .edit-answer-form {
    width: 100%!important;
    flex: 0 0 100%!important;
    max-width: 100%!important;
  }
}
</style>


