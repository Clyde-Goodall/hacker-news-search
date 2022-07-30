<template>
<div>
  <title>{{pageTitle}}</title>
  <!-- top nav menu -->
    <div class="nav justify-between flex-wrap">
      <div>
        <router-link to='/'>
          <span class="item">Home</span>
        </router-link>
        <router-link to='/search'>
          <span class="item">Search</span>
        </router-link>
        <router-link to='/history'>
          <span class="item">History</span>
        </router-link>
      </div>
        <input type="text" class="mr-10" v-model="search_input" placeholder="Use tags :) i.e. topic -story -author:pg" @keyup.enter="submitSearch"/>
  </div>
  <!-- meat and potaters -->
  <router-view>
  </router-view>
</div>
</template>

<script>
import {mapActions, mapState} from 'vuex'

export default {
  data() {
    return {
      search_input:'',
      searchParams: {
        search: '',
        tags: []
      },
    }
  },
  methods: {
    ...mapActions(['getAndSaveSearch']),
    async submitSearch() {
      if(this.search_input.length > 0) {

        // routes to search if a valid search query is present in this.searchParams, linked to search bar
        if(this.$route.path !== '/search') {
          this.$router.push('/search')
        }

      // set up query tags
      const split_query = this.search_input.split(' -')
      // split search query into query and tags + tag params
      if(split_query.length > 1) {
        const temp_tags = split_query.slice(1, split_query.length)
        if(temp_tags.length >= 0) {

          // separates tags and their params here
          const tag_objs = temp_tags.map(t => {
            const separate = t.split(':')
            if(separate.length > 1) {
              return {
                type: separate[0], 
                param: separate[1]
              }
            }
            // returns only type is there is no param
            return {type: t}
          })
          this.searchParams.tags = tag_objs
          this.searchParams.search = split_query[0]
        }
      }
      else {
        this.searchParams.search = this.search_input
      }
      console.log(this.searchParams)

      await this.getAndSaveSearch(this.searchParams);

      }
    }
  },
  computed: {
    pageTitle() {
      return this.$route.path.slice(0, this.$route.path.length)
    }
  }
}
</script>


