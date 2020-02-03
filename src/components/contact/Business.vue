<template>
    <div class="business" v-if="businesses">
       <div class="card mb-3" v-for="business in businesses" :key="business.id">
           <div class="card-header d-flex justify-content-between h3">
            <div class="d-flex">
                <i class="far fa-building mr-2 align-self-center card-title"></i>
                <span class="text-primary card-title">Business</span>
            </div>
            <span class="text-capitalize card-title">{{business.business_name}}</span>
           </div>
           <div class="card-body">
            <div class="d-flex flex-column">
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
               <div class="d-flex">
                <router-link :to="'/business/' + business.id + '/details'" class="btn btn-sm btn-primary font-weight-bold mr-3">View</router-link>
                <router-link :to="'/contact/' + client.id + '/account/business/' + business.id " class="btn btn-sm btn-primary">Edit</router-link>
               </div>
               <button type="button" class="btn btn-sm btn-secondary" @click="requestDelete(business.id)" v-if="$can('delete', business)">Delete</button>
           </div>
       </div>

       <b-modal v-model="modalShow" id="myModal" ref="myModal" hide-footer title="Delete Dependent">
            <div class="d-block text-left">
                <h5>Are you sure you want to delete?</h5>
                <br>
                <p><strong>*Warning:</strong> Can not be undone once deleted.</p>
            </div>
            <div class="d-flex">
                <b-btn class="mt-3" variant="danger" @click="modalShow = false">Cancel</b-btn>
                <b-btn class="mt-3 ml-auto" variant="outline-success" @click="deleteBusiness">Confirm</b-btn>
            </div>
        </b-modal>
    </div>
</template>

<script>
import bModal from 'bootstrap-vue/es/components/modal/modal'
import bModalDirective from 'bootstrap-vue/es/directives/modal/modal'

export default {
    name: 'Business',
    props: ['businesses', 'client'],
    components: {
        'b-modal': bModal
    },
    directives: {
        'b-modal': bModalDirective
    },
    data() {
        return {
            modalShow: false,
            businessToDelete: null
        }
    },
    methods: {
        requestDelete(id) {
            this.businessToDelete = id
            this.modalShow = true
        },
        deleteBusiness(id) {
            this.$store.dispatch('deleteBusiness', this.businessToDelete)
            this.modalShow = false
        }
    },
}
</script>

<style scoped>
 @media screen and (max-width: 1180px) {
       .card-title {
           font-size: 1.0rem!important;
       }
    }
</style>



