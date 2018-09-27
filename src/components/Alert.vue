<template>
    <div class="alert alert-warning alert-dismissible fade show" role="alert">
        <button type="button" class="close" data-dismiss="alert" aria-label="Close"></button>
            {{message}}
    </div>
</template>

<script>
export default {
    name: 'alert',
    props: ['message']
}
</script>


<style>

</style>

