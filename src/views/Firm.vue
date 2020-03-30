<template>
  <div class="page-wrapper firm-wrapper">
    <!-- this is the header section of the firm overview -->
      <div class="card-header bg-white shadow w-100 d-flex justify-content-between border">
          <div class="d-flex">
              <span class="h5 mb-0 align-self-center">Firm</span>
              <span class="h5 mb-0 align-self-center mx-2">|</span>
              <div class="input-group input-group-sm">
                <div class="input-group-prepend">
                  <label class="input-group-text text-secondary bg-white font-weight-bold" for="option">Tax Year</label>
                </div>
                <select name="year" id="year" class="form-control form-control-sm" v-model="currentYear">
                    <option selected>{{allYears}}</option>
                    <option v-for="(year, index) in filterYears" :value="year" :key="index">{{year}}</option>
                </select>
              </div>
          </div>
          <div class="flex-fill mx-3 search-input-nav">
            <input class="form-control" placeholder="Filter By Last Name..." v-model="searchEngagement">
          </div>  
          <button class="btn btn-sm btn-outline-primary" @click="refreshList"><i class="fas fa-sync-alt mr-2"></i>Refresh</button>
      </div>

      <Alert v-if="successAlert" :message="successAlert" class="my-2" />

      <div class="row d-flex justify-content-between card-body col-12 mx-auto mb-3 firm px-0" >
        <processing-bar v-if="processing && !timesheet"></processing-bar>
        <NoFirm v-if="noEngagements &&!listLoaded" class="mx-auto align-self-center"/>
        <spinner v-if="listLoaded" class="mx-auto"></spinner>

        <div class="col-2 col-sm-3 list pl-0" v-if="!listLoaded && Object.keys(allEngagements).length">
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
                <ul class="p-0 text-left workflow-list" :class="{'show-workflow-list': showList}" v-for="workflows in countEngagementsByStatus" :key="workflows.workflow_id"  @keyup="switchStatus($event)">
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

        <div class="col-10 col-sm-9 table-body pr-0" v-if="!listLoaded && Object.keys(allEngagements).length">
          <div class="p-0 search-input-body">
            <div class="d-flex">
                <div class="flex-fill search-engagements-body">
                  <input class="search-engagement-input" placeholder="Start Typing To Filter By Name..." v-model="searchEngagement">
                  <button class="btn btn-sm btn-secondary clear-sort-btn" @click="currentSort = null" v-if="currentSort">Clear Sort</button>
                  <button class="btn btn-sm btn-outline-primary export-btn" @click="confirmEngagementsDownload" v-if="filteredEngagements && filteredEngagements.length > 0" data-toggle="tooltip" data-placement="bottom" title="Export Engagements List">Export<i class="fas fa-file-export ml-2"></i></button>
                </div>  
            </div>           
          </div>
          <!-- only shows on mobile views -->
          <div class="status-header">
            <span>{{engagementFilterKey}}</span>
          </div>

          <div class="table-responsive">
            <table class="table border table-hover" ref="engagement-table">
              <thead class="text-primary text-left">
                <tr>
                  <th scope="col">Batch</th>
                  <th scope="col">Name</th>
                  <th scope="col" @click="sort('created_at')" class="hide-row sort-btn" :class="{'sorted-row': !this.currentSort}">Created On<i class="fas fa-sort text-dark ml-3"></i></th>
                  <th scope="col" @click="sort('estimated_date')" class="hide-row sort-btn" :class="{'sorted-row': this.currentSort == 'estimated_date'}">Due Date<i class="fas fa-sort text-dark ml-3"></i></th>
                  <th scope="col" @click="sort('priority')" class="sort-btn" :class="{'sorted-row': this.currentSort == 'priority'}">Priority <i class="fas fa-sort text-dark ml-3"></i></th>
                  <th scope="col" @click="sort('assigned_to')" class="sort-btn" :class="{'sorted-row': this.currentSort == 'assigned_to'}">Assigned To<i class="fas fa-sort text-dark ml-3"></i></th>
                  <th scope="col" @click="sort('year')" class="hide-row sort-btn"  :class="{'sorted-row': this.currentSort == 'year'}">Tax Year<i class="fas fa-sort text-dark ml-3"></i></th>
                  <th scope="col" class="hide-row">Status</th>
                  <th class="hide-row" v-if="$can('delete', admin)">Edit</th>
                </tr>
              </thead>
              <tbody class="text-left">
                <tr v-for="(engagement, index) in filteredEngagements" :key="index" class="engagement-row" :ref="'engagement-row' + `${index}`">
                  <th scope="row" class="custom-control custom-checkbox"><input type="checkbox" :value="engagement.id" v-model="checkedEngagements.engagements" class="custom-control-input" :id="`${engagement.id}`"><label class="custom-control-label pb-2 ml-5" :for="`${engagement.id}`"></label></th>
                  <th @click="viewDetails(engagement.id)">{{ engagement.name}}</th>
                  <td @click="viewDetails(engagement.id)" class="hide-row">{{ engagement.created_at | formatDate }}</td>
                  <td @click="viewDetails(engagement.id)" class="hide-row" v-if="engagement.estimated_date">{{ engagement.estimated_date | formatDate }}</td>
                  <td @click="viewDetails(engagement.id)" class="hide-row" v-else>None</td>
                  <td @click="viewDetails(engagement.id)" :class="{'font-weight-bold': engagement.priority > 1, 'text-danger': engagement.priority > 3, 'text-warning': engagement.priority == 3}">{{ priorityDesc(engagement.priority) }}</td>
                  <td @click="viewDetails(engagement.id)">{{ engagement.assigned_to }}</td>
                  <td @click="viewDetails(engagement.id)" class="hide-row">{{ engagement.year }}</td>
                  <td @click="viewDetails(engagement.id)" class="hide-row">{{ engagement.status }}</td>
                  <td v-if="$can('delete', admin)"><button @click="editEngagementRow(index, engagement.id)" class="btn btn-link"><i class="fas fa-edit"></i></button></td>
                </tr>
                <tr v-if="filteredEngagements.length > 8">
                  <td colspan=9>
                  <div class="d-flex flex-column align-items-center justify-content-center">
                    <span class="font-weight-bold">You Have Reached The End</span>
                    <!-- <button class="btn btn-sm btn-primary mt-2 font-weight-bold" @click="scrollToTop()">Back To Top</button> -->
                  </div>
                  </td>
                </tr>
                <tr v-if="filteredEngagements.length < 1">
                  <td colspan=9>
                  <div class="d-flex flex-column align-items-center justify-content-center">
                    <span class="font-weight-bold">There Are Zero Engagements For This Status.</span>
                  </div>
                  </td>
                </tr>
                <tr class="edit-engagement-row" ref="edit-engagement-row" v-show="showEditRow" :key="showEditRow">
                  <td :class="{'edit-engagement-row-body': showEditRow}" colspan=9 v-if="selectedEngagement">
                    <div class="edit-engagement-row-body-content">
                      <div class="d-flex justify-content-between">
                        <div class="custom-input-group m-0 ml-1">
                          <span>Due Date</span>
                          <v-date-picker
                            mode='single'
                            v-model='dueDate'
                            id="due_date"
                          >
                          </v-date-picker>
                        </div>
                        <div class="custom-input-group m-0 mx-3">
                          <span>Status</span>
                          <select name="status" id="status" v-model="selectedEngagement.status">
                            <option v-for="(status, index) in filteredStatuses" :value="status.status" :key="index">{{status.status}}</option>
                          </select>
                        </div>
                        <div class="custom-input-group m-0 mr-3">
                          <span>Priority</span>
                          <select name="assigned_to" id="assigned_to" v-model="selectedEngagement.priority">
                            <option v-for="(level, index) in priority_levels" :key="index" :value="level.level">{{level.value}}</option>
                          </select>
                        </div>
                        <div class="custom-input-group m-0">
                          <span>Assigned To</span>
                          <select name="assigned_to" id="assigned_to" v-model="selectedEngagement.assigned_to">
                            <option v-for="(user, index) in users" :key="index" :value="user.name" v-show="user.name != 'Admin'">{{user.name}}</option>
                          </select>
                        </div>
                      </div>
                      <div class="edit-row-btns">
                        <button @click="hideEditRow" class="btn btn-sm edit-row-btn text-danger">Cancel</button>
                        <button @click="saveEditChanges" class="btn btn-sm edit-row-btn text-primary">Save Changes</button>
                        <router-link  :to="'/engagement/' + selectedEngagement.id +'/details'" class="btn btn-sm edit-row-btn">View More</router-link>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>      
      </div>

      <form @submit.prevent="updateChecked" class="update-engagements-form col-8" v-if="$can('delete', admin) && filteredEngagements.length > 0">
        <div class="mb-1" v-if="nothingSelected">
          <span  class="font-weight-bold text-danger">Please select Due Date, Status, Priority or Assign To before submitting changes.</span>
        </div>
        
        <div class="d-flex justify-content-between">
          <div class="custom-input-group">
            <label  for="due_date">Due Date</label>
            <v-date-picker
              mode='single'
              v-model='checkedEngagements.due_date'
              id="due_date"
              :popover-direction="'top'"
            >
            </v-date-picker>
          </div>
          
          <div class="custom-input-group">
              <label for="option">Priority</label>
              <select id="status" v-model="checkedEngagements.priority">
              <option  selected disabled>{{ option }}</option>
              <option v-for="(level, index) in priority_levels" :key="index" :value="level.level">
                {{ level.value }}
              </option>
            </select>
          </div>

          <div class="custom-input-group" v-for="workflow in filteredWorkflow" :key="workflow.id">
              <label for="option">Status</label>
              <select id="status" v-model="checkedEngagements.status">
              <option  selected disabled>{{ option }}</option>
              <option v-for="status in workflow.statuses" :key="status.id" :value="status.status">
                {{ status.status }}
              </option>
            </select>
          </div>
          

          <div class="custom-input-group">
            <label for="option">Assign To</label>
            <select id="client_id" v-model="checkedEngagements.assigned_to">
              <option  selected disabled>{{ option }}</option>
              <option v-for="user in filteredUsers" :key="user.id" :value="user.id">
                {{ user.name }}
              </option>
            </select>
          </div>

          <div class="align-self-center">
            <button type="submit" class="btn btn-sm btn-primary font-weight-bold" :disabled="checkedEngagements.engagements.length === 0">Submit</button>
          </div>
        </div> 
      </form>

      <ConfirmModal v-if="confirmDownload" @submit-download="downloadEngagementsList" @close-modal="cancelDownload" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Alert from '@/components/alerts/Alert.vue'
import Spinner from '@/components/loaders/Spinner.vue'
import ProcessingBar from '@/components/loaders/ProcessingBar.vue'
import NoFirm from '@/components/placeholders/NoFirm.vue'
import ConfirmModal from '@/components/modals/ConfirmModal.vue'
import {detach, move, moveRow, children, row} from '../plugins/insert_row'
import levels from '../plugins/levels'
import moment from 'moment'
export default {
  name: 'FirmView',
  props: ['admin'],
  components: {
    Alert,
    Spinner,
    ProcessingBar,
    NoFirm,
    ConfirmModal
  },
  data() {
    return {
      engagementId: null,
      currentYear: 'All',
      allYears: 'All',
      selectedWorkflowID: 1,
      alert: '',
      searchEngagement: '',
      showEditRow: false,
      editRowIndex: null,
      rowPrevouslyInserted: true,
      checkedEngagements: {
        engagements: [],
        status: null,
        assigned_to: null,
        due_date: null,
        priority: null
      },
      noEngagements: false,
      listLoaded: false,
      engagementFilterKey: 'Received',
      option: 'Choose...',
      firstSort: 'priority',
      secondSort: 'estimated_date',
      thirdSort: 'created_at',
      currentSort: null,
      currentSortDir: 'asc',
      showList: false,
      dueDate: null,
      nothingSelected: false,
      priority_levels: levels.priority_levels
    }
  },
  computed: {
    ...mapGetters(['allEngagements', 'users', 'allWorkflows', 'successAlert', 'processing', 'confirmDownload', 'timesheet']),
    filteredUsers() {
      return this.users.filter(u => u.name != 'Admin')
    },
    filteredWorkflow() {
      return this.allWorkflows.filter(w => w.id == this.selectedWorkflowID)
    },
    filteredStatuses() {
      return this.filteredWorkflow[0].statuses
    },
    filteredEngagements () {
      const distantFuture = new Date(8640000000000000)
      return this.allEngagements.sort((a,b) => {
        if(this.currentSort) {
          let modifier = 1;
          if(this.currentSortDir === 'desc') modifier = -1;
          if(a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
          if(a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
          return 0;
        } else {
          let dateA = a[this.secondSort] ? new Date(a[this.secondSort]) : distantFuture
          let dateB = b[this.secondSort] ? new Date(b[this.secondSort]) : distantFuture
          // the first and second sort options is if I want a more complex sort
          // return b[this.firstSort] - a[this.firstSort] ||
          // dateA.getTime() - dateB.getTime() ||
          return new Date(a[this.thirdSort]) - new Date(b[this.thirdSort])
        }
      })
      .filter(eng => eng.workflow_id === this.selectedWorkflowID)
      .filter(eng => eng.status === this.engagementFilterKey || eng.id == this.engagementId)
      .filter(eng => this.currentYear === 'All' ? eng : eng.year === this.currentYear)
      .filter(eng => {return !this.searchEngagement || eng.name.toLowerCase().indexOf(this.searchEngagement.toLowerCase()) >= 0 });
    },
    countEngagementsByStatus () {
       const res = this.allWorkflows.filter(w =>w.id == this.selectedWorkflowID).map(({statuses, id}) => ({
        workflow_id: id,
        statuses: statuses.reduce((acc, cur) => {

        const count = this.allEngagements.filter(({workflow_id, status}) => workflow_id === id && status === cur.status).filter(eng => this.currentYear === 'All' ? eng : eng.year === this.currentYear).length;

        acc.push({status: cur.status, count});

        return acc;
    
        }, [])
      }))
      return res
    },
    filterYears() {
        //map year
        const years = this.allEngagements.map(engagement => engagement.year)
        //filter duplicates
        const result = years.filter((v, i) => years.indexOf(v) === i)

        return result.sort((a, b) => b - a)
    },
    selectedEngagement() {
      return this.allEngagements.filter(eng => eng.id === this.engagementId)[0]
    }
  },
  methods: {
    ...mapActions(['updateCheckedEngagements']),
    updateChecked() {
      if(this.checkedEngagements.due_date || this.checkedEngagements.status != this.option || this.checkedEngagements.assigned_to != this.option || this.checkedEngagements.priority != this.option) {
        this.nothingSelected = false
        this.updateCheckedEngagements({
          engagements: this.checkedEngagements.engagements,
          assigned_to: this.checkedEngagements.assigned_to != this.option ? this.checkedEngagements.assigned_to : 0,
          status: this.checkedEngagements.status != this.option ? this.checkedEngagements.status : null,
          due_date: this.checkedEngagements.due_date ? this.checkedEngagements.due_date : null,
          priority: this.checkedEngagements.priority != this.option ? this.checkedEngagements.priority : null
        }).then(() => {
          this.checkedEngagements.engagements = [];
          this.checkedEngagements.assigned_to = this.option;
          this.checkedEngagements.status = this.option;
          this.checkedEngagements.priority = this.option;
          this.checkedEngagements.due_date = null
        }) 
      } else {
        this.nothingSelected = true
        return
      }
    },
    changeEngagementKey (key) {
      if(this.engagementId) {
        this.selectedEngagement.status = this.engagementFilterKey
        this.showEditRow = false
        this.engagementId = null
      }
      this.engagementFilterKey = key
      this.showList = false
      this.nothingSelected = false
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
      this.$router.push('/engagement/' + id +'/details')
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
    confirmEngagementsDownload() {
      this.$store.commit('confirmDownloadState')
    },
    downloadEngagementsList() {
      this.$store.dispatch('downloadEngagements', this.filteredEngagements.filter(eng => eng.workflow_id === this.selectedWorkflowID).reduce((acc, eng) => {
        acc.push(eng.id)
        return acc
      }, []))
    },
    switchStatus(event) {
      const statuses = this.countEngagementsByStatus.filter(workflow => workflow.workflow_id === this.selectedWorkflowID)[0].statuses.reduce((acc, status) => {
        acc.push(status.status)
        return acc
      }, [])
      var index = statuses.indexOf(this.engagementFilterKey)
      if(event.keyCode == 38 && index > 0) {
        this.engagementFilterKey = statuses[index--]
      } else if(event.keyCode == 40 && index < statuses.length) {
        this.engagementFilterKey = statuses[index++]
      }
    },
    cancelDownload() {
      this.$store.commit('confirmDownloadState')
    },
    editEngagementRow(index, id) {
      this.engagementId ? this.selectedEngagement.status = this.engagementFilterKey : null
      this.showEditRow = true
      this.engagementId = id
      const toIndex = this.$refs['engagement-row' + index][0].rowIndex
      const fromIndex = document.getElementsByClassName('edit-engagement-row')[0].rowIndex
      this.editRowIndex = fromIndex
      const table = this.$refs['engagement-table']
      this.dueDate = this.selectedEngagement.estimated_date ? new Date(this.selectedEngagement.estimated_date) : null
      moveRow(table, fromIndex, toIndex, false);
    },
    hideEditRow() {
      this.selectedEngagement.status = this.engagementFilterKey
      this.showEditRow = false
      this.engagementId = null
    },
    saveEditChanges() {
       this.updateCheckedEngagements({
          engagements: [this.engagementId],
          assigned_to: this.users.filter(user => user.name == this.selectedEngagement.assigned_to)[0].id,
          status: this.selectedEngagement.status,
          due_date: this.dueDate,
          priority: this.selectedEngagement.priority
      }).then(() => {
          this.showEditRow = false
          this.engagementId = null
      }) 
    },
    priorityDesc(priority) {
      if(priority > 0) {
        return levels.priority_levels.filter(lev => lev.level === priority)[0].value
      } else {
        return 'None'
      }
    },
    scrollToTop() {
      window.scrollTo({
        top: 100,
        left: 0,
        behavior: 'smooth'
      })
    }
  },
  destroy() {
    document.removeEventListener("keyup", this.switchStatus)
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
    this.checkedEngagements.priority = this.option
    this.currentYear = this.allYears
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
  
  .firm-wrapper {
    height: 100%;
    min-height: calc(100vh - 190px);
  }

  .update-engagements-form {
    position: fixed;
    bottom: 0;
    right: 0;
    background: white;
    padding-right: 20px;
    padding-top: 12px;
    box-shadow: 5px -5px 15px 0 rgba(0,0,0,.25px);
  }

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
    z-index: 0;
  }

  .export-btn {
    position: absolute;
    right: 10px;
    top: 8px;
  }

  .clear-sort-btn {
    position: absolute;
    right: 100px;
    top: 8px;
    font-weight: bold;
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

  .table {

    tbody {
      tr {
        th {
          vertical-align: middle;
        }
        td {
          vertical-align: middle;
        }
      }
      .edit-engagement-row {
        background: rgb(241, 241, 241);
        width: 100%;
        box-sizing: border-box;

        .edit-engagement-row-body {
          width: 100%;
          box-sizing: border-box;
          
          .edit-engagement-row-body-content {
            display: flex;
            justify-content: space-between;
            width: 100%;

            .edit-row-btns {
              align-self: center;
              display: flex;
              margin-left: 10px;

              .edit-row-btn {
                text-decoration: none;
                margin: 0 8px;
                background: white;
                color: black;
                font-weight: bold;
                box-shadow: 0 0 5px 0 rgba(0,0,0,.250);
                cursor: pointer;
              }
            }
          }
        }
      }
    }
  }

  .date-picker-group {
    flex-wrap: nowrap!important;
  }

  .table-responsive {
    overflow: visible;
    margin-bottom: 50px;
  }

  .sort-btn {
    &:hover {
      background: lightgray;
    }
  }

  .sorted-row {
    background: rgb(238, 238, 238);
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
