<template>
    <div>
        <!-- this is the header for the contact engagements with the add engagement button -->
        <div class="header p-0 d-flex flex-row justify-content-between mt-2 mb-4 shadow-sm">
            <div class="ml-3 pr-2  h3 align-self-center m-0">
                <i class=" far fa-folder-open text-primary"></i> |
                <span>{{ clientEngagements.length }}</span>
            </div>
            <router-link :to=" { path: '/contact/' + client.id + '/engagements/add-engagement' }" class="mr-3 btn btn-primary btn-sm m-0 align-self-center"><i class="mr-2 fas fa-plus-square"></i>Engagement</router-link>
        </div>

        <!-- this is where the add-engagement route shows up if route is matched -->
        <transition name="router-animation" enter-active-class="animated bounceInDown" leave-active-class="animated zoomOut" mode="out-in">
            <router-view></router-view>
        </transition>

        <!-- this shows if there is engagements -->

    <div v-if="!engagementLoaded && $route.name == 'contact-engagements'">
    
            <table class="table table-hover">
                <thead class="text-primary border">
                    <tr>
                    <th  scope="col">Name</th>
                    <th  scope="col" class="hide-row">Category</th>
                    <th  scope="col" class="hide-row">Type</th>
                    <th  scope="col" class="hide-row">Return Type</th>
                    <th  scope="col" class="hide-row">Time Period</th>
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
                    <th class="text-capitalize hide-row">{{ engagement.category}}</th>
                    <th class="text-capitalize hide-row" v-if="engagement.type == 'taxreturn'">{{ fixCasing(engagement.type) }}</th>
                    <th class="text-capitalize hide-row" v-else>{{ engagement.type }}</th>
                    <th class="hide-row">{{ checkType(engagement.type, engagement.return_type) }}</th>
                    <th v-if="engagement.type == 'bookkeeping'" class="hide-row">{{ engagement.title }}</th>
                    <th v-else class="hide-row">None</th>
                    <th>{{ engagement.year }}</th>
                    <th class="mobile-hide-row">{{ engagement.assigned_to}}</th>
                    <th>{{ engagement.status }}</th>
                    <th class="mobile-hide-row">{{ engagement.created_at | formatDate }}</th>
                    <th><router-link v-bind:to="'/engagement/' + engagement.id + '/details'" class="btn btn-primary btn-sm ml-auto"><i class="far fa-eye mr-2"></i>View</router-link></th>
                    </tr>
                </tbody>
            </table> 
        </div>

                    <!-- this will show if there is no engagements only -->
        <div v-else>
            <div v-if="noEngagements & !engagementLoaded && $route.name == 'contact-engagements'" class="mt-5">
                This Contact Has No Engagements...
            </div>
        </div>


        
    <!-- this is the loading ring for the engagements -->
    <spinner v-if="engagementLoaded"></spinner>

    </div>



</template>

<script>
import { mapGetters } from 'vuex'
import Spinner from '@/components/Spinner.vue'

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

    tr {
        cursor: pointer;
    }

    .header {
        height: 4em;
    }

    .engagements {
        overflow-y: scroll;
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