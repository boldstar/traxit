<template>
    <div class="custom-control custom-checkbox">
        <input type="checkbox" class="custom-control-input" :id="label" v-model="data">
        <label class="custom-control-label" :for="label">{{label}}</label>
    </div>
</template>

<script>
export default {
    name: 'PortalInput',
    props: ['data', 'label']
}
</script>

<style>

</style>
