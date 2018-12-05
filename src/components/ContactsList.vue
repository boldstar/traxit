<template>
<div>

    <!-- this is the row of buttons above the clients list -->
    <div class="d-flex mb-3">.
        <div class="w-25">
            <input class="form-control" placeholder="Filter By Last Name" v-model="searchClient" type="search">
        </div>
        <div class="mr-auto ml-2">
            <div class="input-group">
                <div class="input-group-prepend">
                <label class="input-group-text font-weight-bold bg-light text-primary" for="option">Type</label>
            </div>
            <select class="custom-select" id="client_id" v-model="filterType">
                <option v-for="(type, index) in types" :key="index">
                {{ type }}
                </option>
            </select>
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
            <button class="btn btn-outline-success font-weight-bold" @click="uploadInput = true">Import<span><i class="far fa-file-excel ml-2"></i></span></button>
            <button class="btn btn-outline-secondary font-weight-bold" @click="downloadContacts">Download <span><i class="far fa-file-excel ml-2"></i></span></button>
            <router-link to="/add" class="btn btn-primary pt-2">Contact<i class="ml-2 fas fa-plus"></i></router-link>
        </div>
    </div>

    </div>

        
    <!-- this is the table for the list of clients -->
    <table class="table border table-light table-hover text-left">
        <thead class="text-primary hover">
            <tr>
                <th scope="col">Name</th>
                <th scope="col" @click="sort('category')">Category</th>
                <th scope="col">Taxpayer Email</th>
                <th scope="col">Taxpayer Phone</th>
                <th scope="col">Spouse Email</th>
                <th scope="col">Spouse Phone</th>
                <th scope="col" class="text-center">Details</th>
            </tr>
        </thead> 
        <tbody class="client-info table-bordered"  v-if="!tableLoaded">
            <tr v-for="(client, index) in sortedClients"  :key="index">
                <td class="text-capitalize">{{ client.last_name }}, {{client.first_name}} <span v-if="client.has_spouse == true">&</span> {{ client.spouse_first_name }}</td>
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
            filterType: 'All',
            searchClient: '',
            currentSort: 'name',
            currentSortDir: 'asc',
            currentPage: 1,
            pageSize: null,
            options: ['10', '25', '50', '100'],
            types: ['All', 'Client', 'Prospect']
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
            }).filter( client => {
            return !this.searchClient || client.last_name.toLowerCase().indexOf(this.searchClient.toLowerCase()) >= 0 })
            .filter((row, index) => {
            let start = (this.currentPage-1)*this.pageSize;
            let end = this.currentPage*this.pageSize;
            if(index >= start && index < end) return true;
            }); 
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
        }
    },
    created() {
        this.$store.dispatch('retrieveClients');
        this.tableLoaded = true;
        this.filterType = this.types[0]
        this.pageSize = this.options[1]
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


</style>


