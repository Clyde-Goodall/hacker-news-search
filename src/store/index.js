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
        saveSearchHistory(state, {query}) {
            state.search_history.push({query: query.search, tags: query.tags})

        },
        saveSearchResults(state, {query, res}) {
            // stores separated query and tags in an object to be read in /history
            console.log(state.search_history)
            state.search_results.push([res.data.hits])
            state.pages++
        },
        prepSearch(state) {
            state.searching = true
        },
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
            commit('saveSearchHistory', {query})
            while(!limit && state.searching) {
                console.log(`${query_string}&page=${counter}`)
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