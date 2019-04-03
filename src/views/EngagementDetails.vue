<template>
  <div class="page-wrapper">
    <!-- this is to view the details of the engagement and will be hidden if the following route does not match -->
    <div v-if="!detailsLoaded">
    <div v-if="$route.name == 'engagement-details'">

      <Alert v-if="successAlert" v-bind:message="successAlert" />
      <div class="sending-mail" v-if="processing && !noteModal && !deleteNote"><i class="far fa-envelope mr-3"></i>Sending Mail...</div>

      <!-- this is the header section of the engagement details -->
      <div class="flex-row justify-content-between d-flex mt-0 card-body shadow-sm py-2 px-3">
        <span class="h5 align-self-center m-0 text-left">Engagement | <strong class="text-primary"><router-link :to="'/contact/' +engagement.client.id + '/account'">{{engagement.name}}</router-link></strong></span>

        <div class="d-flex">
        <div v-if="engagement.type == 'taxreturn' && engagement.balance != null" class="mr-3 d-flex">
          <span class="h5 align-self-center mb-0">
              {{ modifyAmount(engagement.balance) }}
          </span>
        </div>
        <span v-if="archiving && !engagement.archive" class="bg-light p-1 mr-3 font-weight-bold">Archiving..</span>
        <span v-if="archiving && engagement.archive" class="bg-light p-1 mr-3 font-weight-bold">Unarchiving..</span>
        <div class="btn-group">
          <button type="button" class="btn btn-sm btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i class="fas fa-cogs mr-2"></i>  Action
          </button>
          <div class="dropdown-menu mr-4">
            <router-link class="dropdown-item" :to="'/engagement/' +engagement.id+ '/edit'" v-if="engagement.done == false"><i class="far fa-edit mr-2" ></i>Edit</router-link> 
            <router-link class="dropdown-item" :to="'/engagement/' +engagement.id+ '/history'"><i class="fas fa-history mr-2"></i>History</router-link>
            <button type="button" class="dropdown-item" @click="archiveEngagement"><i class="fas fa-archive"></i><span class="ml-2">
              <span v-if="!engagement.archive">Archive</span>
              <span v-else>Unarchive</span>
            </span></button> 
            <button type="button" class="dropdown-item"><i class="far fa-envelope mr-2"></i>Mail</button>
            <div class="dropdown-divider"></div>
            <b-btn class="dropdown-item text-danger" @click="requestEngagementDelete()" v-if="$can('delete', engagement)"><i class="fas fa-trash"></i><span class="ml-2">Delete</span></b-btn>
          </div>
        </div>
        </div>
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

      <div class="row px-3 my-3">
        <div class="col-md-4">
          <div class="card px-0 mb-3 shadow-sm align-self-start">
            <div class="card-header d-flex justify-content-between">
              <div class="text-primary font-weight-bold">
                <span v-if="engagement.done == true"><i class="far fa-folder" v-if="engagement.done == true"></i> | Completed</span>
                <span v-else><i class="far fa-folder-open"></i> | Active</span>
              </div>
              <span class="font-weight-bold text-capitalize" v-if="engagement.type != 'custom'">{{ fixCasing(engagement.type) }}</span>
              <span class="font-weight-bold text-capitalize" v-else>{{ engagement.description }}</span>
            </div>
            <div class="card-body">
                <div class="mt-2">
                  <div class="progress">
                    <div class="progress-bar progress-bar-striped" :class="{'progress-bar-animated': currentWidth < 100}" role="progressbar" :aria-valuenow="`${currentWidth}`" aria-valuemin="0" aria-valuemax="100" :style='`width:${ currentWidth }%;`'></div>
                  </div>
                </div>
              <div class="d-flex justify-content-between">
                <div>
                  <i class="far fa-flag text-secondary"></i>
                </div>
                <div>
                  <i class="fas fa-flag-checkered text-primary"></i>
                </div>
              </div>
              <ul class="p-0 m-0 mt-2">
                <li class="d-flex justify-content-between p-2">
                  <span class="font-weight-bold">Name</span>
                  <span>{{ engagement.name}}</span>
                </li>
                <li class="d-flex justify-content-between p-2">
                  <span class="font-weight-bold">Fee</span>
                  <span>{{ amount(engagement.fee) }}</span>
                </li>
                <li class="d-flex justify-content-between p-2" v-if="engagement.type == 'bookkeeping'">
                  <span class="font-weight-bold">Time Period</span>
                  <span>{{ engagement.title}}</span>
                </li>
                <li class="d-flex justify-content-between p-2" v-if="engagement.type == 'custom'">
                  <span class="font-weight-bold">Subject</span>
                  <span>{{ engagement.description}}</span>
                </li>
                <li class="d-flex justify-content-between p-2" v-if="engagement.type == 'taxreturn'">
                  <span class="font-weight-bold">Return Type</span>
                  <span>{{ engagement.return_type}}</span>
                </li>
                <li class="d-flex justify-content-between p-2">
                  <span class="font-weight-bold">Year</span>
                  <span>{{ engagement.year}}</span>
                </li>
                <li class="d-flex justify-content-between p-2" v-if="engagement.done == false">
                  <span class="font-weight-bold">Currently Assigned</span>
                  <span>{{ engagement.assigned_to}}</span>
                </li>
                <li class="d-flex justify-content-between p-2">
                  <span class="font-weight-bold">Status</span>
                  <span>{{ engagement.status}}</span>
                </li>
                <li class="d-flex justify-content-between p-2" v-if="engagement.type == 'taxreturn'">
                  <span class="font-weight-bold">Estimated Date</span>
                  <span>{{ engagement.estimated_date | formatDate }}</span>
                </li>
              </ul>
            </div>
          </div>


          <div class="card px-0 shadow-sm align-self-start">
            <div class="card-header d-flex justify-content-between">
              <div class="font-weight-bold">
                <span class="align-self-center">Notes | <span class="text-primary">{{engagementNotes.length}}</span></span>
              </div>
              <button class="btn btn-primary btn-sm" @click="addNoteModal"><i class="far fa-plus-square"></i></button>
            </div>
          </div>
          <div v-if="engagementNotes.length <= 0" class="card-body shadow-sm border">
            <span class="font-weight-bold">There are currrently no notes</span>
          </div>
            <div class="card-body py-0 text-left border" v-for="(note, index) in engagementNotes" :key="index" v-if="engagementNotes.length > 0">
              <div class="note p-1">
                <div v-html="note.note"></div>
                <div class="d-flex justify-content-between">
                  <div class="d-flex">
                    <span class="note-date mr-1" v-if="note.username != null">Created By: {{ note.username }} | </span>
                    <span class="note-date">{{ note.created_at | formatDate }}</span>
                  </div>
                  <div class="d-flex">     
                    <button type="button" class="edit-btn" @click="editNote(note)">Edit</button>  
                    <span v-if="deleteNote && note.id == selectedNote" class="note-span">Are you sure?</span>
                    <button type="button" class="note-btn">
                      <span v-if="!deleteNote" @click="confirmDelete(note.id)">Delete</span>
                      <span v-if="deleteNote && note.id == selectedNote" @click="deleteENote(note.id)">Yes</span>
                    </button>
                    <button class="note-btn ml-2" v-if="deleteNote && note.id == selectedNote" @click="deleteNote = false">Cancel</button>
                  </div>
                </div>  
              </div>
            </div>
        </div>

      <!-- this is the section where the qustions will go -->
      <div class="ml-3 d-flex flex-column align-items-center flex-fill card shadow-sm align-self-start">

      <div class="d-flex justify-content-between card-header py-2 mb-2 w-100">
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
      </div>
    </div>
    </div>

    <spinner v-if="detailsLoaded && $route.name == 'engagement-details'"></spinner>

    <note-modal></note-modal>
    <edit-note-modal :note="noteToEdit.id" v-if="editNoteModal"></edit-note-modal>

<!-- this will show the child view if the route matches-->
  <router-view ></router-view>
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
      balance: 0,
      owed: null,
      deleteNote: false,
      selectedNote: null,
      noteToEdit: null,
    }
  },
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
  computed: {
    ...mapGetters(['engagement','question', 'successAlert', 'processing', 'errorMsgAlert', 'workflow','archiving', 'engagementNotes', 'noteModal', 'editNoteModal']),
    percentage() {
      const statuses = this.workflow.statuses
      const percentage = this.calcPercent(statuses.length)
      return percentage
    },
    currentWidth() {
      const status = this.engagement.status
      const statuses = this.workflow.statuses
      const index = statuses.findIndex(s => s.status == status)

      return (index + 1) * this.percentage
    }
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
    deleteENote(id) {
      this.$store.dispatch('deleteEngagementNote', id)
      .then(() => {
        this.deleteNote = false
      })
    },
    fixCasing(string) {
      if(string == 'taxreturn') {
        const newString = string.replace("taxreturn", "Tax Return")

        return newString
      } else {
        return string
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
    },
    calcPercent(statuses) {
      return 100/statuses
    },
    archiveEngagement() {
      this.$store.dispatch('archiveEngagement', this.engagement.id)
    },
    amount(fee) {
      if(fee == null || fee == '') {
        return '$0.00'
      } else {
        return '$' + fee
      }
    },
    modifyAmount(fee) {
      if(this.engagement.owed) {
        return 'Tax Owed: $' + fee
      } else {
        return 'Tax Refunded: $' + fee
      }
    },
    addNoteModal() {
      this.$store.commit('showNoteModal', this.engagement.id)
    },
    confirmDelete(id) {
      this.selectedNote = id
      this.deleteNote = true
    },
    editNote(note) {
      this.noteToEdit = note
      this.$store.commit('editNoteModal')
    },
  },
  created: function(){
    this.$store.dispatch('getEngagement', this.$route.params.id);
    this.$store.dispatch('getEngagementNotes', this.$route.params.id)
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

  li {
    border-bottom: 1px solid #a9a9a9a4;
  }

  .question {
    overflow-wrap: normal;
    flex-basis: 100%;
    max-width: 960px;
    width: 100%;
  }

  .note-btn {
    font-size: .6rem;
    border: none;
    border-radius: 2px;
    margin-right: 5px;
    font-weight: bold;
    color: white;
    background: #a9a9a9;
    cursor: pointer;
  }

  .edit-btn {
    font-size: .6rem;
    border: none;
    border-radius: 2px;
    margin-right: 5px;
    font-weight: bold;
    color: white;
    background: #0077ff;
    cursor: pointer;
  }

  .note-span {
    font-size: .6rem;
    font-weight: bold;
    margin-right: 8px;
  }

  .note {
    padding-bottom: 5px;

     &:hover {
       background-color: rgba(0, 0, 0, 0.110);
       padding: 5px;
     }
  }

  .note-date {
    font-size: .8rem;
  }

  .question-date {
    font-size: .8rem;
  }

  button {
    cursor: pointer!important;
  }
</style>
