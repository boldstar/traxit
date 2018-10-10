<template>
  <div class="container">
    <div class="justify-content-between d-flex mb-3">
      <router-link to="/add" class="btn btn-sm btn-outline-secondary"><i class="fas fa-arrow-circle-left mr-2"></i>Back</router-link>
      <div class="d-flex">
      <span class="mr-3 font-weight-bold h5">No Contact?</span> 
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
          <select class="custom-select mb-3" id="client_id" v-model="engagement.client_id">
            <option disabled>{{ option }}</option>
            <option v-for="client in allClients" :key="client.id" :value="client.id">
              {{ client.last_name }}, {{client.first_name}} & {{client.spouse_first_name }}
            </option>
          </select>
        </div>

        <input type="text" class="form-control mb-3" placeholder="Year" v-model="engagement.year">
        <select class="form-control mb-3" id="type" v-model="engagement.return_type">
            <option v-for="type in types" :key="type.id" :value="type">{{ type }}</option>
        </select>

        <input type="text" class="form-control mb-3" placeholder="Assign To" v-model="engagement.assigned_to">
        <input type="text" class="form-control mb-3" placeholder="Status" v-model="engagement.status">
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
        client_id: 0,
        return_type: null,
        year: '',
        assigned_to: '',
        status: '',
      },
      types: [ 
        'Choose Return Type...', 
        '1040', 
        '1120',
      ],
      option: 'Choose...',
    }
  },
  computed: {
    ...mapGetters(
        [
          'allClients',
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
        this.$router.go(-1);
      })
    },
  },
  created: function() {
    this.$store.dispatch('retrieveClients')
    this.engagement.return_type = this.types[0]
    this.engagement.client_id = this.option
  },
}
</script>

<style lang="scss" scoped>

.input-group {
    font-size: 14px;
    height: 35px;

    select {
        height: 35px;
    }
}

</style>