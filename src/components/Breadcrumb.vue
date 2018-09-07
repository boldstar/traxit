<template>
    <span>

        <component :is="breadCrumb" />
 
  </span>
</template>

<script>
export default {
    name: 'breadcrumb',
    data () {
        return {
            name: '',
        }
    },
    props: [
        'route'
    ],
    computed: {
        breadCrumb() { 
            return this.route.meta.breadCrumb(this.value)
        },
    },
}
</script>

<style lang="scss" scoped>

</style>