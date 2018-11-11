<template>
  <div class="mt-3">
    <div class="d-flex justify-content-between">
      <div class="h3">
        <span class="m-0">Workflows | </span>
        <span class="m-0 text-primary">{{ allWorkflows.length }}</span>
      </div>
        <b-btn variant="primary" size="sm" @click="modalShow = !modalShow">Create New Workflow</b-btn>
    </div>
    <hr>
    <Alert v-if="alert" v-bind:message="alert" />
    <div class="d-flex flex-wrap justify-content-around" v-if="$route.name == 'workflows'">
      <div class="workflow-card border p-0 mb-3" v-for="workflow in allWorkflows" :key="workflow.id">
         <div class="card-header d-flex justify-content-between">
           <span class="align-self-center">{{ workflow.workflow }}</span>
          <router-link class="btn btn-sm btn-outline-primary" :to="{ path: '/administrator/workflows/edit-workflow/' + workflow.id }">Edit</router-link>
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

    <b-modal v-model="modalShow" id="myQuestion" ref="myQuestion" hide-footer title="New Workflow Form">
      <form>
        <div class="d-block text-left">
          <br>
            <input class="form-control" type="text" placeholder="Enter Worklow Name" v-model="newWorkflow.name">
          <br>
        </div>
        <div class="d-flex">
          <b-btn class="mt-3" variant="secondary" @click="modalShow = false">Cancel</b-btn>
          <b-btn class="mt-3 ml-auto" variant="outline-primary" @click="addThisWorkflow">Create</b-btn>
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
      alert: '',
      newWorkflow: {
        name: '',
      },
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
    ...mapGetters(['allWorkflows']),
  },
  methods: {
    ...mapActions(['addWorkflow', 'workflowStatusOrder']),
    addThisWorkflow() {
      if(!this.newWorkflow.name) return;
      this.addWorkflow({
        id: this.idForWorkflow,
        name: this.newWorkflow.name
      }).then(() => {
        this.newWorkflow = "" 
        this.idForWorkflow++
        this.modalShow = false
      })
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
  },
  created: function() {
    this.$store.dispatch('retrieveWorkflows');
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