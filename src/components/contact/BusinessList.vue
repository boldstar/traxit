<template>
  <div class="business-list">

        <div class="d-flex">
            <div class="search-div flex-fill">
                <input class="contact-search-input" placeholder="Filter By Business Name..." v-model="searchBusiness" type="search">
            </div> 
            <div class="d-flex mobile-hide-row">
                <div class="dropdown">
                <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenu3" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i class="fas fa-cog mr-2"></i>
                    Options
                </button>
                <div class="dropdown-menu dropdown-menu-left mr-2 p-1 settings-dropdown" aria-labelledby="dropdownMenu3">
                    <button class="dropdown-item d-flex justify-content-between font-weight-bold px-1" @click="clearFilters" data-toggle="tooltip" data-placement="top" title="Clear Filters">Clear Filters<i class="fas fa-filter align-self-center text-primary"></i></button>
                    <button class="dropdown-item d-flex justify-content-between font-weight-bold px-1" @click="downloadBusinessList" data-toggle="tooltip" data-placement="top" title="Download Contacts">Download Businesses<i class="far fa-file-excel text-secondary align-self-center ml-2"></i></button>
                    <router-link to="/add" class="dropdown-item d-flex justify-content-between font-weight-bold px-1" data-toggle="tooltip" data-placement="top" title="Add New Contact">Add Business<i class="far fa-plus-square text-info align-self-center"></i></router-link>
                </div>
                </div>
            </div>
        </div>

        <table class="table border table-light table-hover">
            <thead class="text-dark hover">
                <tr>
                    <th scope="col">Business</th>
                    <th scope="col">Owner</th>
                    <th scope="col">Phone Number</th>
                    <th scope="col">Email</th>
                </tr>
            </thead> 
            <tbody class="client-info table-bordered"  v-if="!tableLoading">
                <tr v-for="(business, index) in sortedBusinessList"  :key="index" @click="viewDetails(business.id)" class="business-list-row">
                    <th>{{business.business_name}}</th>
                    <td class="text-capitalize">{{ business.client.last_name }}, {{business.client.first_name}} <span v-if="business.client.has_spouse == true">&</span> <span v-if="business.client.last_name != business.client.spouse_last_name && business.client.has_spouse == true && business.client.spouse_last_name != null"> {{business.client.spouse_last_name}},</span> {{ business.client.spouse_first_name }}</td>
                    <th>{{business.email}}</th>
                    <th>{{business.phone_number}}</th>
                </tr>
            </tbody>
        </table>

        <Spinner v-if="tableLoading" />

         <!-- this is the pagination and dropdown for per page option -->
        <nav aria-label="pagination" class="d-flex" v-if="!tableLoading">
            <ul class="pagination">
                <li class="page-item">
                    <button class="page-link font-weight-bold" @click="prevPage">Previous</button>            
                </li>
                <li class="page-item">
                    <a class="page-link">
                    {{ currentPage }}
                    </a>            
                </li>
                <li class="page-item">
                    <button class="page-link font-weight-bold" @click="nextPage">Next</button>           
                </li>
            </ul>
            <div class="pl-3 mobile-hide-row">
                <div class="input-group">
                    <div class="input-group-prepend">
                        <label class="input-group-text font-weight-bold" for="option">Per Page:</label>
                    </div>
                    <select class="custom-select" id="option" v-model="pageSize">
                        <option v-for="option in options" :key="option.id" :value="option">{{ option }}</option>
                    </select>
                </div>
            </div>
            <div class="ml-auto align-self-center mobile-hide-row">
                <label for="count" class="font-weight-bold">Viewing: </label>
                <span id="count">
                    {{ sortedBusinessList.length }} of {{ businesses.length }}
                </span>
            </div>  
        </nav>
  </div>
</template>

<script>
import Spinner from '@/components/loaders/Spinner.vue'
import {mapGetters} from 'vuex'
export default {
    name: 'BusinessList',
    props: ['businesses'],
    components: {Spinner},
    data() {
        return {
            searchBusiness: '',
            tableLoading: false,
            currentPage: 1,
            pageSize: null,
            options: ['10', '25', '50', '100'],
        }
    },
    computed: {
        sortedBusinessList() {
                return this.businesses.filter(business => {
                    return !this.searchBusiness || business.business_name.toLowerCase().indexOf(this.searchBusiness.toLowerCase()) >= 0 
                }).filter((row, index) => {
                    let start = (this.currentPage-1)*this.pageSize;
                    let end = this.currentPage*this.pageSize;
                    if(index >= start && index < end) return true;
                }); 
            },
    },
    methods: {
        nextPage:function() {
            if((this.currentPage*this.pageSize) < this.businesses.length) this.currentPage++;
        },
        prevPage:function() {
            if(this.currentPage > 1) this.currentPage--;
        },
        clearFilters() {

        },
        downloadBusinessList() {

        },
        viewDetails(id) {
            this.$router.push('/business/' + id + '/details')
        }
    },
    created() {
        this.pageSize = this.options[1]
    }
}
</script>

<style lang="scss" scoped>
.contact-search-input {
    width: 100%;
    border: 1px solid lightgray;
    padding: 10px;
    border-radius: 5px 0 0 0;
    box-sizing: border-box;
}

.dropdown .dropdown-toggle {
    border-radius: 0 5px 0 0;
    height: 100%;
}

.table thead th {
    vertical-align: middle;
    padding: .5rem;
}

.business-list-row {
    cursor: pointer;
}
</style>