import axios from 'axios';

export default class Api {
    constructor() {
        this.inst = axios.create({
            baseURL: 'https://hn.algolia.com/api/v1/',

        })
    }

    async search(query) {
        // build query tag URI

        // finally, get that response
        const res = await this.inst.get(query)
        console.log(res.data.hits)

        return res
    }
}