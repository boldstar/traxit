<template>

    <div>
        <div class="card shadow-sm mx-auto w-100 bg-light">
            <div class="card-body">
                <span class="pr-3 h4 text-capitalize text-primary">Welcome, {{ name }}!</span>
            </div>
        </div>

        <firm-chart></firm-chart>

    </div>  


</template>

<script>
import FirmChart from '@/components/FirmChart.vue'

export default {
    name: 'dashboard',
    components: {
        FirmChart,
    },
    data () {
        return {
             name: '',
        }
    },
    created() {
        this.$store.dispatch('retrieveName')
        .then(response => {
            this.name = response.data.name
        })
    },
}
</script>

<style scoped lang="scss">



</style>