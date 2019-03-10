<template>
  <div class="mt-3">
    <div class="d-flex justify-content-between">
      <div class="h3">
        <span class="m-0">Workflows | </span>
        <span class="m-0 text-primary">{{ allWorkflows.length }}</span>
      </div>
        <b-btn class="font-weight-bold" variant="primary" size="sm" @click="showModal">Create Workflow</b-btn>
    </div>
    <hr>

    <!-- this is the alert options -->
    <Alert v-if="alert" v-bind:message="alert" />
    <Alert v-if="errorAlert && $route.name === 'workflows'" v-bind:message="errorAlert" />
    <Alert v-if="successAlert && $route.name === 'workflows'" v-bind:message="successAlert" />

    <div class="d-flex flex-wrap justify-content-around" v-if="$route.name == 'workflows'">
      <div class="workflow-card d-flex flex-column align-self-start border p-0 mb-3 shadow" v-for="workflow in allWorkflows" :key="workflow.id">
         <div class="card-header d-flex justify-content-between">
           <span class="align-self-center font-weight-bold"><i class="fas fa-route mr-2 text-primary"></i>{{ workflow.workflow }}</span>
           <div>
            <router-link class="btn btn-sm btn-primary font-weight-bold" :to="{ path: '/administrator/workflows/edit-workflow/' + workflow.id }">Edit</router-link>
           </div>
          </div>
          <table class="table table-hover mb-0">
            <thead>
              <tr class="text-left">
                <th scope="col" class="font-weight-bold">Order</th>
                <th scope="col" class="font-weight-bold">Status</th>
                <th scope="col" class="font-weight-bold text-center"><i class="far fa-envelope text-primary"></i></th>
              </tr>
            </thead>
            <draggable class="text-left" :element="'tbody'" v-model="workflow.statuses" @start="drag=true" @end="drag=false" @change="updateStatusOrder(workflow.id, workflow.statuses)" >
            <tr v-for="(status, index) in workflow.statuses" :key="index">
              <th scope="row" class="status-th"><div class="status-order"></div> {{ index + 1 }}</th>
              <td>{{ status.status }}</td>
              <td class="text-center"><i class="fas fa-check text-primary" v-if="status.notify_client"></i></td>
            </tr>
            </draggable>
          </table>
          <div class="card-footer text-right">
            <button type="button" class="btn btn-secondary btn-sm font-weight-bold" @click="requestDelete(workflow.id)">Delete</button>
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
.table {
  width: 400px;
}

.workflow-card {
  border-radius: 10px;
}

tr {
  z-index: -3!important;
  cursor: move;
}

.status-th {
  padding-left: 30px;
  color: white;
}

.status-order {
  position: relative;
  right: 8px;

  &:before{
    content: " ";
    position: absolute;
    height: 25px;
    width: 25px;
    background-color: #0077ff;
    z-index: -1;
    border-radius: 50%;
    padding-right: 5px;
  }

  &:after {
    content: " ";
    position: absolute;
    left: 10px;
    z-index: -2;
    height: 50px;
    border-right: 5px solid black;
  }

}

table tr:last-child .status-order:after {
  border-color: transparent;
}

</style>