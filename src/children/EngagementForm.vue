<template>
  <div class="container">
    <div class="justify-content-between d-flex mb-3">
      <router-link to="/add" class="btn btn-sm btn-outline-secondary"><i class="fas fa-arrow-circle-left mr-2"></i>Back</router-link>
      <div class="d-flex">
      <span class="mr-3 mb-0 align-self-end font-weight-bold h5">No Contact?</span> 
      <router-link to="/add/contact" class="btn btn-sm btn-outline-primary"><i class="fas fa-plus mr-2"></i>Contact Form</router-link>
      </div>
    </div>
    <div class="card-body bg-light border-primary mb-2">
      <h4 class="text-left text-primary m-0"><i class="far fa-address-book mr-2"></i>New Engagement</h4>
    </div>
    <form @submit.prevent="addNewEngagement" class="d-flex-column justify-content-center">
      <div class="form-group">

        <div class="input-group my-3">
          <div class="input-group-prepend">
            <label class="input-group-text" for="option">Find Contact</label>
          </div>
          <select class="custom-select" id="client_id" v-model.number="engagement.client_id">
            <option disabled>{{ option }}</option>
            <option v-for="client in allClients" :key="client.id" :value="client.id">
              {{ client.last_name }}, {{client.first_name}} & {{client.spouse_first_name }}
            </option>
          </select>
        </div>

        <input type="text" class="form-control mb-3" placeholder="Year" v-model="engagement.year">

        <div class="input-group my-3">
          <div class="input-group-prepend">
            <label class="input-group-text" for="option">Return Type</label>
          </div>
          <select class="form-control" id="type" v-model="engagement.return_type">
              <option  selected disabled>{{ option }}</option>
              <option v-for="type in types" :key="type.id" :value="type">{{ type }}</option>
          </select>
        </div>

        <div class="input-group my-3">
        <div class="input-group-prepend">
          <label class="input-group-text" for="option">Assign To</label>
        </div>
        <select class="custom-select" id="user_id" v-model="engagement.assigned_to">
          <option  selected disabled>{{ option }}</option>
          <option v-for="user in users" :key="user.id" :value="user.id">
            {{ user.name }}
          </option>
        </select>
      </div>

      <div class="input-group my-3">
        <div class="input-group-prepend">
          <label class="input-group-text" for="option">Status</label>
        </div>
        <select class="custom-select" id="status" v-model="engagement.status">
          <option  selected disabled>{{ option }}</option>
          <option v-for="status in statuses" :key="status.id" :value="status">
            {{ status }}
          </option>
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
      engagement: {
        client_id: null,
        return_type: null,
        year: '',
        assigned_to: null,
        status: '',
      },
      types: [ 
        '1040', 
        '1120',
      ],
      option: 'Choose...',
      statuses: [
        'Recieved',
        'Scanned',
        'Preparation',
        'Review',
        '2nd Review',
        'Complete'
      ]
    }
  },
  computed: {
    ...mapGetters(
        [
          'allClients',
          'users'
        ]
      ),
  },
  methods: {
    ...mapActions(['addEngagement']),
    
    addNewEngagement() {
      if(!this.engagement.return_type || !this.engagement.year ) return;
      this.addEngagement({
        id: this.idForEngagement,
        client_id: this.engagement.client_id,
        return_type: this.engagement.return_type,
        year: this.engagement.year,
        assigned_to: this.engagement.assigned_to,
        status: this.engagement.status,
      })   
      .then(() => {
        this.engagement = "" 
        this.idForEngagement++
        this.$router.push({path: 'add', query: {alert: 'A new engagement has been added'}});
      })
    },
  },
  created: function() {
    this.$store.dispatch('retrieveClients');
    this.$store.dispatch('retrieveUsers');
    this.engagement.return_type = this.option
    this.engagement.client_id = this.option
    this.engagement.assigned_to = this.option
    this.engagement.status = this.option
  },
}
</script>

<style lang="scss" scoped>

  label {
    width: 8em;
  }

</style>