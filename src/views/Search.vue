<template>
    <div id="search">
        <div v-if="searchResults != '' && !processing">
            <div class="d-flex justify-content-between card-body bg-white w-100 shadow-sm search-header">
                <div class="d-flex">
                    <h4 class="mb-0 mr-2 font-weight-bold">Search Term: </h4>
                    <span class="align-self-center h4 mb-0">{{keyword}}</span>
                </div>
                <div class="d-flex">
                    <h4 class="mb-0 mr-2 font-weight-bold">Number Of Results:</h4>
                    <span class="align-self-center h4 mb-0">{{searchResults.length}}</span>
                </div>
            </div>

            <div class="flex-column mt-1 mb-3">

                <!-- this is the client -->
                <div v-for="(result, index) in searchResults" :key="index" class="card shadow-sm" :v-bind="{'mb-3': showTable}" @mouseover="showThisTable(index)">
                    <div class="text-left d-flex card-header justify-content-between search-list-header">
                        <div class="d-flex">
                            <h4 class="mb-0 font-weight-bold align-self-center">{{result.first_name}} {{result.last_name}} | </h4>
                            <span class="align-self-center ml-2 h5 mb-0"> {{ result.engagements.length}} Engagements</span>
                        </div>
                        <div>
                            <router-link class="btn btn-link font-weight-bold text-primary" :to="'/contact/' +result.id+ '/account'">View Contact <i class="fas fa-arrow-right"></i></router-link>
                        </div>
                    </div>
                
                    <table class="table mb-0" v-if="showTable && index == selectedIndex">
                        <thead class="text-primary">
                            <tr>
                                <th scope="col">Engagement Name</th>
                                <th scope="col" class="mobile-hide-row">Type</th>
                                <th scope="col" class="mobile-hide-row">Return Type</th>
                                <th scope="col" class="hide-row">Year</th>
                                <th scope="col" class="mobile-hide-row">Assigned To</th>
                                <th scope="col">Status</th>
                                <th>Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(engagement, idx) in result.engagements" :key="idx">
                                <th>{{engagement.name}}</th>
                                <td class="text-capitalize mobile-hide-row" v-if="engagement.type == 'taxreturn'">{{ fixCasing(engagement.type) }}</td>
                                <td class="text-capitalize mobile-hide-row" v-else>{{ engagement.type }}</td>
                                <td v-if="engagement.return_type != null" class="mobile-hide-row">{{ engagement.return_type }}</td>
                                <td v-else class="mobile-hide-row">None</td>
                                <td class="hide-row">{{engagement.year}}</td>
                                <td class="mobile-hide-row">{{engagement.assigned_to}}</td>
                                <td>{{engagement.status}}</td>
                                <td><router-link :to="{ path: '/engagement/' + engagement.id + '/details'}" class="btn btn-sm btn-primary align-self-center">View</router-link></td>
                            </tr>
                            <tr v-if="result.engagements && result.engagements.length < 1">
                                <td colspan=7><span class="font-weight-bold">There are no engagements for this contact.</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        
        <div v-if="processing" class="font-weight-bold">Searching Records...</div>
        <spinner v-if="processing"></spinner>

        <div v-if="noResults">
            <img class="search-engine" src="@/assets/search-engine.png" alt="">
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Spinner from '@/components/loaders/Spinner.vue'

export default {
    name: 'search',
    components: {
        Spinner
    },
    data () {
        return {
            keyword: '',
            processing: true,
            noResults: false,
            showTable: false,
            selectedIndex: null
        }
    },
    computed: {
       ...mapGetters(['searchResults']) 
    },
    methods: {
        fixCasing(string) {
            if(string == 'taxreturn') {
                const newString = string.replace("taxreturn", "Tax Return")

                return newString
            } else {
                return string
            }
        },
        showThisTable(index) {
            this.showTable = true
            this.selectedIndex = index
        },
    },
    watch: {
        '$route.query.keyword': function() {
            console.log('im in')
            this.processing = true
            this.noResults = false
        },
        'searchResults': function(value) {
            if(value.length > 0) {
                this.processing = false
            } else {
                this.noResults = true
                this.processing = false
            }
        }
    },
    mounted() {
        setTimeout(() => {
            if(this.searchResults != '' ) {
                this.processing = false
                this.noResults = false
            } else {
                this.processing = false
                this.noResults = true
            }
        }, 4000)
    },
    created() {
       this.keyword = this.$route.query.keyword
       this.processing = true
    }
}
</script>

<style lang="scss">
.search-header {
    border-radius: 5px 5px 0 0;
    padding: 10px;
}

.search-list-header {
    border-left: 3px solid #0077ff!important;
}

.search-engine {
    background-size: cover;
    height: 80vh;
}

@media screen and (max-width: 1500px) {
    .hide-row {
        display: none;
    }
}

@media screen and (max-width: 1120px) {
    .mobile-hide-row {
        display: none;
    }
}

@media screen and (max-width: 550px) {
    .table {
        font-size: .8rem!important;
    }

    .search-header {
        display: none!important;
    }
}

</style>



