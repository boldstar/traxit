<template>
    <div class="card px-0 mb-3 shadow-sm w-100">
        <div class="card-header d-flex justify-content-between">
            <div class="text-primary font-weight-bold">
            <span v-if="engagement.done == true"><i class="far fa-folder" v-if="engagement.done == true"></i> | Completed</span>
            <span v-else><i class="far fa-folder-open"></i> | Active</span>
            </div>
            <span class="font-weight-bold text-capitalize" v-if="engagement.type != 'custom'">{{ fixCasing(engagement.type) }}</span>
            <span class="font-weight-bold text-capitalize" v-else>{{ engagement.description }}</span>
        </div>
        <div class="card-body">
            <div class="mt-2">
                <div class="progress" v-if="engagementWorkflow != ''">
                <div class="progress-bar progress-bar-striped" :class="{'progress-bar-animated': currentWidth < 100}" role="progressbar" :aria-valuenow="`${currentWidth}`" aria-valuemin="0" aria-valuemax="100" :style='`width:${ currentWidth }%;`'></div>
                </div>
            </div>
            <div class="d-flex justify-content-between">
            <div>
                <i class="far fa-flag text-secondary"></i>
            </div>
            <div>
                <i class="fas fa-flag-checkered text-primary"></i>
            </div>
            </div>
            <ul class="p-0 m-0 mt-2">
            <li class="d-flex justify-content-between p-2">
                <span class="font-weight-bold">Name</span>
                <span>{{ engagement.name}}</span>
            </li>
            <li class="d-flex justify-content-between p-2" v-if="engagement.type != 'bookkeeping'">
                <span class="font-weight-bold">Fee</span>
                <span>{{ amount(engagement.fee) }}</span>
            </li>
            <li class="d-flex justify-content-between p-2" v-if="engagement.type == 'bookkeeping'">
                <span class="font-weight-bold">Time Period</span>
                <span>{{ engagement.title}}</span>
            </li>
            <li class="d-flex justify-content-between p-2">
                <span class="font-weight-bold">Subject</span>
                <span>{{ engagement.description}}</span>
            </li>
            <li class="d-flex justify-content-between p-2" v-if="engagement.type == 'taxreturn'">
                <span class="font-weight-bold">Return Type</span>
                <span>{{ engagement.return_type}}</span>
            </li>
            <li class="d-flex justify-content-between p-2">
                <span class="font-weight-bold">Year</span>
                <span>{{ engagement.year}}</span>
            </li>
            <li class="d-flex justify-content-between p-2" v-if="engagement.done == false">
                <span class="font-weight-bold">Currently Assigned</span>
                <span>{{ engagement.assigned_to}}</span>
            </li>
            <li class="d-flex justify-content-between p-2">
                <span class="font-weight-bold">Status</span>
                <span>{{ engagement.status}}</span>
            </li>
            <li class="d-flex justify-content-between p-2">
                <span class="font-weight-bold">Due Date</span>
                <span>{{ engagement.estimated_date | formatDate }}</span>
            </li>
            <li class="d-flex justify-content-between p-2">
                <span class="font-weight-bold">Paid</span>
                <span>{{ paid(engagement.paid) }}</span>
            </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Alert from '@/components/alerts/Alert.vue'
import bModal from 'bootstrap-vue/es/components/modal/modal'
import bModalDirective from 'bootstrap-vue/es/directives/modal/modal'
import Spinner from '@/components/loaders/Spinner.vue'
import NoteModal from '@/components/engagement/NoteModal.vue'
import EditNoteModal from '@/components/engagement/EditNoteModal.vue'

export default {
    name: 'EngageDetails',
    props: ['engagement'],
    components:{
        'b-modal': bModal,
        Alert,
        Spinner,
        NoteModal,
        EditNoteModal
    },
    directives: {
        'b-modal': bModalDirective
    },
    data() {
        return {
           
        }
    },
    computed: {
        ...mapGetters(['successAlert', 'processing', 'errorMsgAlert', 'engagementWorkflow']),
        percentage() {
            const statuses = this.engagementWorkflow.statuses
            const percentage = this.calcPercent(statuses.length)
            return percentage
        },
        currentWidth() {
            const status = this.engagement.status
            const statuses = this.engagementWorkflow.statuses
            const index = statuses.findIndex(s => s.status == status)

            return (index + 1) * this.percentage
        }
    },
    methods: {
        fixCasing(string) {
            if(string == 'taxreturn') {
                const newString = string.replace("taxreturn", "Tax Return")
                return newString
            } else {
                return string
            }
        },
        amount(fee) {
            if(fee == null || fee == '') {
                return '$0.00'
            } else {
                return '$' + fee
            }
        },
        removeCommas(fee) {
            const commaless = fee.replace(/[, ]+/g, " ").trim();
            return commaless
        },
            calcPercent(statuses) {
            return 100/statuses
        },
        paid(state) {
            if(state) {
                return 'Yes'
            } else {
                return 'No'
            }
        }
    }
}
</script>
