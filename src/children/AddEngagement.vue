<template>
  <div class="mt-1">
    <div class="add-engagement">
      <div class="card-body bg-light border-primary mb-2">
        <h4 class="text-left text-primary m-0">New Engagement</h4>
      </div>
        <form @submit.prevent="addNewEngagement" class="d-flex-column justify-content-center">
          <div class="form-group">
            <input type="text" class="form-control mb-3" placeholder="Year" v-model="engagement.year">

            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <label class="input-group-text text-primary" for="option">Category</label>
              </div>
              <select class="form-control" id="client_id" v-model.number="engagement.category">
                <option disabled>{{ option }}</option>
                <option v-for="(category, index) in categories" :key="index" :value="category">
                  {{ category }}
                </option>
              </select>
            </div>

            <div class="input-group my-3" v-if="engagement.category == 'business'">
              <div class="input-group-prepend">
                <label class="input-group-text text-primary" for="option">Find Business</label>
              </div>
              <select :class="{ 'input-error': errors.has('Business') }" class="form-control" id="client_id" v-model="engagement.name" v-validate="{ is_not: option }" name="Business">
                <option disabled>{{ option }}</option>
                <option v-for="(business, index) in clientBusinesses" :key="index">
                  {{business.business_name}} {{business.business_type}}
                </option>
              </select>
            </div>
            <span class="form-error" v-show="errors.has('Business')">{{ errors.first('Business') }}</span>

            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <label class="input-group-text text-primary" for="option">Workflow Type</label>
              </div>
              <select class="form-control" id="client_id" v-model.number="engagement.workflow_id">
                <option disabled>{{ option }}</option>
                <option v-for="workflow in allWorkflows" :key="workflow.id" :value="workflow.id">
                  {{ workflow.workflow }}
                </option>
              </select>
            </div>

            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <label class="input-group-text text-primary" for="option">Return Type</label>
              </div>
              <select class="form-control" id="type" v-model="engagement.return_type">
              <option disabled>{{ option }}</option>
              <option v-for="type in returnTypes" :key="type.id" :value="type.return_type">{{ type.return_type }}</option>
              </select>
            </div>

            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <label class="input-group-text text-primary" for="option">Assign To</label>
              </div>
              <select class="form-control" id="user_id" v-model="engagement.assigned_to">
                <option  selected disabled>{{ option }}</option>
                <option v-for="user in users" :key="user.id" :value="user.id">
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
                    <option  selected disabled>{{ option }}</option>
                    <option v-for="status in workflow.statuses" :key="status.id" :value="status">
                      {{ status.status }}
                    </option>
                  </select>
                </div>
              </div>

              <div class="input-group my-3" v-if="engagement.workflow_id === option">
                <div class="input-group-prepend">
                  <label class="input-group-text text-primary" for="option">Status</label>
                </div>
                  <select class="form-control" id="status">
                  <option  selected disabled>{{ empty }}</option>
                </select>
              </div> 

            <div class="d-flex justify-content-between">
              <button type="submit" class="btn btn-primary d-flex justify-content-start">Create</button>
              <router-link v-bind:to="'/contact/' +client.id+ '/engagements'" class="btn btn-secondary float-right">Dismiss</router-link>
            </div>
          </div>
        </form>
      </div>  
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'add-engagement',
  data() {
    return {
      engagement: {
        workflow_id: null,
        category: null,
        name: null,
        return_type: null,
        year: '',
        assigned_to: null,
        status: null,
      },
      option: 'Choose..',
      empty: 'Please select workflow first...',
      categories: ['personal', 'business']
    }
  },
  computed: {
    ...mapGetters(
        [
          'client',
          'allWorkflows',
          'users',
          'returnTypes'
        ]
      ),
      clientBusinesses() {
      return this.client.businesses
    }
  },
  methods: {
    ...mapActions(['addEngagement']),
    
    addNewEngagement() {
      if(!this.engagement.return_type || !this.engagement.year ) return;
      
      this.addEngagement({
        id: this.idForEngagement,
        category: this.engagement.category,
        client_id: this.client.id,
        name: this.engagement.name,
        workflow_id: this.engagement.workflow_id,
        return_type: this.engagement.return_type,
        year: this.engagement.year,
        assigned_to: this.engagement.assigned_to,
        status: this.engagement.status,
      })   
      .then(() => {
        this.engagement = "" 
        this.idForEngagement++
        this.$router.push({path: '/contact/' +this.client.id+'/engagements', query : { alert: 'Engagement has been added!'}});
      })
    },
  },
  created: function() {
    this.$store.dispatch('getReturnTypes')
    this.engagement.return_type = this.option
    this.engagement.workflow_id = this.option
    this.engagement.assigned_to = this.option
    this.engagement.status = this.option
    this.engagement.category = this.option
    this.engagement.name = this.option
  },
}
</script>

<style lang="scss" scoped>

 label {
    width: 8em;
  }

</style>

