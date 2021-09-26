<template>
    <div class="card col-8 px-0 mx-auto shadow mb-3 add-question-form" v-if="engagement">
        <div class="card-header text-left">
            <span class="font-weight-bold">{{engagement.name}}</span>
        </div>
        <div class="text-left mb-3 p-3">
            <h6><strong>Note:</strong> If question is for an engagement with the type of <strong>"Tax Return"</strong>, you will be asked if you would like to send an email.</h6>
            <h6><strong>Note:</strong> If question is for an engagement with the type of <strong>"Bookkeeping"</strong>, you will <strong>not</strong>  be asked about email. No email is currently provided.</h6>
        </div>
        <div class="text-left h4 px-3">
            <span class="font-weight-bold">Engagement Type: <span class="text-primary text-capitalize">{{ fixCasing(engagement.type) }}</span> </span>
        </div>
        <div class="d-flex-column justify-content-center px-3 mb-3">

            <div class="form-group">
                <vue-editor v-model="question.question" :editorToolbar="customToolbar"></vue-editor>
            </div>


            <div class="d-flex justify-content-between" v-if="engagement">
              <button class="btn btn-primary d-flex justify-content-start" @click="addNewQuestion" v-if="engagement.type === 'bookkeeping' || role == 'Outsource'">Create</button>
              <button class="btn btn-primary d-flex justify-content-start" @click="submitRequest" v-else-if="engagement.client.email || engagement.client.spouse_email">Create</button>
              <button class="btn btn-primary d-flex justify-content-start" @click="addNewQuestion" v-else>Contact Has No Email, Add Question Only</button>
              <router-link v-bind:to="'/engagement/' +engagement.id +'/questions'" class="btn btn-secondary float-right">Cancel</router-link>
            </div>
      
        </div>

        <b-modal v-model="modalShow" id="myQuestion" ref="myQuestion" size="lg" hide-footer title="New Question">
          <div class="d-block text-left">
            <h5 class="mb-4">Would you like to send this as an email to the client?</h5>
            <h5 class="ml-2 font-weight-bold text-primary"><i class="far fa-envelope mr-2"></i>Email Preview</h5>
            <div class="card">
                <div class="card-header d-flex flex-column font-weight-bold">
                    <span v-if="engagement.client.email">Tax Payer: {{ engagement.client.email }}</span>
                    <span v-if="engagement.client.spouse_email != null">Spouse: {{ engagement.client.spouse_email }}</span>
                </div>
                <div class="p-3">
                    <div v-if="engagement.client.spouse_last_name && engagement.client.spouse_last_name != engagement.client.last_name">
                        <span>Hi, <strong>{{ engagement.client.first_name }} {{ engagement.client.last_name}}<span v-if="engagement.client.spouse_first_name"> & {{engagement.client.spouse_first_name}} {{engagement.client.spouse_last_name}}</span>  </strong></span>
                    </div>
                    <div v-else>
                        <span>Hi, <strong>{{ engagement.client.first_name }} <span v-if="engagement.client.spouse_first_name"> & {{engagement.client.spouse_first_name}}</span> {{ engagement.client.last_name}} </strong></span>
                    </div>
                    <br>
                    <div>
                        <p><span v-if="workflow.engagement_type != 'Custom'">We are currently working on your 
                            {{ engagement.year }}, {{ engagement.return_type }} 
                            for the name of "{{ engagement.name }}".</span>The following questions and issues 
                            were raised during the performance of our work. 
                            Please provide responses to the following items so that we can continue.
                        </p>
                    </div>
                    <div class="questions-border">
                        <h5>Pending Questions:</h5>
                        <div v-html="question.question" class="bg-light p-2"></div>
                    </div>
                    <div>
                        <h5>For questions and concerns</h5>
                        <div class="mb-2 d-flex">
                            <p class="align-self-center m-0">Please feel free to call us at: </p>
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
            <b-btn class="font-weight-bold" variant="primary" @click="verify = true" v-if="!verify">Yes, Send Email</b-btn>
            <div v-if="verify && !invalidEmail" class="d-flex">
                <div class="pt-2">
                    <p class="font-weight-bold h4 mb-0 align-self-end mr-3">Send To: </p>
                </div>
                <button @click="addNewQuestionWithEmail('both')" class="btn btn-primary font-weight-bold" v-if="engagement.client.spouse_email &&engagement.client.email">Both</button>
                <p class="h3  mx-2">|</p>
                <button @click="addNewQuestionWithEmail('taxpayer')" v-if="engagement.client.email" class="btn btn-secondary font-weight-bold">Tax Payer Only</button>
                <p class="h3  mx-2">|</p>
                <button @click="addNewQuestionWithEmail('spouse')" v-if="engagement.client.spouse_email" class="btn btn-info font-weight-bold">Spouse Only</button>
            </div>
            <div v-if="verify && !invalidEmail">
                <button class="btn mt-1 btn-secondary font-weight-bold" @click="verify = false">Back</button>
            </div>
            <div v-if="invalidEmail" class="d-flex">
                <span class="text-danger font-weight-bold align-self-center">Sorry but the email provided is invalid</span>
                <router-link class="font-weight-bold ml-3 align-self-center" :to="{path: '/contact/' + engagement.client.id + '/account/edit'}">Edit Email</router-link>
            </div>
            <div class="d-flex " v-if="!verify || invalidEmail">
                <b-btn class="mr-3 ml-auto font-weight-bold" variant="danger" @click="cancelToEdit()">Cancel, To Edit</b-btn>
                <b-btn class="ml-auto font-weight-bold" variant="secondary" @click="addNewQuestion()">No, Add Question Only</b-btn>
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
    props: ['workflow'],
     components: {
        VueEditor,
        'b-modal': bModal,
    },
    directives: {
        'b-modal': bModalDirective
    },
    data() {
        return {
            role: localStorage.getItem('role'),
            question: {
                question: '',
                email: false,
            },
            modalShow: false,
            verify: false,
            invalidEmail: false,
            customToolbar: [
            ['bold', 'italic', 'underline'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }]
          ]
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
      .then(response => {
        this.verify = false
        this.question = "" 
        this.idForQuestion++
        this.$router.push('/engagement/' + this.engagement.id  + '/questions')
      })
    },
    addNewQuestionWithEmail(to) {
      const validate = this.validateEmail(to)
      console.log(validate)
      if(!this.question ) return;
      if(!validate) {
          this.invalidEmail = true;
          return
      }
      this.question.email = true
      
      this.addQuestion({
        id: this.idForQuestion,
        engagement_id: this.engagement.id,
        email: this.question.email,
        email_sent: true,
        question: this.question.question,
        send_to: to
      })   
      .then(response => {
        this.question = "" 
        this.idForQuestion++
        this.$router.push('/engagement/' + this.engagement.id + '/questions')
      })
    },
    validateEmail(to) {
         var email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
         var taxpayer = this.engagement.client.email
         var spouse = this.engagement.client.spouse_email
         if(to == 'both') {
            if(email.test(String(taxpayer).toLowerCase()) && email.test(String(spouse).toLowerCase())) {
                return true;
            } else {
                return false
            }
         } 
         if(to == 'taxpayer') {
            return email.test(String(taxpayer).toLowerCase());
         }
         if(to == 'spouse') {
            return email.test(String(spouse).toLowerCase());
         }
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
    },
    cancelToEdit() {
        this.modalShow = false
        this.verify = false
        this.invalidEmail = false
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

    @media screen and (max-width: 1300px) {
        .add-question-form {
            width: 100%!important;
            flex: 0 0 100%!important;
            max-width: 100%!important;
        }
    }
</style>

