<template>
  <div class="page-wrapper mt-1">
    <!-- this is the header section of the firm overview -->
      <div class="card mb-3 shadow-sm">
        <div class="d-flex justify-content-between card-body">
          <div class="h2 align-self-center m-0">
            <i class="fas fa-home text-primary"></i>
          </div>
          <p class="h2 align-self-center">Firm</p>
          <div class="align-self-center">
            <button class="btn btn-sm btn-outline-primary" @click="refreshList"><i class="fas fa-sync-alt mr-2"></i>Refresh</button>
          </div>
        </div>
      </div>


      <div class="row d-flex justify-content-around mt-5" v-if="!listLoaded">

        <div class="col-2 col-sm-3">
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
          
                <ul class="p-0 text-left" v-for="workflow in allWorkflows" :key="workflow.id" v-if="workflow.id === selectedWorkflowID">
                  <li class="m-0 pl-3" v-for="status in workflow.statuses" :key="status.id" :value="status.status"  @click="changeEngagementKey(status.status)" :class="{ active: engagementFilterKey === status.status }">
                    <span class="text-muted">{{ capitalize(status.status) }}</span>
                  </li>
                </ul>
    
            </div>
          </div>
        </div>

        <div class="col-9 col-sm-8">
          <div class="card p-0 shadow-sm mb-3">
            <div class="d-flex my-3">
                <span class="text-capitalize align-self-center h5 mb-0 font-weight-bold mx-3">
                  {{ engagementFilterKey }}:
                </span>
                <div class="flex-fill mx-3">
                  <input class="form-control" placeholder="Filter By Last Name..." v-model="searchEngagement">
                </div>             
            </div>
            </div>


          <table class="table border">
            <thead class="text-primary">
              <tr>
                <th scope="col">Batch</th>
                <th scope="col">Client</th>
                <th scope="col">Status</th>
                <th scope="col">Assigned To</th>
                <th scope="col">Return Type</th>
                <th scope="col">Year</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="engagement in filteredEngagements" :key="engagement.id" v-if="engagement.workflow_id === selectedWorkflowID">
                <th scope="row"><input type="checkbox" :value="engagement.id" v-model="checkedEngagements.engagements"></th>
                <th>{{ engagement.client.last_name}}, {{ engagement.client.first_name}} & {{ engagement.client.spouse_first_name}}</th>
                <td>{{ engagement.status }}</td>
                <td>{{ engagement.assigned_to }}</td>
                <td>{{ engagement.return_type }}</td>
                <td>{{ engagement.year }}</td>
              </tr>
            </tbody>
          </table>

            <form @submit.prevent="updateChecked" class="d-flex mb-5">
              <div class="input-group mr-3">
                <div class="input-group-prepend">
                  <label class="input-group-text font-weight-bold bg-light text-primary" for="option">Status</label>
                </div>
                <select class="custom-select" id="status" v-model="checkedEngagements.status">
                  <option  selected disabled>{{ option }}</option>
                  <option v-for="status in statuses" :key="status.id" :value="status">
                    {{ status }}
                  </option>
                </select>
              </div>

              <div class="input-group mr-3">
                <div class="input-group-prepend">
                  <label class="input-group-text font-weight-bold bg-light text-primary" for="option">Assign To</label>
                </div>
                <select class="custom-select" id="client_id" v-model="checkedEngagements.assigned_to">
                  <option  selected disabled>{{ option }}</option>
                  <option v-for="user in users" :key="user.id" :value="user.id">
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



  <div v-if="listLoaded" class="lds-dual-ring justify-content-center"></div>
    

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'FirmView',
  data() {
    return {
      selectedWorkflowID: 1,
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
      statuses: [
        'Received',
        'Scanned',
        'Preparation',
        'Review',
        '2nd Review',
        'Complete'
      ],
    }
  },
  computed: {
    ...mapGetters(['allEngagements', 'users', 'allWorkflows']),
    filteredEngagements () {
      return this.allEngagements.filter((engagement) => engagement.status === this.engagementFilterKey)
      .filter( engagement => {
      return !this.searchEngagement || engagement.client.last_name.toLowerCase().indexOf(this.searchEngagement.toLowerCase()) >= 0 });
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
        this.checkedEngagements.engagements = '';
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

 .lds-dual-ring {
        display: inline-block;
        width: 64px;
        height: 64px;
        margin-top: 100px;
        margin-bottom: 100px;
    }

    .lds-dual-ring:after {
        content: " ";
        display: block;
        width: 46px;
        height: 46px;
        margin: 1px;
        border-radius: 50%;
        border: 5px solid #0077ff;
        border-color: #0077ff transparent #0077ff transparent;
        animation: lds-dual-ring 1.2s linear infinite;
    }
        @keyframes lds-dual-ring {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }

    .lds-ellipsis-container {
        position: absolute;
        right: 50%;
        padding-right: 20px;
    }

    .lds-ellipsis {
        display: inline-block;
        position: relative;
        width: 64px;
        height: 11px;
    }

    .lds-ellipsis div {
        position: absolute;
        width: 11px;
        height: 11px;
        border-radius: 50%;
        background: #fff;
        animation-timing-function: cubic-bezier(0, 1, 1, 0);
    }

    .lds-ellipsis div:nth-child(1) {
        left: 6px;
        animation: lds-ellipsis1 0.6s infinite;
    }
    .lds-ellipsis div:nth-child(2) {
        left: 6px;
        animation: lds-ellipsis2 0.6s infinite;
    }
    .lds-ellipsis div:nth-child(3) {
        left: 26px;
        animation: lds-ellipsis2 0.6s infinite;
    }
    .lds-ellipsis div:nth-child(4) {
        left: 45px;
        animation: lds-ellipsis3 0.6s infinite;
    }
    @keyframes lds-ellipsis1 {
        0% {
            transform: scale(0);
        }
        100% {
            transform: scale(1);
        }
        }
        @keyframes lds-ellipsis3 {
        0% {
            transform: scale(1);
        }
        100% {
            transform: scale(0);
        }
        }
        @keyframes lds-ellipsis2 {
        0% {
            transform: translate(0, 0);
        }
        100% {
            transform: translate(19px, 0);
        }
    }
</style>
