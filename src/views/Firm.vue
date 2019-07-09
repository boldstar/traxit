<template>
  <div class="page-wrapper">
    <!-- this is the header section of the firm overview -->
      <div class="card-header bg-white shadow w-100 d-flex justify-content-between border">
          <div class="d-flex">
              <span class="h5 mb-0 align-self-center">Firm</span>
              <span class="h5 mb-0 align-self-center mx-2">|</span>
              <select name="year" id="year" class="form-control form-control-sm">
                  <option value="2018">2018</option>
              </select>
          </div>
          <div class="flex-fill mx-3 search-input-nav">
            <input class="form-control" placeholder="Filter By Last Name..." v-model="searchEngagement">
          </div>  
          <button class="btn btn-sm btn-outline-primary" @click="refreshList"><i class="fas fa-sync-alt mr-2"></i>Refresh</button>
      </div>

      <Alert v-if="successAlert" :message="successAlert" class="my-2" />

      <div class="row d-flex justify-content-between card-body col-12 mx-auto mb-3 firm" >
        <processing-bar v-if="processing"></processing-bar>
        <NoFirm v-if="noEngagements &&!listLoaded" class="mx-auto align-self-center"/>
        <spinner v-if="listLoaded" class="mx-auto"></spinner>

        <div class="col-2 col-sm-3 list" v-if="!listLoaded && Object.keys(allEngagements).length">
          <div class="card shadow-sm p-2">
            <div class="input-group mt-2 mb-3">
              <div class="input-group-prepend">
                <label class="input-group-text text-primary font-weight-bold" for="option">Workflow</label>
              </div>
              <select class="form-control" id="client_id" v-model="selectedWorkflowID">
                <option v-for="workflow in allWorkflows" :key="workflow.id" :value="workflow.id">
                  {{ workflow.workflow }}
                </option>
              </select>
            </div>
            <div class="card-body p-0 d-flex flex-column">
                <ul class="p-0 text-left workflow-list" :class="{'show-workflow-list': showList}" v-for="workflows in countEngagementsByStatus" :key="workflows.workflow_id" v-if="workflows.workflow_id === selectedWorkflowID"  @keyup="switchStatus">
                  <li class="m-0 px-3 d-flex justify-content-between workflow-item" v-for="(status, index) in workflows.statuses" :key="index" :value="status.status"  @click="changeEngagementKey(status.status)" :class="{ active: engagementFilterKey === status.status, 'show-workflow-item': showList }">
                    <span class="text-muted status-text">{{ capitalize(status.status) }}</span>
                    <span class="badge badge-primary align-self-center">{{ status.count }}</span>
                  </li>
                </ul>
                <!-- only shows on mobile views -->
                <button class="toggle-workflow-btn" type="btn" @click="showWorkflowList">
                  <span v-if="!showList" class="text-primary">Show List</span>
                  <span v-if="showList" class="text-primary">Hide List</span>
                </button>
            </div>
          </div>
        </div>

        <div class="col-10 col-sm-9 table-body" v-if="!listLoaded && Object.keys(allEngagements).length">
          <div class="p-0 search-input-body">
            <div class="d-flex">
                <div class="flex-fill search-engagements-body">
                  <input class="search-engagement-input" placeholder="Filter By Last Name..." v-model="searchEngagement">
                  <button class="btn btn-sm btn-outline-primary export-btn" @click="downloadEngagementsList"><i class="fas fa-file-export"></i></button>
                </div>  
            </div>           
          </div>
          <!-- only shows on mobile views -->
          <div class="status-header">
            <span>{{engagementFilterKey}}</span>
          </div>

          <div class="table-responsive">
            <table class="table border table-hover">
              <thead class="text-primary text-left">
                <tr>
                  <th scope="col">Batch</th>
                  <th scope="col" @click="sort('name')">Client</th>
                  <th scope="col" @click="sort('created_at')" class="hide-row">Created On</th>
                  <th scope="col" class="hide-row">Status</th>
                  <th scope="col">Assigned To</th>
                  <th scope="col" class="hide-row">Year</th>
                </tr>
              </thead>
              <tbody class="text-left">
                <tr v-for="(engagement, index) in filteredEngagements" :key="index" v-if="engagement.workflow_id === selectedWorkflowID" >
                  <th scope="row" class="custom-control custom-checkbox"><input type="checkbox" :value="engagement.id" v-model="checkedEngagements.engagements" class="custom-control-input" :id="`${engagement.id}`"><label class="custom-control-label pb-3 ml-4" :for="`${engagement.id}`"></label></th>
                  <th @click="viewDetails(engagement.id)">{{ engagement.name}}</th>
                  <td @click="viewDetails(engagement.id)" class="hide-row">{{ engagement.created_at | formatDate }}</td>
                  <td @click="viewDetails(engagement.id)" class="hide-row">{{ engagement.status }}</td>
                  <td @click="viewDetails(engagement.id)">{{ engagement.assigned_to }}</td>
                  <td @click="viewDetails(engagement.id)" class="hide-row">{{ engagement.year }}</td>
                </tr>
              </tbody>
            </table>
          </div>

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
                <button type="submit" class="btn btn-sm btn-primary" :disabled="checkedEngagements.assigned_to == option || checkedEngagements.status == option || checkedEngagements.engagements.length === 0">Submit</button>
              </div>
            </form>
          
        </div>      
      </div>
    
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Alert from '@/components/Alert.vue'
import Spinner from '@/components/Spinner.vue'
import ProcessingBar from '@/components/ProcessingBar.vue'
import NoFirm from '@/components/NoFirm.vue'

export default {
  name: 'FirmView',
  props: ['admin'],
  components: {
    Alert,
    Spinner,
    ProcessingBar,
    NoFirm
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
      showList: false
    }
  },
  computed: {
    ...mapGetters(['allEngagements', 'users', 'allWorkflows', 'successAlert', 'processing']),
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
        this.checkedEngagements.engagements = [];
        this.checkedEngagements.assigned_to = this.option;
        this.checkedEngagements.status = this.option;
      }) 
    },
    changeEngagementKey (key) {
      this.engagementFilterKey = key
      this.showList = false
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
    showWorkflowList() {
      this.showList = !this.showList
    },
    downloadEngagementsList() {
      console.log('im in')
    },
    switchStatus() {
      console.log('switching')
    }
  },
  mounted() {
    document.addEventListener("keyup", this.switchStatus);
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
            self.selectedWorkflowID = self.allWorkflows[0].id
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
    border-radius: 5px;
    box-shadow: 0 0 5px 0 rgba(0,0,0,.250);
    color: #0077ff;

    .status-text {
      font-weight: bold;
      color: black!important;
    }
  }

  .firm {
    height: 100%;
    min-height: calc(100vh - 190px);
  }

  .search-input-nav {
    display: none;
  }

  .toggle-workflow-btn {
    display: none;
  }

  .status-header {
    display: none;
  }

  .search-engagements-body {
    position: relative;
  }

  .export-btn {
    position: absolute;
    right: 10px;
    top: 8px;
  }

  .search-engagement-input {
    flex-grow: 1;
    width: 100%;
    padding: 10px;
    border: .5px solid lightgray;
    border-radius: 5px 5px 0 0;
    background: #f3f3f3;
    border-bottom: none;
    font-weight: bold;
  }


  @media screen and (max-width: 1300px) {
    .input-group-prepend {
      display: none!important;
    }

    .list {
      font-size: .9rem!important;
    }

    .table {
      font-size: .9rem!important;
    }
  }


  @media screen and (max-width: 950px) {
    .firm {
      padding: 20px 0!important;
    }

    .search-input-nav {
      display: block;
    }

    .search-input-body {
      display: none!important;
    }

    .table {
      font-size: .75rem!important;
    }

    .list {
      font-size: .75rem!important;
    }
  }

  @media screen and (max-width: 800px) {
    .firm {
      flex-direction: column!important;
      box-shadow: none!important;
    }

    .list {
      width: 100%!important;
      max-width: 100%!important;
      margin-bottom: 20px!important;
    }

    .workflow-list {
      height: 0%!important;
      transition: height 2s;
    }

    .workflow-item {
      display: none!important;
    }

    .show-workflow-list {
      height: 100%!important;
      transition: height 2s;
    }

    .show-workflow-item {
      display: flex!important;
    }

    .status-header {
      display: block!important;
      background-color: rgb(247, 247, 247);
      border-radius: 5px 5px 0 0;
      padding: 10px 0;
      border: .5px solid lightgrey;
      color: #0077ff;
    }

    .toggle-workflow-btn {
      background: transparent;
      border: .5px solid black;
      border-radius: 0 0 5px 5px;
      padding: 5px 0;
      display: flex;
      flex-direction: column;
      outline: none;
      justify-content: center;
      align-items: center;
      font-weight: bold;
    }

    .table-responsive {
      width: 100%!important;
      max-width: 100%!important;
    }
    .table-body {
      width: 100%!important;
      max-width: 100%!important;
    }

    .hide-row {
      display: none!important;
    }
  }
</style>
