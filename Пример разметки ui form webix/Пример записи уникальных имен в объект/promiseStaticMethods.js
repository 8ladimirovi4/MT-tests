const promise1 = new Promise((res,rej) => {
    setTimeout(() => {
        res('1')
    },500)
})

const promise2 = new Promise((res,rej) => {
    setTimeout(() => {
        res('2')
    },250)
})

const promise3 = new Promise((res,rej) => {
    setTimeout(() => {
        res('3')
    },100)
})

// Promise.all([])

//Promise.allSettled([])

// Promise.race([])
