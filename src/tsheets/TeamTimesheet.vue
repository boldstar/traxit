<template>
    <div class="team-timesheet">
        <div class="timesheet-body">
            <div class="card-header text-left">
                <span class="font-weight-bold">Team</span>
            </div>
            <table class="table table-bordered mb-0">
                <thead>
                    <tr>
                        <th>User</th>
                        <th>Time</th>
                        <th>Week</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>John Doe</td>
                        <td>5:00 HR</td>
                        <td>15:00 HR</td>
                    </tr>
                    <tr>
                        <td>Jane Go</td>
                        <td>8:00 HR</td>
                        <td>20:00 HR</td>
                    </tr>
                    <tr>
                        <td>David John</td>
                        <td>5:00 HR</td>
                        <td>10:00 HR</td>
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
    name: 'TeamTimesheet'
}
</script>

<style>

</style>
