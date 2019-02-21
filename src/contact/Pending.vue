<template>
    <div>
        <!-- this is the header for the contact engagements with the add engagement button -->
        <div class="header p-0 d-flex flex-row justify-content-between mt-2 mb-4 shadow-sm">
            <div class="ml-3 pr-2  h3 align-self-center m-0">
                <span><i class="far fa-question-circle text-primary"></i></span> |
                <span>{{ filteredQuestions.length }}</span>
            </div>
        </div>

        <div v-for="(engagement, index) in filteredQuestions" :key="index" v-if="!detailsLoaded"> 
            <div class="card mb-3"  v-for="(question, index) in engagement.questions" :key="index" v-if="question.answered == 0">
            <div class="card-header d-flex justify-content-between">
                <div class="d-flex">
                    <i class="far fa-folder-open align-self-center mr-2 text-primary"></i>
                    <div class="font-weight-bold">
                        <router-link :to="'/engagement/'+engagement.id">
                            {{ engagement.return_type }}
                        </router-link>
                    </div>
                    <div class="ml-3">
                        <span class="email-sent-flag" v-if="question.email_sent == true"><i class="fas fa-check mr-2 text-primary"></i>Email Sent</span>
                    </div>
                </div>
                <div>
                    <span class="font-weight-bold">
                        Created On:
                    </span>
                    <span>
                        {{ question.created_at | formatDate }}
                    </span>
                </div>
            </div>
            <div class="card-body bg-light d-flex justify-content-between">
                <div class="h4 mr-5 text-left">
                    <span v-html="question.question"></span>
                </div>
                <div class="ml-5 d-flex align-self-center">
                    <button class="btn btn-sm btn-primary font-weight-bold" @click="answerQuestion(question.id)">Answer</button>
                </div>
            </div>
        </div>
   </div>

   <!-- this is the modal to update the question -->
            <b-modal ref="modal" hide-footer title="Answer Question" size="lg">
                    <form>
                    <div>
                    <vue-editor v-model="question.answer"></vue-editor>
                    </div>
                    <div class="text-left">
                        <span class="font-weight-bold mr-2">Answered: </span>
                        <input type="checkbox" v-model="question.answered">
                    </div>
                    <div class="d-flex">
                    <b-btn class="mt-3" variant="secondary" @click="hideModal">Cancel</b-btn>
                    <b-btn class="mt-3 ml-auto" variant="outline-primary" @click="acceptUpdate">Confirm</b-btn>
                    </div>
                    </form>
            </b-modal>


        <spinner v-if="detailsLoaded"></spinner>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import bModal from 'bootstrap-vue/es/components/modal/modal'
import bModalDirective from 'bootstrap-vue/es/directives/modal/modal'
import { VueEditor } from "vue2-editor";
import Spinner from '@/components/Spinner.vue'

export default {
name: 'Pending',
data() {
    return {
        detailsLoaded: false,
        questionToAnswer: null,
        question: {
            answer: '',
            answered: true,
        }
    }
},
components:{
    'b-modal': bModal,
    VueEditor,
    Spinner
},
directives: {
    'b-modal': bModalDirective
},
computed: {
    ...mapGetters(['engagementQuestions',]),
    filteredQuestions () {
        const engagement =  this.engagementQuestions.filter((engagement) => {
            return engagement.questions.filter((question) => question.answered === 0).length
        })
        return engagement
    },
},
methods: {
    showModal() {
        this.$refs.modal.show()
    },
    hideModal() {
        this.$refs.modal.hide()
    },
    ...mapActions(['updateAnswer']),

    acceptUpdate() {
      if(this.questionToAnswer) {
          if(!this.question.answer) return;
          this.updateAnswer({
            id: this.questionToAnswer,
            answer: this.question.answer,
            answered: this.question.answered
          }).then(() => {
          this.$refs.modal.hide()
        }) 
        }
      },
    answerQuestion(id) {
        this.questionToAnswer = id
        this.$refs.modal.show()
    },
},
created: function(){
    this.$store.dispatch('getEngagementQuestions', this.$route.params.id);
    this.detailsLoaded = true;
    var self = this;
    setTimeout(() => {
        self.detailsLoaded = false;
    }, 3000)
},
    
}
</script>

<style lang="scss" scoped>

    .header {
            height: 4em;
        }

    .email-sent-flag {
        border: 1px solid #0077ff;
        border-radius: 4px;
        padding: 3px;
        font-weight: 600;
    }
</style>