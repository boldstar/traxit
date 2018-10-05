<template>
    <div class="container card-body bg-light">
        <form @submit.prevent="editThisQuestion" class="d-flex-column justify-content-center">

            <div class="form-group">
                <label for="question" class="d-flex justify-content-start font-weight-bold">Edit Question:</label>
                <textarea class="form-control" type="text" id="question" rows="5" v-model="question.question"></textarea>
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

export default {
    name: 'EditQuestion',
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
        id: this.idForQuestion,
        engagement_id: this.engagement.id,
        question: this.question.question,
      })   
      .then(() => {
        this.$router.push({path: '/engagement/' +this.engagement.id, query: {alert: 'The question has been edited!'}});
      })
    },
  },
  created: function(){
    this.$store.dispatch('getEngagement', this.$route.params.id);
  }

}
</script>


<style>

</style>

