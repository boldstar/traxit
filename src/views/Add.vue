<template>
  <div class="page-wrapper d-flex justify-content-center flex-column align-items-center">
    <div class="col-7" v-if="$route.name == 'add'">
      <Alert class="mb-0" v-bind:message="successAlert" v-if="successAlert" />
    </div>
    <div class="d-flex flex-row justify-content-center mt-5 col-12" v-if="$route.name == 'add'">
      <div class="card-style card-body bg-light border shadow-sm py-5 px-5 col-3">
        <div class="h3 mb-4 font-weight-bold">
          Contact
        </div>
        <i class="text-primary fas fa-user-circle fa-7x mb-4 mt-3"></i>
        <div class="mt-3">
          <router-link to="add/contact" class="btn btn-style">Create</router-link>
        </div>
      </div>
      <div class="card-style card-body bg-light border shadow-sm py-5 mx-4 col-3">
        <div class="h3 mb-4 font-weight-bold">
          Business
        </div>
        <i class="text-primary far fa-building fa-7x mb-4 mt-3"></i>
        <div class="mt-3">
          <router-link to="add/business" class="btn btn-style">Create</router-link>
        </div>
      </div>
      <div class="card-style card-body bg-light border shadow-sm py-5 col-3">
        <div class="h3 mb-4 font-weight-bold">
          Engagement
        </div>
        <i class="text-primary far fa-folder-open fa-7x mb-4 mt-3"></i>
        <div class="mt-3">
          <router-link to="add/engagement" class="btn btn-style">Create</router-link>
        </div>
      </div>
    </div>
    <router-view v-if="$route.path == 'add/contact' || 'add/engagement'"></router-view>
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
  width: 250px;
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
