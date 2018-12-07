<template>
  <div class="container col-6">
    <div class="justify-content-between d-flex mb-1 border shadow p-3">
      <router-link to="/add" class="btn btn-sm btn-outline-secondary"><i class="fas fa-arrow-circle-left mr-2"></i>Back</router-link>
      <div class="d-flex"> 
      <router-link to="/add/contact" class="btn btn-sm btn-outline-primary mr-2"><i class="fas fa-plus mr-2"></i>Contact</router-link>
      <router-link to="/add/business" class="btn btn-sm btn-outline-primary"><i class="far fa-building mr-2"></i>Business</router-link>
      </div>
    </div>
    <div class="card-body bg-light border mb-2">
      <h4 class="text-left text-primary m-0"><i class="far fa-address-book mr-2"></i>New Engagement</h4>
    </div>
    <form @submit.prevent="validateBeforeSubmit" class="d-flex-column justify-content-center bg-light p-3 border">
      <div class="form-group">

        <input :class="{ 'input-error': errors.has('Year') }" type="text" class="form-control mb-3" placeholder="Year" v-model="engagement.year" v-validate="'required'" name="Year">
        <span class="form-error" v-show="errors.has('Year')">{{ errors.first('Year')}}</span>

        <div class="input-group my-3">
          <div class="input-group-prepend">
            <label class="input-group-text text-primary" for="option">Category</label>
          </div>
          <select :class="{ 'input-error': errors.has('Category') }" class="form-control" id="client_id" v-model="engagement.category" v-validate="{ is_not: option }" name="Category" v-on:change="removeSelected">
            <option disabled>{{ option }}</option>
            <option v-for="(category, index) in categories" :key="index" :value="category">
              {{ category }}
            </option>
          </select>
        </div>
        <span class="form-error" v-show="errors.has('Category')">{{ errors.first('Category') }}</span>

       
        <div class="input-group my-3" v-if="engagement.category == 'personal'">
          <div class="input-group-prepend">
            <label class="input-group-text text-primary" for="option">Find Contact</label>
          </div>
          <select :class="{ 'input-error': errors.has('Contact') }" class="form-control" id="client_id" v-model.number="engagement.client_id" v-validate="{ is_not: option }" name="Contact">
            <option disabled>{{ option }}</option>
            <option v-for="client in allClients" :key="client.id" :value="client.id">
              {{ client.last_name }}, {{client.first_name}} <span v-if="client.has_spouse == 1"> & </span>{{client.spouse_first_name }}
            </option>
          </select>
        </div>
        <span class="form-error" v-show="errors.has('Contact')">{{ errors.first('Contact') }}</span>

        <div class="input-group my-3" v-if="engagement.category == 'business'">
          <div class="input-group-prepend">
            <label class="input-group-text text-primary" for="option">Find Contact</label>
          </div>
          <select :class="{ 'input-error': errors.has('Business Contact') }" class="form-control" id="client_id" v-model.number="engagement.client_id" v-validate="{ is_not: option }" name="Business Contact">
            <option disabled>{{ option }}</option>
            <option v-for="client in allClients" :key="client.id" :value="client.id">
              {{ client.last_name }}, {{client.first_name}} <span v-if="client.has_spouse == 1"> & </span>{{client.spouse_first_name }}
            </option>
          </select>
        </div>
        <span class="form-error" v-show="errors.has('Business Contact')">{{ errors.first('Business Contact') }}</span>

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

        <div class="input-group my-3">
          <div class="input-group-prepend">
            <label class="input-group-text text-primary" for="option">Workflow Type</label>
          </div>
          <select :class="{ 'input-error': errors.has('Workflow') }" class="form-control" id="client_id" v-model.number="engagement.workflow_id" v-validate="{ is_not: option }" name="Workflow">
            <option disabled>{{ option }}</option>
            <option v-for="workflow in allWorkflows" :key="workflow.id" :value="workflow.id">
              {{ workflow.workflow }}
            </option>
          </select>
        </div>
          <span class="form-error" v-show="errors.has('Workflow')">{{ errors.first('Workflow') }}</span>

        <div class="input-group my-3">
          <div class="input-group-prepend">
            <label class="input-group-text text-primary" for="option">Return Type</label>
          </div>
          <select :class="{ 'input-error': errors.has('Return Type') }" class="form-control" id="type" v-model="engagement.return_type" v-validate="{ is_not: option }" name="Return Type">
              <option  selected disabled>{{ option }}</option>
              <option v-for="type in returnTypes" :key="type.id" :value="type.return_type">{{ type.return_type }}</option>
          </select>
        </div>
          <span class="form-error" v-show="errors.has('Return Type')">{{ errors.first('Return Type') }}</span>

        <div class="input-group my-3">
        <div class="input-group-prepend">
          <label class="input-group-text text-primary" for="option">Assign To</label>
        </div>
        <select :class="{ 'input-error': errors.has('Assigned User') }" class="form-control" id="user_id" v-model="engagement.assigned_to" v-validate="{ is_not: option }" name="Assigned User">
          <option  selected disabled>{{ option }}</option>
          <option v-for="user in users" :key="user.id" :value="user.id">
            {{ user.name }}
          </option>
        </select>
      </div>
        <span class="form-error" v-show="errors.has('Assigned User')">{{ errors.first('Assigned User') }}</span>

     

      <div v-for="workflow in allWorkflows" :key="workflow.id" v-if="workflow.id === engagement.workflow_id">
      <div class="input-group my-3">
        <div class="input-group-prepend">
          <label class="input-group-text text-primary" for="option">Status</label>
        </div>
          <select :class="{ 'input-error': errors.has('Status') }" class="form-control" id="status" v-model="engagement.status" v-validate="{ is_not: option }" name="Status">
          <option  selected disabled>{{ option }}</option>
          <option v-for="status in workflow.statuses" :key="status.id" :value="status.status">
            {{ status.status }}
          </option>
        </select>
        </div>
      </div>
        <span class="form-error" v-show="errors.has('Status')">{{ errors.first('Status') }}</span>

        <div class="input-group my-3" v-if="engagement.workflow_id === option">
        <div class="input-group-prepend">
          <label class="input-group-text text-primary" for="option">Status</label>
        </div>
          <select class="form-control" id="status">
          <option  selected disabled>{{ empty }}</option>
        </select>
        </div> 
      

      <button type="submit" class="btn btn-lg btn-primary d-flex justify-content-start">Create</button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'engagement',
  data() {
    return {
      client: '',
      engagement: {
        year: '',
        category: null,
        client_id: null,
        name: null,
        workflow_id: null,
        return_type: null,
        assigned_to: null,
        status: null,
      },
      option: 'Choose...',
      empty: 'Please select workflow first...',
      categories:['personal', 'business']
    }
  },
  computed: {
    ...mapGetters(
        [
          'allClients',
          'allWorkflows',
          'users',
          'returnTypes'
        ]
      ),
  clientBusinesses() {
    const client = this.allClients.filter(client => client.id === this.engagement.client_id)
    const businesses = client.map(c => c.businesses)
    const clientBusinesses = businesses.flat();
    return clientBusinesses
  }
  },
  methods: {
    ...mapActions(['addEngagement']),
    removeSelected() {
      this.engagement.client_id = this.option
      this.engagement.name = this.option
    },
    validateBeforeSubmit() {
          this.$validator.validateAll().then((result) => {
              if (result) {
                  this.addNewEngagement();
              }
          });
      },
    addNewEngagement() {
      if(!this.engagement.return_type || !this.engagement.year ) return;
      this.addEngagement({
        id: this.idForEngagement,
        category: this.engagement.category,
        client_id: this.engagement.client_id,
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
        this.$router.push({path: '/add', query: {alert: 'A new engagement has been added'}});
      })
    },
  },
  created: function() {
    this.$store.dispatch('retrieveClientsWithBusinesses');
    this.$store.dispatch('retrieveWorkflows');
    this.$store.dispatch('retrieveUsers');
    this.$store.dispatch('getReturnTypes')
    this.engagement.return_type = this.option
    this.engagement.client_id = this.option
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

  .input-error {
      border: 1px solid red;
  }

</style>