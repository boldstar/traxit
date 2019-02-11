<template>
<div>

    <!-- this is the row of buttons above the clients list -->
    <div class="d-flex mb-3">
        <div class="w-25">
            <input class="form-control" placeholder="Filter By Last Name" v-model="searchClient" type="search">
        </div>
        <div class="mr-auto d-flex">
            <div class="mx-2">      
                <div class="input-group">
                    <div class="input-group-prepend">
                        <label class="input-group-text font-weight-bold bg-light text-primary" for="option">Category</label>
                    </div>
                    <select class="form-control" id="client_id" v-model="filterType">
                        <option>{{ type }}</option>
                        <option v-for="(category, index) in filterCategories" :key="index">
                        {{ category }}
                        </option>
                    </select>
                </div> 
            </div>
            <div>
                <div class="input-group">
                    <div class="input-group-prepend">
                        <label class="input-group-text font-weight-bold bg-light text-primary" for="option">Activity</label>
                    </div>
                    <select class="form-control" id="client_id" v-model.number="filterActive">
                        <option>{{ type }}</option>
                        <option value=1>Active</option>
                        <option value=0>Inactive</option>
                    </select>
                </div> 
            </div>
        </div>  

    <div class="d-flex">
        <div class="input-group d-flex" v-if="uploadInput">
            <div class="mr-2">
                <button class="btn btn-outline-secondary" @click="uploadInput = false">Cancel</button>
            </div>
            <div class="custom-file">
                <label class="custom-file-label" for="inputGroupFile04" v-if="!hasFile">Choose file</label>
                <label class="custom-file-label" for="inputGroupFile04" v-if="hasFile">{{ fileLabel }}</label>
                <input type="file" class="custom-file-input px-2" id="inputGroupFile04" aria-describedby="inputGroupFileAddon04" v-on:change="selectedFile($event)">
            </div>
            <div class="input-group-append">
                <button class="btn btn-primary" id="inputGroupFileAddon04" @click="uploadContacts">Submit</button>
            </div>
        </div>      

        <div class="btn-group ml-auto" v-if="!uploadInput">
              <button class="btn btn-outline-primary" @click="clearFilters" data-toggle="tooltip" data-placement="top" title="Clear Filters"><i class="fas fa-filter"></i></button>
            <button class="btn btn-outline-success font-weight-bold" @click="uploadInput = true" data-toggle="tooltip" data-placement="top" title="Upload Contacts"><i class="far fa-file-excel"></i></button>
            <button class="btn btn-outline-secondary font-weight-bold" @click="downloadContacts" data-toggle="tooltip" data-placement="top" title="Download Contacts"><i class="far fa-file-excel"></i></button>
            <router-link to="/add" class="btn btn-primary pt-2" data-toggle="tooltip" data-placement="top" title="Add New Contact"><i class="far fa-plus-square"></i></router-link>
        </div>
    </div>

    </div>

        
    <!-- this is the table for the list of clients -->
    <table class="table border table-light table-hover text-left">
        <thead class="text-primary hover">
            <tr>
                <th scope="col">Client</th>
                <th scope="col" @click="sort('category')">Category</th>
                <th scope="col">Taxpayer Email</th>
                <th scope="col">Taxpayer Phone</th>
                <th scope="col">Spouse Email</th>
                <th scope="col">Spouse Phone</th>
                <th scope="col" class="text-center">Details</th>
            </tr>
        </thead> 
        <tbody class="client-info table-bordered"  v-if="!tableLoaded">
            <tr v-for="(client, index) in sortedClients"  :key="index" @click="viewDetails(client.id)">
                <td class="text-capitalize">{{ client.last_name }}, {{client.first_name}} <span v-if="client.has_spouse == true">&</span> <span v-if="client.last_name != client.spouse_last_name && client.has_spouse == true && client.spouse_last_name != null"> {{client.spouse_last_name}},</span> {{ client.spouse_first_name }}</td>
                <td class="text-capitalize">{{ client.category }}</td>
                <td>{{ client.email }}</td>
                <td>{{ client.cell_phone }}</td>
                <td>{{ client.spouse_email }}</td>
                <td>{{ client.spouse_cell_phone }}</td>
                <td class="text-center"><router-link v-bind:to="'/contact/'+ client.id + '/account'"><i class="far fa-eye"></i></router-link></td>
            </tr>
        </tbody>
    </table>
        <div v-if="tableLoaded" class="lds-dual-ring justify-content-center"></div>


    <!-- this is the pagination and dropdown for per page option -->
    <nav aria-label="pagination" class="d-flex" v-if="!tableLoaded">
        <ul class="pagination">
            <li class="page-item">
                <button class="page-link" @click="prevPage">Previous</button>            
            </li>
            <li class="page-item">
                <a class="page-link">
                 {{ currentPage }}
                </a>            
            </li>
            <li class="page-item">
                <button class="page-link" @click="nextPage">Next</button>           
            </li>
        </ul>
        <div class="pl-3">
            <div class="input-group">
                <div class="input-group-prepend">
                    <label class="input-group-text" for="option">Per Page:</label>
                </div>
                <select class="custom-select" id="option" v-model="pageSize">
                    <option v-for="option in options" :key="option.id" :value="option">{{ option }}</option>
                </select>
            </div>
        </div>
        <div class="ml-auto align-self-center">
            <label for="count" class="font-weight-bold">Viewing: </label>
            <span id="count">
                {{ sortedClients.length }} of {{ clients.length }}
            </span>
        </div>  
    </nav>

    </div>
</template>

<script>


export default {
    name: 'client-info',
    props: {
        clients: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            tableLoaded: false,
            uploadInput: false,
            file: '',
            fileLabel: null,
            hasFile: false,
            filterType: '',
            filterActive: null,
            searchClient: '',
            currentSort: 'name',
            currentSortDir: 'asc',
            currentPage: 1,
            pageSize: null,
            options: ['10', '25', '50', '100'],
            type: 'All'
        }
    },
    computed: {
        sortedClients:function() {
            return this.clients.sort((a,b) => {
            let modifier = 1;
            if(this.currentSortDir === 'desc') modifier = -1;
            if(a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
            if(a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
            return 0;
            }).filter(client => {
              if(this.filterType === 'All'){ return client } else{ return client.category === this.filterType} 
            }).filter(client => {
              if(this.filterActive === 'All'){ return client } else{ return client.active === this.filterActive} 
            }).filter( client => {
            return !this.searchClient || client.last_name.toLowerCase().indexOf(this.searchClient.toLowerCase()) >= 0 })
            .filter((row, index) => {
            let start = (this.currentPage-1)*this.pageSize;
            let end = this.currentPage*this.pageSize;
            if(index >= start && index < end) return true;
            }); 
        },
        filterCategories() {
            //map categories
            const categories = this.clients.map(client => client.category)
            //filter duplicates
            const result = categories.filter((v, i) => categories.indexOf(v) === i)
            //return result
            return result
        }
    },
    methods:{
        sort:function(s) {
        //if s == current sort, reverse
            if(s === this.currentSort) {
            this.currentSortDir = this.currentSortDir==='asc'?'desc':'asc';
        }
            this.currentSort = s;
        },
            nextPage:function() {
            if((this.currentPage*this.pageSize) < this.clients.length) this.currentPage++;
        },
            prevPage:function() {
            if(this.currentPage > 1) this.currentPage--;
        },
        downloadContacts() {
            this.$store.dispatch('downloadContacts')
        },
        selectedFile(event) {
            this.file = event.target.files[0]
            this.fileLabel = event.target.files[0].name
            this.hasFile = true
        },
        uploadContacts() {
            this.$store.dispatch('uploadContacts', this.file)
        },
        viewDetails(id) {
            this.$router.push({path: '/contact/'+ id + '/account'})
        },
        clearFilters() {
            this.searchClient = ''
            this.filterType = 'All'
            this.filterActive = 'All'
        },
    },
    created() {
        this.$store.dispatch('retrieveClients');
        this.tableLoaded = true;
        this.pageSize = this.options[1]
        this.filterType = this.type
        this.filterActive = this.type
        var self = this;
        setTimeout(() => {
            self.tableLoaded = false;
        }, 3000)
    },
}
</script>

<style lang="scss" scoped>

.hover {

    &:hover {
        cursor: pointer;
    }
}

tr {
    cursor: pointer;
}

</style>


