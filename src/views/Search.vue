<template>
    <div id="search" v-if="!processing">
        <div v-if="searchResults.length > 0">
            <div class="d-flex justify-content-between">
                <div class="d-flex">
                    <h2>Search Term</h2>
                    <span class="align-self-center h3 card bg-light ml-3 px-3">{{keyword}}</span>
                </div>
                <div class="d-flex">
                    <h2>Number Of Results</h2>
                    <span class="align-self-center h3 card bg-light ml-3 px-3">{{searchResults.length}}</span>
                </div>
            </div>
            <hr>
            <div class="flex-column mt-3">

                <!-- this is the client -->
                <div v-for="(result, index) in searchResults" :key="index" class="card mb-5">
                    <div class="text-left d-flex card-header border-primary">
                        <div class="h2 text-primary">
                            <i class="fas fa-users mr-3"></i>
                        </div>
                        <h2>Contact</h2>
                    </div>
                    <div class="d-flex justify-content-around card-body shadow-sm p-3">
                        <div class="flex-column text-left">
                            <h4>Taxpayer</h4>
                            <p>{{ result.first_name }} {{ result.last_name}}</p>
                            <p>{{ result.email}}</p>
                            <p>{{ result.cell_phone}}</p>
                            <p>{{ result.work_phone}}</p>
                        </div>
                        <div  v-if="result.has_spouse == true">
                            <div class="flex-column text-left">
                                <h4>Spouse</h4>
                                <p>{{ result.spouse_first_name}} {{ result.last_name}}</p>
                                <p>{{ result.spouse_email}}</p>
                                <p>{{ result.spouse_cell_phone}}</p>
                                <p>{{ result.spouse_work_phone}}</p>
                            </div>
                        </div>
                        <div class="align-self-center">
                            <router-link :to="{ path: '/contact/' + result.id + '/account'}" class="btn btn-primary">View</router-link>
                        </div>
                    </div>

                    <!-- this is the engagements for the client -->
                    <div class="d-flex card-footer">
                        <div class="h2 text-primary">
                            <i class="far fa-folder-open mr-3"></i>
                        </div>
                        <h2>Engagements</h2>
                    </div>
                    
                        <table class="table mb-0">
                            <thead class="text-primary">
                                <tr>
                                    <th scope="col">Return Type</th>
                                    <th scope="col">Year</th>
                                    <th scope="col">Assigned To</th>
                                    <th scope="col">Status</th>
                                    <th>Engagement</th>
                                </tr>
                            </thead>
                            <tbody class="table-bordered">
                                <tr v-for="(engagement, index) in result.engagements" :key="index" >
                                    <th scope="row">{{engagement.return_type}}</th>
                                    <td>{{engagement.year}}</td>
                                    <td>{{engagement.assigned_to}}</td>
                                    <td>{{engagement.status}}</td>
                                    <td><router-link :to="{ path: '/engagement/' + engagement.id}" class="btn btn-primary align-self-center">View</router-link></td>
                                </tr>
                            </tbody>
                        </table>
                    
                </div>
            </div>
        </div>
        


        <div v-else-if="processing">Searching Records....</div>

        <div v-else>
            <img class="search-engine" src="@/assets/search-engine.png" alt="">
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'search',
    data () {
        return {
            keyword: ''
        }
    },
    computed: {
       ...mapGetters(['searchResults', 'processing']) 
    },
    created() {
       this.keyword = this.$route.query.keyword
    }
}
</script>

<style lang="scss">
.search-engine {
    background-size: cover;
    height: 80vh;
}

</style>



