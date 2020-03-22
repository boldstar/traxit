<template>
    <div class="d-flex flex-column w-100 text-left engage-questions">
      <div class="d-flex justify-content-between">
          <div>
              <h4 class="mb-0">Engagement Questions</h4>
              <span class="title-description text-secondary">A list of question and answers for the engagement</span>
          </div>
               <span><router-link :to="'/engagement/' + engagement.id + '/add-question'" class="btn btn-sm btn-secondary font-weight-bold">Add Question</router-link></span>
      </div> 
      
      <div class="question w-100 mt-3">
        <div class="mb-3 card-body shadow-sm bg-white" v-if="engagement.questions.length <= 0">
          <span class="font-weight-bold">There are currently no questions</span>
        </div>

        <transition-group name="question-animation" enter-active-class="animated bounceInUp">
          <div class="card shadow-sm mb-3"  v-for="(question, index) in engagement.questions" :key="index">
              <div class="card-header p-2">
                <div class="h6 m-0 justify-content-between d-flex">
                  <div class="d-flex">
                    <span v-if="question.email_sent == true" class="align-self-center mail-sent-flag"><i class="fas fa-check mr-2 text-primary font-weight-bold"></i>Email Sent</span>
                    <router-link v-if="question.answered == 0 && $can('update', engagement) && question.email_sent == false" class="btn btn-sm btn-link align-self-center mr-3 font-weight-bold" :to="'/engagement/' +engagement.id+ '/edit-question/' + question.id">Edit Question</router-link>
                    <button class="btn btn-sm btn-link text-secondary" @click="sendEmailRequest(question.id)" v-if="question.email_sent == false && engagement.type != 'bookkeeping' && engagement.client.email && question.answered == false">
                      <span v-if="!processing" class="font-weight-bold">Send Question By Email<i class="fas fa-arrow-right ml-2"></i></span>
                      <span v-if="processing" class="font-weight-bold">Sending...</span>
                    </button> 
                  </div>
                  <button v-if="$can('delete', engagement)" class="btn btn-link text-danger p-0" @click="requestDelete(engagement, question.id)"><i class="fas fa-trash"></i></button>
                </div>
              </div>
              <div class="card-body border-bottom pt-2 pb-0 d-flex justify-content-between">
                <div class="h5 mr-5 d-flex flex-column text-left">
                  <span class="mb-2 h6 font-weight-bold">Question:</span>
                  <span class="align-self-center h6 mb-0 question" v-html="question.question"></span>
                </div>
              </div>
              <div v-if="question.answered == 1" class="card-body pt-1 pb-0 d-flex justify-content-between">
                <div class="pb-0 d-flex flex-column text-left h5 mb-0">
                  <span class="mb-2 h6 font-weight-bold">Answer:</span>
                  <span class="h6" v-html="question.answer"></span>
                </div>
              </div>
              <div class="card-footer d-flex justify-content-between p-2">
                <router-link v-if="question.answered" class="btn btn-sm btn-link font-weight-bold" :to="{ path: '/engagement/' +engagement.id+ '/edit-answer-question/' +question.id }">Edit Answer</router-link>
                <router-link class="btn btn-sm btn-link font-weight-bold" :to="{ path: '/engagement/' +engagement.id+ '/answer-question/' +question.id }" v-else>Answer Question</router-link>
                <div class="ml-auto">
                  <span class="align-self-center font-weight-bold question-date mr-1" v-if="question.username != null">Created By: {{ question.username }} | </span>
                  <span class="align-self-center font-weight-bold question-date mr-3">{{ question.created_at | formatDate }}</span>
                </div>
              </div>

                <!-- this is the modal for deleting a question -->
              <b-modal v-model="modalShow" :id='`${idForModal}`' :ref="`${refForModal}`" hide-footer title="Delete Question">
                <div class="d-block text-left">
                  <h5>Are you sure you want to delete question?</h5>
                  <br>
                  <p><strong>*Warning:</strong> Can not be undone once deleted.</p>
                </div>
                <div class="d-flex">
                  <b-btn class="mt-3" variant="danger" @click="modalShow = !modalShow">Cancel</b-btn>
                  <b-btn class="mt-3 ml-auto" variant="outline-success" @click="deleteQuestion()">Confirm</b-btn>
                </div>
              </b-modal>

                <!-- this is the modal for confirming to send an email -->
              <b-modal v-model="modalEmail" id="myQuestion" ref="myQuestion" hide-footer title="Send Email">
                <div class="d-block text-left">
                  <span>Are you sure you would like to send an email?</span>
                </div>
                <div class="d-flex">
                  <b-btn class="mt-3" variant="danger" @click="modalEmail = false">Cancel</b-btn>
                  <b-btn class="mt-3 ml-auto" variant="outline-success" @click="sendEmail()">Confirm</b-btn>
                </div>
              </b-modal>
          </div>
        </transition-group> 
        </div>

        <div class="card add-question" @click="goToAddQuestion">
            <div class="card-body d-flex justify-content-center">
                <div class="d-flex flex-column align-items-center add-question-btn-border">
                    <i class="fas fa-edit fa-3x mb-2"></i>
                    <span class="font-weight-bold">Add Question</span>
                </div>
            </div>
        </div>
      </div>
</template>

<script>
import { mapGetters } from 'vuex'
import bModal from 'bootstrap-vue/es/components/modal/modal'
import bModalDirective from 'bootstrap-vue/es/directives/modal/modal'
import Spinner from '@/components/loaders/Spinner.vue'
export default {
    name: 'EngageQuestions',
    props: ['engagement'],
    components:{
        'b-modal': bModal,
        Spinner,
    },
    directives: {
        'b-modal': bModalDirective
    },
    data() {
        return {
            detailsLoaded: false,
            idForModal: null,
            refForModal: null,
            modalEngage: false,
            modalShow: false,
            modalEmail: false,
            questionToDelete: null,
            questionToEmail: null,
            balance: 0,
            owed: null,
        }
    },
    computed: {
        ...mapGetters(['successAlert', 'processing', 'errorMsgAlert']),
    },
    methods: {
        deleteQuestion() {
            this.$store.dispatch('deleteQuestion', this.questionToDelete)
            .then(() => {
                this.modalShow = false
                this.$router.push({path: '/engagement/' +this.engagement.id+ '/questions'});
            })
        }, 
        sendEmailRequest(id) {
            this.modalEmail = true
            this.questionToEmail = id
        },
        sendEmail() {
            this.$store.dispatch('sendEmail', this.questionToEmail)
            .then(() => {
                this.modalEmail = false
            })
        },
        requestDelete(engagement, id) {
            this.modalShow = true
            this.questionToDelete = id
            this.idForModal = id
            this.refForModal = id
        },
        goToAddQuestion() {
          this.$router.push({path: '/engagement/' + this.engagement.id + '/add-question'})
        }
    }
}
</script>

<style lang="scss">
  .add-question {
        border: 2px dashed lightgray;
        background: transparent!important;
        cursor: pointer;
        transition: all .5s;

        &:hover {
            background: white!important;
            box-shadow: 0 0 8px 0 rgba(0,0,0,.3);
        }

        .add-question-btn-border {

            i {
                color: lightgray!important;
            }

            span {
                color: lightgray!important;
            }
        }
    }
</style>
