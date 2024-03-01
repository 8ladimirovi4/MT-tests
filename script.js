const arr = [
    {
        name: 'Baga'
    },
    {
        name: 'Baga'
    },
     {
        name: 'Baga'
    },
    {
        name: 'Karen'
    },
    {
        name: 'Karen'
    },
    {
        name: 'Karen'
    },
    {
        name: 'Karen'
    },
    {
        name: 'Ivan'
    },
    {
        name: 'Ivan'
    },
   
]

const arrCopies = []

for (let i = arr.length; i >= 0; i--) {
    for (let j = arr.length; j >= 0; j--) {
   if(i !== j && JSON.stringify(arr[i]) === JSON.stringify(arr[j])){

    arrCopies.push(arr[i])
    break;
   
   }
    
    }
}
console.log('===> ', arrCopies)