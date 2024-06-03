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
const body = document.querySelector('body')
const div = document.querySelector('.render')
const loadingH1 = document.querySelector('.hidden_h1')
const btnReq = document.querySelector('.request')

function clearContent(selector){
    const loading = document.querySelector('.' + selector)
    loading.classList = 'hidden_h1'
}

function liading(){
    let loadingContent = 'Loading'
    const dot = '.'
        intervalSet = setInterval(() => {
        loadingContent += dot
        if(loadingContent.length > 15) loadingContent = 'Loading'
        loadingH1.innerHTML = loadingContent
    },500)  
}

function getData() {
    loadingH1.classList = 'visible_h1'
    div.innerHTML = null
    
liading(body)

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
    })
    .catch(err => console.log('error description', err))
    .finally(() => {
        clearInterval(intervalSet)
        clearContent('visible_h1')
    })
  }, 6000)
}
let boo = true

function bool(){

boo = !boo
console.log('===> ', boo)
}

btnReq.addEventListener('click', () => bool())

//создать новый массив с зеркальными данными путем вызова рекурсии
const arr = [1,2,3,4,5,6,7]
function getItemsFromArray(arr, reversedArray = [], index = arr.length - 1){
    if(reversedArray.length === arr.length) {
        return reversedArray
    }
    reversedArray.push(arr[index])
    index -= 1
    return getItemsFromArray(arr, reversedArray, index)
}
console.log('===> arr',arr )
console.log('===> getItemsFromArray(arr)', getItemsFromArray(arr)) 


const foo = () => {
    console.log('===> onblur works', )
}



const BTN_GET = document.querySelector('.get')
const BTN_SET = document.querySelector('.set')
const BRN_DEL = document.querySelector('.del')


function setWithExpiry(key, value, ttl) {
    const now = new Date();
    const item = {
        value: value,
        expiry: now.getTime() + ttl,
    };
    localStorage.setItem(key, JSON.stringify(item));
}

function getWithExpiry(key) {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) {
        return null;
    }
    const item = JSON.parse(itemStr);
    const now = new Date();
    if (now.getTime() > item.expiry) {
        localStorage.removeItem(key);
        return null;
    }
    return item.value;
}

BTN_SET.addEventListener('click', () => {
    setWithExpiry('myKey', 'myValue', 5000);
})

BTN_GET.addEventListener('click', () => {
    const value = getWithExpiry('myKey');
    console.log('===>данные из локал сторадж ',value)
    })

BRN_DEL.addEventListener('click', () => {
    localStorage.removeItem('myKey')
 
     })


