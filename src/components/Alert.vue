<template>
    <div class="alert alert-primary alert-dismissible fade show" role="alert">
        {{message}}
        <button type="button" class="close" data-dismiss="alert" aria-label="Close" @click="removeAlert">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
</template>

<script>
export default {
    name: 'Alert',
    props: ['message'],
    methods: {
        removeAlert() {
            this.$store.commit('clearAlert')
        }
    }
}
</script>


<style>

</style>

