<template>
  <div class="mt-1">
    <div class="add-engagement">
      <div class="card-body bg-light border-primary mb-2">
        <h4 class="text-left text-primary m-0">New Engagement</h4>
      </div>
        <form @submit.prevent="addEngagement" class="d-flex-column justify-content-center">
          <div class="form-group">
            <select class="form-control mb-3" id="type" v-model="engagement.return_type">
              <option v-for="type in types" :key="type.id" :value="type">{{ type }}</option>
            </select>
            <input type="text" class="form-control mb-3" placeholder="Year" v-model="engagement.year">
            <input type="text" class="form-control mb-3" placeholder="Assign To" v-model="engagement.assigned_to">
            <input type="text" class="form-control mb-3" placeholder="Status" v-model="engagement.status">

            <div class="d-flex justify-content-between">
              <button type="submit" class="btn btn-primary d-flex justify-content-start">Create</button>
              <router-link v-bind:to="'/client/' +client.id+ '/engagements'" class="btn btn-secondary float-right">Dismiss</router-link>
            </div>
          </div>
        </form>
      </div>  
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'add-engagement',
  data() {
    return {
      engagement: {
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
    }
  },
  computed: {
    ...mapGetters(
        [
          'client',
        ]
      )
  },
  methods: {
    addEngagement(e) {
      if(!this.engagement.return_type || !this.engagement.year ){
        return
      } else {
        this.$store.dispatch('addEngagement', {
          id: this.idForEngagement,
          client_id: this.client.id,
          return_type: this.engagement.return_type,
          year: this.engagement.year,
          assigned_to: this.engagement.assigned_to,
          status: this.engagement.status,
        })
        e.preventDefault();
      }
      e.preventDefault();
      this.engagement = "" 
      this.idForEngagement++
      this.$router.go(-1);
    },
  },
  created: function() {
    this.engagement.return_type = this.types[0]
  },
}
</script>

