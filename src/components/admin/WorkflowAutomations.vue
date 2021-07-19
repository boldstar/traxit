<template>
  <div class="custom-card card shadow-sm">
      <div class="card-header d-flex w-100 justify-content-between py-0">
          <h6 class="font-weight-bold m-0 align-self-center">Workflow Status Automations</h6>

          <div class="d-flex">
                <span class="mr-3 align-self-center font-weight-bold text-success success-msg" v-if="successMessage">{{successMessage}}</span>
                <label class="switch align-self-center mr-4 mt-2">
                    <input type="checkbox" v-model="settingState">
                    <span class="slider slider-custom round font-weight-bold text-right pt-2 pr-2">Off</span>
                </label>
            <button class="btn btn-sm btn-primary font-weight-bold align-self-center">Edit List</button>
          </div>
      </div>
      <div class="card-body text-left">
          <p>Set automations for workflow statuses. Ex: Remove contact from call list when engagement is set to certain status.</p>
          <ul>
              <li class="d-flex">
                  <div class="custom-input-group">
                    <label for="workflow">Select Workflow</label>
                    <select id="workflow" >
                        <option>
                            options
                        </option>
                    </select>
                </div>
                  <div class="custom-input-group">
                    <label for="workflow">Select Status</label>
                    <select id="workflow" >
                        <option>
                            options
                        </option>
                    </select>
                </div>
                  <div class="custom-input-group">
                    <label for="workflow">Select Automation</label>
                    <select id="workflow" >
                        <option>
                            options
                        </option>
                    </select>
                </div>
                <div class="align-self-center ml-3">
                    <button class="btn btn-primary font-weight-bold">Add</button>
                </div>
              </li>
          </ul>
      </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    name: 'WorkflowAutomations',
    props: ['setting', 'state'],
    computed: {
        ...mapGetters(['successMessage']),
        settingState: {
            get: function() {
                return this.state
		},
            set: function(newValue) {
                return newValue
            }
        }
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