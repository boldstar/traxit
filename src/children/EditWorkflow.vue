<template>
    <div class="container card p-0 col-6 mb-5">
        <form @submit.prevent="editThisWorkflow" class="d-flex-column justify-content-center">

            <div class="form-group card-body bg-light">
                <input class="form-control" type="text" v-model="workflow.workflow">
            </div>
            <div class="mx-2 mb-3">
                <div v-for="object in workflow.statuses" :key="object.id">
                    <input class="form-control mt-3" type="text" v-model="object.status">
                </div>
                <div v-for="(status, index) in statusFields" :key="index">
                    <input class="form-control mt-3" type="text" placeholder="Add Status" v-model="workflowForm.newStatuses">
                </div>
                <button type="button" class="btn btn-sm btn-primary mt-3" @click="addField">
                    New Status Field
                </button>
            </div>
            <div class="card-footer">
                <div class="d-flex justify-content-between">
                <button type="submit" class="btn btn-primary d-flex justify-content-start">Create</button>
                <router-link  :to="{ path: '/administrator/workflows'}" class="btn btn-secondary float-right">Cancel</router-link>
                </div>
            </div>
      
        </form>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'


export default {
    name: 'EditWorkflow',
    data() {
        return {
            statusFields: [],
            workflowForm: {
                newStatuses: []
            }
        }
    },
    computed: {
    ...mapGetters(
        [
          'workflow',
        ]
      ),
  },
  methods: {
    ...mapActions(['editWorkflow']),
    editThisWorkflow() {
        this.editWorkflow({
            workflowId: this.workflow.id,
            workflow: this.workflow.workflow,
            statuses: this.workflow.statuses,
            newStatuses: this.workflowForm.newStatuses
        })
    },
    addField() {
        this.statusFields.push({ value: ''})
    },
  },
  created: function(){
    this.$store.dispatch('getWorkflow', this.$route.params.workflow);
  }

}
</script>


<style>

</style>

