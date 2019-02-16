<template>
  <div class="page-wrapper mt-1">
<!-- this is the user tasks header -->
      <div class="card mb-3 shadow-sm">
        <div class="d-flex justify-content-between card-body">
          <div class="h2 align-self-center m-0">
            <i class="fas fa-tasks text-primary"></i> 
          </div>
          <p class="h2 align-self-center">Tasks <span>
             | {{ tasks.length }}
            </span>
          </p>
          <div class="align-self-center">
            <button class="btn btn-sm btn-secondary mr-2 font-weight-bold" @click="searchInputMethod"><i class="fas fa-search mr-2"></i>Filter</button>
            <button class="btn btn-sm btn-outline-primary font-weight-bold" @click="refreshTask"><i class="fas fa-sync-alt mr-2"></i>Refresh</button>
          </div>
        </div>
      </div>

<!-- this will appear if there are no tasks -->
      <div v-if="noTasks & !tasksLoaded">
         <table class="table table-hover mb-5">
            <thead class="bg-primary text-light">
              <tr>
                <th scope="col">Task</th>
                <th scope="col">Type</th>
                <th scope="col">Client</th>
                <th scope="col">Assigned On</th>
                <th scope="col">Time Period</th>
                <th scope="col">Return Type</th>
                <th scope="col">Year</th>
                <th scope="col">Action</th>
                <th scope="col">Engagement</th>
              </tr>
            </thead>
         </table>
         <span class="mt-5 font-weight-bold">
            You have no tasks...
         </span>
      </div>
<!-- this is the list of the assigned user tasks -->
    <div v-else>
     <input v-if="searchInput" class="form-control mb-3" placeholder="Filter Task By Client Name" v-model="searchTasks" type="search">
      <table class="table table-hover" v-if="!tasksLoaded && taskData">
        <thead class="bg-primary text-light">
          <tr>
            <th scope="col">Task</th>
            <th scope="col">Type</th>
            <th scope="col" @click="sort('name')">Client</th>
            <th scope="col">Assigned On</th>
            <th scope="col">Time Period</th>
            <th scope="col">Return Type</th>
            <th scope="col">Year</th>
            <th scope="col">Action</th>
            <th scope="col">Engagement</th>
          </tr>
        </thead>
        <tbody class="table-bordered">
          <tr v-for="(task, index) in sortedTasks"  :key="index">
            <th  @click="viewDetails(task.engagements[0].id)">{{ task.engagements[0].status }}</th>
            <th  @click="viewDetails(task.engagements[0].id)" class="text-capitalize" v-if="task.engagements[0].type == 'taxreturn'">{{fixCasing(task.engagements[0].type)}}</th>
            <th  @click="viewDetails(task.engagements[0].id)" class="text-capitalize" v-else>{{task.engagements[0].type}}</th>
            <td  @click="viewDetails(task.engagements[0].id)">{{ task.engagements[0].name }}</td>
            <td  @click="viewDetails(task.engagements[0].id)">{{ task.engagements[0].updated_at | formatDate }}</td>
            <td  @click="viewDetails(task.engagements[0].id)" v-if="task.engagements[0].title != null">{{ task.engagements[0].title }}</td>
            <td  @click="viewDetails(task.engagements[0].id)" v-else>None</td>
            <td  @click="viewDetails(task.engagements[0].id)" v-if="task.engagements[0].type == 'taxreturn'">{{ task.engagements[0].return_type }}</td>
            <td  @click="viewDetails(task.engagements[0].id)" v-else>None</td>
            <td  @click="viewDetails(task.engagements[0].id)">{{ task.engagements[0].year }}</td>
            <td class="px-0">
                <b-btn variant="primary" class="mr-2" size="sm" @click="requestUpdate(task.id, task.engagements[0].workflow_id)" data-toggle="tooltip" data-placement="top" title="Update Engagement Task"><i class="fas fa-pen-square mr-2"></i>Update</b-btn>
            </td>
            <td class="px-0">
                <router-link class="btn btn-sm btn-secondary mr-2" :to="'/engagement/' +task.engagements[0].id " data-toggle="tooltip" data-placement="top" title="View Engagement"><i class="far fa-eye"></i></router-link>
                <router-link class="btn btn-sm btn-primary" :to="'/engagement/' +task.engagements[0].id + '/add-question' " data-toggle="tooltip" data-placement="top" title="Add Question"><i class="far fa-question-circle"></i></router-link>
            </td>
          </tr>
        </tbody>
      </table>
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
                    <option v-for="user in users" :key="user.id" :value="user.id" v-if="user.name != 'Admin'">
                      {{ user.name }}
                    </option>
                  </select>
                </div>
                <div class="input-group my-3">
                  <div class="input-group-prepend">
                    <label class="input-group-text font-weight-bold bg-primary text-light" for="option">Status</label>
                  </div>
                  <div v-for="workflow in allWorkflows" :key="workflow.id" v-if="workflow.id == selectedWorkflow" class="flex-fill d-flex">
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

<!-- this is the loading ring for the engagements -->
    <div v-if="tasksLoaded" class="lds-dual-ring justify-content-center"></div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import bModal from 'bootstrap-vue/es/components/modal/modal'
import bModalDirective from 'bootstrap-vue/es/directives/modal/modal'
import Toaster from '@/components/Toaster.vue'

export default {
  name: 'UserTasks',
  data() {
    return {
      noTasks: false,
      tasksLoaded: false,
      taskToUpdate: null,
      selectedWorkflow: null,
      dropDowns: false,
      completed: false,
      taskData: false,
      searchInput:  false,
      task: {
        user_id: 0,
        status: null,
        done: null,
      },
      option: 'Choose...',
      searchTasks: '',
      currentSort: 'name',
      currentSortDir: 'asc',
    }
  },
   components:{
    'b-modal': bModal,
    Toaster
  },
  directives: {
    'b-modal': bModalDirective
  },
  computed: {
    ...mapGetters([
      'tasks',
      'users',
      'allWorkflows',
      'successAlert'
    ]),
    sortedTasks:function() {
        return this.tasks.sort((a,b) => {
        let modifier = 1;
        if(this.currentSortDir === 'desc') modifier = -1;
        if(a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
        if(a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
        return 0;
        }).filter( task => {
        return !this.searchTasks || task.engagements[0].name.toLowerCase().indexOf(this.searchTasks.toLowerCase()) >= 0 })
    },
  },
  methods: {
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
    ...mapActions(['updateTask']),

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
          if(!this.task.user_id) return;
          this.updateTask({
            id: this.taskToUpdate,
            done: this.task.done
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
      this.tasksLoaded = true
      this.$store.dispatch('retrieveTasks');
      var self = this;
      setTimeout(() => {
        self.tasksLoaded = false;
        if(self.tasks == 0){
              self.noTasks = true
        } else {
            self.noTasks = false
        }
      }, 3000);
    },
    viewDetails(id) {
      this.$router.push('/engagement/'+ id)
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
    }
  },
  created() {
  this.$store.dispatch('retrieveTasks');
  this.tasksLoaded = true;
  var self = this;
    setTimeout(() => {
        self.tasksLoaded = false;
        if(self.tasks.length == 0){
              self.noTasks = true
        } else {
          self.taskData = true
          self.noTasks = false
        }
    }, 3000);
  }
}
</script>


<style scoped lang="scss">

  tr {
    cursor: pointer;
  }

  label {
    width: 6em;
  }
</style>