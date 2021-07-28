<template>
  <div class="page-wrapper firm-wrapper">
    <!-- this is the header section of the firm overview -->
      <div class="card-header bg-white shadow w-100 d-flex justify-content-between border">
          <div class="d-flex">
              <span class="h5 mb-0 align-self-center">Firm</span>
              <span class="h5 mb-0 align-self-center mx-2" v-if="$route.name != 'bookkeeping-overview'">|</span>
              <div class="input-group input-group-sm" v-if="$route.name != 'bookkeeping-overview'">
                <div class="input-group-prepend">
                  <label class="input-group-text text-secondary bg-white font-weight-bold" for="option">Tax Year</label>
                </div>
                <select name="year" id="year" class="form-control form-control-sm" v-model="currentYear">
                    <option selected>{{allYears}}</option>
                    <option v-for="(year, index) in filterYears" :value="year" :key="index">{{year}}</option>
                </select>
              </div>
          </div>
          <div class="d-flex">
            <button class="btn btn-sm btn-outline-secondary mr-2" @click="showEngagementForm">Add Engagement</button>
            <button class="btn btn-sm btn-outline-primary" @click="refresh"><i class="fas fa-sync-alt mr-2"></i>Refresh</button>
          </div>
      </div>
      
      <Alert v-if="successAlert" :message="successAlert" class="my-2" />

      <router-view
        :allWorkflows="allWorkflows"
        :allEngagements="allEngagements"
        :users="users"
        :currentYear="currentYear"
        :selectedWorkflowID="selectedWorkflowID"
        :callList="callList"
        :loading="loading"
      ></router-view>

      <AddEngageModal 
        :workflows="allWorkflows" 
        :users="users" 
        :years="years"
        :clients="allClients"
        :return_types="returnTypes"
        v-if="showForm"
        @close-modal="showForm = false"
      />

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Alert from '@/components/alerts/Alert.vue'
import Spinner from '@/components/loaders/Spinner.vue'
import AddEngageModal from '@/components/modals/AddEngageModal.vue'
export default {
  name: 'FirmView',
  props: ['admin'],
  components: {
    Alert,
    Spinner,
    AddEngageModal
  },
  data() {
    return {
      currentYear: 'All',
      allYears: 'All',
      selectedWorkflowID: null,
      loading: false,
      showForm: false
    }
  },
  computed: {
    ...mapGetters([
      'allEngagements', 
      'users', 
      'allWorkflows', 
      'successAlert', 
      'processing', 
      'confirmDownload', 
      'timesheet',
      'returnTypes',
      'allClients',
      'callList'
    ]),
    filterYears() {
        //map year
        const years = this.allEngagements.map(engagement => engagement.year)
        //filter duplicates
        const result = years.filter((v, i) => years.indexOf(v) === i)

        return result.sort(function(a, b) {
            var string1 = /[0-9]+/.exec(a);
            var string2 = /[0-9]+/.exec(b);
            if(string1 && string2) {
                return string2[0].localeCompare(string1[0]);
            } else {
                return b - a
        }})
    },
    years() {
        var currentYear = new Date().getFullYear(), years = [];
        var startYear = currentYear - 10;  
        while(startYear <= currentYear) {
          years.push(startYear++)
        } 
        return years.reverse();
    }
  },
  methods: {
    refresh() {
      this.loading = true
      var self = this;
      setTimeout(() => {
        self.loading = false;
      }, 3000);
    },
    showEngagementForm() {
      this.showForm = true
    }
  },
  created() {
    this.$store.dispatch('retrieveEngagements')
    this.$store.dispatch('retrieveUsers')
    this.$store.dispatch('retrieveWorkflows')
    this.$store.dispatch('getReturnTypes')
    this.$store.dispatch('retrieveClientsWithBusinesses')
    this.$store.dispatch('getCallList')
    this.currentYear = this.allYears
    this.loading = true
    var self = this
    setTimeout(() => {
      self.loading= false
    }, 1000)
  }
}
</script>

