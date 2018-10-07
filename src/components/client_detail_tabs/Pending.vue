<template>
    <div>
        <!-- this is the header for the contact engagements with the add engagement button -->
        <div class="header p-0 d-flex flex-row justify-content-between mt-2 mb-4 shadow-sm">
            <div class="ml-3 pr-2  h3 align-self-center m-0">
                <span><i class="far fa-question-circle text-primary"></i></span> |
                <span>{{ engagementQuestions.length }}</span>
            </div>
        </div>

        <div v-for="(engagement, index) in engagementQuestions" :key="index" v-if="!detailsLoaded">    
            <div class="card mb-3"  v-for="(question, index) in engagement.questions" :key="index">
            <div class="card-header d-flex justify-content-between">
                <div class="d-flex">
                    <i class="far fa-folder-open align-self-center mr-2 text-primary"></i>
                    <div class="font-weight-bold">
                        <router-link :to="'/engagement/'+engagement.id">
                            {{ engagement.return_type }}
                        </router-link>
                    </div>
                </div>
                <div>
                    <span class="font-weight-bold">
                        Created On:
                    </span>
                    <span>
                        {{ question.created_at }}
                    </span>
                </div>
            </div>
            <div class="card-body bg-light d-flex justify-content-between">
                <div class="h4 mr-5 text-left">
                    {{ question.question }}
                </div>
                <div class="ml-5 d-flex align-self-center">
                    <button class="btn btn-sm btn-primary font-weight-bold">Answer</button>
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
.header {
        height: 4em;
    }
</style>