<template>
    <div class="engagement-types w-75 mx-auto card shadow-sm mb-3">
        <div class="card-header d-flex justify-content-between w-100">
            <span class="engagement-types-header">Choose Workflow</span>
            <button @click="goBack" class="btn btn-secondary btn-sm font-weight-bold">Back</button>
        </div>

        <div class="list-of-types">
            <div class="engagement-type-card" v-for="workflow in allWorkflows" :key="workflow.id">
                <span class="engagement-type-header">
                    {{workflow.workflow}}
                </span>
                <button @click="showForm(workflow)" class="btn btn-outline-secondary btn-sm font-weight-bold mt-3">Start <span class="text-dark">{{workflow.engagement_type}}</span><i class="fas fa-arrow-right ml-3"></i></button>
            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    name: 'EngagementTypes',
    computed: {
        ...mapGetters(['allWorkflows'])
    },
    methods: {
        goBack() {
            this.$emit('go-back')
        },
        showForm(workflow) {
            this.$emit('show-form', workflow)
            this.$router.push({path: '/add/engagement/form'})
        }
    },
    created() {
        this.$store.dispatch('retrieveWorkflows')
    }
}
</script>

<style lang="scss">

    .engagement-types-header {
        font-size: 1.25rem;
        font-weight: bold;
        color: #0077ff;
    }

    .list-of-types {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        position: relative;

        .engagement-type-card {
            padding: 30px 10px;
            box-sizing: border-box;
            box-shadow: 0 0 5px 0 rgba(0,0,0,.2);
            border-radius: 5px;
            margin: 20px;
            min-width: 300px;
            display: flex;
            flex-direction: column;
            align-items: center;
            position: relative;
            top: 0;
            transition: all .3s;

            .engagement-type-header {
                font-weight: bold;
                color: #0077ff;
                box-sizing: border-box;
                text-overflow: wrap;
            }

            &:hover {
                top: -2px;
                box-shadow: 0 0 10px 0 rgba(0,0,0,.2);
                cursor: pointer;
            }
        }
    }
</style>
