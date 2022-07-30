<template>
    <div class="w-screen">
        <div v-if="search_results.length">
            <!-- pagination -->
            <div class="w-full flex justify-center p-5">
                <input type="button" value="Previous page" @click.self="changePage(-1)" :disabled="page === 0">
                <input type="button" value="Next page" @click.self="changePage(1)">
            </div>
            <!-- spit out all the search results -->
            <div v-for="r in search_results[page][0]" :key="r.parent_id">

                <div class="search-result">
                    <span class="font-light text-sm my-2">{{r.author}} | {{r.created_at.slice(0,10)}}</span>
                    <a :href="r.url" class="underline text-blue-500" target="_">
                        {{r.url}}
                    </a> 
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
  methods: {
    changePage(num) {
        if(this.page == 0) {
            (this.page += num) < 0 ? this.page = 0 : this.page += num
        } else {
            (this.page += num) > this.search_results.length ? this.page += 0 : this.page += num
        }
        console.log(this.page)
    }
  },
  computed: {
    // gets results from store as queried by the main App component
    ...mapState(['search_results', 'searching']),
  }
}
</script>
