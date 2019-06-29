<template>
    <div class="ml-3 d-flex flex-column align-items-center flex-fill card shadow-sm align-self-start questions">

      <div class="d-flex justify-content-between card-header py-2 mb-2 w-100 questions-header">
          <div class="align-self-center">
            <span class="font-weight-bold">
              Questions |
            </span>
            <span class="text-primary font-weight-bold">{{ engagement.questions.length }}</span>    
          </div>
          <span><router-link :to="'/engagement/' + engagement.id + '/add-question'" class="btn btn-sm btn-primary"><i class="far fa-plus-square"></i></router-link></span>
      </div>   
      
      <div class="m-3 question">
        <div class="mb-3" v-if="engagement.questions.length <= 0">
          <span class="font-weight-bold">There are currently no questions</span>
        </div>

        <transition-group name="question-animation" enter-active-class="animated bounceInUp">
          <div class="card mb-3"  v-for="(question, index) in engagement.questions" :key="index" v-if="$route.name == 'engagement-details'">
              <div class="card-header py-2">
                <div class="h6 m-0 justify-content-between d-flex">
                  <div class="d-flex">
                    <span v-if="question.email_sent == true" class="align-self-center mail-sent-flag"><i class="fas fa-check mr-2 text-primary"></i>Email Sent</span>
                    <router-link v-if="question.answered == 0 && $can('update', engagement) && question.email_sent == false" class="btn btn-sm btn-primary mr-3" :to="'/engagement/' +engagement.id+ '/edit-question/' + question.id"><i class="far fa-edit mr-2" ></i>Edit</router-link>
                    <b-btn class="outline-secondary" size="sm" @click="sendEmailRequest(question.id)" v-if="question.email_sent == false && engagement.type != 'bookkeeping' && engagement.client.email && question.answered == false"><i class="far fa-envelope mr-2" :disabled="processing"></i>
                    <span v-if="!processing">Send Email</span>
                    <span v-if="processing">Sending...</span>
                    </b-btn> 
                  </div>
                  <b-btn v-if="$can('delete', engagement)" class="outline-secondary" size="sm" @click="requestDelete(engagement, question.id)"><i class="fas fa-trash"></i></b-btn>
                </div>
              </div>
              <div class="card-body border-bottom pt-2 pb-0 d-flex justify-content-between">
                <div class="h5 mr-5 d-flex flex-column text-left">
                  <span class="mb-2 h6 font-weight-bold">Question:</span>
                  <span class="align-self-center h6 mb-0 question" v-html="question.question"></span>
                </div>
                <div class="ml-5 d-flex align-self-center">
                  <router-link class="btn btn-sm btn-primary" v-if="question.answered == 0" :to="{ path: '/engagement/' +engagement.id+ '/answer-question/' +question.id }"><i class="fas fa-comment-dots"></i></router-link>
                </div>
              </div>
              <div v-if="question.answered == 1" class="card-body pt-1 pb-0 d-flex justify-content-between">
                <div class="pb-0 d-flex flex-column text-left h5 mb-0">
                  <span class="mb-2 h6 font-weight-bold">Answer:</span>
                  <span class="h6" v-html="question.answer"></span>
                </div>
                <div class="ml-5 d-flex align-self-center">
                  <router-link class="btn btn-sm btn-primary font-weight-bold" :to="{ path: '/engagement/' +engagement.id+ '/edit-answer-question/' +question.id }">Edit</router-link>
                </div>
              </div>
              <div class="card-footer text-right p-2">
                <span class="align-self-center font-weight-bold question-date mr-1" v-if="question.username != null">Created By: {{ question.username }} | </span>
                <span class="align-self-center font-weight-bold question-date mr-3">{{ question.created_at | formatDate }}</span>
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
      </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Alert from '@/components/Alert.vue'
import bModal from 'bootstrap-vue/es/components/modal/modal'
import bModalDirective from 'bootstrap-vue/es/directives/modal/modal'
import Spinner from '@/components/Spinner.vue'
import NoteModal from '@/components/NoteModal.vue'
import EditNoteModal from '@/components/EditNoteModal.vue'
export default {
    name: 'EngageQuestions',
    props: ['engagement'],
    components:{
        'b-modal': bModal,
        Alert,
        Spinner,
        NoteModal,
        EditNoteModal
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
                this.$router.push({path: '/engagement/' +this.engagement.id});
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
    }
}
</script>
