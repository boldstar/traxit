<template>
  <div class="mt-1 d-flex justify-content-between mb-5" v-if="dataReceived">

  <div class="card-body radius shadow text-left" v-if="engagementHistory">
    <h2>History</h2>    
    <table class="table border table-light table-hover text-left">
      <thead class="text-primary hover">
          <tr>
              <th scope="col">Event</th>
              <th scope="col">Status</th>
              <th scope="col">Assigned To</th>
              <th scope="col">Date</th>
          </tr>
      </thead> 
      <tbody class="client-info table-bordered">
          <tr  v-for="(history, index) in engagementHistory" :key="index">
              <td class="text-capitalize">{{history.action}}</td>
              <td class="text-capitalize">{{history.status}}</td>
              <td class="text-capitalize">{{ userName(history.user_id) }}</td>
              <td>{{history.created_at | formatDate}}</td>
          </tr>
      </tbody>
    </table>
  </div>
  <div class="card-body radius shadow ml-3 text-left">
    <h2>Timelapse</h2>
    <div v-if="engagementHistory" class="day">
      {{ calculateDifference }} Days
    </div>
  </div>


  <b-modal id="myModal" ref="myModalRef" hide-footer title="Delete Client">
    <div class="d-block text-left">
      <h5>Are you sure you want to delete engagement?</h5>
      <br>
      <p><strong>*Warning:</strong> Can not be undone once deleted.</p>
    </div>
    <div class="d-flex">
      <b-btn class="mt-3" variant="danger" @click="hideModal">Cancel</b-btn>
      <b-btn class="mt-3 ml-auto" variant="outline-success">Confirm</b-btn>
    </div>
  </b-modal>


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
      dataReceived: false
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
          var completed = this.engagementHistory.filter(history => history.action == 'completed');

          if(completed.length == 0) {
              return '0'
            } else {
            // Convert both dates to moment object
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


