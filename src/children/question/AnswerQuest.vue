<template>
    <div class="card col-8 mx-auto mb-3 p-0 shadow answer-question-form">
    <div class="card-header text-left">
      <span class="font-weight-bold">{{ engagement.name }}</span>
    </div>
      <div class="card-body text-left px-3">
          <h5>Question:</h5>
          <span v-html="question.question"></span>
      </div>
      <div class="text-left px-3">
        <h5 class="mb-0">Answer:</h5>
      </div>   
      <form @submit.prevent="acceptAnswer" class="d-flex-column justify-content-center">
        <div class="form-group p-3 mb-0">
            <vue-editor v-model="answerQuestion.answer" :editorToolbar="customToolbar"></vue-editor>
        </div>
        <div class="d-flex justify-content-between px-3 pb-3">
          <button class="btn btn-primary d-flex justify-content-start" @click="modalShow = true">Submit</button>
          <router-link v-bind:to="'/engagement/' +engagement.id " class="btn btn-secondary float-right">Cancel</router-link>
        </div>
      </form>     
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { VueEditor } from "vue2-editor";

export default {
  name: 'AnswerQuestion',
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
    ...mapActions(['updateAnswer']),

    acceptAnswer() {
      if(!this.answerQuestion.answer) return;
      this.updateAnswer({
        id: this.$route.params.question,
        answer: this.answerQuestion.answer,
        answered: this.answerQuestion.answered
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
  .answer-question-form {
    width: 100%!important;
    flex: 0 0 100%!important;
    max-width: 100%!important;
  }
}
</style>


