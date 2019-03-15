<template>
    <div class="container card-body bg-light" v-if="engagement">
        <div class="text-left mb-3">
            <h6><strong>Note:</strong> If question is for an engagement with the type of <strong>"Tax Return"</strong>, you will be asked if you would like to send an email.</h6>
            <h6><strong>Note:</strong> If question is for an engagement with the type of <strong>"Bookkeeping"</strong>, you will <strong>not</strong>  be asked about email. No email is currently provided.</h6>
        </div>
        <div class="text-left h4">
            <span class="font-weight-bold">Engagement Type: <span class="text-primary text-capitalize">{{ fixCasing(engagement.type) }}</span> </span>
        </div>
        <div class="d-flex-column justify-content-center">

            <div class="form-group">
                <vue-editor v-model="question.question"></vue-editor>
            </div>


            <div class="d-flex justify-content-between" v-if="engagement">
              <button class="btn btn-primary d-flex justify-content-start" @click="addNewQuestion" v-if="engagement.type === 'bookkeeping'">Create</button>
              <button class="btn btn-primary d-flex justify-content-start" @click="submitRequest" v-else-if="engagement.client.email">Create</button>
              <button class="btn btn-primary d-flex justify-content-start" @click="addNewQuestion" v-else>Contact Has No Email, Add Question Only</button>
              <router-link v-bind:to="'/engagement/' +engagement.id " class="btn btn-secondary float-right">Cancel</router-link>
            </div>
      
        </div>

        <b-modal v-model="modalShow" id="myQuestion" ref="myQuestion" size="lg" hide-footer title="New Question">
          <div class="d-block text-left">
            <h5 class="mb-4">Would you like to send this as an email to the client?</h5>
            <h5 class="ml-2 font-weight-bold text-primary"><i class="far fa-envelope mr-2"></i>Email Preview</h5>
            <div class="card">
                <div class="card-header d-flex flex-column font-weight-bold">
                    <span v-if="engagement.client.email">To: {{ engagement.client.email }}</span>
                    <span v-if="engagement.client.spouse_email != null">CC: {{ engagement.client.spouse_email }}</span>
                </div>
                <div class="p-3">
                    <div>
                        <p>We are currently working on your {{ engagement.year }}, {{ engagement.return_type }} tax return for the name of "{{ engagement.name }}" and have some questions for you</p>

                        <p>Note: The following questions and issues were raised during the performance of our work. Please provide responses to the following items so that we can continue.</p>
                    </div>
                    <h5>Pending Questions:</h5>
                    <div class="questions-border">
                        <div v-html="question.question" class="bg-light p-2"></div>
                    </div>
                    <div>
                        <h5>For questions and concerns</h5>
                        <div class="mb-2" style="display: flex;">
                            <p style="margin: 0 5px; align-self: center">please feel free to call us at: </p>
                            <h6 style="margin: 0; align-self: center">{{ accountDetails.phone_number }}</h6>
                        </div>
                        <p>Please reply to this email to verify you received it and let me know when you will be able to get me this information.</p>
                        <h5>Looking forward to hearing from you, Thanks!</h5>
                        <br>

                        <h5>{{ accountDetails.business_name }}</h5>
                        <h5>{{ accountDetails.email }}</h5>
                        <h5>{{ accountDetails.phone_number }}</h5>
                        <h5>{{ accountDetails.fax_number }}</h5>
                    </div>
                </div>
            </div>
            <br>
          </div>
          <div class="d-flex justify-content-between">
            <b-btn class="" variant="primary" @click="addNewQuestionWithEmail()">Yes, Send Email</b-btn>
            <div class="d-flex">
                <b-btn class="mr-3 ml-auto" variant="danger" @click="modalShow = false">Cancel, To Edit</b-btn>
                <b-btn class="ml-auto" variant="secondary" @click="addNewQuestion()">No, Add Question Only</b-btn>
            </div>
          </div>
        </b-modal>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { VueEditor } from "vue2-editor";
import bModal from 'bootstrap-vue/es/components/modal/modal'
import bModalDirective from 'bootstrap-vue/es/directives/modal/modal'

export default {
    name: 'AddQuestion',
     components: {
        VueEditor,
        'b-modal': bModal,
    },
    directives: {
        'b-modal': bModalDirective
    },
    data() {
        return {
            question: {
                question: '',
                email: false,
            },
            modalShow: false
        }
    },
    computed: {
    ...mapGetters(
        [
          'engagement',
          'accountDetails'
        ]
      ),
  },
  methods: {
    ...mapActions(['addQuestion']),
    
    addNewQuestion() {
      if(!this.question ) return;
      this.question.email = false
      
      this.addQuestion({
        id: this.idForQuestion,
        engagement_id: this.engagement.id,
        email: this.question.email,
        email_sent: false,
        question: this.question.question,
      })   
      .then(() => {
        this.question = "" 
        this.idForQuestion++
        this.$router.push({path: '/engagement/' +this.engagement.id});
      })
    },
    addNewQuestionWithEmail() {
      if(!this.question ) return;
      this.question.email = true
      
      this.addQuestion({
        id: this.idForQuestion,
        engagement_id: this.engagement.id,
        email: this.question.email,
        email_sent: true,
        question: this.question.question,
      })   
      .then(() => {
        this.question = "" 
        this.idForQuestion++
        this.$router.push({path: '/engagement/' +this.engagement.id});
      })
    },
    submitRequest() {
        this.modalShow = true
    },
    fixCasing(string) {
      if(string == 'taxreturn') {
        const newString = string.replace("taxreturn", "Tax Return")

        return newString
      } else {
          return string;
      }
    }
  },
  created: function() {
    this.$store.dispatch('getAccountDetails')
  },
}
</script>


<style scoped>
    .questions-border {
        border: 1px solid #0077ff;
        border-radius: 5px;
        padding: 5px;
        margin-bottom: 5px;
    }
</style>

