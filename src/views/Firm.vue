<template>
  <div class="page-wrapper">
    <!-- this is the header section of the firm overview -->
      <div class="card-header bg-white shadow w-100 d-flex justify-content-between border">
          <div class="d-flex">
              <span class="h5 mb-0 align-self-center">Firm</span>
          </div>
          <button class="btn btn-sm btn-outline-primary" @click="refreshList"><i class="fas fa-sync-alt mr-2"></i>Refresh</button>
      </div>

      <div class="row d-flex justify-content-between card-body shadow col-12 mx-auto mb-3" >
          <div v-if="noEngagements &&!listLoaded" class="mt-5"><welcome></welcome></div>
          <spinner v-if="listLoaded" class="mx-auto"></spinner>

        <div class="col-2 col-sm-3" v-if="!listLoaded && Object.keys(allEngagements).length">
          <div class="card shadow-sm p-2">
            <div class="input-group my-2">
              <div class="input-group-prepend">
                <label class="input-group-text text-primary" for="option">Workflow</label>
              </div>
              <select class="form-control" id="client_id" v-model="selectedWorkflowID">
                <option v-for="workflow in allWorkflows" :key="workflow.id" :value="workflow.id">
                  {{ workflow.workflow }}
                </option>
              </select>
            </div>
            <hr class="mt-2 mb-0">
            <div class="card-body p-0 d-flex flex-column">
          
                <ul class="p-0 text-left" v-for="workflows in countEngagementsByStatus" :key="workflows.workflow_id" v-if="workflows.workflow_id === selectedWorkflowID">
                  <li class="m-0 px-3 d-flex justify-content-between" v-for="(status, index) in workflows.statuses" :key="index" :value="status.status"  @click="changeEngagementKey(status.status)" :class="{ active: engagementFilterKey === status.status }">
                    <span class="text-muted">{{ capitalize(status.status) }}</span>
                    <span class="badge badge-primary align-self-center">{{ status.count }}</span>
                  </li>
                </ul>
    
            </div>
          </div>
        </div>

        <div class="col-10 col-sm-9" v-if="!listLoaded && Object.keys(allEngagements).length">
          <div class="card p-0 shadow-sm mb-3">
            <div class="d-flex my-3">
                <span class="text-capitalize align-self-center h5 mb-0 font-weight-bold mx-3">
                  {{ engagementFilterKey }}
                </span>
                <div class="flex-fill mx-3">
                  <input class="form-control" placeholder="Filter By Last Name..." v-model="searchEngagement">
                </div>             
            </div>
            </div>

          <table class="table border table-hover">
            <thead class="text-primary text-left">
              <tr>
                <th scope="col">Batch</th>
                <th scope="col" @click="sort('name')">Client</th>
                <th scope="col" @click="sort('created_at')">Created On</th>
                <th scope="col">Status</th>
                <th scope="col">Assigned To</th>
                <th scope="col">Year</th>
              </tr>
            </thead>
            <tbody class="text-left">
              <tr v-for="(engagement, index) in filteredEngagements" :key="index" v-if="engagement.workflow_id === selectedWorkflowID" >
                <th scope="row" class="custom-control custom-checkbox"><input type="checkbox" :value="engagement.id" v-model="checkedEngagements.engagements" class="custom-control-input" :id="`${engagement.id}`"><label class="custom-control-label pb-3 ml-4" :for="`${engagement.id}`"></label></th>
                <th @click="viewDetails(engagement.id)">{{ engagement.name}}</th>
                <td @click="viewDetails(engagement.id)">{{ engagement.created_at | formatDate }}</td>
                <td @click="viewDetails(engagement.id)">{{ engagement.status }}</td>
                <td @click="viewDetails(engagement.id)">{{ engagement.assigned_to }}</td>
                <td @click="viewDetails(engagement.id)">{{ engagement.year }}</td>
              </tr>
            </tbody>
          </table>

            <form @submit.prevent="updateChecked" class="d-flex mb-5" v-if="$can('delete', admin)">
              
              <div class="input-group mr-3" v-for="workflow in allWorkflows" :key="workflow.id" v-if="workflow.id === selectedWorkflowID">
                <div class="input-group-prepend">
                  <label class="input-group-text bg-light font-weight-bold text-primary" for="option">Status</label>
                </div>
                  <select class="custom-select" id="status" v-model="checkedEngagements.status">
                  <option  selected disabled>{{ option }}</option>
                  <option v-for="status in workflow.statuses" :key="status.id" :value="status.status">
                    {{ status.status }}
                  </option>
                </select>
                </div>
              

              <div class="input-group mr-3">
                <div class="input-group-prepend">
                  <label class="input-group-text font-weight-bold bg-light text-primary" for="option">Assign To</label>
                </div>
                <select class="custom-select" id="client_id" v-model="checkedEngagements.assigned_to">
                  <option  selected disabled>{{ option }}</option>
                  <option v-for="user in users" :key="user.id" :value="user.id" v-if="user.name != 'Admin'">
                    {{ user.name }}
                  </option>
                </select>
              </div>

              <div class="d-flex align-self-center">
                <button type="submit" class="btn btn-sm btn-primary">Submit</button>
              </div>
            </form>
          
        </div>      
      </div>
    
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Alert from '@/components/Alert.vue'
import Welcome from '@/components/Welcome.vue'
import Spinner from '@/components/Spinner.vue'

export default {
  name: 'FirmView',
  props: ['admin'],
  components: {
    Alert,
    Spinner
  },
  data() {
    return {
      selectedWorkflowID: 1,
      alert: '',
      searchEngagement: '',
      checkedEngagements: {
        engagements: [],
        status: null,
        assigned_to: null,
      },
      noEngagements: false,
      listLoaded: false,
      engagementFilterKey: 'Received',
      option: 'Choose...',
      currentSort: 'created_at',
      currentSortDir: 'asc',
    }
  },
  computed: {
    ...mapGetters(['allEngagements', 'users', 'allWorkflows']),
    filteredEngagements () {
      return this.allEngagements.sort((a,b) => {
      let modifier = 1;
      if(this.currentSortDir === 'desc') modifier = -1;
      if(a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
      if(a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
      return 0;
      }).filter((engagement) => engagement.status === this.engagementFilterKey)
      .filter( engagement => {
      return !this.searchEngagement || engagement.name.toLowerCase().indexOf(this.searchEngagement.toLowerCase()) >= 0 });
    },
    countEngagementsByStatus () {
       const res = this.allWorkflows.map(({statuses, id}) => ({
        workflow_id: id,
        statuses: statuses.reduce((acc, cur) => {

        const count = this.allEngagements.filter(({workflow_id, status}) => workflow_id === id && status === cur.status).length;

        acc.push({status: cur.status, count});

        return acc;
    
        }, [])
      }))
      return res
    },
  },
  methods: {
    ...mapActions(['updateCheckedEngagements']),
    updateChecked() {
      this.updateCheckedEngagements({
        engagements: this.checkedEngagements.engagements,
        assigned_to: this.checkedEngagements.assigned_to,
        status: this.checkedEngagements.status
      }).then(() => {
        this.alert = 'Engagements Updated'
        this.checkedEngagements.engagements = [];
        this.checkedEngagements.assigned_to = this.option;
        this.checkedEngagements.status = this.option;
      }) 
    },
    changeEngagementKey (key) {
    	this.engagementFilterKey = key
    },
    capitalize(string) {
    	return string.charAt(0).toUpperCase() + string.slice(1)
    },
    refreshList() {
      this.listLoaded = true
      this.$store.dispatch('retrieveEngagements');
      this.currentSort = 'created_at'
      this.currentSortDir = 'asc'
      var self = this;
      setTimeout(() => {
        self.listLoaded = false;
        if(self.allEngagements == 0){
              self.noEngagements = true
        } else {
            self.noEngagements = false
        }
      }, 3000);
    },
    fixCasing(string) {
      if(string == 'taxreturn') {
        const newString = string.replace("taxreturn", "Tax Return")

        return newString
      }
    },
    viewDetails(id) {
      this.$router.push('/engagement/' + id)
    },
    sort:function(s) {
        //if s == current sort, reverse
        if(s === this.currentSort) {
        this.currentSortDir = this.currentSortDir==='asc'?'desc':'asc';
    }
        this.currentSort = s;
    },
  },
  created() {
    this.listLoaded = true;
    this.$store.dispatch('retrieveEngagements')
    this.$store.dispatch('retrieveUsers')
    this.$store.dispatch('retrieveWorkflows')
    this.checkedEngagements.status = this.option
    this.checkedEngagements.assigned_to = this.option
      var self = this;
        setTimeout(() => {
          self.listLoaded = false;
          if(self.allEngagements == 0){
              self.noEngagements = true
        } else {
            self.noEngagements = false
        }
      }, 3000);
    }
}
</script>

<style scoped lang="scss">

 tr {
   cursor: pointer;
 }

  li {
    list-style: none;
    margin: 0;
    padding: 15px 0;

    &:hover {
      background-color: #aaaaaa34;
      cursor: pointer;
    }
  }

  .table-badge {
    background-color: #0077ff;
    border-radius: 5px;
    color: white;
    font-weight: bold;
  }

  .active {
    background-color: #aaaaaa34;
    border: 1px solid #0077ff;
    color: #0077ff;
  }

 
</style>
