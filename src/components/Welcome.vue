<template>
    <div class="welcome">
        <router-link to="/add" class="btn btn-primary eng-btn">Start Engagement</router-link>
        <img src="@/assets/Welcome.png" class="image">
    </div>
</template>

<script>


export default {
    name: 'welcome'
}
</script>

<style scoped>

.welcome {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.image {
    display: inline-block;
    background-position: center;
    background-size: cover;
}

.eng-btn {
    margin-bottom: 10px;
}

@media screen and (max-width: 600px) {
    .image {
        width: 300px;
        height: auto;
    }

    .eng-btn {
        display: none;
    }
}

</style>


