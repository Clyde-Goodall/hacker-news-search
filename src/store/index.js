import { createStore } from 'vuex'
import Api from '../util/api.js'

const inst = new Api()

const store = createStore({
    state() {
        return {
            searching: false,
            search_results: [],
            search_history: [],
        }
    },
    mutations: {
        // self explanatory
        saveSearchHistory(state, {query}) {
            state.search_history.push({query: query.search, tags: query.tags})
        },
        // also self-explanatory
        saveSearchResults(state, {query, res}) {
            state.search_results.push([res.data.hits])
        },
        // preps search loop
        prepSearch(state) {
            state.searching = true
        },
        // initial/subsequent searches will cancel ongoing searches & reset results using this
        resetSearch(state) {
            state.searching = false
            state.search_results = []
        }
    },
    actions: {
        async getAndSaveSearch({commit, state}, query) {
            // resets any ongoing searches & results
            commit('resetSearch')
            // prepping string except for page #
            let tag_string = ''
            const maxl = query.tags.length
            // interpolates tags for query string
            // as per https://hn.algolia.com/api
            if(query.tags.length > 0) {  
                tag_string += '&tags=(' 
                query.tags.forEach((t, idx) => {
                    if(t.type) {
                        //              tag name | tag value (if exists, i.e. author)  | comma if not last elem
                        tag_string += `${t.type}${t.param ? '_' + t.param : ''}${Object.is(maxl - 1, idx) ? ')' : ','}`
                    }
                })
            }
            const query_string = `search?query=${query.search}${tag_string}`
            commit('prepSearch')

            // get all results in increments of 20 asynchronously so the page can still render & load in background
            let limit = false
            let counter = 0
            // stores search history before loop since loop might take a while/be interrupted
            commit('saveSearchHistory', {query})
            while(!limit && state.searching) {
                // page by page pulling
                const res = await inst.search(`${query_string}&page=${counter}`)
                if(res.data.hits.length == 0) {
                    limit = true
                }
                commit('saveSearchResults', {query, res})
                counter += 1
            }
        },
    }
})

export default store;