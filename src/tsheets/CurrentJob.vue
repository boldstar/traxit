<template>
    <div class="current-job" v-if="inProgressExists && inProgressExists.length > 0">
        <div class="timesheet-in-progress card mx-3 mb-3 shadow-sm">
            <div class="card-header text-left d-flex justify-content-between">
                <span class="font-weight-bold"><span class="text-primary">In Progress</span></span>
                <div class="d-flex">
                    <button class=" btn btn-sm btn-outline-primary font-weight-bold" :disabled="processing" @click="updateTask()">
                        <span v-if="processing">Checking In...</span>
                        <span v-if="!processing">Check In</span>
                    </button>
                </div>
            </div>
            <div class="card-body d-flex justify-content-between">
                <span v-if="inProgress.name">{{ inProgress.name }}</span>
                <span v-if="inProgress.type">{{ inProgress.type }}</span>
            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import axios from 'axios'
export default {
    name: 'CurrentJob',
    props: ['current-job'],
    computed: {
        ...mapGetters(['processing']),
        inProgress() {
            return this.currentJob.reduce((acc, task) => {
                acc.push({
                    id: task.id,
                    engagement_id: task.engagements[0].id,
                    name: task.engagements[0].name,
                    type: task.engagements[0].description,
                    in_progress: task.engagements[0].in_progress
                })
                return acc
            }, []).filter(t => t.in_progress == true)[0]
        },
        inProgressExists() {
            return this.currentJob.reduce((acc, task) => {
                acc.push({
                    in_progress: task.engagements[0].in_progress
                })
                return acc
            }, []).filter(t => t.in_progress == true)
        }
    },
    methods: {
        updateTask() {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token')
            this.$store.dispatch('engagementProgress', this.inProgress.engagement_id).then(() => {
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('tsheets_access_token')
            })
        }
    }
}
</script>

<style>

</style>
