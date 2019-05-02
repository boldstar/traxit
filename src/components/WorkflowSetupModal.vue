<template>
      <b-modal v-model="modal" centered hide-footer title="Create Workflow">
        <div class="d-block text-center my-3" v-if="setupState && !successMessage">
          <div class="parent-bar">
          <div class="child-bar" v-bind:style="{ width: progress + '%'}">
          <span>{{ progress + '%' }}</span>
          </div>
        </div>
        <span class="font-weight-bold mt-3" v-if="done">Almost Done!</span>
        </div>
        <div v-if="successMessage" class="message">
            <span class="message-text">
                {{ successMessage }}
            </span>
        </div>

        <form class="d-flex-column justify-content-center workflow-card" v-if="!successMessage">

            <div class="form-group card-body bg-light">
                <input class="form-control" type="text" v-model="workflow.name" placeholder="Workflow Name">
            </div>
            <div class="mx-2 mb-3">
                <div v-for="(status, index) in workflow.statuses" :key="index" class="d-flex mt-3">
                    <input class="form-control" type="text" placeholder="Add Status" v-model="status.value">
                    <button type="button" class="btn btn-outline-danger btn-sm ml-3 font-weight-bold" @click="deleteField(index)">X</button>
                </div>
                <button type="button" class="btn btn-sm btn-primary mt-3" @click="addField()">
                    New Status Field
                </button>
            </div>
    
        </form>



        <div class="d-flex justify-content-between mt-3"  v-if="!successMessage">
            <button class="btn btn-primary" id="inputGroupFileAddon04" @click="createWorkflow">Submit</button>
            <button type="button" class="btn btn-secondary btn-sm" @click="closeModal">Cancel</button>
        </div>
         <div class="d-flex justify-content-between mt-3"  v-if="successMessage">
            <button type="button" class="btn btn-primary btn-block" @click="closeModal">Continue</button>
        </div>
      </b-modal>
</template>

<script>
import { mapGetters } from 'vuex';
import bModal from 'bootstrap-vue/es/components/modal/modal';
import bModalDirective from 'bootstrap-vue/es/directives/modal/modal';

export default {
    name: 'ContactSetupModal',
    data() {
      return {
            statusToDelete: null,
            workflow: {
                name: '',
                statuses: []
            },
            modal: true,
            startProcess: true,
            progress: 0,
            done: false
      }
    },
    components:{
        'b-modal': bModal,
    },
    directives: {
        'b-modal': bModalDirective
    },
    computed: {
        ...mapGetters(['successMessage', 'setupState'])
    },
    methods: {
        closeModal() {
            this.$store.commit('setupWorkflowModal')
            this.$store.commit('clearSetupMessage')
        },
        createWorkflow() {
            this.startProgress()
            this.$store.dispatch('createWorkflowOnSetup', {
                name: this.workflow.name,
                statuses: this.workflow.statuses,
            })
        },
        addField() {
            this.workflow.statuses.push({ value: '', order: this.workflow.statuses.length });
        },
        deleteField(index) {
            this.workflow.statuses.splice(index, 1);
        },
        startProgress() {
        var vm = this
        var width = 15
        var increase = setInterval(() => {
          vm.progress += width
          if(vm.progress >= 100) {
            clearInterval(increase);
            this.done = true
          }
      }, 500)
      }
    }
}
</script>

<style scoped>

.message {
    padding: 10px;
    border-radius: 5px;
    color: #0077ff;
    background: #ebebeb;
}

.message-text {
    font-weight: bold;
}

.parent-bar {
    height: 25px;
    width: 100%;
    background: gray;
    display: flex;
    z-index: -1;
  }

  .child-bar {
    height: 20px;
    background: #0077ff;
    color:  white;
    align-self: center;
    z-index: 0;
  }


</style>




