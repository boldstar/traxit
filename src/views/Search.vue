<template>
    <div id="search">
        <div v-if="searchResults != '' && !processing">
            <div class="d-flex justify-content-between card-body p-2 shadow">
                <div class="d-flex">
                    <h4 class="mb-0 mr-2">Search Term: </h4>
                    <span class="align-self-center h4 mb-0">{{keyword}}</span>
                </div>
                <div class="d-flex">
                    <h4 class="mb-0 mr-2">Number Of Results:</h4>
                    <span class="align-self-center h4 mb-0">{{searchResults.length}}</span>
                </div>
            </div>

            <div class="flex-column mt-1 mb-3 shadow-sm">

                <!-- this is the client -->
                <div v-for="(result, index) in searchResults" :key="index" class="card mb-5">
                    <div class="text-left d-flex card-header border-primary">
                        <div class="h4 text-primary mb-0">
                            <i class="fas fa-users mr-3"></i>
                        </div>
                        <h4 class="mb-0">Contact</h4>
                    </div>
                    <div class="d-flex justify-content-around card-body shadow-sm p-0">
                         <table class="table mb-0">
                        <thead class="text-primary">
                            <tr>
                                <th scope="col">Taxpayer</th>
                                <th scope="col">Phone</th>
                                <th scope="col">Email</th>
                                <th scope="col">Spouse</th>
                                <th scope="col">Phone</th>
                                <th scope="col">Email</th>
                                <th scope="col">Details</th>
                            </tr>
                        </thead>
                        <tbody class="table-bordered">
                            <tr>
                                <th>{{result.first_name}} {{result.last_name}}</th>
                                <td>{{result.cell_phone}}</td>
                                <td>{{result.email}}</td>
                                <td>{{result.spouse_first_name}}<span v-if="spouse_last_name != null" class="ml-2">{{result.spouse_last_name}}</span><span class="ml-2" v-else>{{result.last_name}}</span></td>
                                <td>{{result.spouse_cell_phone}}</td>
                                <td>{{result.spouse_email}}</td>
                                <td>  <router-link :to="{ path: '/contact/' + result.id + '/account'}" class="btn btn-sm btn-primary">View</router-link></td>
                            </tr>
                        </tbody>
                         </table>
                    </div>

                    <!-- this is the engagements for the client -->
                    <div class="d-flex card-footer">
                        <div class="h4 text-primary mb-0">
                            <i class="far fa-folder-open mr-3"></i>
                        </div>
                        <h4 class="mb-0">Engagements</h4>
                    </div>
                
                    <table class="table mb-0">
                        <thead class="text-primary">
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Type</th>
                                <th scope="col">Return Type</th>
                                <th scope="col">Time Period</th>
                                <th scope="col">Year</th>
                                <th scope="col">Assigned To</th>
                                <th scope="col">Status</th>
                                <th>Engagement</th>
                            </tr>
                        </thead>
                        <tbody class="table-bordered">
                            <tr v-for="(engagement, index) in result.engagements" :key="index" >
                                    <th>{{engagement.name}}</th>
                                <td class="text-capitalize" v-if="engagement.type == 'taxreturn'">{{ fixCasing(engagement.type) }}</td>
                                <td class="text-capitalize" v-else>{{ engagement.type }}</td>
                                <td v-if="engagement.return_type != null">{{ engagement.return_type }}</td>
                                <td v-else>None</td>
                                <td v-if="engagement.type == 'bookkeeping'">{{engagement.title}}</td>
                                <td v-else>None</td>
                                <td>{{engagement.year}}</td>
                                <td>{{engagement.assigned_to}}</td>
                                <td>{{engagement.status}}</td>
                                <td><router-link :to="{ path: '/engagement/' + engagement.id}" class="btn btn-sm btn-primary align-self-center">View</router-link></td>
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
import Spinner from '@/components/Spinner.vue'

export default {
    name: 'search',
    components: {
        Spinner
    },
    data () {
        return {
            keyword: '',
            processing: true,
            noResults: false
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
.search-engine {
    background-size: cover;
    height: 80vh;
}

</style>



