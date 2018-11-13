<template>
  <div class="page-wrapper mt-1">

  <div class="flex-row justify-content-between d-flex my-3">
    <router-link v-bind:to="'/engagement/' +this.engagement.id" class="btn btn-outline-secondary"><i class="fas fa-arrow-circle-left mr-2"></i>Cancel</router-link>
    <div>
      <b-btn class="outline-secondary" v-b-modal.myModal><i class="fas fa-trash"></i><span class="ml-2">Delete</span></b-btn> 
    </div>
  </div>  

  <hr>

  <div class="d-flex justify-content-start my-4 h4">
    <div>
      <span class="mr-3"><i class="fas fa-user-edit"></i> </span>
      {{ engagement.client.last_name }}, {{ engagement.client.first_name }} & {{ engagement.client.spouse_first_name }}
    </div>
  </div>

  <hr>

  <form @submit.prevent="editThisEngagement" class="d-flex-column justify-content-center">
      <div class="form-group">

        <input type="text" class="form-control mb-3" placeholder="Year" v-model="engagement.year">
        

        <div class="input-group my-3">
          <div class="input-group-prepend">
            <label class="input-group-text text-primary" for="option">Workflow Type</label>
          </div>
          <select class="form-control" id="client_id" v-model.number="engagement.workflow_id">
            <option v-for="workflow in allWorkflows" :key="workflow.id" :value="workflow.id">
              {{ workflow.workflow }}
            </option>
          </select>
        </div>

       <div class="input-group my-3">
          <div class="input-group-prepend">
            <label class="input-group-text text-primary" for="option">Return Type</label>
          </div>
          <select class="form-control" id="type" v-model="engagement.return_type">
              <option v-for="type in types" :key="type.id" :value="type">{{ type }}</option>
          </select>
        </div>

        <div class="input-group my-3">
        <div class="input-group-prepend">
          <label class="input-group-text text-primary" for="option">Assign To</label>
        </div>
        <select class="form-control" id="user_id" v-model="engagement.assigned_to">
          <option v-for="user in users" :key="user.id" :value="user.name">
            {{ user.name }}
          </option>
        </select>
      </div>

         <div v-for="workflow in allWorkflows" :key="workflow.id" v-if="workflow.id === engagement.workflow_id">
      <div class="input-group my-3">
        <div class="input-group-prepend">
          <label class="input-group-text text-primary" for="option">Status</label>
        </div>
          <select class="form-control" id="status" v-model="engagement.status">
          <option v-for="status in workflow.statuses" :key="status.id" :value="status.status">
            {{ status.status }}
          </option>
        </select>
        </div>
      </div>

      <button type="submit" class="btn btn-lg btn-primary d-flex justify-content-start">Save Changes</button>
      </div>
    </form>


  <b-modal id="myModal" ref="myModalRef" hide-footer title="Delete Client">
    <div class="d-block text-left">
      <h5>Are you sure you want to delete engagement?</h5>
      <br>
      <p><strong>*Warning:</strong> Can not be undone once deleted.</p>
    </div>
    <div class="d-flex">
      <b-btn class="mt-3" variant="danger" @click="hideModal">Cancel</b-btn>
      <b-btn class="mt-3 ml-auto" variant="outline-success" @click="deleteEngagement(engagement.id)">Confirm</b-btn>
    </div>
  </b-modal>


  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'
import bModal from 'bootstrap-vue/es/components/modal/modal'
import bModalDirective from 'bootstrap-vue/es/directives/modal/modal'

export default {
  name: 'EditEngagement',
  data() {
    return {
      types: [
        '1040',
        '1120',
      ]
    }
  },
  components:{
    'b-modal': bModal
  },
  directives: {
    'b-modal': bModalDirective
  },
  computed: {
    ...mapGetters(
        [
          'engagement',
          'users',
          'allWorkflows'
        ]
      )
  },
  methods: {
    ...mapActions(['updateEngagement']),

    editThisEngagement(id) {
        if(!this.engagement.return_type || !this.engagement.year ) return;
        
        this.updateEngagement({
          id: this.engagement.id,
          client_id: this.engagement.client_id,
          return_type: this.engagement.return_type,
          year: this.engagement.year,
          assigned_to: this.engagement.assigned_to,
          status: this.engagement.status,
        })   
        .then(() => {
          this.$router.go(-1);
        })
    },
    deleteEngagement(id) {
      this.$store.dispatch('deleteEngagement', id)
      .then(() => {
        this.$router.push({path: '/engagements', query: {alert: 'Engagement Was Succesfully Deleted'}});
      })
    },
    showModal () {
      this.$refs.myModalRef.show()
    },
    hideModal () {
      this.$refs.myModalRef.hide()
    },
    isActive: function (menuItem) {
      return this.activeItem === menuItem
    },
  },
  created: function(){
    this.$store.dispatch('getEngagement', this.$route.params.id);
    this.$store.dispatch('retrieveUsers')
    this.$store.dispatch('retrieveWorkflows')
  }
  
}
</script>


<style scoped lang="scss">
 label {
    width: 8em;
  }
</style>
