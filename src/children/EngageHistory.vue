<template>
  <div class="page-wrapper">
  <div class="d-flex" v-if="dataReceived">
    <router-link :to="{path: '/engagement/' + engagement.id }" class="mr-auto btn btn-link"><i class="fas fa-chevron-left mr-2"></i>Back</router-link>
  </div>
  <div class="d-flex justify-content-between mb-5" v-if="dataReceived">
    <div class="card-body radius shadow text-left p-0" v-if="engagementHistory">
      <div class="d-flex justify-content-between">
        <h2 class="p-3"><i class="fas fa-history mr-2"></i>History</h2>
        <div class="align-self-center mr-3">
          <button type="button" class="btn btn-sm btn-primary" @click="editReceivedDate">Edit Created Date</button>    
        </div>
      </div>
      <table class="table table-light table-hover text-left mb-0">
        <thead class="text-primary hover">
            <tr>
                <th scope="col">Event</th>
                <th scope="col">Moved By</th>
                <th scope="col">Status</th>
                <th scope="col">Date</th>
            </tr>
        </thead> 
        <tbody class="client-info font-weight-bold">
            <tr  v-for="(history, index) in engagementHistory" :key="index">
                <td class="text-capitalize">{{history.action}}</td>
                <td class="text-capitalize">{{ userName(history.user_id) }}</td>
                <td class="text-capitalize">{{history.status}}</td>
                <td>{{history.created_at | formatDate}}</td>
            </tr>
        </tbody>
      </table>
      <div v-if="engagementHistory.length == 0" class="p-auto text-center">
        <span class="mx-auto">
          There Are Zero Events For This Engagement
        </span>
      </div>
    </div>
    <div class="card-body radius shadow ml-3 text-left align-self-start">
      <h2><i class="far fa-clock mr-2"></i>
        <span v-if="engagementComplete">Completed In</span>
        <span v-else>Timelapse</span>
      </h2>
      <div v-if="engagementHistory" class="day">
        <span class="d-flex justify-content-center">
          {{ calculateDifference }} Day(s)
        </span>
      </div>
    </div>

    <b-modal v-model="dateModal" hide-footer title="Edit Created Date">
      <div class="d-block text-left">
        <span class="font-weight-bold ml-1">Created Date</span>
        <v-date-picker
          mode='single'
          v-model='receivedDate'
          :input-props='{class: "form-control h-100"}'>
        </v-date-picker>
      </div>
      <div class="d-flex">
        <b-btn class="mt-3 mr-auto" size="sm" variant="primary" @click="updateReceivedDate">Save</b-btn>
        <b-btn class="mt-3" variant="secondary" size="sm" @click="dateModal = false">Cancel</b-btn>
      </div>
    </b-modal>


  </div>

    <div v-if="!dataReceived" class="lds-dual-ring justify-content-center"></div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'
import bModal from 'bootstrap-vue/es/components/modal/modal'
import bModalDirective from 'bootstrap-vue/es/directives/modal/modal'
import moment from 'moment'

export default {
  name: 'EngagementHistory',
  data() {
    return {
      dataReceived: false,
      receivedDate: null,
      dateModal: false,
      engagementComplete: false
    }
  },
  components:{
    'b-modal': bModal
  },
  directives: {
    'b-modal': bModalDirective
  },
  computed: {
    ...mapGetters(
        [
          'engagement',
          'users',
          'engagementHistory',
        ]
      ),
      calculateDifference() {
        //Get 1 day in milliseconds

          var one_day=1000*60*60*24;
          var started = this.engagementHistory.filter(history => history.action == 'created');

          if(started.length == 0) {
            return '0'
          }

          var completed = this.engagementHistory.filter(history => history.action == 'completed');

          if(completed.length == 0) {
              var current = new Date(moment())
              var date1_ms = moment(started[0].created_at);
              var date2_ms = moment(current);
              return date2_ms.diff(date1_ms, 'days');
            } else {
            // Convert both dates to moment object
            this.engagementComplete = true
            var date1_ms = moment(started[0].created_at);
            var date2_ms = moment(completed[0].created_at);
            return date2_ms.diff(date1_ms, 'days');
          }    
      
      }
  },
  methods: {
    userName(id) {
      const name = this.users.filter(user => user.id == id)

      return name[0].name
    },
    showModal () {
      this.$refs.myModalRef.show()
    },
    hideModal () {
      this.$refs.myModalRef.hide()
    },
    editReceivedDate() {
      const date = this.engagementHistory.filter(e => e.action == 'created')
      this.dateModal = true
      this.receivedDate = new Date(date[0].created_at)
    },
    updateReceivedDate() {
      if(!this.receivedDate) return;
      console.log(moment(String(this.receivedDate)).format('MM/DD/YYYY'))
      this.$store.dispatch('updateReceivedDate', {
        id: this.engagement.id,
        date:  moment(String(this.receivedDate)).format('MM/DD/YYYY')
      })
      .then(() => {
        this.receivedDate = null
        this.dateModal = false
      })
    }
  },
  created: function(){
    this.$store.dispatch('getEngagement', this.$route.params.id);
    this.$store.dispatch('getEngagementHistory', this.$route.params.id);
    this.$store.dispatch('retrieveUsers')
    var self = this
    setTimeout(() => {
      self.dataReceived = true
    }, 3000) 
    
  }
  
}
</script>

<style lang="scss" scoped>

 .radius {
   border-radius: 8px !important;
 }

.day {
  font-size: 4rem;
  padding: 10px;
  color: #0077ff;
}

</style>


