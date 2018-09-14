<template>
    <div>
        <div class="card-header p-0 d-flex flex-row justify-content-between mb-3 shadow">
            <i class="ml-3 pr-2 far fa-folder-open h3 text-primary align-self-center m-0"></i>
            <h5 class="m-0 align-self-center">Engagements | 2</h5>
            <router-link to="#" class="mr-3 btn btn-success btn-sm m-0 align-self-center">New Engagement</router-link>
        </div>

        <div class="card-body mb-3 shadow-sm d-flex justify-content-around" v-for="(engagement, index) in engagement" :key="index">
            <h3>{{ index + 1 }}</h3>
            <h3><span>Return Type: </span> {{ engagement.return_type }} </h3>
            <h3><span>Assigned To: </span> {{ engagement.assigned_to }} </h3>
            <h3><span>Status: </span> {{ engagement.status}} </h3>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'client-engagements',
    computed: {
    ...mapGetters(['engagement'])
    },
    created() {
        this.$store.dispatch('getClientEngagement', this.$route.params.id)
    },    
}
</script>

<style lang="scss">

    .card-header {
        height: 4em;
    }

</style>