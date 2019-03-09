<template>
  <div class="mt-3">
    <div class="d-flex justify-content-between">
      <div class="h3">
        <span class="m-0">Workflows | </span>
        <span class="m-0 text-primary">{{ allWorkflows.length }}</span>
      </div>
        <b-btn class="font-weight-bold" variant="primary" size="sm" @click="showModal">Create New Workflow</b-btn>
    </div>
    <hr>

    <!-- this is the alert options -->
    <Alert v-if="alert" v-bind:message="alert" />
    <Alert v-if="errorAlert && $route.name === 'workflows'" v-bind:message="errorAlert" />
    <Alert v-if="successAlert && $route.name === 'workflows'" v-bind:message="successAlert" />

    <div class="d-flex flex-wrap justify-content-around" v-if="$route.name == 'workflows'">
      <div class="workflow-card border p-0 mb-3" v-for="workflow in allWorkflows" :key="workflow.id">
         <div class="card-header d-flex justify-content-between">
           <span class="align-self-center">{{ workflow.workflow }}</span>
           <div>
             <button type="button" class="btn btn-secondary btn-sm mr-3" @click="requestDelete(workflow.id)">Delete</button>
            <router-link class="btn btn-sm btn-outline-primary" :to="{ path: '/administrator/workflows/edit-workflow/' + workflow.id }">Edit</router-link>
           </div>
          </div>
        <ul class="status-body">
        <draggable v-model="workflow.statuses" @start="drag=true" @end="drag=false" @change="updateStatusOrder(workflow.id, workflow.statuses)">
         <li class="pb-3 status-list d-flex" v-for="(status, index) in workflow.statuses" :key="index">
           <span class="mr-3 draggable-order">
            {{ index + 1 }}
           </span>
           <a class="text-muted">{{ status.status }}</a>
         </li>
        </draggable>
        </ul>
        <div class="mb-5" v-if="workflow.statuses == 0">
          <router-link class="btn btn-sm btn-primary" :to="{ path: '/administrator/workflows/edit-workflow/' + workflow.id }">Add Statuses</router-link>
        </div>
      </div>
    </div>

    <b-modal v-model="modalShow" id="myWorkflow" ref="myWorkflow" hide-footer title="New Workflow Form">
      <div class="text-left"  v-if="workflowSelect">
        <button type="button" class="btn btn-outline-secondary" @click="cancelCopy">Back</button>
      </div>
      <form>
        <div class="d-block text-left d-flex flex-column align-items-center">
          <br>
          <input class="form-control" type="text" placeholder="Enter Worklow Name" v-model="newWorkflow.name" v-if="newWorkflowInput">
          <span class="font-weight-bold my-3" v-if="newWorkflowInput">Or</span>
          <button type="button" class="btn btn-block font-weight-bold text-primary border-primary" @click="copyExisting">Copy Existing</button>
        </div>
         <div class="input-group my-3" v-if="workflowSelect">
          <div class="input-group-prepend">
            <label class="input-group-text text-primary" for="option">Workflow To Copy</label>
          </div>
          <select class="form-control" v-model="existingWorkflow">
            <option disabled>{{ option }}</option>
            <option v-for="workflow in allWorkflows" :key="workflow.id" :value="workflow.id">
              {{workflow.workflow}}
            </option>
          </select>
        </div>
           <input class="form-control" type="text" placeholder="New Worklow Name" v-model="newWorkflow.name" v-if="workflowSelect"> 
        <div class="d-flex">
          <b-btn class="mt-3" variant="secondary" @click="closeModal">Cancel</b-btn>
          <b-btn class="mt-3 ml-auto" variant="outline-primary" @click="addThisWorkflow">Create</b-btn>
        </div>
      </form>
    </b-modal>

    <b-modal v-model="modalDelete" id="deleteWorkflow" ref="deleteWorkflow" hide-footer title="Delete Workflow">
      <form>
        <div class="d-block text-left">
          Are you sure you want to delete, workflow?
        </div>
        <div class="d-flex">
          <b-btn class="mt-3" variant="secondary" @click="modalDelete = false">Cancel</b-btn>
          <b-btn class="mt-3 ml-auto" variant="outline-primary" @click="deleteThisWorkflow">Confirm</b-btn>
        </div>
      </form>
    </b-modal>  

      <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import draggable from 'vuedraggable'
import Alert from '@/components/Alert.vue'
import bModal from 'bootstrap-vue/es/components/modal/modal'
import bModalDirective from 'bootstrap-vue/es/directives/modal/modal'

export default {
  name: 'workflows',
  data() {
    return {
      modalShow: false,
      modalDelete: false,
      workflowToDelete: null,
      newWorkflowInput: true,
      workflowSelect: false,
      existingWorkflow: null,
      alert: '',
      newWorkflow: {
        name: '',
      },
      option: 'Choose...'
    }
  },
  components:{
    'b-modal': bModal,
    draggable,
    Alert
  },
  directives: {
    'b-modal': bModalDirective
  },
  computed: {
    ...mapGetters(['allWorkflows', 'errorAlert', 'successAlert']),
  },
  methods: {
    ...mapActions(['addWorkflow', 'workflowStatusOrder', 'deleteWorkflow']),
    addThisWorkflow() {
      if(!this.newWorkflow.name) return;
      if(this.newWorkflowInput === true) {
        this.addWorkflow({
          id: this.idForWorkflow,
          name: this.newWorkflow.name,
          copy_workflow: false
        }).then(() => {
          this.newWorkflow.name = '' 
          this.idForWorkflow++
          this.modalShow = false
        })
      } else if(this.newWorkflowInput === false) {
        this.addWorkflow({
          id: this.idForWorkflow,
          name: this.newWorkflow.name,
          workflow_id: this.existingWorkflow,
          copy_workflow: true
        }).then(() => {
          this.newWorkflow.name = ''
          this.newWorkflowInput = true
          this.workflowSelect = false
          this.idForWorkflow++
          this.modalShow = false
        })
      }
    },
    updateStatusOrder(id, statuses) {
      statuses.map((status, index) => {
        status.order = index + 1;
      })

      this.workflowStatusOrder({
        id: id,
        statuses: statuses
      }).then(() => {
        this.alert = 'Update Succesful'
      })
    },
    deleteThisWorkflow() {
      this.deleteWorkflow({
        id: this.workflowToDelete
      }).then(() => {
        this.modalDelete = false;
      })
    },
    requestDelete(id) {
      this.workflowToDelete = id
      this.modalDelete = true
    },
    copyExisting() {
      this.newWorkflowInput = false
      this.workflowSelect = true
    },
    showModal() {
      this.modalShow = true
      this.newWorkflowInput = true
      this.workflowSelect = false
      this.newWorkflow.name = ''
    },
    closeModal() {
      this.modalShow = false
      this.newWorkflowInput = true
      this.workflowSelect = false
      this.newWorkflow.name = ''
    },
    cancelCopy() {
      this.newWorkflowInput = true
      this.workflowSelect = false
      this.newWorkflow.name = ''
    }
  },
  created: function() {
    this.$store.dispatch('retrieveWorkflows');
    this.existingWorkflow = this.option
  },
}
</script>

<style lang="scss" scoped>
.workflow-card {
 width: 400px;
}

li {
  border-left: 4px solid #576663;
  cursor: move;

  
}

.status-body {
  margin: 30px;
  display: flex;
  justify-content: center;
}

.status-list {
  padding: 0;
  margin: 0;
  list-style: none;
  font-weight: 600;

  a {
      &:hover {
      color: black !important;
    }
  }
  
}

.draggable-order {
  position: relative;
  background: #0077ff;
  border-radius: 50%;
  width: 1.5em;
  color: white;
  right: 14px;
 
}

.status-body li:last-child {
  border-left: 4px solid transparent;
}


</style>