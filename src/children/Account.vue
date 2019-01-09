<template>
  <div class="mt-3">
    <div class="d-flex justify-content-between">
      <div class="h3">
        <span class="m-0">Account Details</span>
      </div>
      <div class=" align-self-center">
        <router-link :to="{path: '/administrator/account/edit-account'}" class="btn btn-primary" v-if="accountDetails">Edit Details</router-link>
        <router-link :to="{path: '/administrator/account/add-account'}" class="btn btn-primary" v-else>Add Details</router-link>
      </div>
    </div>
    <hr>
      <ul class="h4 text-left" v-if="$route.name == 'app-account' && accountDetails">
        <li class="border">
          <div class="d-flex">
          <span class="border-right p-3 background width">Business Name</span>
          <span class="ml-5 align-self-center">{{ accountDetails.business_name }}</span>
          </div>
        </li>
        <li class="border">
          <div class="d-flex">
          <span class="border-right p-3 background width">Address</span>
          <span class="ml-5 align-self-center" v-if="accountDetails.address">{{ accountDetails.address }}, {{ accountDetails.city }}, {{ accountDetails.state }} {{ accountDetails.postal_code }}</span>
          </div>
        </li>
        <li class="border">
          <div class="d-flex">
          <span class="border-right p-3 background width">Account Email</span>
          <span class="ml-5 align-self-center">{{ accountDetails.email }}</span>
          </div>
        </li>
        <li class="border">
          <div class="d-flex">
          <span class="border-right p-3 background width">Phone Number</span>
          <span class="ml-5 align-self-center">{{ accountDetails.phone_number }}</span>
          </div>
        </li>
        <li class="border">
          <div class="d-flex">
          <span class="border-right p-3 background width">Fax Number</span>
          <span class="ml-5 align-self-center">{{ accountDetails.fax_number }}</span>
          </div>
        </li>
        <li class="border">
          <div class="d-flex">
          <span class="border-right p-3 background width">Logo</span>
          <span class="ml-5 align-self-center">Logo</span>
          </div>
        </li>
        <li class="border">
          <div class="d-flex">
          <span class="border-right p-3 background width">Subscription</span>
          <span class="ml-5 align-self-center">{{ accountDetails.subscription }}</span>
          </div>
        </li>
      </ul>

      <!-- this is for viewing the account form -->
      <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'account',
  computed: {
    ...mapGetters(
        [
          'accountDetails'
        ]
      ),
  },
  created: function() {
    this.$store.dispatch('getAccountDetails')
  },
}
</script>

<style lang="scss" scoped>

  li {
    list-style: none;
    margin: 20px 0;
    border-radius: 10px;

    .background {
      background-color: #0077ff3d;
      color: gray;
    }
  }

  .width {
    width: 300px;
    text-align: right;
  }
</style>