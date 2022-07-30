<template>
    <div class="w-screen">
        <!-- search results spit out in batches of 20 -->
        <div v-if="search_results.length">
            <!-- pagination -->
            <div class="w-full flex justify-center p-5">
                <input type="button" value="Previous page" @click="changePage(-1)">
                <input type="button" value="Next page" @click="changePage(1)">
            </div>
            <!-- spit out all the search results -->
            <div v-for="r in search_results[page][0]" :key="r.parent_id">
                <!-- an obnoxious amount of ternary -->
                <div class="search-result">
                    <span class="font-light text-sm my-2"><p class="text-gray-400">{{ r.author }} | {{ (r.created_at.slice(0,10).replace(/-/g, '/')) }}</p> </span>
                    <a v-if="r.url || r.story_url" :href="r.url ? r.url : r.story_url" class="underline text-blue-500" target="_">
                        {{ r.title ? r.title : r.story_title }}
                    </a> 
                    <p v-else class="text-gray-400">{{ r.title ? r.title : r.story_title }}</p>
                </div>
            </div>
        </div>
        <!-- Loading -->
        <div class="w-full h-full flex justify-center items-center text-6xl text-gray-600 animate-pulse" v-else-if="searching">Loading....</div>
    </div>
</template>

<script>
import {mapState, mapActions} from 'vuex';

export default {
  name: 'Search',
  data() {
    return {
        page: 0
    }
  },
// if search ever gets interrupted, reset page count so we aren't lost in undefined territory
  watch: {
    'this.searching': function() {
        if(searching == false) {
            page = 0
        }
    }
  },
  methods: {
    changePage(num) {
        // lower and upper bounds for page count
        (this.page + num) < 0 || (this.page + num) > this.search_results.length - 2 ? this.page : this.page += num
    }
  },
  computed: {
    // gets results from store as queried by the main App component
    ...mapState(['search_results', 'searching']),
  }
}
</script>
