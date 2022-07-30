import axios from 'axios';

export default class Api {
    constructor() {
        this.inst = axios.create({
            baseURL: 'https://hn.algolia.com/api/v1/',

        })
    }

    async search(query) {
        // finally, get that response
        try {
            return await this.inst.get(query)
        } catch(e) {
            console.log(e)
        }
    }
}