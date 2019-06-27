<template>
    <div id="edit-workflow">
     <Alert v-if="errorAlert" v-bind:message="errorAlert" />
     <Alert v-if="successAlert" v-bind:message="successAlert" />
    <div class="container card p-0 col-6 mb-5 workflow"  v-if="!workflowLoaded">
        <div>
            <form @submit.prevent="editThisWorkflow" class="d-flex-column justify-content-center workflow-card">

                <div class="form-group card-body bg-light">
                    <input class="form-control" type="text" v-model="workflow.workflow">
                </div>
                <p v-if="error" class="text-danger">Please remove empty status inputs highlighted in red</p>
                <div class="mx-2 mb-3">
                    <div v-for="oldStatus in workflow.statuses" :key="oldStatus.id" class="d-flex mt-3">
                        <input class="form-control" type="text" v-model="oldStatus.status">
                        <select name="" id="" class="form-control state-select" v-model="oldStatus.state">
                            <option disabled value="">{{option}}</option>
                            <option :value="state" v-for="(state, index) in states" :key="index">{{state}}</option>
                        </select>
                        <label class="check-container">
                            <input type="checkbox" v-model="oldStatus.notify_client">
                            <span class="checkmark"></span>
                        </label>
                        <button type="button" class="btn btn-outline-danger btn-sm ml-3 font-weight-bold" @click="requestDelete(oldStatus.id)">X</button>
                    </div>
                    <div v-for="(status, index) in workflowData.newStatuses" :key="index" class="d-flex mt-3">
                        <input class="form-control" type="text" placeholder="Add Status" v-model="status.value" :class="{'input-error': error && status.value == ''}" @change="error = false">
                         <select name="" id="" class="form-control state-select" v-model="status.state">
                             <option disabled value="">{{option}}</option>
                            <option :value="state" v-for="(state, index) in states" :key="index">{{state}}</option>
                        </select>
                         <label class="check-container">
                            <input type="checkbox" v-model="status.notify_client">
                            <span class="checkmark"></span>
                        </label>
                        <button type="button" class="btn btn-outline-danger btn-sm ml-3 font-weight-bold" @click="deleteField(index)">X</button>
                    </div>
                    <button type="button" class="btn btn-sm btn-primary mt-3" @click="addField()">
                        New Status Field
                    </button>
                </div>
                <div class="card-footer">
                    <div class="d-flex justify-content-between">
                    <button type="submit" class="btn btn-primary d-flex justify-content-start"><i class="far fa-save mr-2 align-self-center"></i>Save</button>
                    <router-link  to="/administrator/workflows" class="btn btn-secondary float-right" @click.native="removeData">Cancel</router-link>
                    </div>
                </div>
        
            </form>

           
        </div>

        <!-- this is the modal for deleting a status -->
        <b-modal v-model="modalShow" id="myModal" ref="myModal" hide-footer title="Delete Status From Workflow">
        <div class="d-block text-left">
            <h5>Are you sure you want to delete status</h5>
            <br>
            <p><strong>*Warning:</strong> Can not be undone once deleted.</p>
        </div>
        <div class="d-flex">
            <b-btn class="mt-3" variant="danger" @click="modalShow = false">Cancel</b-btn>
            <b-btn class="mt-3 ml-auto" variant="outline-success" @click="deleteStatus">Confirm</b-btn>
        </div>
        </b-modal>

    </div>
         <spinner v-if="workflowLoaded"></spinner>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Alert from '@/components/Alert.vue'
import bModal from 'bootstrap-vue/es/components/modal/modal'
import bModalDirective from 'bootstrap-vue/es/directives/modal/modal'
import Spinner from '@/components/Spinner.vue'


export default {
    name: 'EditWorkflow',
    data() {
        return {
            modalShow: false,
            statusToDelete: null,
            error: false,
            workflowData: {
                newStatuses: []
            },
            workflowLoaded: false,
            states: ['Staging', 'Active', 'Pending', 'Complete'],
            option: 'Choose State..'
        }
    },
    components:{
        'b-modal': bModal,
        Alert,
        Spinner
    },
    directives: {
        'b-modal': bModalDirective
    },
    computed: {
        ...mapGetters(['workflow', 'errorAlert', 'successAlert']),
    },
    methods: {
        ...mapActions(['editWorkflow']),
        editThisWorkflow() {
            for(var i = 0; i < this.workflowData.newStatuses.length; i++) {
                var status = this.workflowData.newStatuses[i]
                if(!status.value) {
                    this.error = true
                    return
                }
            }
            this.editWorkflow({
            id: this.workflow.id,
            workflow: this.workflow.workflow,
            statuses: this.workflow.statuses,
            newStatuses: this.workflowData.newStatuses
            }).then(() => {
                this.$router.push({ path: '/administrator/workflows' })
                this.$store.commit('removeDataFromWorkflow')
            })
        },
        deleteStatus(id) { 
            this.$store.dispatch('deleteStatus', {id: this.statusToDelete})
            .then(() => {
                this.modalShow = false
            })
        },
         requestDelete(id) {
            this.statusToDelete = id
            this.modalShow = true
        },
        addField() {
            this.workflowData.newStatuses.push({ value: '', state: null, notify_client: false, order: this.workflowData.newStatuses.length });
        },
        deleteField(index) {
            this.workflowData.newStatuses.splice(index, 1);
        },
        removeData() {
            this.$store.commit('removeDataFromWorkflow')
        }
    },
    created: function(){
        this.workflowLoaded  = true
        this.$store.dispatch('getWorkflow', this.$route.params.workflow);
        var self = this;
            setTimeout(() => {
            self.workflowLoaded = false;
        }, 3000);
    }
}
</script>


<style lang="scss" scoped>
    .btn-outline-danger {
        width: 38px!important;
    }
    /* The container */
    .check-container {
    display: block;
    position: relative;
    left: 7px;
    padding-left: 35px;
    cursor: pointer;
    font-size: 22px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

     &:before {
         content: "Email";
         position: absolute;
         font-size: .7rem;
         width: 37px;
         bottom: 15px;
         right: -2px;
         z-index: 1;
         background-color: #0077ff;
         border-radius: 3px 3px 0 0;
         color: white;
         border-bottom: 1px solid black;
     }
    }

    /* Hide the browser's default checkbox */
    .check-container input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
    }

    /* Create a custom checkbox */
    .checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 38px;
    width:38px;
    background-color: #eee;
    border-radius: 3px;
    }

    /* On mouse-over, add a grey background color */
    .check-container:hover input ~ .checkmark {
    background-color: #ccc;
    }

    /* When the checkbox is checked, add a blue background */
    .check-container input:checked ~ .checkmark {
    background-color: #0077ff;
    }

    /* Create the checkmark/indicator (hidden when not checked) */
    .checkmark:after {
    content: "";
    position: absolute;
    display: none;
    }

    /* Show the checkmark when checked */
    .check-container input:checked ~ .checkmark:after {
    display: block;
    }

    /* Style the checkmark/indicator */
    .check-container .checkmark:after {
    left: 15px;
    top: 17px;
    width: 8px;
    height: 15px;
    border: solid white;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
    }

    .input-error {
        border: 1px solid red;
    }

    .state-select {
        width: 200px;
        margin-left: 10px;
    }

    @media screen and (max-width: 767px) {
      .workflow {
          width: 100%!important;
          flex: 0 0 100%!important;
          max-width: 100%!important;
      }

      .workflow-card {
          width: 100%!important;
          flex: 0 0 100%!important;
          max-width: 100%!important;
      }
  }
</style>

