<template>
    <div class="container card-body bg-light">
        <form @submit.prevent="editThisWorkflow" class="d-flex-column justify-content-center">

            <div class="form-group">
                <input class="form-control" type="text" v-model="workflow.workflow">
            </div>
            <div v-for="object in workflow.statuses" :key="object.id">
                <input class="form-control mt-3" type="text" v-model="object.status">
            </div>
            <div v-for="(status, index) in statusFields" :key="index">
                <input class="form-control mt-3" type="text" placeholder="Add Status" v-model="workflowForm.statuses">
            </div>
            <button class="btn btn-sm btn-primary mt-3" @click="addField">
                New Status Field
            </button>
            <div class="d-flex justify-content-between">
              <button type="submit" class="btn btn-primary d-flex justify-content-start">Create</button>
              <router-link  :to="{ path: '/administrator/workflows'}" class="btn btn-secondary float-right">Cancel</router-link>
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
                statuses: []
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
            statuses: this.workflowForm.statuses
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

