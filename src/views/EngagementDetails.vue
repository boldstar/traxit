<template>
  <div class="page-wrapper">
    <div v-if="engagement">
      <Alert v-if="successAlert" v-bind:message="successAlert" />
      <div class="sending-mail" v-if="processing && !noteModal && !deleteNote && !timesheet"><i class="far fa-envelope mr-3"></i>Sending Mail...</div>

      <!-- this is the header section of the engagement details -->
      <div class="flex-row justify-content-between d-flex mt-0 card-body shadow-sm py-2 px-3">
        <span class="h5 align-self-center m-0 text-left engagement-name">Engagement | <strong class="text-primary"><router-link :to="'/contact/' +engagement.client.id + '/account'">{{engagement.name}}</router-link></strong></span>

        <div>
          <ul class="d-flex engagement-links">
            <li class="engagement-link-wrapper">
              <router-link class="engagement-link" :class="{'active-engagement-link': $route.name == 'details'}" :to="{path: '/engagement/' + engagement.id + '/details'}">Details</router-link>
            </li>
            <li class="engagement-link-wrapper">
              <router-link class="engagement-link" :class="{'active-engagement-link': $route.name == 'notes'}" :to="{path: '/engagement/' + engagement.id + '/notes'}">Notes</router-link>
            </li>
            <li class="engagement-link-wrapper">
              <router-link class="engagement-link" :class="{'active-engagement-link': $route.name == 'questions'}" :to="{path: '/engagement/' + engagement.id + '/questions'}">Q & A</router-link>
            </li>
            <li class="engagement-link-wrapper">
              <router-link class="engagement-link" :class="{'active-engagement-link': $route.name == 'history'}" :to="{path: '/engagement/' + engagement.id + '/history'}">History</router-link>
            </li>
            <li class="engagement-link-wrapper">
              <router-link class="engagement-link" :class="{'active-engagement-link': $route.name == 'invoice'}" :to="{path: '/engagement/' + engagement.id + '/invoice'}">Invoice</router-link>
            </li>
          </ul>
        </div>

        <div class="d-flex">
        <div v-if="engagement.type == 'taxreturn' && engagement.balance != null" class="mr-3 d-flex engagement-balance">
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
            <button type="button" class="dropdown-item" @click="archiveEngagement"><i class="fas fa-archive"></i><span class="ml-2">
              <span v-if="!engagement.archive">Archive</span>
              <span v-else>Unarchive</span>
            </span></button> 
            <button type="button" class="dropdown-item" @click="inProgress">
              <span v-if="engagement.in_progress"><i class="fas fa-sign-in-alt mr-2"></i>Check In</span>
              <span v-else><i class="fas fa-sign-out-alt mr-2"></i>Check Out</span>
            </button> 
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

      <div class="row px-3 my-3"  v-if="!detailsLoaded">
        <router-view :engagement="engagement" :engagement-notes="engagementNotes" ></router-view>
      </div>

      <spinner v-if="detailsLoaded"></spinner>
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
    ...mapGetters(['engagement','question', 'successAlert', 'processing', 'errorMsgAlert', 'engagementWorkflow','archiving', 'engagementNotes', 'noteModal', 'editNoteModal', 'timesheet']),
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


<style  lang="scss">
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

  .engagement-links {
    list-style: none;
    align-self: center;
    margin: 0;
    padding: 0;

    .engagement-link-wrapper {
      align-self: center;
      padding: 5px 30px;
      border-bottom: none;
      font-weight: bold;

      .engagement-link {
        color: black;
      }

      .active-engagement-link {
        color: #0077ff;
      }
    }
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
