<template>
    <div class="alert alert-primary alert-dismissible fade show" role="alert">
        {{message}}
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
</template>

<script>
export default {
    name: 'Alert',
    props: ['message'],
    mounted() {
        this.clearAlert()
    },
    methods: {
        clearAlert() {
            setTimeout(() => {
                this.$store.commit('clearAlert')
            }, 5000)
        }
    }
}
</script>


<style>

</style>

