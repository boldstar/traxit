<template>
    <div class="w-100">
        <table class="table border">
            <thead>
                <tr>
                    <td>Type</td>
                    <td>Name</td>
                    <td>Shared On</td>
                    <td>Shared By</td>
                    <td>Options</td>
                </tr>
            </thead>
            <tbody class="table-bordered">
                <tr v-for="file in portalFiles" :key="file.id">
                    <th><i class="far fa-file-pdf text-danger"></i></th>
                    <th>{{ file.document_name }}</th>
                    <th>{{ file.created_at | formatDate}}</th>
                    <th>{{ file.uploaded_by }}</th>
                    <th>
                        <button class="btn-link btn btn-sm font-weight-bold" @click="viewOptions(file)">Edit</button>
                    </th>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    name: 'PortalTable',
    computed: {
        ...mapGetters(['portalFiles'])
    },
    methods: {
        viewOptions(file) {
            this.$emit('view-file-options', file)
            this.$store.commit('file_options')
            this.$store.dispatch('getPortalFile', file.id)
        }
    },
    created() {
        this.$store.dispatch('getPortalFiles', this.$route.params.id)
    }
}
</script>

<style>

.btn-link {
    text-decoration: none!important;
}
</style>
