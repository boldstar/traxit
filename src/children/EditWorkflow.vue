<template>
    <div id="edit-workflow">
    <div class="container card p-0 col-6 mb-5"  v-if="!workflowLoaded">
        <div>
            <form @submit.prevent="editThisWorkflow" class="d-flex-column justify-content-center">

                <div class="form-group card-body bg-light">
                    <input class="form-control" type="text" v-model="workflow.workflow">
                </div>
                <div class="mx-2 mb-3">
                    <div v-for="object in workflow.statuses" :key="object.id" class="d-flex mt-3">
                        <input class="form-control" type="text" v-model="object.status">
                        <button type="button" class="btn btn-outline-danger btn-sm ml-3 font-weight-bold" @click="deleteField(index)">X</button>
                    </div>
                    <div v-for="(status, index) in workflowData.newStatuses" :key="index" class="d-flex mt-3">
                        <input class="form-control" type="text" placeholder="Add Status" v-model="status.value">
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

    </div>
         <div v-if="workflowLoaded" class="lds-dual-ring justify-content-center"></div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'


export default {
    name: 'EditWorkflow',
    data() {
        return {
            workflowData: {
                newStatuses: []
            },
            workflowLoaded: false
        }
    },
    computed: {
    ...mapGetters(['workflow']),
  },
  methods: {
    ...mapActions(['editWorkflow']),
    editThisWorkflow() {
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
    addField() {
        this.workflowData.newStatuses.push({ value: '', order: this.workflowData.newStatuses.length });
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

