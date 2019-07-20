<template>
    <div class="current-job">
        <div class="timesheet-in-progress card mx-3 mb-3 shadow-sm">
            <div class="card-header text-left d-flex justify-content-between">
                <span class="font-weight-bold">Currently Working On</span>
                <div class="d-flex">
                    <button class="mr-2 btn btn-sm btn-secondary font-weight-bold">Stop</button>
                    <button class=" btn btn-sm btn-info font-weight-bold">Check In</button>
                </div>
            </div>
            <div class="card-body">
                Details of what is in progress
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CurrentJob'
}
</script>

<style>

</style>
