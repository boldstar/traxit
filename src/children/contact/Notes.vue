<template>
   <div class="contact-notes">
        <!-- this is the header for the contact notes with the add note button -->
        <div class="contact-notes-header">
            <div>
                <h5>Contact Notes</h5>
                <p>A list of the notes belonging to the selected contact</p>
            </div>
            <router-link :to=" '/contact/' + client.id + '/notes/add-note'" class="btn btn-primary btn-sm">Add Note</router-link>
        </div>

        <!-- this is where the add-note route shows up if route is matched -->
        <transition name="router-animation" enter-active-class="animated bounceInDown" leave-active-class="animated zoomOut" mode="out-in">
            <router-view></router-view>
        </transition>

        <!-- this will show if there is no notes only -->
        <div v-if="noNotes & !notesLoaded && $route.name == 'notes'" class="card shadow-sm p-3">
            <span class="font-weight-bold">There are currently no notes</span>
        </div>

        <!-- this shows if there is notes -->
        <div v-else>

            <div v-if="!notesLoaded">
                <div v-if="$route.name == 'notes'">
                    <div class="card mb-3 shadow-sm p-0" v-for="(note, index) in clientNotes" :key="index">
                        <div class="card-body text-left">
                            <span v-html="note.note"></span>
                        </div>
                        <div class="card-footer d-flex justify-content-between note-footer">
                            <router-link :to="'/contact/' + client.id + '/notes/edit-note/' +note.id " class="btn btn-sm"><i class="far fa-edit mr-2"></i>Edit</router-link>
                            <button class="btn btn-sm btn-danger ml-3" @click="modalShow = !modalShow">Delete</button>
                        </div>

                        <b-modal v-model="modalShow" id="myQuestion" ref="myQuestion" hide-footer title="Delete Question">
                            <div class="d-block text-left">
                                <h5>Are you sure you want to delete question?</h5>
                                <br>
                                <p><strong>*Warning:</strong> Can not be undone once deleted.</p>
                            </div>
                            <div class="d-flex">
                                <b-btn class="mt-3" variant="danger" @click="modalShow = false">Cancel</b-btn>
                                <b-btn class="mt-3 ml-auto" variant="outline-success" @click="deleteNote(client, note.id)">Confirm</b-btn>
                            </div>
                        </b-modal>
                    </div>
                </div>
            </div>

        </div>

        
    <!-- this is the loading ring for the notes -->
    <spinner v-if="notesLoaded"></spinner>

    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import bModal from 'bootstrap-vue/es/components/modal/modal'
import bModalDirective from 'bootstrap-vue/es/directives/modal/modal'
import Spinner from '@/components/loaders/Spinner.vue'


export default {
    name: 'Notes',
    data() {
        return {
            notesLoaded: false,
            noNotes: false,
            modalShow: false,
        }
    },
    components:{
        'b-modal': bModal,
        Spinner
    },
    directives: {
        'b-modal': bModalDirective
    },
    computed: {
    ...mapGetters(['clientNotes', 'client']),
    },
    methods: {
        deleteNote(client, id) {
        this.$store.dispatch('deleteNote', id)
        .then(() => {
                this.modalShow = false
                this.$router.push({path: '/contact/' +this.client.id , query: {alert: 'The Note Was Succesfully Deleted'}});
            })
        },
        isActive: function (menuItem) {
            return this.activeItem === menuItem
        },
    },
    created() {
        this.$store.dispatch('getClientNotes', this.$route.params.id);
        this.notesLoaded = true;
        var self = this;
        setTimeout(() => {
            self.notesLoaded = false;
            if(self.clientNotes == 0){
                 self.noNotes = true
            } else {
                self.noNotes = false
            }
        }, 3000);
    },   
}
</script>

<style lang="scss" scoped>

    .contact-notes {

        .contact-notes-header {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;

            div {
                text-align: left;

                h5 {
                    margin-bottom: 0;
                }

                p {
                    margin-bottom: 0;
                    font-weight: 500;
                }
            }

            a {
                align-self: center;
                font-weight: bold;
            }
        }


        .note-footer {

            a {
                background: rgb(226, 226, 226);
                color: black;
                font-weight: bold;
            }
        }
    }

</style>