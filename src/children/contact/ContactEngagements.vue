<template>
    <div class="contact-engagements">
        <!-- this is the header for the contact engagements with the add engagement button -->
        <div class="contact-engagements-header">
            <div class="text-left">
                <h5>Contact Engagements</h5>
                <p>A list of the engagements for the selected contact</p>
            </div>
            <div class="d-flex">
            <button class="btn btn-secondary btn-sm align-self-center font-weight-bold mr-3" @click="toggleFilters">Filter List</button>
                <router-link :to=" { path: '/contact/' + client.id + '/engagements/add-engagement' }" class="btn btn-primary btn-sm align-self-center font-weight-bold"> Add Engagement</router-link>
            </div>
        </div>

        <!-- this is where the add-engagement route shows up if route is matched -->
        <transition name="router-animation" enter-active-class="animated bounceInDown" leave-active-class="animated zoomOut" mode="out-in">
            <router-view></router-view>
        </transition>

        <!-- this shows if there is engagements -->
        <div v-if="!engagementLoaded && $route.name == 'contact-engagements'">

                <div class="filter-contact-engagements" v-if="showFilters">
                    <div class="custom-input-group text-left">
                        <span for="name-filter">Name</span>
                        <select name="name-filter" id="name-filter" v-model="nameFilter">
                            <option disabled>{{defaultFilter}}</option>
                            <option v-for="(name, index) in names" :key="index" :value="name">{{name}}</option>
                        </select>
                    </div>
                    <div class="custom-input-group text-left">
                        <span for="category-filter">Category</span>
                        <select name="category-filter" id="category-filter" v-model="categoryFilter">
                            <option disabled>{{defaultFilter}}</option>
                            <option v-for="(category, index) in categories" :key="index" :value="category">{{category}}</option>
                        </select>
                    </div>
                    <div class="custom-input-group text-left">
                        <span for="type-filter">Type</span>
                        <select name="type-filter" id="type-filter" v-model="typeFilter">
                            <option disabled>{{defaultFilter}}</option>
                            <option v-for="(type, index) in types" :key="index" :value="type" class="text-capitalize">{{ type }}</option>
                        </select>
                    </div>
                    <div class="custom-input-group text-left">
                        <span for="year-filter">Year</span>
                        <select name="year-filter" id="year-filter" v-model="yearFilter">
                            <option disabled>{{defaultFilter}}</option>
                            <option v-for="(year, index) in years" :key="index" :value="year">{{ year }}</option>
                        </select>
                    </div>

                    <button class="btn btn-sm btn-secondary align-self-center ml-3 font-weight-bold" @click="clearFilters">Clear Filters</button>
                </div>

                <table class="table table-hover bg-white">
                    <thead class="text-primary border">
                        <tr>
                        <th  scope="col">Name</th>
                        <th  scope="col" class="hide-row">Category</th>
                        <th  scope="col" class="hide-row">Type</th>
                        <th  scope="col">Year</th>
                        <th  scope="col" class="mobile-hide-row">Time Period</th>
                        <th scope="col" class="mobile-hide-row">Assigned To</th>
                        <th  scope="col">Status</th>
                        <th  scope="col" class="mobile-hide-row">Created Date</th>
                        <th  scope="col">Details</th>
                        </tr>
                    </thead>
                    <tbody class="table-bordered">
                        <tr v-for="(engagement, index) in filteredEngagements" :key="index" @click="viewDetails(engagement.id)">
                        <th class="text-capitalize">{{ engagement.name }}</th>
                        <td class="text-capitalize hide-row">{{ engagement.category}}</td>
                        <td class="text-capitalize hide-row" v-if="engagement.type == 'taxreturn'">{{ fixCasing(engagement.type) }}</td>
                        <td class="text-capitalize hide-row" v-else>{{ engagement.type }}</td>
                        <td>{{ engagement.year }}</td>
                        <td v-if="engagement.title" class="mobile-hide-row">{{ engagement.title }}</td>
                        <td v-else class="mobile-hide-row">None</td>
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
            nameFilter: null,
            categoryFilter: null,
            typeFilter: null,
            yearFilter: null,
            defaultFilter: 'Choose option...',
            showFilters: false
        }
    },
    computed: {
    ...mapGetters(['clientEngagements', 'client']),
        filteredEngagements() {
            return this.clientEngagements.filter(eng =>  {
            if(this.nameFilter != this.defaultFilter){ return eng.name == this.nameFilter } else{ return eng} 
            }).filter(eng =>  {
            if(this.categoryFilter != this.defaultFilter){ return eng.category == this.categoryFilter } else{ return eng} 
            }).filter(eng =>  {
            if(this.typeFilter != this.defaultFilter){ return eng.type == this.typeFilter } else{ return eng} 
            }).filter(eng =>  {
            if(this.yearFilter != this.defaultFilter){ return eng.year == this.yearFilter } else{ return eng} 
            })
        },
        names() {
            const names =  this.clientEngagements.map(eng => eng.name)
            const result = names.filter((v, i) => names.indexOf(v) === i)
            return result
        },
        categories() {
            const categories = this.clientEngagements.map(eng => eng.category)
            const result = categories.filter((v, i) => categories.indexOf(v) === i)
            return result
        },
        types() {
            const types = this.clientEngagements.map(eng => eng.type)
            const result = types.filter((v, i) => types.indexOf(v) === i)
            return result
        },
        years() {
            const years = this.clientEngagements.map(eng => eng.year)
            const result = years.filter((v, i) => years.indexOf(v) === i)
            return result
        }
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
        },
        clearFilters() {
            this.nameFilter = this.defaultFilter
            this.categoryFilter = this.defaultFilter
            this.typeFilter = this.defaultFilter
            this.yearFilter = this.defaultFilter
        },
        toggleFilters() {
            this.clearFilters()
            this.showFilters = !this.showFilters
        }
    },
    created() {
        this.$store.dispatch('getClientEngagements', this.$route.params.id);
        this.engagementLoaded = true;
        this.nameFilter = this.defaultFilter
        this.categoryFilter = this.defaultFilter
        this.typeFilter = this.defaultFilter
        this.yearFilter = this.defaultFilter
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

    .filter-contact-engagements {
        padding: 3px;
        display: flex;
        background: white;
    }

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