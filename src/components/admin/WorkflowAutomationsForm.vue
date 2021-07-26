<template>
  <div class="custom-card shadow-sm">
      <div class="card-body text-left">
          <p>Set automations for workflow statuses. Ex: Remove contact from call list when engagement is set to certain status.</p>
          <p class="text-danger font-weight-bold pt-0" v-if="error">Please select all available options.</p>
          <ul>
              <li class="d-flex">
                  <div class="custom-input-group">
                    <label for="workflow">Select Workflow</label>
                    <select id="workflow" v-model="automation.workflow_id" @change="error = false">
                        <option disabled>{{select_option}}</option>
                        <option v-for="(workflow, index) in workflows" :key="index" :value="workflow.id">
                            {{workflow.workflow}}
                        </option>
                    </select>
                </div>
                  <div class="custom-input-group">
                    <label for="status">Select Status</label>
                    <select id="status" v-model="automation.status_id" @change="error = false">
                        <option disabled>{{select_option}}</option>
                        <option v-for="(status, index) in selectedWorkflowStatuses" :key="index" :value="status.id">
                            {{status.status}}
                        </option>
                    </select>
                </div>
                  <div class="custom-input-group">
                    <label for="automation">Select Automation</label>
                    <select id="automation" v-model="automation.action_id" @change="error = false">
                        <option disabled>{{select_option}}</option>
                        <option v-for="(option, index) in options" :key="index" :value="option.id
                        ">
                           {{option.option}}
                        </option>
                    </select>
                </div>
                <div class="align-self-center ml-3">
                    <button class="btn btn-primary font-weight-bold" @click="addAutomation">Add</button>
                </div>
              </li>
          </ul>
      </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import automation_options from '../../plugins/automations'
export default {
    name: 'WorkflowAutomations',
    props: ['setting', 'state', 'workflows'],
    data() {
      return {
        automation: {
          workflow_id: null,
          status_id: null,
          action_id: null
        },
        options: automation_options.options,
        select_option: 'Choose...',
        error: false
      }
    },
    computed: {
        ...mapGetters(['successMessage']),
        selectedWorkflowStatuses() {
          if(this.automation.workflow_id && this.automation.workflow_id != this.select_option) {
            return this.workflows.filter(w => w.id === this.automation.workflow_id)[0].statuses
          } else {
            return null
          }
        }
    },
    methods: {
      addAutomation() {
        const vals = Object.values(this.automation)
        if(vals.includes(this.select_option) || vals.includes('')) {
          this.error = true
          return
        } else {
          this.$store.dispatch('addAutomation', {
            category: 'workflow',
            workflow_id: this.automation.workflow_id,
            workflow: this.workflows.filter(w => w.id == this.automation.workflow_id)[0].workflow,
            status_id: this.automation.status_id,
            status: this.selectedWorkflowStatuses.filter(s => s.id === this.automation.status_id)[0].status,
            action_id: this.automation.action_id,
            action: this.options.filter(a => a.id === this.automation.action_id)[0].option,
            active: true
          })
        }
      }
    },
    created() {
      this.automation.workflow_id = this.select_option
      this.automation.status_id = this.select_option
      this.automation.action_id = this.select_option
    }
}
</script>

<style lang="scss">
.custom-card {
    .success-msg {
        transition: .3;
    }
    
    ul {
        list-style: none;
        background: rgb(248, 245, 245);
        padding: 10px;
    }
}

.slider-custom {
    font-size: .7em;
}

    
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
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
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
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
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>