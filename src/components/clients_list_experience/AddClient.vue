<template>
  <div class="add container">
    <form @submit.prevent="addClient" class="d-flex-column justify-content-center">
      <div class="form-group">      
        <input type="text" class="form-control" placeholder="Name" v-model="client.name">
      </div>
      <div class="form-group">      
        <input type="text" class="form-control" placeholder="Individual or Business" v-model="client.type">
      </div>
      <div class="form-group">     
        <input type="text" class="form-control" placeholder="email@example.com" v-model="client.email">
      </div>
      <div class="form-group">      
        <input type="text" class="form-control" placeholder="###-###-####" v-model="client.phone">
      </div>
      <div class="form-group">      
        <input type="text" class="form-control" placeholder="1234 Hwy, City, State" v-model="client.address">
      </div>
      <button type="submit" class="btn btn-sm d-flex justify-content-start">Submit</button>
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
        name: '',
        type: '',
        email: '',
        phone: '',
        address: '',
      }
    }
  },
  methods: {
    addClient(e) {
      if(!this.client.name || !this.client.email || !this.client.phone ){
        return
      } else {
        this.$store.dispatch('addClient', {
          id: this.idForClient,
          name: this.client.name,
          type: this.client.type,
          email: this.client.email,
          phone: this.client.phone,
          address: this.client.address,
        })
        e.preventDefault();
      }
      e.preventDefault();
      this.client = "" 
      this.idForClient++
    }
  }
}
</script>

<style scoped>
    .btn {
      background-color: #42f47d;
    }
</style>

