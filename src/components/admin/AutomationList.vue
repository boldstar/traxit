<template>
  <div class="automation-list" id="accordion">
      <div class="card">
        <div class="card-header d-flex justify-content-between px-3 py-1" id="headingOne">
            <h6 class="font-weight-bold m-0 align-self-center">
                <button class="btn collapse-btn-text" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                Workflow Status Automations
                </button>
            </h6>
            <div class="d-flex">
                    <span class="mr-3 align-self-center font-weight-bold text-success success-msg" v-if="successMessage">{{successMessage}}</span>
                    <label class="switch align-self-center mt-2">
                        <input type="checkbox" v-model="settingState" @change="switchAutomationsList">
                        <span class="slider slider-custom round font-weight-bold text-right pt-2 pr-2">Off</span>
                    </label>
            </div>
        </div>
        <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
        <WorkflowAutomationsForm :workflows="workflows" class="mt-3" :state="false" />
        <table class="table table-sm table-bordered mb-0">
            <thead>
                <tr>
                <th scope="col">On Workflow</th>
                <th scope="col">When Changed To Status</th>
                <th scope="col">Perform This Action</th>
                <th scope="col">Active</th>
                <th scope="col">Options</th>
                </tr>
            </thead>
                <tbody>
                    <tr v-for="(automation, index) in automations" :key="index">
                        <th scope="row">{{automation.workflow}}</th>
                        <td>{{automation.status}}</td>
                        <td>{{automation.action}}</td>
                        <td>
                            <label class="switch mt-2">
                                <input type="checkbox" v-model="automation.active" @change="activeSwitch(automation.id)">
                                <span class="slider round"></span>
                            </label>
                        </td>
                        <td class="p-0">
                            <div class="d-flex justify-content-around">
                                <button data-toggle="tooltip" data-placement="bottom" title="Delete Automation" class="btn btn-link text-danger font-weight-bold call-list-btn">
                                    <i class="fas fa-trash-alt"></i>
                                </button>
                                <button data-toggle="tooltip" data-placement="bottom" title="Edit Automation" class="btn btn-link text-primary">
                                    <i class="fas fa-pencil-alt"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
      </div>
  </div>
</template>

<script>
import WorkflowAutomationsForm from '@/components/admin/WorkflowAutomationsForm'
import {mapGetters} from 'vuex'
export default {
    props: ['automations', 'workflows', 'state'],
    name: 'AutomationList',
    components: {WorkflowAutomationsForm},
    computed: {
        ...mapGetters(['successAlert', 'successMessage']),
          settingState: {
            get: function() {
                return this.state
		    },
            set: function(newValue) {
                return newValue
            }
        },
    },
    methods: {
        activeSwitch(id) {
            this.$store.dispatch('switchAutomationState', id)
        },
        switchAutomationsList() {
            this.$store.dispatch('switchAutomationsListState')
        }
    }
}
</script>

<style lang="scss">
.automation-list {
    width: 100%;

    .collapse-btn-text {
        background: none;
        font-weight: bold;
    }

    table {

        .switch {
        position: relative;
        display: inline-block;
        width: 30px;
        height: 17px;
        }
    
        .switch input { 
        opacity: 0;
        width: 0;
        height: 0;
        }
    
        .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ccc;
        -webkit-transition: .4s;
        transition: .4s;
        }
    
        .slider:before {
        position: absolute;
        content: "";
        height: 13px;
        width: 13px;
        left: 2px;
        bottom: 2px;
        background-color: white;
        -webkit-transition: .4s;
        transition: .4s;
        }
    
        input:checked + .slider {
        background-color: #2196F3;
        }
    
        input:focus + .slider {
        box-shadow: 0 0 1px #2196F3;
        }
    
        input:checked + .slider:before {
        -webkit-transform: translateX(13px);
        -ms-transform: translateX(13px);
        transform: translateX(13px);
        }
    
        /* Rounded sliders */
        .slider.round {
        border-radius: 34px;
        }
    
        .slider.round:before {
        border-radius: 50%;
        }
    }
}


</style>