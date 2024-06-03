//Мама мыла раму
//амаМ алым умар

const exp = 'Мама мыла раму'
const reverseExp = 
exp
.split(' ')
.map(el => {
   return el.split('').reverse().join('')
})
.join(' ')

console.log('reverseExp===> ', reverseExp)


// Напишите функцию getEvenNumbers, которая принимает на вход массив чисел, а возвращает новый массив, 
// в котором содержатся только чётные числа исходного массива.

const arr = [1,2,3,4,5,6,7]
const evens = arr.filter(el => el % 2 === 0)

const obj = {
   evenNumbers: [2,4,8,12,16]
}

const evenNumFromObj = arr.filter(function(el) {
return this.evenNumbers.includes(el)
},obj)
console.log('evens===> ', evenNumFromObj)


const deleted = delete obj.myProperty;
console.log(deleted); // true
console.log(obj.myProperty); // undefined

