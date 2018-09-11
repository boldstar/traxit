<template>
  <div class="add container">
    <div class="card-body bg-light border-primary mb-2">
      <h4 class="text-left text-primary m-0"><i class="far fa-address-book mr-2"></i>New Contact</h4>
    </div>
    <form @submit.prevent="addClient" class="d-flex-column justify-content-center">
      <div class="form-group">
        <select class="form-control mb-3" id="category" v-model="client.category">
          <option v-for="category in categories" :key="category.id" :value="category">{{ category }}</option>
        </select>
        <input type="text" class="form-control mb-3" placeholder="Referral Type" v-model="client.referral_type">

        <h4 class="text-left mb-3">Taxpayer:</h4>
        <div class="d-flex mb-3">
          <input type="text" class="form-control col-5" placeholder="First Name" v-model="client.first_name">
          <input type="text" class="form-control mx-2" placeholder="Middle Initial" v-model="client.middle_initial">
          <input type="text" class="form-control col-5" placeholder="Last Name" v-model="client.last_name">
        </div>      
 
        <div class="d-flex mb-3">
          <input type="text" class="form-control mr-2" placeholder="Occupation" v-model="client.occupation">
          <input type="text" class="form-control" placeholder="Date Of Birth" v-model="client.dob">
        </div>

        <div class="d-flex mb-3">
          <input type="text" class="form-control" placeholder="email@example.com" v-model="client.email">
          <input type="text" class="form-control mx-2" placeholder="Cell Phone #" v-model="client.cell_phone">
          <input type="text" class="form-control" placeholder="Work Phone #" v-model="client.work_phone">
        </div>

        <h4 class="text-left mb-3">Spouse:</h4>
        <div class="d-flex mb-3">
          <input type="text" class="form-control col-5" placeholder="First Name" v-model="client.spouse_first_name">
          <input type="text" class="form-control mx-2" placeholder="Middle Initial" v-model="client.spouse_middle_initial">
          <input type="text" class="form-control col-5" placeholder="Last Name" v-model="client.spouse_last_name">
        </div>

        <div class="d-flex mb-3">
          <input type="text" class="form-control mr-2" placeholder="Occupation" v-model="client.spouse_occupation">
          <input type="text" class="form-control" placeholder="Date Of Birth" v-model="client.spouse_dob">
        </div>

        <div class="d-flex mb-3">
          <input type="text" class="form-control" placeholder="email@example.com" v-model="client.spouse_email">
          <input type="text" class="form-control mx-2" placeholder="Cell Phone #" v-model="client.spouse_cell_phone">
          <input type="text" class="form-control" placeholder="Work Phone #" v-model="client.spouse_work_phone">
        </div>

        <h4 class="text-left mb-3">Address:</h4>
        <div class="d-flex mb-4">
          <input type="text" class="form-control" placeholder="Street Address" v-model="client.street_address">
          <input type="text" class="form-control ml-2 mr-1" placeholder="City" v-model="client.city">
          <input type="text" class="form-control ml-1 mr-2" placeholder="State" v-model="client.state">
          <input type="text" class="form-control" placeholder="Postal Code" v-model="client.postal_code">
        </div>

      <button type="submit" class="btn btn-lg btn-primary d-flex justify-content-start">Create</button>
      </div>
    </form>
  </div>  
</template>

<script>
export default {
  name: 'AddClient',
  data () {
    return {
      client: {
        id: '',
        category: null,
        referral_type: '',
        first_name: '',
        middle_initial: '',
        last_name: '',
        occupation: '',
        dob: '',
        email: '',
        cell_phone: '',
        work_phone: '',
        spouse_first_name: '',
        spouse_middle_initial: '',
        spouse_last_name: '',
        spouse_occupation: '',
        spouse_dob: '',
        spouse_email: '',
        spouse_cell_phone: '',
        spouse_work_phone: '',
        street_address: '',
        city: '',
        state: '',
        postal_code: '',
      },
        categories: [ 'Choose Category...', 'Client', 'Prospect'],
    }
  },
  methods: {
    addClient(e) {
      if(!this.client.first_name || !this.client.email || !this.client.cell_phone ){
        return
      } else {
        this.$store.dispatch('addClient', {
          id: this.idForClient,
          category: this.client.category,
          referral_type: this.client.referral_type,
          first_name: this.client.first_name,
          middle_initial: this.client.middle_initial,
          last_name: this.client.last_name,
          occupation: this.client.occupation,
          dob: this.client.dob,
          email: this.client.email,
          cell_phone: this.client.cell_phone,
          work_phone: this.client.work_phone,
          spouse_first_name: this.client.spouse_first_name,
          spouse_middle_initial: this.client.spouse_middle_initial,
          spouse_last_name: this.client.spouse_last_name,
          spouse_occupation: this.client.spouse_occupation,
          spouse_dob: this.client.spouse_dob,
          spouse_email: this.client.spouse_email,
          spouse_cell_phone: this.client.spouse_cell_phone,
          spouse_work_phone: this.client.spouse_work_phone,
          street_address: this.client.street_address,
          city: this.client.city,
          state: this.client.state,
          postal_code: this.client.postal_code,
        })
        e.preventDefault();
      }
      e.preventDefault();
      this.client = "" 
      this.idForClient++
      this.$router.push('/clients')
    },
  },
  created: function() {
    this.client.category = this.categories[0]
  }
}
</script>

<style scoped>

</style>

