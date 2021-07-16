<template>
  <div class="page-wrapper">
    <div v-if="engagement">
      <Alert v-if="successAlert" v-bind:message="successAlert" />
      <div class="sending-mail" v-if="processing && !noteModal && !timesheet"><i class="far fa-envelope mr-3"></i>Sending Mail...</div>

      <!-- this is the header section of the engagement details -->
      <div class="flex-row justify-content-between d-flex mt-0 card-body py-2 px-0">
        <span class="h5 align-self-center m-0 text-left engagement-name">Engagement | <strong class="text-primary"><router-link :to="'/contact/' +engagement.client.id + '/account'">{{engagement.name}}</router-link></strong></span>

        <div class="d-flex">
        <div v-if="engagement.type == 'taxreturn' && engagement.balance != null" class="mr-3 d-flex engagement-balance">
          <span class="h5 align-self-center mb-0">
              {{ modifyAmount(engagement.balance) }}
          </span>
        </div>
        <span v-if="archiving && !engagement.archive" class="bg-light p-1 mr-3 font-weight-bold">Archiving..</span>
        <span v-if="archiving && engagement.archive" class="bg-light p-1 mr-3 font-weight-bold">Unarchiving..</span>
        <div class="btn-group">
          <button type="button" class="btn btn-sm btn-primary dropdown-toggle font-weight-bold" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i class="fas fa-cogs mr-2"></i>  Options
          </button>
          <div class="dropdown-menu mr-4">
            <router-link class="dropdown-item" :to="'/engagement/' +engagement.id+ '/edit'" v-if="engagement.done == false"><i class="far fa-edit mr-2" ></i>Edit</router-link>
            <button type="button" class="dropdown-item" @click="archiveEngagement"><i class="fas fa-archive"></i><span class="ml-2">
              <span v-if="!engagement.archive">Archive</span>
              <span v-else>Unarchive</span>
            </span></button> 
            <button type="button" class="dropdown-item" @click="inProgress" v-if="!engagement.done">
              <span v-if="engagement.in_progress"><i class="fas fa-sign-in-alt mr-2"></i>Check In</span>
              <span v-else><i class="fas fa-sign-out-alt mr-2"></i>Check Out</span>
            </button> 
            <!-- <button type="button" class="dropdown-item"><i class="far fa-envelope mr-2"></i>Mail</button> -->
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

      <div class="d-flex my-3"  v-if="!detailsLoading">
         <div class="mr-3 col-2">
          <ul class="d-flex flex-column list-group engage-sidebar" >
            <li class="list-group-item" :class="{'active-list-group-item': $route.name == 'details'}" @click="goTo('details')">
              <router-link class="engagement-link" :class="{'active-engagement-link': $route.name == 'details'}" :to="{path: '/engagement/' + engagement.id + '/details'}">Details</router-link>
            </li>
            <li class="list-group-item" :class="{'active-list-group-item': $route.name == 'enotes'}" @click="goTo('notes')">
              <router-link class="engagement-link" :class="{'active-engagement-link': $route.name == 'enotes'}" :to="{path: '/engagement/' + engagement.id + '/notes'}">Notes</router-link>
              <span class="engage-sidebar-badge" v-if="engagementNotes.length > 0">{{engagementNotes.length}}</span>
            </li>
            <li class="list-group-item" :class="{'active-list-group-item': $route.name == 'questions'}" @click="goTo('questions')">
              <router-link class="engagement-link" :class="{'active-engagement-link': $route.name == 'questions'}" :to="{path: '/engagement/' + engagement.id + '/questions'}">Q & A</router-link>
              <span class="engage-sidebar-badge" v-if="engagement.questions.length > 0">{{engagement.questions.length}}</span>
            </li>
            <li class="list-group-item" :class="{'active-list-group-item': $route.name == 'history'}" @click="goTo('history')">
              <router-link class="engagement-link" :class="{'active-engagement-link': $route.name == 'history'}" :to="{path: '/engagement/' + engagement.id + '/history'}">History</router-link>
            </li>
            <li class="list-group-item" :class="{'active-list-group-item': $route.name == 'invoice'}" @click="goTo('invoice')">
              <router-link class="engagement-link" :class="{'active-engagement-link': $route.name == 'invoice'}" :to="{path: '/engagement/' + engagement.id + '/invoice'}">Invoice</router-link>
            </li>
          </ul>

          <EngagementContactCard :contact="engagement.client" :engagement="engagement" class="contact-details-card"/>
        </div>

        <router-view :engagement="engagement" :engagement-notes="engagementNotes" :workflow="engagementWorkflow" @delete-engagement="requestEngagementDelete"></router-view>
      </div>

      <spinner v-if="detailsLoading"></spinner>
    </div>

    <UpdateStatusModal  :current_id="engagement.id" />
    <EngagementStatusModal :engagement="engagement" :statuses="engagementWorkflow.statuses" :users="users" v-if="engagementStatusModal" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Alert from '@/components/alerts/Alert.vue'
import bModal from 'bootstrap-vue/es/components/modal/modal'
import bModalDirective from 'bootstrap-vue/es/directives/modal/modal'
import UpdateStatusModal from '@/components/modals/UpdateStatusModal.vue'
import EngagementStatusModal from '@/components/engagement/EngagementStatusModal.vue'
import Spinner from '@/components/loaders/Spinner.vue'
import NoteModal from '@/components/engagement/NoteModal.vue'
import EditNoteModal from '@/components/engagement/EditNoteModal.vue'
import EngagementContactCard from '@/components/engagement/EngagementContactCard.vue'

export default {
  name: 'EngagementDetails',
  data() {
    return {
      detailsLoading: false,
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
  components:{
    'b-modal': bModal,
    Alert,
    Spinner,
    NoteModal,
    EditNoteModal,
    UpdateStatusModal,
    EngagementStatusModal,
    EngagementContactCard
  },
  directives: {
    'b-modal': bModalDirective
  },
  computed: {
    ...mapGetters(['engagement', 
        'successAlert', 
        'processing', 
        'errorMsgAlert', 
        'engagementWorkflow',
        'archiving', 
        'engagementNotes', 
        'noteModal', 
        'editNoteModal', 
        'timesheet', 
        'users', 
        'engagementStatusModal',
        'browserHistory'
    ]),
    percentage() {
      const statuses = this.engagementWorkflow.statuses
      const percentage = this.calcPercent(statuses.length)
      return percentage
    },
    currentWidth() {
      const status = this.engagement.status
      const statuses = this.engagementWorkflow.statuses
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
    requestEngagementDelete() {
      this.modalEngage = true
    },
    archiveEngagement() {
      this.$store.dispatch('archiveEngagement', this.engagement.id)
    },
    inProgress() {
      this.$store.dispatch('engagementViewProgress', this.engagement.id)
    },
    modifyAmount(fee) {
        if(fee == '' || fee == null) return;
        const amount =  parseFloat(fee.replace(/,/g, ''));
        if(amount < 0) {
            return 'Tax Refunded: $' + (-amount)
        } else {
            return 'Tax Owed: $' + amount
        }
        return;
    },
    goTo(path) {
      this.$router.push({'path': '/engagement/' + this.engagement.id + '/' + path})
    }
  },
  watch: {
    '$route': function(value) {
      if(this.browserHistory) {
        this.detailsLoading = true
        this.$store.dispatch('getEngagement', this.$route.params.id);
        this.$store.dispatch('getEngagementNotes', this.$route.params.id)
        setTimeout(() => {
          this.detailsLoading = false
        }, 1000)
      }
    }
  },
  created() {
    this.$store.dispatch('getEngagement', this.$route.params.id);
    this.$store.dispatch('getEngagementNotes', this.$route.params.id)
    this.$store.dispatch('retrieveUsers');
    this.detailsLoading = true;
    var self = this;
    setTimeout(() => {
        self.detailsLoading = false;
    }, 3000)
  }
  
}
</script>


<style  lang="scss">
  .engage-sidebar {
     position: -webkit-sticky;
    position: sticky;
    top: 0;
  }

  .contact-details-card {
     position: -webkit-sticky;
    position: sticky;
    top: 250px;
  }

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


  .question {
    overflow-wrap: normal;
    flex-basis: 100%;
    width: 95%;
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
    font-weight: bold;
    margin: 0 8px;
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

  .list-group {

    .active-list-group-item {
      border-left: 3px solid #0077ff;
    }

    .list-group-item {
      padding: 10px 0;
      cursor: pointer;
      position: relative;

      &:hover {
        background: rgb(245, 245, 245);
        box-shadow: 0 0 3px 0 rgba(0,0,0,.1);
      }

      .engagement-link {
        color: black;
        font-size: .9rem;
        text-decoration: none!important;
      }

      .active-engagement-link {
        font-weight: bold;
        color: #0077ff;
      }

      .engage-sidebar-badge {
        position: absolute;
        background: #0077ff;
        color: white;
        font-weight: bold;
        padding: 0 10px;
        border-radius: 5px;
        font-size: .8rem;
        right: 5px;
        top: 15px;
      }
    }
  }

  .title-description {
      font-weight: bold;
      font-size: .95rem;
  }


  @media screen and (max-width: 1320px) {

    .engagement-details {
      width: 100%!important;
      flex: 0 0 100%!important;
      max-width: 100%!important;
    }

    .note-div {
      width: 100%!important;
    }

    .questions {
      margin:  15px!important;
    }
  }

  @media screen and (max-width: 1260px) {
    .questions {
      border: none!important;
      box-shadow: none!important;
    }

    .questions-header {
      border: 1px solid rgb(223, 221, 221);
      margin-bottom: 0!important;
    }
  }

  @media screen and (max-width: 500px) {
    .engagement-name {
      font-size: .8rem!important;
    }
    .engagement-balance {
      display: none;
    }

    .engagement-details {
      padding: 0!important;
    }

    .questions {
      margin: 15px 0!important;
    }
  }
</style>
