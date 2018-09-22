<template>
  <div class="page-wrapper mt-1">
  <div class="card bg-light flex-row justify-content-between py-2 px-3">
    <h2 class="m-0">{{ engagement.return_type}}</h2>  
    <h2 class="m-0">{{ engagement.year }}</h2>
  </div> 

  <div class="text-left ml-2">
    <h2 class="mt-5">Client: </h2>
    <h2 class="my-5">Status: {{ engagement.status }}</h2>
    <h2 class="">Currently Assigned: {{ engagement.assigned_to}} </h2>  
  </div>

  <div class="flex-row justify-content-between d-flex my-5">
    <button class="btn btn-primary">Edit</button> 
    <b-btn class="outline-secondary" v-b-modal.myModal><i class="fas fa-trash"></i><span class="ml-2">Delete</span></b-btn>
  </div>   

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
import bModal from 'bootstrap-vue/es/components/modal/modal'
import bModalDirective from 'bootstrap-vue/es/directives/modal/modal'

export default {
  name: 'EngagementDetails',
  components:{
    'b-modal': bModal
  },
  directives: {
    'b-modal': bModalDirective
  },
  computed: {
    ...mapGetters(
        [
          'engagement'
        ]
      )
  },
  methods: {
    deleteEngagement(id) {
      this.$store.dispatch('deleteEngagement', id)
      .then(() => {
        this.$router.push({path: '/engagements'});
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
  }
  
}
</script>


<style scoped lang="scss">

</style>
