<template>
    <div class="col-9 ">
        <div class="card shadow-sm p-0 file-manager">
            <div class="card-header bg-primary d-flex justify-content-between">
                <span class="text-white font-weight-bold align-self-center h5 mb-0">File Manager</span>
                <button class="btn btn-sm bg-white text-dark font-weight-bold">Attachments</button>
            </div>
            <div class="file-details-body d-flex" v-if="files && files.length > 0 || search.length > 0">
                <ul class="inbox-list">
                    <input type="text" placeholder="Filter By Name" class="file-input-filter form-control" @input="handleInput($event)" >
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
                            <button type="button" class="btn btn-sm btn-outline-secondary"><i class="fas fa-trash"></i></button>
                            <button type="button" class="btn btn-sm btn-outline-secondary"><i class="fas fa-folder-open"></i></button>
                            <button type="button" class="btn btn-sm btn-outline-secondary" @click="archive"><i class="fas fa-archive"></i></button>
                            <button type="button" class="btn btn-sm btn-outline-secondary"><i class="fas fa-print"></i></button>
                        </div>
                    </div>
                    <div class="file-details-header p-2" >
                        <div class="file-details-header-text">
                            <span>From: <strong>{{current_file.name}}</strong> {{ fromEmail(current_file.from) }} </span>
                            <span> {{current_file.created_at}}</span>
                        </div>
                        <div class="file-details-header-text">
                            <span>To: {{account_email}}</span>
                            <span> {{current_file.expires_on}}</span>
                        </div>
                        <div class="file-details-header-text">
                            <span class="file-subject-main"> {{current_file.subject}}</span>
                            <div class="btn-group">
                                <button type="button" class="btn btn-link dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i class="fas fa-paperclip"></i>Attachments
                                </button>
                                <div class="dropdown-menu dropdown-menu-right">
                                    <span v-if="current_file.attachments" v-for="(name, index) in JSON.parse(current_file.attachments)" :key="index" class="dropdown-item file-item" @click="downloadFile(name)"><i class="fas fa-download"></i>{{ getFileName(name) }}</span>
                                    <div class="dropdown-divider"></div>
                                    <button class="dropdown-item font-weight-bold btn" @click="downloadAll">Download All</button>
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
            <div v-else><Spinner /></div>
        </div>
    </div>
</template>

<script>
import Spinner from '@/components/Spinner.vue'
export default {
    name: 'FileManager',
    props: ['files', 'account_email', 'current_file', 'search'],
    components: {Spinner},
    data() {
        return {
           
        }
    },
    computed: {

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
        },
        handleInput(event) {
            this.$emit('search-input', event.target.value)
        }
    },
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
</style>
