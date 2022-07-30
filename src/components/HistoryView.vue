<template>
    <div v-if="search_history.reverse().length > 0">
        <!-- spit out all the search results -->
        <div v-for="h in search_history" :key="h.query">

            <div class="search-result">{{h.query}}</div>

        </div>
    </div>
    <div class="w-full h-full flex justify-center items-center text-3xl text-gray-400" v-else>No search history</div>

</template>

<script>
import {mapState, mapActions} from 'vuex';

export default {
  name: 'Search',
  computed: {
    // gets results from store as queried by the main App component
    ...mapState(['search_history']),
  }
}
</script>
