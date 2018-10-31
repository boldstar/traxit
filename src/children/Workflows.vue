<template>
  <div class="mt-3">
    <div class="d-flex justify-content-between">
      <span class="h3 m-0">Workflows</span>
      <button class="btn btn-sm btn-primary">Create New Workflow</button>
    </div>
    <hr>
    <div class="d-flex pr-5">
      <div class="col-4 mr-4 border p-0 mb-3" v-for="(workflow, index) in allWorkflows" :key="index">
         <div class="card-header d-flex justify-content-between">
           <span class="align-self-center">{{ workflow.workflow }}</span>
          <button class="btn btn-sm btn-outline-primary">Edit</button>
          </div>
        <div class="h6 status-list" v-for="status in workflow.statuses" :key="status.id">
         {{ status.status }}
        </div>
      </div>
    </div>  
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'workflows',
  data() {
    return {
     
    }
  },
  computed: {
    ...mapGetters(['allWorkflows']),
  },
  methods: {
    ...mapActions(['addEngagement']),
    
  },
  created: function() {
    this.$store.dispatch('retrieveWorkflows');
  },
}
</script>

<style lang="scss" scoped>

.status-list {
  padding: 10px 0;
}

</style>