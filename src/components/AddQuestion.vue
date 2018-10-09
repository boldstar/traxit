<template>
    <div class="container card-body bg-light">
        <form @submit.prevent="addNewQuestion" class="d-flex-column justify-content-center">

            <div class="form-group">
                <vue-editor v-model="question.question"></vue-editor>
            </div>


            <div class="d-flex justify-content-between">
              <button type="submit" class="btn btn-primary d-flex justify-content-start">Create</button>
              <router-link v-bind:to="'/engagement/' +engagement.id " class="btn btn-secondary float-right">Cancel</router-link>
            </div>
      
        </form>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { VueEditor } from "vue2-editor";

export default {
    name: 'AddQuestion',
     components: {
        VueEditor
    },
    data() {
        return {
            question: {
                question: ''
            }
        }
    },
    computed: {
    ...mapGetters(
        [
          'engagement',
        ]
      ),
  },
  methods: {
    ...mapActions(['addQuestion']),
    
    addNewQuestion() {
      if(!this.question ) return;
      
      this.addQuestion({
        id: this.idForQuestion,
        engagement_id: this.engagement.id,
        question: this.question.question,
      })   
      .then(() => {
        this.question = "" 
        this.idForQuestion++
        this.$router.push({path: '/engagement/' +this.engagement.id, query: {alert: 'A new question has been added!'}});
      })
    },
  },

}
</script>


<style>

</style>

