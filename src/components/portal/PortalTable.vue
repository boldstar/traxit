<template>
    <div class="w-100 mb-4">
        <table class="table border">
            <thead>
                <tr>
                    <td>Type</td>
                    <td>Tax Year</td>
                    <td>Name</td>
                    <td>Shared On</td>
                    <td>Shared By</td>
                    <td>Options</td>
                    <td><i class="fas fa-trash"></i></td>
                </tr>
            </thead>
            <tbody class="table-bordered" v-if="portalFiles && portalFiles.length > 0">
                <tr v-for="file in portalFiles" :key="file.id">
                    <th><i class="far fa-file-pdf text-danger"></i></th>
                    <th>{{ file.tax_year }}</th>
                    <th>{{ file.document_name }}</th>
                    <th>{{ file.created_at | formatDate}}</th>
                    <th>{{ file.uploaded_by }}</th>
                    <th>
                        <button class="btn-link btn btn-sm font-weight-bold" @click="viewOptions(file)">Edit</button>
                    </th>
                    <th>
                        <button class="btn-link btn btn-sm font-weight-bold text-danger" @click="requestDelete(file)">X</button>
                    </th>
                </tr>
            </tbody>
        </table>
        <div v-if="portalFiles && portalFiles.length < 1" class="no-docs">
            <i class="fas fa-file-alt"></i>
            <p>No Documents<br> Currently Shared</p>   
        </div>

        <delete-modal :name="fileToDelete" :key="deleteModal" :warning="''"></delete-modal>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    name: 'PortalTable',
    data() {
        return {
            fileToDelete: null
        }
    },
    computed: {
        ...mapGetters(['portalFiles', 'deleteModal'])
    },
    methods: {
        viewOptions(file) {
            this.$store.dispatch('getPortalFile', file.id)
            .then(() => {
                this.$emit('view-file-options', file)
                this.$store.commit('file_options')
            })
        },
        requestDelete(file) {
            this.fileToDelete = file.document_name
            this.$store.commit('toggleDeleteModal', {
                id: file.id, 
                action: 'deletePortalFile',
                warning: '',
                name: file.document_name
            })
        }
    },
    created() {
        this.$store.dispatch('getPortalFiles', this.$route.params.id)
    }
}
</script>

<style lang="scss">

.btn-link {
    text-decoration: none!important;
}

.no-docs {
    padding: 40px;
    position: relative;
    display: block;
    width: 250px;
    margin: 30px auto;

    p {
        font-weight: bold;
    }


    i {
        font-size: 5.5rem;
        color: #0077ff;
    }

    &:after {
        content: "";
        display: inline-block;
        position: absolute;
        top: -10px;
        left: 0;
        height: 250px;
        width: 250px;
        border-radius: 50%;
        border: 2px solid lightgray;
        background: rgb(238, 238, 238);
        z-index: -1;
        margin: 0;
    }
}
</style>
