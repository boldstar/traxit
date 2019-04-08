<template>
  <div class="page-wrapper">
    <div class="d-flex justify-content-center">
      <Alert class="mb-0 col-sm-12 col-md-10" v-bind:message="successAlert" v-if="successAlert && $route.name == 'add'" />
    </div>
    <div class="d-flex justify-content-center" v-if="!engagementsCard">
      <div class="d-flex flex-row justify-content-around mt-5 col-sm-12 col-md-10 col-lg-10 flex-sm-wrap card-content" v-if="$route.name == 'add'">
        <!-- contact card -->
        <div class="col-sm-6 col-md-4">
          <div class="card-style card-body bg-light border shadow-sm">
            <div class="h3 mb-4 font-weight-bold">
              <span class="span-title">Contact</span>
            </div>
            <i class="text-primary fas fa-user-circle fa-7x mb-4 mt-3 icon"></i>
            <div class="mt-3">
              <router-link to="add/contact" class="btn btn-style">Create</router-link>
            </div>
          </div>
        </div>
        <!-- business card -->
        <div class="col-sm-6 col-md-4">
          <div class="card-style card-body bg-light border shadow-sm">
            <div class="h3 mb-4 font-weight-bold">
              <span class="span-title">Business</span>
            </div>
            <i class="text-primary far fa-building fa-7x mb-4 mt-3 icon"></i>
            <div class="mt-3">
              <router-link to="add/business" class="btn btn-style">Add</router-link>
            </div>
          </div>
        </div>
        <!-- engagement card -->
        <div class="col-sm-6 col-md-4 mt-sm-3 mt-md-0">
          <div class="card-style card-body bg-light border shadow-sm">
            <div class="h3 mb-4 font-weight-bold">
              <span class="span-title">Engagement</span>
            </div>
            <i class="text-primary far fa-folder-open fa-7x mb-4 mt-3 icon"></i>
            <div class="mt-3">
              <button type="button" class="btn btn-style" @click="engagementsCard = true">Start</button>
            </div>
          </div>
        </div>
      </div>
    </div>


    <!-- if engagement is selected this section will show -->
    <div class="d-flex flex-column justify-content-center align-items-center mt-5 card-content" v-if="engagementsCard && $route.name == 'add'">
      <div class="d-flex card p-0 col-sm-12 col-md-10 col-lg-8 flex-sm-wrap shadow m-3 engagement-body" v-if="$route.name == 'add'">
      <div class="card-header d-flex justify-content-between">
        <span class="font-weight-bold h3 text-primary align-self-center m-0 span-title">Choose Engagement Type</span>
        <button type="button" @click="engagementsCard=false" class="btn btn-outline-secondary btn-sm font-weight-bold">Back</button>
      </div>
      <div class="card-body d-flex flex-wrap">
        <!-- tax return engagement form -->
        <div class="col-sm-6 col-md-6 card-option">
          <div class="card-style card-body bg-light border shadow-sm">
            <div class="h3 mb-4 font-weight-bold">
              <span class="span-title">Tax Return</span>
            </div>
            <div class="mt-3">
              <router-link to="add/engagement/taxform" class="btn btn-style">Next</router-link>
            </div>
          </div>
        </div>
        <!-- bookkeeping engagement form -->
        <div class="col-sm-6 col-md-6 card-option">
          <div class="card-style card-body bg-light border shadow-sm">
            <div class="h3 mb-4 font-weight-bold">
              <span class="span-title">Bookkeeping</span>
            </div>
            <div class="mt-3">
              <router-link to="add/engagement/bookkeepingform" class="btn btn-style">Next</router-link>
            </div>
          </div>
        </div>
        <!-- custom engagement form -->
        <div class="col-sm-6 col-md-6 mx-auto mt-4 card-option">
          <div class="card-style card-body bg-light border shadow-sm">
            <div class="h3 mb-4 font-weight-bold">
              <span class="span-title">Custom</span>
            </div>
            <div class="mt-3">
              <router-link to="add/engagement/customform" class="btn btn-style">Next</router-link>
            </div>
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

@media screen and (max-width: 1300px) {
  .icon {
    font-size: 3.75rem!important;
  }

  .btn-style {
    padding: 5px 15px;
    letter-spacing: 0;
    border-radius: 5px;
  }

  .span-title {
    font-size: 1.25rem!important;
  }
}


@media screen and (max-width: 650px) {
  .card-content {
    flex-direction: column!important;
    margin-top: 0!important;
  }

  .card-option {
    margin-top: 10px!important;
  }

  i {
    display: none!important;
  }

  .card-style {
    margin-bottom: 20px!important;
  }

  .span-title {
    font-size: 1rem!important;
  }

  .engagement-body {
    box-shadow: none!important;
    border: none!important;
  }

  .card-header {
    background-color: white!important;
  }
}
</style>
