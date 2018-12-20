<template>
  <div class="page-wrapper flex-column align-items-center">
    <div class="d-flex justify-content-center">
      <div class="col-7" v-if="$route.name == 'add' && successAlert">
        <Alert class="mb-0" v-bind:message="successAlert" v-if="successAlert" />
      </div>
      <div class="d-flex flex-row justify-content-around mt-5 col-sm-12 col-md-10 col-lg-10 flex-sm-wrap" v-if="$route.name == 'add'">
        <div class="col-sm-6 col-md-4 col-lg-4">
          <div class="card-style card-body bg-light border shadow-sm p-5">
            <div class="h3 mb-4 font-weight-bold">
              Contact
            </div>
            <i class="text-primary fas fa-user-circle fa-7x mb-4 mt-3"></i>
            <div class="mt-3">
              <router-link to="add/contact" class="btn btn-style">Create</router-link>
            </div>
          </div>
        </div>
        <div class="col-sm-6 col-md-4 col-lg-4">
          <div class="card-style card-body bg-light border shadow-sm p-5">
            <div class="h3 mb-4 font-weight-bold">
              Business
            </div>
            <i class="text-primary far fa-building fa-7x mb-4 mt-3"></i>
            <div class="mt-3">
              <router-link to="add/business" class="btn btn-style">Create</router-link>
            </div>
          </div>
        </div>
        <div class="col-sm-6 col-md-4 col-lg-4 mt-sm-3 mt-md-0">
          <div class="card-style card-body bg-light border shadow-sm p-5">
            <div class="h3 mb-4 font-weight-bold">
              Engagement
            </div>
            <i class="text-primary far fa-folder-open fa-7x mb-4 mt-3"></i>
            <div class="mt-3">
              <router-link to="add/engagement" class="btn btn-style">Create</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <router-view v-if="$route.path == 'add/contact' || 'add/engagement' || 'add/business'"></router-view>
  </div>
</template>

<script>
import Alert from '@/components/Alert.vue'
import {mapGetters} from 'vuex'
export default {
  name: 'add',
  data() {
    return {
      alert: ''
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

  &:hover {
    background: #0077ff86;
  }
} 

</style>
