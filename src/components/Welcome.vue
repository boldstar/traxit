<template>
    <div>
        <!-- <div class="welcome" v-if="!showWelcome"></div> -->
        <div class="welcome">
            <p class="welcome-details">Complete below steps to view your Dashboard!</p>
            <div class="welcome-btns">
                <div class="step">
                    <div class="step-icon">1</div>
                    <router-link to="/contacts" class="btn btn-info eng-btn">Upload Contacts</router-link>
                </div>
                <div class="step">
                    <div class="step-icon">2</div>
                    <router-link to="/administrator/workflows" class="btn btn-secondary eng-btn">Create Workflow</router-link>
                </div>
                <div class="step">
                    <div class="step-icon">3</div>
                    <router-link to="/add" class="btn btn-primary eng-btn">Start Engagement</router-link>
                </div> 
            </div>
        </div>
<<<<<<< HEAD
        <p class="welcome-details" v-if="role == 'Admin'">Create a workflow and start an engagement to view your Dashboard</p>
        <img src="@/assets/Welcome.png" class="image">
=======
>>>>>>> developer
    </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
    name: 'Welcome',
    data() {
        return {
            showWelcome: false
        }
    },
    computed: {
        ...mapGetters(['allWorkflows', 'allEngagements', 'allClients', 'role']),
    },
    created() {
        this.$store.dispatch('retrieveWorkflows')
        this.$store.dispatch('retrieveEngagements')
        this.$store.dispatch('retrieveClients');
    }
}
</script>

<style scoped lang="scss">

.welcome {
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0 0 5px 0 rgba(0,0,0,.2);
    padding: 35px;
    border-radius: 10px;
    width: 429px;
    height: 274px;
}

.welcome-btns {
    display: flex;
    flex-direction: column;
    width: 100%;
}

.step {
    display: flex;
    position: relative;

    &:before {
        content: "";
        border-left: 5px solid black;
        height: 50px;
        z-index: -1;
        left: 10px;
        position: absolute;
    }

    &:first-of-type:before {
        height: 20px;
        top: 30px;
    }
    
    &:last-of-type:before {
        height: 20px;
    }
}

.step-icon {
    height: 25px;
    width: 25px;
    background: #0077ff;
    border-radius: 50%;
    color: white;
    font-weight: bold;
    position: absolute;
    margin-top: 5px;
}

.image {
    display: inline-block;
    background-position: center;
    background-size: cover;
}

.eng-btn {
    margin-bottom: 10px;
    font-weight: bold!important;
    flex: 1;
    margin-left: 50px;
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


