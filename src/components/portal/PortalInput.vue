<template>
    <div class="custom-control custom-checkbox">
        <input type="checkbox" class="custom-control-input" :id="label" v-model="input">
        <label class="custom-control-label" :for="label">{{label}}</label>
    </div>
</template>

<script>
export default {
    name: 'PortalInput',
    props: ['data', 'label', 'value'],
    computed: {
        input: {
            get() {
                return this.value
            },
            set(newValue) {
                this.$emit('input', newValue)
            }
        }
    }
}
</script>

<style>

</style>
