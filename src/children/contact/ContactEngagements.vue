<template>
    <div class="contact-engagements">
        <!-- this is the header for the contact engagements with the add engagement button -->
        <div class="contact-engagements-header">
            <div class="text-left">
                <h5>Contact Engagements</h5>
                <p>A list of the engagements for the selected contact</p>
            </div>
            <router-link :to=" { path: '/contact/' + client.id + '/engagements/add-engagement' }" class="btn btn-primary btn-sm align-self-center font-weight-bold"> Add Engagement</router-link>
        </div>

        <!-- this is where the add-engagement route shows up if route is matched -->
        <transition name="router-animation" enter-active-class="animated bounceInDown" leave-active-class="animated zoomOut" mode="out-in">
            <router-view></router-view>
        </transition>

        <!-- this shows if there is engagements -->
        <div v-if="!engagementLoaded && $route.name == 'contact-engagements'">
        
                <table class="table table-hover bg-white">
                    <thead class="text-primary border">
                        <tr>
                        <th  scope="col">Name</th>
                        <th  scope="col" class="hide-row">Category</th>
                        <th  scope="col" class="hide-row">Type</th>
                        <th  scope="col">Year</th>
                        <th scope="col" class="mobile-hide-row">Assigned To</th>
                        <th  scope="col">Status</th>
                        <th  scope="col" class="mobile-hide-row">Created Date</th>
                        <th  scope="col">Details</th>
                        </tr>
                    </thead>
                    <tbody class="table-bordered">
                        <tr v-for="(engagement, index) in clientEngagements" :key="index" @click="viewDetails(engagement.id)">
                        <th class="text-capitalize">{{ engagement.name }}</th>
                        <td class="text-capitalize hide-row">{{ engagement.category}}</td>
                        <td class="text-capitalize hide-row" v-if="engagement.type == 'taxreturn'">{{ fixCasing(engagement.type) }}</td>
                        <td class="text-capitalize hide-row" v-else>{{ engagement.type }}</td>
                        <td>{{ engagement.year }}</td>
                        <td class="mobile-hide-row">{{ engagement.assigned_to}}</td>
                        <td>{{ engagement.status }}</td>
                        <td class="mobile-hide-row">{{ engagement.created_at | formatDate }}</td>
                        <th><router-link v-bind:to="'/engagement/' + engagement.id + '/details'" class="btn btn-primary btn-sm ml-auto"><i class="far fa-eye mr-2"></i>View</router-link></th>
                        </tr>
                    </tbody>
                </table> 

                <div v-if="noEngagements & !engagementLoaded && $route.name == 'contact-engagements'" class="mt-3">
                    <span class="font-weight-bold">This Contact Has No Engagements...</span>
                </div>
            </div>

        <!-- this is the loading ring for the engagements -->
        <spinner v-if="engagementLoaded"></spinner>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Spinner from '@/components/loaders/Spinner.vue'

export default {
    name: 'contact-engagements',
    components: {
        Spinner
    },
    data() {
        return {
            engagementLoaded: false,
            noEngagements: false,
        }
    },
    computed: {
    ...mapGetters(['clientEngagements', 'client']),
    },
    methods: {
        fixCasing(string) {
            if(string == 'taxreturn') {
                const newString = string.replace("taxreturn", "Tax Return")

                return newString
            }
        },
        viewDetails(id) {
            this.$router.push({path: '/engagement/' + id + '/details'})
        },
        checkType(type, return_type) {
            if(type == 'taxreturn') {
                return return_type
            } else if(type == 'custom' && return_type != null) {
                return return_type
            } else {
                return 'None'
            }
        }
    },
    created() {
        this.$store.dispatch('getClientEngagements', this.$route.params.id);
        this.engagementLoaded = true;
        var self = this;
        setTimeout(() => {
            self.engagementLoaded = false;
            if(self.clientEngagements == 0){
                 self.noEngagements = true
            } else {
                self.noEngagements = false
            }
        }, 3000);
    },   
}
</script>

<style lang="scss" scoped>

    .contact-engagements {

        .contact-engagements-header {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;

            div {

                h5 {
                    margin-bottom: 0;
                }

                p {
                    margin-bottom: 0;
                    font-weight: 500;
                }    
            }
        }
    }

   @media screen and (max-width: 1300px) {
       .hide-row {
           display: none!important;
       }
   }

   @media screen and (max-width: 1180px) {
       .table {
           font-size: .8rem!important;
       }
   }

   @media screen and (max-width: 767px) {
       .mobile-hide-row {
           display: none!important;
       }
    }

</style>