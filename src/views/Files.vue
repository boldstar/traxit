<template>
    <div class="files">
        <div class="card-header bg-white shadow w-100 d-flex justify-content-between border files-header mb-3">
            <div class="d-flex">
                <span class="h5 mb-0 align-self-center">File Manager</span>
            </div>
            <div class="d-flex">
                <button class="btn btn-sm btn-outline-primary refresh"><i class="fas fa-sync-alt mr-2"></i>Refresh</button>
            </div>
        </div>

        <div class="files-body">
            <FileSidebar :selected="sidebar_item" @change-item="changeSelectedItem" :inbox_length="inboxFiles"/>
            <FileManager :files="filteredFiles" :current_file="currentFile" :account_email="accountDetails.email" v-if="all_files" @select-file="changeCurrentFile" @search-input="search" :search="searchFile"/>
        </div>

    </div>
</template>

<script>
import FileSidebar from '@/components/FileSidebar.vue'
import FileManager from '@/components/FileManager.vue'
import {mapGetters} from 'vuex'

export default {
    name: 'Files',
    components: {
        FileSidebar,
        FileManager
    },
    data() {
        return {
            index: 0,
            sidebar_item: 'Inbox',
            archivedState: false,
            searchFile: ''
        }
    },
    computed: {
        ...mapGetters(['all_files', 'accountDetails']),
        filteredFiles() {
            return this.all_files.filter(file => file.archived == this.archivedState).filter( file => {
            return !this.searchFile || file.name.toLowerCase().indexOf(this.searchFile.toLowerCase()) >= 0 })
        },
        inboxFiles() {
            return this.all_files.filter(file => file.archived == false).length
        },
        currentFile() {
            return this.filteredFiles[this.index]
        }
    },
    methods: {
        changeCurrentFile(index) {
            this.index = index
        },
        changeSelectedItem(item) {
            this.sidebar_item = item
            if(item === 'Inbox') {
                this.archivedState = false
            } else {
                this.archivedState = true
            }
        },
        search(value) {
            console.log(value)
            this.searchFile = value
        }
    },
    created() {
        this.$store.dispatch('getFiles')
        this.$store.dispatch('getAccountDetails')
    }
}
</script>

<style>
    .files {
        min-height: 80vh;
        position: relative;
        z-index: 0;
    }

    .files-header {
        z-index: 99;
    }

    .files-body {
        display: flex;
        justify-content: space-around;
    }
</style>
