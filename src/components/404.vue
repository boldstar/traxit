<template>
    <div class="not-found">    
            <div class="col-10 d-flex flex-column  align-items-center">
                <router-link class="btn btn-block btn-primary align-self-center mb-4" to="/">Go Home</router-link>
                <img src="@/assets/404NotFound.png" class="image">
            </div>
        </div>
</template>

<script>


export default {
    name: 'not-found'
}
</script>

<style scoped>

.image {
    display: inline-block;
    background-position: center;
    background-size: cover;
}

</style>


