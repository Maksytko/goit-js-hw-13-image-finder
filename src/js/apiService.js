const KEY = '22330011-89d1f89aeaa9d6f980eea326f'

export default class apiService {
    constructor() {
        this.inputText = ''
        this.pageCounter = 1
    }

    async search() {
        try {
            if (this.inputText !== '') {
                this.pageCounter = 1
                return await fetch(`https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.inputText}&page=${this.pageCounter}&per_page=12&key=${KEY}`).then(response => response.json())
            }
        } catch (err) {
            console.log(err)
        }
    }

    async loadMore() {
        try {
            if (this.inputText !== '') {
            return await fetch(`https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.inputText}&page=${this.pageCounter}&per_page=12&key=${KEY}`).then(response => response.json())   
        }
        } catch (err) {
            console.log(err)
        }
    }
}