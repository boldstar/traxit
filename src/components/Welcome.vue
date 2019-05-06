<template>
    <div class="welcome">
        <div class="welcome-btns" v-if="role == 'Admin'">
            <router-link to="/administrator/workflows" class="btn btn-secondary eng-btn" v-if="allWorkflows.length <= 0">Create Workflow</router-link>
            <router-link to="/add" class="btn btn-primary eng-btn">Start Engagement</router-link>
        </div>
        <p class="welcome-details" v-if="role == 'Admin'">Create a workflow and start an engagement to view your Dashboard!</p>
        <img src="@/assets/Welcome.png" class="image">
    </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
    name: 'welcome',
    computed: {
        ...mapGetters(['allWorkflows', 'role', 'loggedIn']),
    }
}
</script>

<style scoped>

.welcome {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.welcome-btns {
    display: flex;
    justify-content: space-around;
    width: 100%;
}

.image {
    display: inline-block;
    background-position: center;
    background-size: cover;
}

.eng-btn {
    margin-bottom: 10px;
    font-weight: bold!important;
}

.welcome-details {
    background: rgb(240, 240, 240);
    padding: 10px;
    border-radius: 3px;
    font-weight: bold;
}

@media screen and (max-width: 600px) {
    .image {
        width: 300px;
        height: auto;
    }

    .eng-btn {
        display: none;
    }

    .welcome-details {
        display: none;
    }

    .welcome-btns {
        display: none;
    }
}

</style>


