<template>
    <div class="timesheet-alert mb-2 p-2 bg-success text-white font-weight-bold">
        {{ message }}
    </div>
</template>

<script>
export default {
    name: 'TimesheetAlert',
    props: ['message'],
    mounted() {
        setTimeout(() => {
            this.$store.commit('TSHEET_ALERT', null)
        }, 5000)
    }
}
</script>

<style>

</style>
