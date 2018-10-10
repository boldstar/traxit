<template>
  <div class="page-wrapper mt-1">
<!-- this is the user tasks header -->
      <div class="card bg-light mb-3">
        <div class="d-flex justify-content-between card-body">
          <div class="h2 align-self-center">
            <i class="fas fa-tasks"></i>
          </div>
          <p class="h2 align-self-center">Tasks | {{ tasks.length }}</p>
        </div>
      </div>

<!-- this will appear if there are no tasks -->
      <div v-if="noTasks & !tasksLoaded">
         <table class="table table-hover mb-5">
            <thead class="bg-primary text-light">
              <tr>
                <th scope="col">Title</th>
                <th scope="col">Return Type</th>
                <th scope="col">Year</th>
                <th scope="col">Status</th>
                <th scope="col">Update</th>
              </tr>
            </thead>
         </table>
         <span class="mt-5 font-weight-bold">
            You have no tasks...
         </span>
      </div>
<!-- this is the list of the assigned user tasks -->
    <div v-else>
      <table class="table table-hover" v-if="!tasksLoaded">
        <thead class="bg-primary text-light">
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Return Type</th>
            <th scope="col">Year</th>
            <th scope="col">Status</th>
            <th scope="col">Update</th>
          </tr>
        </thead>
        <tbody class="table-bordered">
          <tr v-for="(task, index) in tasks"  :key="index">
            <td>{{ task.title }}</td>
            <td>{{ task.engagements[0].return_type }}</td>
            <td>{{ task.engagements[0].year }}</td>
            <td>{{ task.engagements[0].status }}</td>
            <td><b-btn variant="primary" size="sm" @click="requestUpdate(task.id)">Status</b-btn></td>
          </tr>
        </tbody>
      </table>
    </div>
          <!-- this is the modal for deleting a question -->
            <b-modal ref="modal" hide-footer title="Update Engagement">
                <form >
                <div>
                  <div class="input-group my-3">
                  <div class="input-group-prepend">
                    <label class="input-group-text font-weight-bold bg-primary text-light" for="option">Assign To</label>
                  </div>
                  <select class="custom-select" id="client_id" v-model.number="task.user_id">
                    <option v-for="user in users" :key="user.id" :value="user.id">
                      {{ user.name }}
                    </option>
                  </select>
                </div>
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

export default {
  name: 'UserTasks',
  data() {
    return {
      noTasks: false,
      tasksLoaded: false,
      taskToUpdate: null,
      task: {
        user_id: 0
      }
    }
  },
   components:{
    'b-modal': bModal,
  },
  directives: {
    'b-modal': bModalDirective
  },
  computed: {
    ...mapGetters([
      'tasks',
      'users'
    ])
  },
  methods: {
    showModal() {
        this.$refs.modal.show()
        },
    hideModal() {
        this.$refs.modal.hide()
    },
    ...mapActions(['updateTask']),

    acceptUpdate() {
      if(this.taskToUpdate) {
          if(!this.task.user_id) return;
          this.updateTask({
            id: this.taskToUpdate,
            user_id: this.task.user_id
          }).then(() => {
          this.$refs.modal.hide()
        }) 
        }
      },
    requestUpdate(id) {
        this.taskToUpdate = id
        this.$store.dispatch('retrieveUsers');
        this.$refs.modal.show()
    },
  },
  created() {
  this.$store.dispatch('retrieveTasks');
  this.tasksLoaded = true;
  var self = this;
    setTimeout(() => {
        self.tasksLoaded = false;
        if(self.tasks == 0){
              self.noTasks = true
        } else {
            self.noTasks = false
        }
    }, 3000);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  //this is the css for the loading spinner
    .lds-dual-ring {
        display: inline-block;
        width: 64px;
        height: 64px;
        margin-top: 100px;
        margin-bottom: 100px;
    }

    .lds-dual-ring:after {
        content: " ";
        display: block;
        width: 46px;
        height: 46px;
        margin: 1px;
        border-radius: 50%;
        border: 5px solid #0077ff;
        border-color: #0077ff transparent #0077ff transparent;
        animation: lds-dual-ring 1.2s linear infinite;
    }
        @keyframes lds-dual-ring {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }

    .lds-ellipsis-container {
        position: absolute;
        right: 50%;
        padding-right: 20px;
    }

    .lds-ellipsis {
        display: inline-block;
        position: relative;
        width: 64px;
        height: 11px;
    }

    .lds-ellipsis div {
        position: absolute;
        width: 11px;
        height: 11px;
        border-radius: 50%;
        background: #fff;
        animation-timing-function: cubic-bezier(0, 1, 1, 0);
    }

    .lds-ellipsis div:nth-child(1) {
        left: 6px;
        animation: lds-ellipsis1 0.6s infinite;
    }
    .lds-ellipsis div:nth-child(2) {
        left: 6px;
        animation: lds-ellipsis2 0.6s infinite;
    }
    .lds-ellipsis div:nth-child(3) {
        left: 26px;
        animation: lds-ellipsis2 0.6s infinite;
    }
    .lds-ellipsis div:nth-child(4) {
        left: 45px;
        animation: lds-ellipsis3 0.6s infinite;
    }
    @keyframes lds-ellipsis1 {
        0% {
            transform: scale(0);
        }
        100% {
            transform: scale(1);
        }
        }
        @keyframes lds-ellipsis3 {
        0% {
            transform: scale(1);
        }
        100% {
            transform: scale(0);
        }
        }
        @keyframes lds-ellipsis2 {
        0% {
            transform: translate(0, 0);
        }
        100% {
            transform: translate(19px, 0);
        }
    }
</style>