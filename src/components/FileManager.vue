<template>
    <div class="col-9 ">
        <div class="card shadow-sm p-0 file-manager">
            <div class="card-header bg-primary d-flex justify-content-between">
                <span class="text-white font-weight-bold align-self-center h5 mb-0">File Manager</span>
                <span class="text-white font-weight-bold align-self-center h5 mb-0">{{selected}}</span>
            </div>
            <div class="file-details-body d-flex" v-if="files && files.length > 0 || search.length > 0">
                <ul class="inbox-list">
                    <input type="text" placeholder="Filter By Name" class="file-input-filter" @input="handleInput($event)" >
                    <li v-for="(file, index) in files" :key="index" @click="selectFile(index)" :class="{'active-file': file.id === current_file.id}">
                        <div class="d-flex flex-column align-items-between">
                            <div class="d-flex justify-content-between"><span class="font-weight-bold file-name">{{ file.name}}</span><span class="align-self-center file-list-date" :class="{'active-file-list-date': file.id === current_file.id}">{{ file.created_at | formatDate }}</span></div>
                            <div class="d-flex justify-content-between">
                                <span class="file-subject" v-if="file.subject">{{ file.subject}}</span>
                                <span class="file-subject" v-else>N/A</span>
                                <span class="file-list-date">{{ getTime(file.created_at) }}</span>
                            </div>
                        </div>
                    </li>
                    <li v-if="files.length <= 0">
                        <p v-if="search.length > 0" class="py-5 font-weight-bold">Zero Files Match Search</p>
                        <p v-else class="py-5 font-weight-bold">Zero Files</p>
                    </li>
                </ul>
                <div class="file-details" v-if="current_file">
                    <div class="file-detail-buttons p-2 d-flex">
                        <div class="btn-group" role="group" aria-label="Basic example">
                            <button type="button" class="btn btn-sm btn-outline-secondary" @click="verify('delete')"><i class="fas fa-trash"></i></button>
                            <button type="button" class="btn btn-sm btn-outline-secondary" @click="verify('archive')"><i class="fas fa-archive"></i></button>
                        </div>
                    </div>
                    <div class="file-details-header p-2" >
                        <div class="file-details-header-text">
                            <span>From: <strong>{{current_file.name}}</strong> {{ fromEmail(current_file.from) }} </span>
                            <span>Created: {{current_file.created_at | formatDate}}</span>
                        </div>
                        <div class="file-details-header-text">
                            <span>To: {{account_email}}</span>
                            <span>Expires: {{current_file.expires_on | formatDate}}</span>
                        </div>
                        <div class="file-details-header-text">
                            <span class="file-subject-main"> {{current_file.subject}}</span>
                            <div class="btn-group">
                                <button type="button" class="btn btn-link dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i class="fas fa-paperclip"></i>Attachments
                                </button>
                                <div class="dropdown-menu dropdown-menu-right">
                                    <span v-if="current_file.attachments" v-for="(name, index) in JSON.parse(current_file.attachments)" :key="index" class="dropdown-item file-item" @click="downloadFile(name)"><i class="fas fa-download"></i>{{ getFileName(name) }}</span>
                                    <div class="dropdown-divider" v-if="JSON.parse(current_file.attachments).length > 1"></div>
                                    <button class="dropdown-item font-weight-bold btn" @click="downloadAll"  v-if="JSON.parse(current_file.attachments).length > 1">Download All</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="file-details-body text-left p-3">
                        <div v-if="current_file.message" v-html="current_file.message">{{ current_file.message}}</div>
                        <p v-else>No message included</p>
                    </div>
                </div>
                <div class="d-flex justify-content-center w-100" v-else>
                    <h3 class="mt-3">No File Selected</h3>
                </div>
            </div>
            <div v-else-if="noData" class="mt-5"><p class="font-weight-bold h3">There are no files.</p></div>
            <div v-else><Spinner /></div>
        </div>

         <b-modal v-model="showModal" centered hide-footer hide-header>
            <div class="d-block text-center my-5">
                <span>
                    Are you sure you would like to <strong>{{ verifyRequest }}</strong> this file?
                </span>
            </div>
            <div class="d-flex justify-content-between mt-3">
                <button class="btn btn-primary btn-sm font-weight-bold" type="button" @click="approve">Submit</button>
                <button type="button" class="btn btn-secondary btn-sm font-weight-bold" @click="closeModal">Cancel</button>
            </div>
        </b-modal>
    </div>
</template>

<script>
import Spinner from '@/components/Spinner.vue'
import bModal from 'bootstrap-vue/es/components/modal/modal';
import bModalDirective from 'bootstrap-vue/es/directives/modal/modal';
export default {
    name: 'FileManager',
    props: ['files', 'account_email', 'current_file', 'search', 'selected'],
    components: {Spinner,'b-modal': bModal},
    data() {
        return {
           showModal: false,
           verifyRequest: '',
           timeSinceCreation: 0,
           noData: false
        }
    },
    directives: {
        'b-modal': bModalDirective
    },
    methods: {
        getTime(date) {
            const time =  new Date(date)
            var hours = time.getHours();
            var minutes = time.getMinutes();
            var ampm = hours >= 12 ? 'pm' : 'am';
            hours = hours % 12;
            hours = hours ? hours : 12; // the hour '0' should be '12'
            minutes = minutes < 10 ? '0'+minutes : minutes;
            var strTime = hours + ':' + minutes + ampm;
            return strTime;
        },
        getFileName(name) {
            const index = name.indexOf('.')
            return name.slice(index + 1)
        },
        fromEmail(email) {
            return '<' + email + '>'
        },
        selectFile(index) {
            this.$emit('select-file', index)
        },
        downloadFile(name) {
            this.$store.dispatch('downloadClientFile',{id: this.current_file.id, name: name})
        },
        downloadAll() {
            this.$store.dispatch('downloadClientFiles', this.current_file.id)
        },
        archive() {
            this.$store.dispatch('archiveClientFiles', this.current_file.id)
            this.showModal = false
        },
        handleInput(event) {
            this.$emit('search-input', event.target.value)
        },
        deleteFiles() {
            this.$store.dispatch('deleteFiles', this.current_file.id)
            this.showModal = false
        },
        verify(type) {
            this.showModal = true
            this.verifyRequest = type
        },
        approve() {
            if(this.verifyRequest) {
                if(this.verifyRequest === 'archive') {
                    this.archive()
                } else if(this.verifyRequest === 'delete') {
                    this.deleteFiles()
                }
            }
        },
        closeModal() {
            this.showModal = false
        },
        startCounting() {
            this.timeSinceCreation++
            if(this.timeSinceCreation === 10 && this.files.length <= 0) {
                this.noData = true
            } return this.timeSinceCreation
        }
    },
    watch: {
        'startCounting': function(val) {
            if(val >= 10) {
                clearInterval(this.startCounting)
            }
        }
    },
    mounted() {
        setInterval(this.startCounting, 1000)
    }
}
</script>

<style lang="scss">

    .file-manager {
        min-height: 80vh;
        height: 100%;
    }

    .inbox-list {
        list-style: none;
        width: 100%;
        max-width: 300px;
        min-width: 200px;
        padding: 0;
        margin: 0;
        border-right: 1px solid gray;
        overflow-y: scroll;
        height: 100%;

        li {
            padding: 5px 20px;
            border-bottom: 1px solid gray;
            width: 100%;
            cursor: pointer;
        }
    }

    .file-details-body {
        height: 100%;
        width: 100%;
    }

    .active-file {
        background: rgb(236, 236, 236);
    }
    

    .file-name {
        font-size: 1.0rem;
        width: 200px;
        max-width: 200px;
        overflow: hidden;
        text-overflow: ellipsis;
        text-align: left;
    }

    .file-subject {
        font-size: 1.0rem;
        width: 150px;
        max-width: 150px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        text-align: left;
    }

    .file-subject-main {
        width: 100%;
        max-width: 600px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        text-align: left;
        align-self: center;
        font-weight: bold;
    }

    .active-file-list-date {
        color: #0077ff;
    }

    .file-details {
        width: 100%;
        display: flex;
        flex-direction: column;
    }

    .file-details-header {
         border-bottom: 1px solid gray;
         margin-bottom: 10px;
         padding-bottom: 10px; 
    }

    .file-details-header-text {
        display: flex;
        justify-content: space-between;
        width: 100%;
       
    }

    .file-list-date {
        font-size: .8rem;
    }

    .file-detail-buttons {
        background: rgb(243, 243, 243);
    }

    .file-item {
        cursor: pointer;

        &:hover {
            color: #0077ff;
        }
    }

    .fa-download {
        margin-right: 5px;
    }

    .file-input-filter {
        width: 100%;
        padding: 10px;
        font-size: 1.1rem;
    }
</style>
