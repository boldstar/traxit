<template>
    <div class="business" v-if="businesses">
       <div class="card mb-3" v-for="business in businesses" :key="business.id">
           <div class="card-header d-flex justify-content-between h3">
            <div class="d-flex">
                <i class="far fa-building mr-2 align-self-center"></i>
                <span class="text-primary">Business</span>
            </div>
            <span class="text-capitalize">{{business.business_name}}</span>
           </div>
           <div class="card-body">
            <div class="d-flex flex-column">
                <div class="d-flex justify-content-between mb-2">
                    <span class="font-weight-bold">Type</span>
                    <span>{{business.business_type}}</span>
                </div>
                <div class="d-flex justify-content-between mb-2">
                    <span class="font-weight-bold">Address</span>
                    <span>{{business.address}}</span>
                </div>
                <div class="d-flex justify-content-between mb-2">
                    <span class="font-weight-bold">City</span>
                    <span>{{business.city}}</span>
                </div>
                <div class="d-flex justify-content-between mb-2">
                    <span class="font-weight-bold">State</span>
                    <span>{{business.state}}</span>
                </div>
                <div class="d-flex justify-content-between mb-2">
                    <span class="font-weight-bold">Postal Code</span>
                    <span>{{business.postal_code}}</span>
                </div>
                <div class="d-flex justify-content-between mb-2">
                    <span class="font-weight-bold">Email</span>
                    <span>{{business.email}}</span>
                </div>
                <div class="d-flex justify-content-between mb-2">
                    <span class="font-weight-bold">Phone Number</span>
                    <span>{{business.phone_number}}</span>
                </div>
                <div class="d-flex justify-content-between mb-2">
                    <span class="font-weight-bold">Fax Number</span>
                    <span>{{business.fax_number}}</span>
                </div>
            </div>   
           </div>
           <div class="card-footer d-flex justify-content-between">
               <router-link :to="'/contact/' + client.id + '/account/edit-business/' + business.id " class="btn btn-sm btn-primary">Edit</router-link>
               <button type="button" class="btn btn-sm btn-secondary" @click="deleteBusiness(business.id)">Delete</button>
           </div>
       </div>
    </div>
</template>

<script>
export default {
    name: 'Business',
    props: ['businesses', 'client'],
    methods: {
        deleteBusiness(id) {
            this.$store.dispatch('deleteBusiness', id)
        }
    },
}
</script>


