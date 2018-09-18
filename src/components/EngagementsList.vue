<template>
    <div>
        <table class="table table-bordered table-light table-striped table-hover text-left">
            <thead class="thead-primary hover">
                <tr>
                    <th scope="col" @click="sort('category')">Client</th>
                    <th scope="col" @click="sort('last_name')">Return Type</th>
                    <th scope="col">Year</th>
                    <th scope="col">Assigned To</th>
                    <th scope="col">Status</th>
                    <th scope="col" class="text-center">Details</th>
                </tr>
            </thead> 
            <tbody class="client-info">
                <tr v-for="(engagement, index) in engagements"  :key="index">
                    <td>{{ engagement.client.last_name }}, {{ engagement.client.first_name }} & {{ engagement.client.spouse_first_name }}</td>
                    <td>{{ engagement.return_type }}</td>
                    <td>{{ engagement.year }}</td>
                    <td>{{ engagement.assigned_to }}</td>
                    <td>{{ engagement.status }}</td>
                    <td class="text-center"><router-link to="/engagements"><i class="far fa-eye"></i></router-link></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>


export default {
    name: 'EngagementsList',
    props: {
        engagements: {
            type: Array,
            default: () => []
        }
    },
    created() {
        this.$store.dispatch('retrieveEngagements')
    },
}
</script>

<style lang="scss" scoped>


</style>