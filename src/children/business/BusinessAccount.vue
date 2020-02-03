<template>
  <div class="business-account-wrapper">
    <div class="business-account" v-if="$route.name != 'edit-business'">
        <div class="business-account-section card">
          <div class="card-header text-left"><span class="font-weight-bold">Business</span></div>
          <ul class="p-3">
            <li class="business-account-item"><span class="font-weight-bold">Name:</span><span>{{business.business_name}}</span></li>
            <li class="business-account-item text-right"><span class="font-weight-bold">Address:</span><span>{{business.address}} <br>{{business.city}}, {{business.state}} {{business.postal_code}}</span></li>
            <li class="business-account-item"><span class="font-weight-bold">Phone:</span><span>{{business.phone}}</span></li>
            <li class="business-account-item"><span class="font-weight-bold">Email:</span><span>{{business.email}}</span></li>
          </ul>
          <div class="card-footer text-right mt-auto">
            <router-link :to="'/business/' +business.id+ '/details/edit'" class="btn btn-secondary btn-sm font-weight-bold">Edit</router-link>
          </div>
        </div>
        <div class="business-account-section card">
          <div class="card-header text-left"><span class="font-weight-bold">Contact</span></div>
          <ul class="p-3">
            <li class="business-account-item"><span class="font-weight-bold">Owner:</span><span>{{ business.client.last_name }}, {{business.client.first_name}} <span v-if="business.client.has_spouse == true">&</span> <span v-if="business.client.last_name != business.client.spouse_last_name && business.client.has_spouse == true && business.client.spouse_last_name != null"> {{business.client.spouse_last_name}},</span> {{ business.client.spouse_first_name }}</span></li>
            <li class="business-account-item"><span class="font-weight-bold">Taxpayer Phone:</span><span>{{business.client.phone}}</span></li>
            <li class="business-account-item"><span class="font-weight-bold">Taxpayer Email:</span><span>{{business.client.email}}</span></li>
            <li class="business-account-item"><span class="font-weight-bold">Spouse Phone:</span><span>{{business.client.spouse_phone}}</span></li>
            <li class="business-account-item"><span class="font-weight-bold">Spouse Email:</span><span>{{business.client.spouse_email}}</span></li>
          </ul>
          <div class="card-footer text-right">
            <router-link :to="'/contact/' +business.client.id+ '/account'" class="btn btn-sm btn-primary font-weight-bold">View</router-link>
          </div>
        </div>
    </div>

    <div v-else>
      <router-view  :business="business"></router-view>
    </div>
  </div>
</template>

<script>
export default {
    name: 'BusinessAccount',
    props: ['business']
}
</script>

<style lang="scss">
  .business-account {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
    grid-gap: 50px;

    .business-account-section {
      min-height: 325px;
      height: 100%;

      ul {
        list-style: none;
        padding: 0;

        .business-account-item {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
        }
      }
    }
  }

</style>