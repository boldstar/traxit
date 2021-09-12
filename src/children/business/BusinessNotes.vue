<template>
  <div class="business-notes-wrapper">
      <div class="business-notes" v-if="$route.name != 'edit-business'">
            <div class="business-notes-header">
               <h5>Business Notes</h5>
               <p>Notes for the business</p>
            </div>
      </div>
  </div>
</template>

<script>
export default {
    name: 'BusinessNotes'
}
</script>

<style lang="scss">
.business-notes-wrapper {
    width: 100%;

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