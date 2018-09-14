<template>
  <div class="page-wrapper mt-1">
    <div class="add-engagement container">
    <div class="card-body bg-light border-primary mb-2">
      <h4 class="text-left text-primary m-0"><i class="far fa-address-book mr-2"></i>New Engagement</h4>
    </div>
    <form @submit.prevent="addEngagement" class="d-flex-column justify-content-center">
      <div class="form-group">
        <select class="form-control mb-3" id="type" v-model="engagement.return_type">
          <option v-for="type in types" :key="type.id" :value="type">{{ type }}</option>
        </select>
        <input type="text" class="form-control mb-3" placeholder="Year" v-model="engagement.year">
        <input type="text" class="form-control mb-3" placeholder="Status" v-model="engagement.status">
        <input type="text" class="form-control mb-3" placeholder="Assign To" v-model="engagement.assigned_to">

      <button type="submit" class="btn btn-lg btn-primary d-flex justify-content-start">Create</button>
      </div>
    </form>
  </div>  
  </div>
</template>

<script>


export default {
  name: 'add-engagement',
  data() {
    return {
      engagement: {
        return_type: null,
        year: '',
        status: '',
        assigned_to: '',
      },
      types: [ 
        'Choose Return Type...', 
        '1040', 
        '1120',
      ],
    }
  },
   methods: {
    addEngagement(e) {
      if(!this.engagement.return_type|| !this.engagement.year || !this.engagement.assigned_to ){
        return
      } else {
        this.$store.dispatch('addEngagement', {
          id: this.idForEngagement,
          return_type: this.engagement.return_type,
          year: this.engagement.year,
          status: this.engagement.status,
          assigned_to: this.engagement.assigned_to
        })
        e.preventDefault();
      }
      e.preventDefault();
      this.engagement = "" 
      this.idForEngagement++
      this.$router.push('/engagements')
    },
  },
  created: function() {
    this.engagement.return_type = this.types[0]
  }

}
</script>

<style lang="scss" scoped>

</style>
