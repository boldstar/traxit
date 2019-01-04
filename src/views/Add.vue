<template>
  <div class="page-wrapper">
    <div class="d-flex justify-content-center">
      <Alert class="mb-0 col-sm-12 col-md-10" v-bind:message="successAlert" v-if="successAlert && $route.name == 'add'" />
    </div>
    <div class="d-flex justify-content-center" v-if="!engagementsCard">
      <div class="d-flex flex-row justify-content-around mt-5 col-sm-12 col-md-10 col-lg-10 flex-sm-wrap" v-if="$route.name == 'add'">
        <!-- contact card -->
        <div class="col-sm-6 col-md-4">
          <div class="card-style card-body bg-light border shadow-sm p-5">
            <div class="h3 mb-4 font-weight-bold">
              <span>Contact</span>
            </div>
            <i class="text-primary fas fa-user-circle fa-7x mb-4 mt-3"></i>
            <div class="mt-3">
              <router-link to="add/contact" class="btn btn-style">Create</router-link>
            </div>
          </div>
        </div>
        <!-- business card -->
        <div class="col-sm-6 col-md-4">
          <div class="card-style card-body bg-light border shadow-sm p-5">
            <div class="h3 mb-4 font-weight-bold">
              <span>Business</span>
            </div>
            <i class="text-primary far fa-building fa-7x mb-4 mt-3"></i>
            <div class="mt-3">
              <router-link to="add/business" class="btn btn-style">Add</router-link>
            </div>
          </div>
        </div>
        <!-- engagement card -->
        <div class="col-sm-6 col-md-4 mt-sm-3 mt-md-0">
          <div class="card-style card-body bg-light border shadow-sm p-5">
            <div class="h3 mb-4 font-weight-bold">
              <span>Engagement</span>
            </div>
            <i class="text-primary far fa-folder-open fa-7x mb-4 mt-3"></i>
            <div class="mt-3">
              <button type="button" class="btn btn-style" @click="engagementsCard = true">Start</button>
            </div>
          </div>
        </div>
      </div>
    </div>


    <!-- if engagement is selected this section will show -->
    <div class="d-flex flex-column justify-content-center align-items-center mt-5" v-if="engagementsCard && $route.name == 'add'">
      <div class="card-body py-3 px-5 col-sm-12 col-md-10 col-lg-5 d-flex justify-content-between">
        <span class="font-weight-bold h3 text-primary align-self-center m-0">Choose Engagement Type</span>
        <button type="button" @click="engagementsCard=false" class="btn btn-outline-secondary btn-sm">Back</button>
      </div>
      <div class="d-flex flex-row mt-2 col-sm-12 col-md-10 col-lg-5 flex-sm-wrap" v-if="$route.name == 'add'">
        <!-- contact card -->
        <div class="col-sm-6 col-md-6">
          <div class="card-style card-body bg-light border shadow-sm p-5">
            <div class="h3 mb-4 font-weight-bold">
              <span>Tax Return</span>
            </div>
            <div class="mt-3">
              <router-link to="add/engagement/taxform" class="btn btn-style">Next</router-link>
            </div>
          </div>
        </div>
        <!-- business card -->
        <div class="col-sm-6 col-md-6">
          <div class="card-style card-body bg-light border shadow-sm p-5">
            <div class="h3 mb-4 font-weight-bold">
              <span>Bookkeeping</span>
            </div>
            <div class="mt-3">
              <router-link to="add/engagement/bookkeepingform" class="btn btn-style">Next</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>


    <div class="d-flex justify-content-center">
      <router-view v-if="$route.path == 'add/contact' || 'add/engagement' || 'add/business'"></router-view>
    </div>
  </div>
</template>

<script>
import Alert from '@/components/Alert.vue'
import {mapGetters} from 'vuex'
export default {
  name: 'add',
  data() {
    return {
      alert: '',
      engagementsCard: false
    }
  },
  components: {
    Alert
  },
  computed: {
    ...mapGetters(['successAlert'])
  },
}
</script>

<style lang="scss" scoped>

.card-style {
  border-radius: 10px;
}
 
.btn-style {
  border: 2px solid black;
  border-radius: 15px;
  padding: 10px 30px;
  font-weight: bold;
  letter-spacing: 1px;
  color: #0077ff;
  background: transparent;

  &:hover {
    background: #0077ff86;
  }
} 

</style>
