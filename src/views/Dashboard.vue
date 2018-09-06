<template>

    <div>
        <div class="card shadow-sm mx-auto w-100 bg-light">
            <div class="card-body">
                <span class="pr-3 h4 text-capitalize text-primary">Welcome, {{ name }}!</span>
            </div>
            <hr class="mt-0 shadow">
            <div class="d-flex mb-4 justify-content-around">
                <div class="card">
                    <div class="card-body">
                        <h5>Overview</h5>
                    </div>
                </div>
                <div class="card">
                    <div class="card-body">
                        <h5>Tasks</h5>
                    </div>
                </div>

                <div class="card">
                    <div class="card-body">
                        <h5>Pending</h5>
                    </div>
                </div>
            </div>
        </div>
    </div>  


</template>

<script>


export default {
    name: 'dashboard',
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">



</style>