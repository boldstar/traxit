<template>
    <div class="timesheet-totals">
        <div class="timesheet-body">
            <table class="table table-bordered mb-0">
                <thead>
                    <tr>
                        <th>Current</th>
                        <th>Today</th>
                        <th>Week</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>5:00 HR</td>
                        <td>5:00 HR</td>
                        <td>15:00 HR</td>
                    </tr>
                </tbody>
            </table>
            <div class="card-footer text-right">
                <button class="btn btn-sm btn-danger">Clock Out</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TimesheetTotals'
}
</script>

<style>

</style>
