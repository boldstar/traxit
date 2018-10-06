<template>
    <div>
        <h1>Pending</h1>

        <div v-for="(engagement, index) in engagementQuestions" :key="index">    
            <div class="card mb-3"  v-for="(question, index) in engagement.questions" :key="index">
            <div class="card-header">
            <div class="h6 m-0 justify-content-between d-flex">
                
            </div>
            </div>
            <div class="card-body bg-light d-flex justify-content-between">
            <div class="h4 mr-5 text-left">
                {{ question.question }}
            </div>
            <div class="ml-5 d-flex align-self-center">
                <span class="font-weight-bold mr-2">Answered: </span>
                <input class="mt-2" type="checkbox" v-model="question.answered">
            </div>
            </div>
        </div>

   </div>

        <div v-if="detailsLoaded" class="lds-dual-ring justify-content-center"></div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
name: 'Pending',
data() {
    return {
        detailsLoaded: false,
    }
},
computed: {
...mapGetters(
    [
        'engagementQuestions',
        'engagement'
    ]
    ),
},
created: function(){
this.$store.dispatch('getEngagementQuestions', this.$route.params.id);
this.detailsLoaded = true;
var self = this;
setTimeout(() => {
    self.detailsLoaded = false;
}, 3000)
}
    
}
</script>

<style lang="scss" scoped>

</style>