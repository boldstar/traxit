<template>
  <div class="mt-3">
    <div class="d-flex justify-content-between">
      <div class="h3">
        <span class="m-0">Reports Center</span>
      </div>
        <b-btn variant="primary" size="sm" @click="modalShow = !modalShow">Create New</b-btn>
    </div>
    <hr>

    <!-- this is the alert options -->
    <Alert v-if="errorAlert && $route.name === 'workflows'" v-bind:message="errorAlert" />
    <Alert v-if="successAlert && $route.name === 'workflows'" v-bind:message="successAlert" />

    <div class="d-flex flex-wrap justify-content-center" v-if="$route.name == 'reports'">
    <img src="@/assets/underconstruction.png" alt="" class="image">

    <b-modal v-model="modalShow" id="myWorkflow" ref="myWorkflow" hide-footer title="New Workflow Form">
      <form>
        
      </form>
    </b-modal>

    <b-modal v-model="modalDelete" id="deleteWorkflow" ref="deleteWorkflow" hide-footer title="Delete Workflow">
      <form>
        
      </form>
    </b-modal>  

  </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Alert from '@/components/Alert.vue'
import bModal from 'bootstrap-vue/es/components/modal/modal'
import bModalDirective from 'bootstrap-vue/es/directives/modal/modal'

export default {
  name: 'workflows',
  data() {
    return {
      modalShow: false,
      modalDelete: false,
    }
  },
  components:{
    'b-modal': bModal,
    Alert
  },
  directives: {
    'b-modal': bModalDirective
  },
  computed: {
    ...mapGetters(['errorAlert', 'successAlert']),
  },
  methods: {
    ...mapActions([]),
 
  },
  created: function() {
    
  },
}
</script>

<style lang="scss" scoped>

.image {
  width: 95%;
  max-height: 75vh;
}

</style>