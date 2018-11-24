<template>
    <div class="answer-quest card-body bg-light">
        <form @submit.prevent="acceptAnswer" class="d-flex-column justify-content-center">

        <div class="form-group">
            <vue-editor v-model="question.answer"></vue-editor>
        </div>


        <div class="d-flex justify-content-between">
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
         question: {
            answer: '',
            answered: true,
        }
      }
    },
    computed: {
    ...mapGetters(['engagement']),
  },
  methods: {
    ...mapActions(['updateAnswer']),

    acceptAnswer() {
      if(!this.question.answer) return;
      this.updateAnswer({
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

