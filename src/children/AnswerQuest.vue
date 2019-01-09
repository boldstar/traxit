<template>
    <div class="answer-quest card-body p-0">
        <div class="card-body text-left px-0">
          <div class="mb-3">
            <h3>Question</h3>
          </div>
          <span v-html="question.question"></span>
        </div>
        <div class="text-left">
          <h3>Answer</h3>
        </div>
     
          <form @submit.prevent="acceptAnswer" class="d-flex-column justify-content-center bg-light">

          <div class="form-group p-3 mb-0">
              <vue-editor v-model="answerQuestion.answer"></vue-editor>
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
        }
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

