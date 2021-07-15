<template>
  <div class="browser-history-card">
      <div class="browser-history-card-section mb-2">
          <span>Contacts</span>
          <ul>
              <li v-for="(item, index) in history" :key="index" @click="goTo(item.path)"  v-show="item.path.includes('contact') && item.name">
                  <span>{{item.name}}</span>
                  <router-link :to="item.path"><i class="fas fa-arrow-right"></i></router-link>
                </li>
          </ul>
      </div>
      <div class="browser-history-card-section">
          <span>Engagements</span>
          <ul>
               <li v-for="(item, index) in history" :key="index" @click="goTo(item.path)" v-show="item.path.includes('engagement') && item.name">
                  <span>{{item.name}}</span>
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
                path: h.path,
                name: h.path.includes('contact') ? this.contactName(h.path) : this.engagementName(h.path)
            }))

            //filter duplicates
            const result = list.filter((v,i,a) => list.findIndex(t=>(JSON.stringify(t) === JSON.stringify(v)))===i)

            return result
        }
    },
    methods: {
        goTo(path) {
           this.$router.push(path)
        },
        contactName(path) {
            var client  = this.contacts.filter(c => path.includes(c.id))[0]
            if(client) {
                var name = client.spouse_first_name ? client.last_name +', ' + client.first_name + ' & ' + client.spouse_first_name : client.last_name +', ' + client.first_name
                return name
            }
        },
        engagementName(path) {
            if(path.includes('engagement')) {
                var engagement = this.engagements.filter(e => path.includes(e.id))
                if(engagement && engagement.length > 0) {
                    return engagement[0].name
                }
            } return ''
        }
    }
}
</script>

<style lang="scss">
    .browser-history-card-section {
        text-align: left;
        font-weight: bold;
        span {
           margin-left: 15px;
           font-size: 1.2 em;
        }
        ul {
            list-style: none;
                padding: 0;
                margin: 0;
            li {
                padding: 10px;
                padding-left: 20px;
                border-bottom: 2px solid lightgray;
                display: flex;
                justify-content: space-between;

                a {
                    margin-right: 15px;
                }

                &:first-of-type {
                    border-top: 2px solid lightgray;
                    margin-top: 10px;
                }

                &:hover {
                    box-shadow: 0px 0 5px rgba(0,0,0,.25px);
                }

                cursor: pointer;
            }
        }
    }
</style>