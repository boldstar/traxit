<template>
  <div class="page-wrapper mt-1">
<!-- this is the user tasks header -->
      <div class="card-header bg-white shadow w-100 d-flex justify-content-between border">
          <div class="d-flex">
          <span class="mb-0 align-self-center h5">Tasks | <span class="text-primary">{{ sortedTasks.length }}</span></span>

          <div class="d-flex ml-5">
            <span class="font-weight-bold mt-1 mr-2">Priority Level: </span>
            <span class="font-weight-bold mt-1 text-secondary">High</span>
            <div class="square high-priority"></div>
            <span class="font-weight-bold mt-1 text-secondary">Medium</span>
            <div class="square medium-priority"></div>
            <span class="font-weight-bold mt-1 text-secondary">Low</span>
            <div class="square low-priority"></div>
            <span class="font-weight-bold mt-1 text-secondary">None</span>
            <div class="square"></div>
          </div>

          </div>
          <div class="align-self-center d-flex">
            <button class="btn btn-sm btn-outline-dark mr-2 font-weight-bold batch-btn" @click="showBatchColumn" v-if="!noTasks"><i class="fas fa-tasks mr-2"></i>Batch</button>
            <button class="btn btn-sm btn-outline-primary font-weight-bold" @click="refreshTask"><i class="fas fa-sync-alt mr-2"></i>Refresh</button>
          </div>
      </div>

      <div v-if="batchAlert" class="p-2 bg-danger font-weight-bold text-light">{{ batchAlert }}</div>

<!-- this is the list of the assigned user tasks -->
    <div class="text-left card-body mb-3 tasks d-flex flex-column p-0">
    <processing-bar v-if="processing && !timesheet"></processing-bar>
    <div class="d-flex">
      <button type="button" class="filter-task-btn" @click="filterStatusState = 'All'" :class="{'bg-primary text-white': filterStatusState == 'All'}">All</button>
      <button type="button" class="filter-task-btn" @click="filterStatusState = 'Staging'" :class="{'bg-primary text-white': filterStatusState == 'Staging'}">Staging</button>
      <button type="button" class="filter-task-btn" @click="filterStatusState = 'Active'" :class="{'bg-primary text-white': filterStatusState == 'Active'}">Active</button>
      <button type="button" class="filter-task-btn" @click="filterStatusState = 'Pending'" :class="{'bg-primary text-white': filterStatusState == 'Pending'}">Pending</button>
      <input class="task-search-input flex-fill" placeholder="Filter Task By Name..." v-model="searchTasks" type="search">
    </div>
    <spinner v-if="tasksLoading" class="mx-auto"></spinner>

      <div class="card my-3" v-if="inProgressTasks.length > 0 && !tasksLoading && taskData">
        <div class="card-header">
          <span class="font-weight-bold">In Progress | <span class="text-primary">{{ inProgressTasks.length }}</span></span>
        </div>
        <table class="table text-center table-hover mb-0" >
          <tbody class="table-bordered">
            <tr v-for="(task, index) in inProgressTasks"  :key="index">
              <th  @click="viewDetails(task.engagements[0].id)">{{ task.engagements[0].name }}</th>
              <th  @click="viewDetails(task.engagements[0].id)">{{ task.engagements[0].status }}</th>
              <th>
                <button class="btn btn-sm btn-light border-primary text-secondary mr-2 font-weight-bold" @click="inProgress(task.engagements[0].id)">
                  <span v-if="task.engagements[0].in_progress">Check In</span>
                  <span v-else>Check Out</span>
                </button>
                <b-btn :disabled="batchUpdate" variant="primary" class="mr-2" size="sm" @click="requestUpdate(task.id, task.engagements[0].workflow_id)" data-toggle="tooltip" data-placement="top" title="Update Engagement Task"><i class="fas fa-pen-square mr-2"></i><span class="update-text">Update</span></b-btn>
                <router-link class="btn btn-sm btn-secondary mr-2" :to="'/engagement/' +task.engagements[0].id+ '/details' " data-toggle="tooltip" data-placement="top" title="View Engagement"><i class="far fa-eye"></i> View</router-link>
              </th>
            </tr>
          </tbody>
        </table>
      </div>

      <table class="table table-hover text-center"  v-if="!tasksLoading && taskData">
        <thead class="bg-primary text-light">
          <tr>
            <th scope="col" v-if="batchUpdateColumn">Batch</th>
            <th scope="col" v-if="batchUpdateColumn" @click="sort('workflow')">Workflow</th>
            <th scope="col">Task</th>
            <th scope="col" class="mobile-hide-row">Type</th>
            <th scope="col" @click="sort('name')">Name</th>
            <th scope="col" class="hide-row">Time Period</th>
            <th scope="col" class="hide-row">Return Type</th>
            <th scope="col" class="hide-row">Year</th>
            <th scope="col" class="hide-row">Due Date</th>
            <th scope="col">Action</th>
            <th scope="col" class="hide-row">Engagement</th>
          </tr>
        </thead>
        <tbody class="table-bordered">
          <tr v-for="(task, index) in sortedTasks"  :key="index" :class="{'highlight-row': checkedTasks.includes(task.id), 'high-priority': task.priority >= 4, 'medium-priority': task.priority <= 3 && task.priority >= 2, 'low-priority': task.priority === 1, 'no-priority': task.priority < 1}">
            <th v-if="batchUpdateColumn" class="task-border" data-toggle="tooltip" data-placement="left" title="Click To Batch Update" @click="checkTask(task.id, task.workflow_id)" :class="{'checkedtasks': checkedTasks.includes(task.id)}"><i v-if="checkedTasks.includes(task.id)" class="fas fa-check"></i></th>
            <th v-if="batchUpdateColumn"  @click="viewDetails(task.engagement_id)">{{ workflowName(task.workflow_id) }}</th>
            <th  @click="viewDetails(task.engagement_id)">{{ task.task }}</th>
            <th  @click="viewDetails(task.engagement_id)" class="text-capitalize mobile-hide-row" v-if="task.type == 'taxreturn'">{{fixCasing(task.type)}}</th>
            <th  @click="viewDetails(task.engagement_id)" class="text-capitalize mobile-hide-row" v-else>{{task.type}}</th>
            <td  @click="viewDetails(task.engagement_id)">{{ task.name }}</td>
            <td  @click="viewDetails(task.engagement_id)" v-if="task.title != null" class="hide-row">{{ task.title }}</td>
            <td  @click="viewDetails(task.engagement_id)" v-else class="hide-row">None</td>
            <td  @click="viewDetails(task.engagement_id)" v-if="task.type == 'taxreturn'" class="hide-row">{{ task.return_type }}</td>
            <td  @click="viewDetails(task.engagement_id)" v-else class="hide-row">None</td>
            <td  @click="viewDetails(task.engagement_id)" class="hide-row">{{ task.year }}</td>
            <td  @click="viewDetails(task.engagement_id)" class="hide-row font-weight-bold" v-if="task.due_date">{{ task.due_date | formatDate }}</td>
            <td  @click="viewDetails(task.engagement_id)" class="hide-row" v-else>None</td>
            <td class="px-0">
                <button class="btn btn-sm btn-light border-primary text-secondary mr-2 font-weight-bold" @click="inProgress(task.engagement_id)">
                  <span v-if="task.in_progress">Check In</span>
                  <span v-else>Check Out</span>
                </button>
                <b-btn :disabled="batchUpdate" variant="primary" class="mr-2" size="sm" @click="requestUpdate(task.id, task.workflow_id)" data-toggle="tooltip" data-placement="top" title="Update Engagement Task"><i class="fas fa-pen-square mr-2"></i><span class="update-text">Update</span></b-btn>
            </td>
            <td class="px-0 hide-row">
                <router-link class="btn btn-sm btn-secondary mr-2" :to="'/engagement/' +task.engagement_id+ '/details' " data-toggle="tooltip" data-placement="top" title="View Engagement"><i class="far fa-eye"></i></router-link>
                <router-link class="btn btn-sm btn-primary" :to="'/engagement/' +task.engagement_id + '/add-question' " data-toggle="tooltip" data-placement="top" title="Add Question"><i class="far fa-question-circle"></i></router-link>
            </td>
          </tr>
        </tbody>
      </table>

      <NoTask v-if="noTasks" />

      <div class="d-flex mb-4" v-if="batchUpdate">
        <button v-if="batchUpdate" class="btn btn-primary font-weight-bold mr-3" @click="requestBatchUpdate">Batch Update</button>
        <button v-if="batchUpdate" class="btn btn-secondary font-weight-bold" @click="clearBatch">Cancel Batch Update</button>
      </div>
    </div>
    <!-- this is the modal for updating task -->
      <b-modal ref="modal" hide-footer title="Update Engagement">
          <div class="d-flex justify-content-around">
            <div>
              <button type="button" class="btn btn-primary font-weight-bold" @click="showDropdowns">Update Status</button>
            </div>
            <span class="align-self-center font-weight-bold h5 mb-0">Or</span>
            <div>
              <button type="button" class="btn btn-primary font-weight-bold" @click="showComplete">Complete Engagement</button>
            </div>
          </div>
          <form v-if="dropDowns">
          <div class="card bg-light p-3 mt-3">
            <div class="input-group my-3">
            <div class="input-group-prepend">
              <label class="input-group-text font-weight-bold bg-primary text-light" for="option">Assign To</label>
            </div>
            <select class="custom-select" id="client_id" v-model.number="task.user_id">
              <option  selected disabled>{{ option }}</option>
              <option v-for="user in filteredUsers" :key="user.id" :value="user.id">
                {{ user.name }}
              </option>
            </select>
          </div>
          <div class="input-group my-3">
            <div class="input-group-prepend">
              <label class="input-group-text font-weight-bold bg-primary text-light" for="option">Status</label>
            </div>
            <div v-for="workflow in filteredWorkflow" :key="workflow.id" class="flex-fill d-flex">
            <select class="custom-select" id="status" v-model="task.status">
              <option  selected disabled>{{ option }}</option>
              <option v-for="status in workflow.statuses" :key="status.id" :value="status.status">
                {{ status.status }}
              </option>
            </select>
            </div>               
          </div>
          </div>
          <div class="d-flex">
            <b-btn class="mt-3" variant="secondary" @click="hideModal">Cancel</b-btn>
            <b-btn class="mt-3 ml-auto" variant="outline-primary" @click="acceptUpdate">Confirm</b-btn>
          </div>
          </form>

          <form v-if="completed">
            <div v-if="completed" class="bg-light card px-4 mt-3">
              <span class="font-weight-bold my-3 form-control">Are you sure you want to complete the engagement?</span>
            </div>
            <div class="d-flex">
              <b-btn class="mt-3" variant="secondary" @click="hideModal">Cancel</b-btn>
              <b-btn class="mt-3 ml-auto" variant="outline-primary" @click="acceptUpdate">Confirm</b-btn>
          </div>
          </form>
      </b-modal>

      <b-modal v-model="batchModal" ref="batchModal" hide-footer title="Batch Update">
          <form class="d-flex flex-column" @change="clearAlerts()">
            <div class="mt-3 text-left">
              <h4>Tasks</h4>
              <div class="card-body bg-light p-1" v-for="(task, index) in filteredTasks" :key="index">
                <span class="mr-3">{{ index }}.</span>
                <span class="font-weight-bold">{{ task.engagements[0].name }}</span>
              </div>
            </div>
            <div class="flex-fill text-left">
            <h4 class="mt-3 mb-2">Update To</h4>
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <label class="input-group-text font-weight-bold bg-primary text-light" for="option">Assign To</label>
                </div>
                <select class="custom-select" id="client_id" v-model.number="task.user_id" :class="{ 'border-danger' : userError}">
                  <option  selected disabled>{{ option }}</option>
                  <option v-for="user in filteredUsers" :key="user.id" :value="user.id">
                    {{ user.name }}
                  </option>
                </select>
              </div>
              <div class="input-group my-3">
                <div class="input-group-prepend">
                  <label class="input-group-text font-weight-bold bg-primary text-light" for="option">Status</label>
                </div>
                <div v-for="workflow in filteredWorkflow" :key="workflow.id" class="flex-fill d-flex">
                <select class="custom-select" id="status" v-model="task.status" :class="{ 'border-danger' : statusError}">
                  <option  selected disabled>{{ option }}</option>
                  <option v-for="status in workflow.statuses" :key="status.id" :value="status.status" v-show="status.status != 'Complete'">
                    {{ status.status }}
                  </option>
                </select>
                </div>               
              </div>
            </div>
            <div class="d-flex">
                <b-btn  variant="secondary" @click="batchModal = false">Cancel</b-btn>
                <b-btn class="ml-auto" variant="outline-primary" @click="acceptBatchUpdate">Confirm</b-btn>
            </div>
          </form>
      </b-modal>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import bModal from 'bootstrap-vue/es/components/modal/modal'
import bModalDirective from 'bootstrap-vue/es/directives/modal/modal'
import Spinner from '@/components/loaders/Spinner.vue'
import ProcessingBar from '@/components/loaders/ProcessingBar.vue'
import NoTask from '@/components/placeholders/NoTask.vue'

export default {
  name: 'TaskList',
  props: ['tasks', 'workflows'],
  data() {
    return {
      noTasks: false,
      tasksLoading: false,
      taskToUpdate: null,
      selectedWorkflow: null,
      dropDowns: false,
      completed: false,
      taskData: false,
      searchInput:  false,
      batchUpdateColumn: false,
      batchUpdate: false,
      batchModal: false,
      userError: false,
      statusError: false,
      filterTask: 'All',
      filterStatusState: 'All',
      task: {
        user_id: 0,
        status: null,
        done: null,
      },
      checkedTasks: [],
      option: 'Choose...',
      searchTasks: '',
      firstSort: 'priority',
      secondSort: 'due_date',
      currentSortDir: 'asc',
      batchAlert: ''
    }
  },
   components:{
    'b-modal': bModal,
    Spinner,
    ProcessingBar,
    NoTask
  },
  directives: {
    'b-modal': bModalDirective
  },
  computed: {
    ...mapGetters([
      'users',
      'successAlert',
      'processing',
      'timesheet'
    ]),
    filteredUsers() {
      return this.users.filter(u => u.name != 'Admin')
    },
    filteredWorkflow() {
      return this.workflows.filter(w => w.id == this.selectedWorkflow)
    },
    filteredTasks() {
      return this.tasks.filter(t => this.checkedTasks.includes(t.id))
    },
    sortedTasks() {
      return this.tasks.reduce((acc, task) => {
        const workflow_id = task.engagements[0].workflow_id
        const task_status = task.engagements[0].status
        acc.push({
          id: task.id,
          workflow_id: workflow_id,
          engagement_id: task.engagements[0].id,
          task: task_status,
          due_date: task.engagements[0].estimated_date,
          updated_at: task.engagements[0].updated_at,
          name: task.engagements[0].name,
          type: task.engagements[0].type,
          return_type: task.engagements[0].return_type,
          title: task.engagements[0].title,
          in_progress: task.engagements[0].in_progress,
          year: task.engagements[0].year,
          priority: task.engagements[0].priority,
          state: task.state
        })
        return acc
      }, []).sort((a,b) => {
        return b[this.firstSort] - a[this.firstSort] || new Date(b[this.secondSort]) - new Date(a[this.secondSort])
      }).filter(task => {
        if(this.filterTask === 'All'){ return task } else{ return task.task == this.filterTask} 
      }).filter(task => {
        if(this.filterStatusState === 'All'){ return task } else { return task.state == this.filterStatusState} 
      }).filter( task => {
      return !this.searchTasks || task.name.toLowerCase().indexOf(this.searchTasks.toLowerCase()) >= 0 })
    },
    inProgressTasks() {
      return this.tasks.filter(task => task.engagements[0].in_progress == true)
    }
  },
  methods: {
    ...mapActions(['updateTask', 'batchUpdateTasks']),
    showBatchColumn() {
      this.batchUpdateColumn = !this.batchUpdateColumn
      this.batchAlert = ''
      this.batchModal = false
      this.batchUpdate = false
      this.formError = false
      this.checkedTasks = []
    },
    requestBatchUpdate() {
        this.$store.dispatch('retrieveUsers');
        this.$store.dispatch('retrieveWorkflows');
        this.task.user_id = this.option
        this.task.status = this.option
        this.batchModal = true
    },
    acceptBatchUpdate() {
          if(this.task.user_id === this.option) {
            this.userError = true
            return;  
          } 
          if(this.task.status === this.option) {
            this.statusError = true
            return;
          }
          this.batchUpdateTasks({
            tasksToUpdate: this.checkedTasks,
            user_id: this.task.user_id,
            status: this.task.status
          }).then(() => {
          this.batchAlert = ''
          this.batchUpdate  = false
          this.batchModal = false
          this.formError = false
          this.checkedTasks = []
        }) 
    },
    checkTask(id, workflow) {
      if(this.selectedWorkflow === null) {
        this.selectedWorkflow = workflow
      } else if(workflow != this.selectedWorkflow) {
        this.batchAlert = 'The tasks must be of the same "Workflow" to batch update'
        self = this
        setTimeout(() => {
          self.batchAlert = ''
        }, 6000)
        return;
      } 

      
      if(this.selectedWorkflow === workflow) {
        this.batchAlert = ''
        if(this.checkedTasks.includes(id)) {
          const index = this.checkedTasks.findIndex(checked => checked === id)
          this.checkedTasks.splice(index, 1);
        } else {
          this.checkedTasks.push(id)
        }
      }

      if(this.checkedTasks.length <= 0) {
        this.batchAlert = ''
        this.batchUpdate = false
        this.selectedWorkflow = null
      } else {
        this.batchUpdate = true
      }
    },
    clearBatch() {
      this.batchAlert = ''
      this.batchUpdate  = false
      this.batchModal = false
      this.formError = false
      this.checkedTasks = []
    },
    sort:function(s) {
      //if s == current sort, reverse
      if(s === this.currentSort) {
          this.currentSortDir = this.currentSortDir==='asc'?'desc':'asc';
      }
      this.currentSort = s;
      },
    showModal() {
        this.$refs.modal.show()
        this.dropDowns = false
        this.completed = false
        },
    hideModal() {
        this.$refs.modal.hide()
        this.selectedWorkflow = null
        this.dropDowns = false
        this.completed = false
    },
    acceptUpdate() {
      if(this.taskToUpdate && this.dropDowns === true) {
          if(!this.task.user_id) return;
          this.updateTask({
            id: this.taskToUpdate,
            user_id: this.task.user_id,
            status: this.task.status
          }).then(() => {
          this.alert = 'Tasks updated'
          this.$refs.modal.hide()
          this.dropDowns = false
          this.completed = false
        }) 
      }
      if(this.taskToUpdate && this.completed === true) {
          const t = this.tasks.filter(task => task.id == this.taskToUpdate)
          if(!this.task.user_id) return;
          this.updateTask({
            id: this.taskToUpdate,
            done: this.task.done,
            user_id: t[0].user_id,
            status: 'Complete'
          }).then(() => {
          this.alert = 'Tasks updated'
          this.$refs.modal.hide()
          this.dropDowns = false
          this.completed = false
          this.task.done = null
        }) 
        }
      },
    requestUpdate(id, workflow) {
      this.selectedWorkflow = workflow
        this.taskToUpdate = id
        this.$store.dispatch('retrieveUsers');
        this.$store.dispatch('retrieveWorkflows');
        this.task.user_id = this.option
        this.task.status = this.option
        this.$refs.modal.show()
    },
    refreshTask() {
      this.$router.replace('/tasks')
      this.filterTask = 'All'
      this.tasksLoading = true
      this.checkedTasks = []
      this.batchUpdate = false
      this.noTasks = false
      this.$store.dispatch('retrieveTasks');
      var self = this;
      setTimeout(() => {
        self.tasksLoading = false;
        if(self.tasks.length == 0){
              self.noTasks = true
        } else {
            self.noTasks = false
        }
      }, 3000);
    },
    viewDetails(id) {
      this.$router.push('/engagement/'+ id + '/details')
    },
    fixCasing(string) {
      if(string == 'taxreturn') {
        const newString = string.replace("taxreturn", "Tax Return")

        return newString
      }
    },
    showComplete() {
      this.dropDowns = false
      this.completed = true
      this.task.done = true
    },
    showDropdowns() {
      this.dropDowns = true
      this.completed = false
    },
    searchInputMethod() {
      this.searchInput = !this.searchInput
      this.searchTasks = ''
    },
    workflowName(id) {
      const table = this.workflows.filter(workflow => workflow.id == id)

      return table[0].workflow
    },
    clearAlerts() {
      this.userError = false
      this.statusError = false
    },
    inProgress(id) {
      this.$store.dispatch('engagementProgress', id)
    },
  },
  created() {
  this.tasksLoading = true;
  var self = this;
    setTimeout(() => {
        self.tasksLoading = false;
        if(self.tasks.length == 0){
              self.noTasks = true
        } else {
          self.taskData = true
          self.noTasks = false
          if(self.$route.query.data) {
            this.filterTask = this.$route.query.data.label
          }
        }
    }, 3000);
  }
}
</script>


<style scoped lang="scss">

  .filter-task-btn {
    border: none;
    font-weight: bold;
    color: #0077ff;
    width: 150px;
    cursor: pointer;
    outline: none;
  }

  .task-search-input {
    padding: 10px;
    border: 1px solid lightgray;
  }

  tr {
    cursor: pointer;
  }

  label {
    width: 6em;
  }

  .checkedtasks {
    background-color: #0077ff4d;
    transition: all 1s ease-in-out;
  }

  .task-border {
    border-color: #0077ff83;
  }

  .highlight-row {
    background-color: rgba(0, 0, 0, 0.150)!important;
  }

  .high-priority {
    background-color: rgba(255, 0, 0, 0.288);
  }

  .medium-priority {
    background-color: rgba(255, 196, 0, 0.288);
  }

  .low-priority {
    background-color: rgba(4, 0, 255, 0.15);
  }

  

  .tasks {
    height: 100%;
    min-height: calc(100vh - 190px);
    position: relative;
  }

  .square {
    height: 25px;
    width: 25px;
    border: .3px solid gray;
    align-self: center;
    margin: 0 5px;
  }

  @media screen and (max-width: 1300px) {
    .hide-row {
      display: none!important;
    }

    .batch-btn {
      display: none!important;
    }
  }

  @media screen and (max-width: 1000px) {
    .table {
      font-size: .8rem!important;
    }
    
    .btn-primary {
      padding: 1px 5px!important;
    }
  }

  @media screen and (max-width: 767px) {
    i {
      display: none!important;
    }

    .mobile-hide-row {
      display: none!important;
    }

    .tasks {
      box-shadow: none!important;
      padding: 20px 0!important;
    }
  }

  @media screen and (max-width: 400px) {
    .table {
      font-size: .75rem!important;
    }

    .btn-primary {
      font-size: .75rem;
    }

    th {
      padding: 5px!important;
    }
    td {
      padding: 5px!important;
    }

    i {
      display: block!important;
      margin: 5px auto!important;
    }

    .update-text {
      display: none;
    }

    .btn-outline-secondary {
      display: flex;
      font-size: .8rem!important;
    }

    .btn-outline-primary {
      display: flex;
      font-size: .8rem!important;
    }
  }
</style>