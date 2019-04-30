<template>
    <div class="welcome">
        <img src="@/assets/Welcome.png" class="image">
    </div>
</template>

<script>


export default {
    name: 'welcome'
}
</script>

<style scoped>

.image {
    display: inline-block;
    background-position: center;
    background-size: cover;
}

@media screen and (max-width: 600px) {
    .image {
        width: 300px;
        height: auto;
    }
}

</style>


