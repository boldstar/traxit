<template>
  <div class="page-wrapper mt-1">
    <!-- this is to view the details of the engagement and will be hidden if the following route does not match -->
    <div v-if="!detailsLoaded">
    <div v-if="$route.name == 'engagement-details'">

      <Alert v-if="successAlert" v-bind:message="successAlert" />
      <div class="sending-mail" v-if="processing"><i class="far fa-envelope mr-3"></i>Sending Mail...</div>

      <!-- this is the header section of the engagement details -->
      <div class="flex-row justify-content-between d-flex mt-3 card-body shadow-sm p-3">
        <span class="h4 align-self-center m-0 text-left">Details | <strong class="text-primary"><router-link :to="'/contact/' +engagement.client.id + '/account'">{{ engagement.client.last_name}}, {{ engagement.client.first_name}} <span v-if="engagement.client.has_spouse"> & {{ engagement.client.spouse_first_name}}</span></router-link></strong></span>

        <div class="align-self-center text-capitalize h4" v-if="engagement.type == 'bookkeeping'">
          {{engagement.type}} <span v-if="engagement.done == true" class="font-weight-bold text-primary">| Completed</span>
        </div>
        <div class="align-self-center text-capitalize h4" v-else>
          {{ fixCasing(engagement.type) }} <span v-if="engagement.done == true" class="font-weight-bold text-primary">| Completed</span>
        </div>


        <div>
        <router-link to="/engagements" class="btn btn-outline-secondary mr-4"><i class="fas fa-arrow-circle-left mr-2"></i>All Engagements</router-link>
        <router-link class="btn btn-primary mr-3" :to="'/engagement/' +engagement.id+ '/edit'" v-if="engagement.done == false"><i class="far fa-edit mr-2" ></i>Edit</router-link> 
        <b-btn class="outline-secondary" @click="requestEngagementDelete()" v-if="$can('delete', engagement)"><i class="fas fa-trash"></i><span class="ml-2">Delete</span></b-btn>
        </div>
      </div> 

      
      <!-- this is the table for the details of the engagement -->
      <div class="card-body bg-light mt-1 mb-2 py-2 px-3"> 
        <table class="table table-bordered h3 mt-3">
          <thead class="text-primary">
            <tr>
              <th class="py-4" scope="col">Category</th>
              <th class="py-4" scope="col">Name</th>
              <th class="py-4" scope="col" v-if="engagement.type == 'bookkeeping'">Time Period</th>
              <th class="py-4" scope="col" v-if="engagement.type == 'taxreturn'">Return Type</th>
              <th class="py-4" scope="col">Year</th>
              <th class="py-4" scope="col" v-if="engagement.done == false">Currently Assigned</th>
              <th class="py-4" scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th class="py-5 text-capitalize">{{ engagement.category}}</th>
              <th class="py-5">{{ engagement.name}}</th>
              <th class="py-5" v-if="engagement.type == 'bookkeeping'">{{ engagement.title}}</th>
              <th class="py-5" v-if="engagement.type == 'taxreturn'">{{ engagement.return_type}}</th>
              <th class="py-5">{{ engagement.year }}</th>
              <th class="py-5" v-if="engagement.done == false">{{ engagement.assigned_to}}</th>
              <th class="py-5">{{ engagement.status }}</th>
            </tr>
          </tbody>
        </table> 
      </div>

      <!-- this is the section where the qustions will go -->

      <div class="d-flex justify-content-between h4 card-body p-3 shadow-sm mb-3">
          <div>
            <span>
              Questions |
            </span>
            <span class="text-primary font-weight-bold">{{ engagement.questions.length }}</span>    
          </div>
          <span><router-link :to="'/engagement/' + engagement.id + '/add-question'" class="btn btn-sm btn-primary"><i class="far fa-plus-square mr-2"></i>Question</router-link></span>
      </div>

      <!-- this is the modal to confirm or cancel the delete for the engagement -->
      <b-modal v-model="modalEngage" hide-footer title="Delete Engagement">
        <div class="d-block text-left">
          <h5>Are you sure you want to delete engagement?</h5>
          <br>
          <p><strong>*Warning:</strong> Can not be undone once deleted.</p>
        </div>
        <div class="d-flex">
          <b-btn class="mt-3" variant="danger" @click="modalEngage = false">Cancel</b-btn>
          <b-btn class="mt-3 ml-auto" variant="outline-success" @click="deleteEngagement(engagement.id)">Confirm</b-btn>
        </div>
      </b-modal>

  </div>

    <!-- using v-modal for showing modal for question because there seems to be a bug with deep nested modals   -->
    <div class="card mb-3"  v-for="(question, index) in engagement.questions" :key="index" v-if="$route.name == 'engagement-details'">
        <div class="card-header">
          <div class="h6 m-0 justify-content-between d-flex">
            <div class="d-flex">
              <span v-if="question.email_sent == true" class="align-self-center mail-sent-flag"><i class="fas fa-check mr-2 text-primary"></i>Email Sent</span>
              <router-link v-if="question.answered == 0 && $can('update', engagement) && question.email_sent == false" class="btn btn-sm btn-primary mr-3" :to="'/engagement/' +engagement.id+ '/edit-question/' + question.id"><i class="far fa-edit mr-2" ></i>Edit</router-link>
              <b-btn class="outline-secondary" size="sm" @click="sendEmailRequest(question.id)" v-if="question.email_sent == false && engagement.type != 'bookkeeping' && engagement.client.email"><i class="far fa-envelope mr-2" :disabled="processing"></i>
              <span v-if="!processing">Send Email</span>
              <span v-if="processing">Sending...</span>
              </b-btn> 
            </div>
            <b-btn v-if="$can('delete', engagement)" class="outline-secondary" size="sm" @click="requestDelete(engagement, question.id)"><i class="fas fa-trash"></i><span class="ml-2">Delete</span></b-btn>
          </div>
        </div>
        <div class="card-body bg-light d-flex justify-content-between">
          <div class="h5 mr-5 d-flex flex-column text-left">
            <span class="mb-3">Question</span>
            <span class="align-self-center h6" v-html="question.question"></span>
          </div>
          <div class="ml-5 d-flex align-self-center">
            <router-link class="btn btn-sm btn-primary" v-if="question.answered == 0" :to="{ path: '/engagement/' +engagement.id+ '/answer-question/' +question.id }">Answer</router-link>
            <div v-else>
              <span class="font-weight-bold mr-2">Answered: </span>
              <input class="mt-2" type="checkbox" v-model="question.answered">
            </div>
          </div>
        </div>
        <div v-if="question.answered == 1">
          <div class="card-footer d-flex flex-column text-left h5 mb-0">
            <span class="mb-3">Answer</span>
            <span class="h6" v-html="question.answer"></span>
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

    </div>


    <div v-if="detailsLoaded && $route.name == 'engagement-details'" class="lds-dual-ring justify-content-center"></div>

<!-- this will show the child view if the route matches-->
  <router-view ></router-view>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Alert from '@/components/Alert.vue'
import bModal from 'bootstrap-vue/es/components/modal/modal'
import bModalDirective from 'bootstrap-vue/es/directives/modal/modal'

export default {
  name: 'EngagementDetails',
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
    }
  },
  components:{
    'b-modal': bModal,
    Alert
  },
  directives: {
    'b-modal': bModalDirective
  },
  computed: {
    ...mapGetters(['engagement','question', 'successAlert', 'processing', 'errorMsgAlert']),
  },
  methods: {
    deleteEngagement(id) {
      this.$store.dispatch('deleteEngagement', id)
      .then(() => {
        this.modalEngage = false
        this.$router.push({path: '/engagements'});
      })
    },
    deleteQuestion() {
      this.$store.dispatch('deleteQuestion', this.questionToDelete)
      .then(() => {
        this.modalShow = false
        this.$router.push({path: '/engagement/' +this.engagement.id});
      })
    },
    isActive: function (menuItem) {
      return this.activeItem === menuItem
    },
    fixCasing(string) {
      if(string == 'taxreturn') {
        const newString = string.replace("taxreturn", "Tax Return")

        return newString
      }
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
    requestEngagementDelete() {
      this.modalEngage = true
    }
  },
  watch: {
      $route (to, from) {
        if(this.$route.query.alert) {
          this.alert  = this.$route.query.alert;
          setTimeout(() => {
            this.alert = '';
            this.$router.replace({path: '/engagment/' +this.engagement.id});
          }, 10000)
        }    
    }
  },
  created: function(){
    this.$store.dispatch('getEngagement', this.$route.params.id);
    this.detailsLoaded = true;
    var self = this;
    setTimeout(() => {
        self.detailsLoaded = false;
    }, 3000)
  }
  
}
</script>


<style scoped lang="scss">
  .mail-sent-flag {
    border: 1px solid #0077ff;
    padding: 4px;
    border-radius: 3px;
    font-weight: 600;
  }

  .sending-mail {
    padding: 10px;
    border-radius: 8px;
    background-color: #0077ff;
    font-size: 1.25rem;
    color: white;
    font-weight: 600;
  }
</style>
