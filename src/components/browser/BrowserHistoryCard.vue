<template>
  <div class="browser-history-card">
      <div class="browser-history-card-section mb-3">
          <span><i class="fas fa-user-friends text-primary font-weight-bold mr-2"></i> Contacts</span>
          <ul>
              <li v-for="(item, index) in history" :key="index" @click="goTo(item.path)"  v-show="item.category == 'contact' && item.name">
                  <span>{{item.name}} <i class="fas fa-chevron-right ml-1 align-self-center"></i> <span class="text-primary">{{item.page}}</span></span>
                  <router-link :to="item.path"><i class="fas fa-arrow-right"></i></router-link>
                </li>
          </ul>
      </div>
      <div class="browser-history-card-section">
          <span><i class="far fa-folder-open text-primary font-weight-bold mr-2"></i> Engagements</span>
          <ul>
               <li v-for="(item, index) in history" :key="index" @click="goTo(item.path)" v-show="item.category == 'engagement' && item.name">
                  <span>{{item.year}} {{item.name}} <i class="fas fa-chevron-right ml-1 align-self-center"></i> <span class="text-primary">{{item.page}}</span></span>
                  <router-link :to="item.path"><i class="fas fa-arrow-right"></i></router-link>
                </li>
          </ul>
      </div>
  </div>
</template>

<script>

export default {
    name: 'BrowserHistoryCard',
    props: ['contacts', 'engagements'],
    computed: {
        history() {
            const history = JSON.parse(localStorage.getItem('browser_history'))
            const list = history.map(h => ({
                id: h.id,
                path: h.path,
                name: h.category == 'contact' ? this.contactName(h.path) : this.engagementName(h.path),
                year: h.category == 'engagement' ? this.engagementYear(h.path) : null,
                category: h.category,
                page: h.page
            }))

            //filter duplicates
            const result = list.filter((v,i,a) => list.findIndex(t=>(JSON.stringify(t) === JSON.stringify(v)))===i)

            return result.sort((a, b) => (a.year > b.year) ? 1 : -1)
        }
    },
    methods: {
        goTo(path) {
           this.$router.replace({path: path})
        },
        contactName(path) {
            var id = path.split('/')[2]
            var client  = this.contacts.filter(c => c.id == id)[0]
            if(client) {
                var name = client.spouse_first_name ? client.last_name +', ' + client.first_name + ' & ' + client.spouse_first_name : client.last_name +', ' + client.first_name
                return name
            }
        },
        engagementName(path) {
            if(path.includes('engagement')) {
                var id = path.split('/')[2]
                var engagement = this.engagements.filter(e => e.id == id)
                if(engagement && engagement.length > 0) {
                    return engagement[0].name
                }
            } return ''
        },
        engagementYear(path) {
            var id = path.split('/')[2]
            var engagement = this.engagements.filter(e => e.id == id) 
                if(engagement && engagement.length > 0) {
                    return engagement[0].year
                }
        }
    }
}
</script>

<style lang="scss">
    .browser-history-card-section {
        text-align: left;
        font-weight: bold;
        border-bottom: 2px solid lightgray;

        span {
           margin-left: 15px;
           font-size: 1.2 em;
        }
        ul {
            list-style: none;
                padding: 0;
                margin: 0;
                margin-top: 5px;
            li {
                padding: 7px;
                padding-left: 20px;
                border-top: 2px solid lightgray;
                display: flex;
                justify-content: space-between;

                span{
                    font-size: .8em;
                }

                a {
                    margin-right: 15px;
                }

                &:hover {
                    box-shadow: 0px 0 5px rgba(0,0,0,.25px);
                }

                cursor: pointer;
            }
        }
    }
</style>