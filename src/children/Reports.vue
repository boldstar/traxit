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
      <div class="d-flex justify-content-around col-12 mt-5">
        <div class="card-body shadow col-3 d-flex flex-column">
          <span class="h3 mb-0 py-3 bg-light">Excel</span>
          <i class="far fa-file-excel fa-5x my-4"></i>
          <div>
            <button type="button" class="btn btn-primary font-weight-bold" @click="modalShow = true">Start</button>
          </div>
        </div>
        <div class="card-body shadow col-3 d-flex flex-column">
          <span class="h3 mb-0 py-3 bg-light">PDF</span>
          <i class="far fa-file-pdf fa-5x my-4"></i>
          <div>
            <button type="button" class="btn btn-primary font-weight-bold" @click="modalShow = true">Start</button>
          </div>
        </div>
      </div>

    <b-modal v-model="modalShow" id="myWorkflow" ref="myWorkflow" hide-footer title="Reports Form">
      <select name="Custom" id="select" class="form-control my-2" v-model="selectedOption">
        <option disabled>{{option}}</option>
        <option v-for="(type, index) in reportTypes" :key="index" :value="type">{{type}}</option>
      </select>
      <form v-if="selectedOption == 'first'">
        
      </form>
      <form v-if="selectedOption == 'second'">
        
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
  name: 'reports',
  data() {
    return {
      modalShow: false,
      modalDelete: false,
      selectedOption: '',
      option: 'Choose...',
      reportTypes: ['Type 1', 'Type 2', 'Type 3', 'Type 4']
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
    this.selectedOption = this.option
  },
}
</script>

<style lang="scss" scoped>

.image {
  width: 95%;
  max-height: 75vh;
}

</style>