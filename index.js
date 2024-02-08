const loading = document.querySelector('.visible')

const dot = '.'
let loadingWord = 'Loading'

const interval = setInterval(() => {
    loadingWord += dot

    if(loadingWord.length >= 15){
    loadingWord = 'Loading'
}
loading.innerHTML = loadingWord
},400)

new Promise((resolve, reject) => {


    setTimeout(() => {
        resolve({
            name: 'Karen ',
            age: 30
        })
    },6000)
})
.then(res => {
const body = document.querySelector('body')
const spanName = document.createElement('h2')
const spanAge = document.createElement('h2')
spanName.innerHTML = res.name
spanAge.innerHTML = res.age
body.prepend(spanAge)
body.prepend(spanName)

})
.finally(() => {
    loading.classList = 'hidden'
    clearInterval(interval)
})

let intervalSet = null
function clearContent(selector){
    const loadings = document.querySelectorAll('.' + selector)
    loadings.forEach(loading => {
        loading.remove()
    })
}
function liading(body){
    let loadingContent = 'Loading'
    const dot = '.'
        intervalSet = setInterval(() => {
        loadingContent += dot
        if(loadingContent.length > 15) loadingContent = 'Loading'
   
        clearContent('loading_content')

        const loading = document.createElement('h1')
        loading.classList = 'loading_content'
        loading.textContent = loadingContent
        body.append(loading)
    },500)  
}

const btnReq = document.querySelector('.request')
btnReq.addEventListener('click', (e) => {
    const body = document.querySelector('body')
    liading(body)
    const div = document.createElement('div')
    div.classList = 'text_content'
    clearContent('text_content')
  setTimeout(() => {
    fetch('https://catfact.ninja/fact')
    .then(res => {
        if(res.ok){
                return res.json()
        }else{
            throw new Error("server didn't response")
        }
    })
    .then(data => {
            div.innerHTML = data.fact
            body.append(div)
    })
    .catch(err => console.log('error description', err))
    .finally(() => {
        clearInterval(intervalSet)
        clearContent('loading_content')
    })
  }, 6000)
    
})

