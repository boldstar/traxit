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
        <table class="table table-sm table-bordered mb-0" ref="automation-table">
            <thead>
                <tr>
                <th scope="col">On Workflow</th>
                <th scope="col">When Status Is Changed To</th>
                <th scope="col">Perform This Action</th>
                <th scope="col">Active</th>
                <th scope="col">Options</th>
                </tr>
            </thead>
                <tbody>
                    <tr v-for="(automation, index) in automations" :key="index" class="automation-row" :ref="'automation-row' + `${index}`">
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
                                <button data-toggle="tooltip" data-placement="bottom" title="Delete Automation" class="btn btn-link text-danger font-weight-bold call-list-btn" @click="requestDelete(automation)">
                                    <i class="fas fa-trash-alt"></i>
                                </button>
                                <button data-toggle="tooltip" data-placement="bottom" title="Edit Automation" class="btn btn-link text-primary" @click="editThis(index, automation)">
                                    <i class="fas fa-pencil-alt"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                    <tr class="edit-automation-row" ref="edit-automation-row" v-show="showEditRow" :key="showEditRow">
                        <td :class="{'edit-automation-row-body': showEditRow}" colspan=9 v-if="selectedAutomation">
                            <WorkflowAutomationsForm 
                                :key="automationId" 
                                :workflows="workflows" 
                                :editAutomation="selectedAutomation" 
                                class="mt-3" 
                                :state="false" 
                                @cancel-edit="closeEditRow"
                            />
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
import {moveRow} from '../../plugins/insert_row'
import {mapGetters} from 'vuex'
export default {
    props: ['automations', 'workflows', 'state'],
    name: 'AutomationList',
    components: {WorkflowAutomationsForm},
    data() {
        return {
            showEditRow: false,
            automationId: null,
            editRowIndex: null,
            selectedAutomation: null
        }
    },
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
        },
        editThis(index, item) {
            this.selectedAutomation = item
            this.showEditRow = true
            this.automationId = item.id
            const toIndex = this.$refs['automation-row' + index][0].rowIndex
            const fromIndex = document.getElementsByClassName('edit-automation-row')[0].rowIndex
            this.editRowIndex = fromIndex
            const table = this.$refs['automation-table']
            moveRow(table, fromIndex, toIndex, false);
        },
        requestDelete(item) {
            this.$store.commit('toggleDeleteModal', {
                action: 'deleteAutomation',
                id: item.id
            })
        },
        closeEditRow() {
            this.selectedAutomation = null
            this.showEditRow = false
            this.automationId = null
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

        .edit-automation-row {
        background: rgb(241, 241, 241);
        width: 100%;
        box-sizing: border-box;

        .edit-automation-row-body {
          width: 100%;
          box-sizing: border-box;
          
          .edit-automation-row-body-content {
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


</style>