<template>
    <div class="card mx-3" role="alert" aria-live="polite" aria-atomic="true" v-bind:class="{'border-primary' : type === 'success' ? 'border-danger' : type === 'error'}">
        <div class="card-header py-1 d-flex justify-content-between" v-bind:class="{'bg-primary' : type === 'success' ? 'bg-danger' : type === 'error'}">
            <strong class="mr-auto font-weight-bold">Alert</strong>
            <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close" @click="removeAlert">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="card-body py-1 font-weight-bold" v-bind:class="{'error' : type === 'error'}" v-if="type === 'error'">
            {{message}}
        </div>
        <div class="card-body py-1 font-weight-bold" v-bind:class="{'success' : type === 'success'}" v-if="type === 'success'">
            {{message}}
        </div>
    </div>
</template>

<script>
export default {
    name: 'toaster',
    props: ['message', 'type'],
    methods: {
        removeAlert() {
            this.$store.commit('clearAlert')
        }
    },
    mounted() {
        var self = this
        setTimeout(() => {
            self.removeAlert()
        }, 10000)
    }
}
</script>

<style lang="scss" scoped>
.error {
    color: red;
}

.success {
    color: black;
}
</style>

