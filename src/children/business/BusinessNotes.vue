<template>
  <div class="business-notes-wrapper">
      <div class="business-notes" v-if="$route.name != 'edit-business'">
            <div class="business-notes-header">
               <h5>Business Notes</h5>
               <p>Notes for the business</p>
            </div>
      </div>

      <div  v-if="notes && notes.length > 0 && $route.name != 'edit-business-note'" class="business-notes-list">
        <div class="card mb-2 text-left shadow-sm" v-for="(note, index) in notes" :key="index">
          <div class="card-header">Note</div>
          <div class="card-body pb-0" v-html="note.note"></div>
          <div class="card-footer d-flex justify-content-between">
            <div>
              Last Updated: <strong>{{note.updated_at | formatDate}}</strong>
            </div>
            <div>
              <button class="btn btn-secondary btn-sm mr-3" @click="editThisNote(note)">Edit</button>
              <button class="btn btn-danger btn-sm" @click="deleteThisNote(note)">Delete</button>
            </div>
          </div>
        </div>

        <div class="card add-business-note" @click="goToAddBusinessNote">
            <div class="card-body d-flex justify-content-center">
                <div class="d-flex flex-column align-items-center add-business-note-btn-border">
                    <i class="fas fa-edit fa-3x mb-2"></i>
                    <span class="font-weight-bold">Add Note</span>
                </div>
            </div>
        </div>
      </div>

      <router-view 
        v-else-if="$route.name == 'edit-business-note'" 
        :note="selectedNote" 
        :business="business"
      ></router-view>

      <div class="mt-3" v-else>
        <div class="d-flex flex-column">
          <h6>There are currently no notes.</h6>
          <div>
            <router-link to="notes/edit" class="btn btn-primary font-weight-bold px-5">Add Note</router-link>
          </div>
        </div>
      </div>

  </div>  
</template>

<script>
export default {
    name: 'BusinessNotes',
    props: ['notes', 'business'],
    data() {
      return {
        selectedNote: null
      }
    },
    methods: {
      goToAddBusinessNote() {
        this.$router.push('/business/'+this.business.id+'/notes/edit')
      },
      editThisNote(note) {
        this.selectedNote = note
        this.$router.push('/business/'+this.business.id+'/notes/edit')
      },
      deleteThisNote(note) {
        this.$store.dispatch('deleteBusinessNote', note.id)
      }
    }
}
</script>

<style lang="scss">
.business-notes-wrapper {
    width: 100%;

     .business-notes-list {

          .add-business-note {
          border: 2px dashed lightgray;
          background: transparent!important;
          cursor: pointer;
          transition: all .5s;

          &:hover {
              background: white!important;
              box-shadow: 0 0 8px 0 rgba(0,0,0,.3);
          }

          .add-business-note-btn-border {

              i {
                  color: lightgray!important;
              }

              span {
                  color: lightgray!important;
              }
          }
      }
    }

    .business-notes {
      
      .business-notes-header {
        text-align: left;
        margin-bottom: 10px;

        h5 {
          margin-bottom: 0;
        }

        p {
          margin-bottom: 0;
        }
      }

     

      .business-notes-section {
        margin-bottom: 30px;

        .business-notes-section-header {
          text-align: left;
          padding: 10px;
        }

        ul {
          list-style: none;
          padding: 0;

          .business-notes-item {
            padding: 10px;

            div {
              max-width: 400px;
              width: 100%;
              display: flex;
              justify-content: space-between;
              margin-left: 10px;
            }

            &:nth-of-type(even) {
                background: rgb(243, 243, 243);
            }
          }
        }



        .business-notes-section-footer {
          padding: 10px;
          text-align: left;
        }
      }
    }
  }


</style>