<template>
    <div class="pending">
        <!-- this is the header for the contact engagements with the add engagement button -->
        <div class="pending-header">
            <div>
                <h5>Pending</h5>
                <p>A list of the pending questions sent to or noted for the contact</p>
            </div>
        </div>

        <div v-if="!loading">
            <div v-for="(engagement, index) in engagementQuestions" :key="index"> 
                <div class="card shadow-sm mb-3"  v-for="(question, index) in engagement.questions" :key="index" v-show="question.answered != true">
                    <div class="card-header bg-white d-flex justify-content-between">
                        <div class="d-flex">
                            <i class="far fa-folder-open align-self-center text-primary mr-2"></i> | <strong class="ml-2">{{engagement.name}}</strong>
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
                    <div class="card-body bg-light d-flex justify-content-between  bg-white pb-1">
                        <div class="mr-5 text-left">
                            <span v-html="question.question"></span>
                        </div>
                    </div>
                    <div class="card-footer pending-btns">
                        <button class="btn btn-sm" @click="answerQuestion(question.id)">Answer Question</button>
                        <router-link :to="{path: '/engagement/' + engagement.id + '/details'}" class="btn btn-sm">View Engagement</router-link>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="!loading && pendingQuestions.length < 1" class="card shadow-sm">
            <p class="font-weight-bold p-3 mb-0">There are currently no pending questions</p>
        </div>

        <!-- this is the modal to update the question -->
        <b-modal ref="modal" hide-footer title="Answer Question" size="lg">
                <form>
                <div>
                <vue-editor v-model="question.answer" :editorToolbar="customToolbar"></vue-editor>
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


        <spinner v-if="loading"></spinner>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import bModal from 'bootstrap-vue/es/components/modal/modal'
import bModalDirective from 'bootstrap-vue/es/directives/modal/modal'
import { VueEditor } from "vue2-editor";
import Spinner from '@/components/loaders/Spinner.vue'

export default {
name: 'Pending',
data() {
    return {
        loading: false,
        questionToAnswer: null,
        question: {
            answer: '',
            answered: true,
        },
        customToolbar: [
            ['bold', 'italic', 'underline'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }]
          ]
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
    questions () {
        var questions = this.engagementQuestions.map(e => e.questions)
        return questions.flat()
    },
    pendingQuestions() {
            return this.questions.filter(q => q ? q.answered == false : null)
    }
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
    this.loading = true;
    var self = this;
    setTimeout(() => {
        self.loading = false;
    }, 3000)
},
    
}
</script>

<style lang="scss" scoped>

   .pending {

       .pending-header {
           text-align: left;
           margin-bottom: 10px;

           h5 {
               margin-bottom: 0;
           }

           p {
               margin-bottom: 0;
               font-weight: 500;
           }
       }


       .pending-btns {
           display: flex;
           justify-content: flex-start;

           button {
                background: #0077ff;
                color: white;
                font-weight: bold;
                margin-right: 15px;
           }

           a {
                background: rgb(226, 226, 226);
                color: black;
                font-weight: bold;
           }
       }
   }

    .email-sent-flag {
        border: 1px solid #0077ff;
        border-radius: 4px;
        padding: 3px;
        font-weight: 600;
    }
</style>