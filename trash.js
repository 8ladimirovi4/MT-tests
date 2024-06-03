// const flag = 'kek'

// flag === 'red' ? console.log(' ===> red', ) : flag === 'blue' ? console.log(' ===> blue', ) : flag ==='yaellow' ? console.log(' ===> yellow', ) : console.log(' ===> non colors in the list', )



// console.log(' ===> ', '245' < '3')


// const mbuilder = (function(){

//     const buildUi = function(){
//         previewTab.onBuild()
      
//     }

//     const previewTab = function(){

//     }

//     previewTab.onBuild = function(){
//         fetch('https://catfact.ninja/fact')
//         .then(res => res.json())
//         .then(data => console.log(' ===> ', data))
//     }

//     return {
//         build: function(){
//             buildUi()
//         }
       
//     }
// })()

// mbuilder.build()

// const updateRoutine = function (){
//     fetch('https://catfact.ninja/fact')
//     .then(res => res.json())
//     .then(data => console.log(' ===> ', data))
// }

// const res = {
//     fact: 'Ivan',
//     length: 1
// }
// const foo = updateRoutine.bind(res)

// foo()

// // Функция приветствия
// function greet() {
//     console.log(`Привет, ${this.name}!`);
// }

// // Объект пользователя
// let user = {
//     name: "Иван",
//     age: 30
// };

// // Привязываем контекст функции greet к объекту user
// var foo1 = greet.bind(user);

// // Вызываем функцию greet в контексте объекта user
// foo1(); // Выведет: "Привет, Иван!"


// // Функция, имитирующая асинхронный запрос данных
// function fetchData(callback) {
//     setTimeout(function() {
//         // Предположим, что мы получили данные с сервера
//         var data = [1, 2, 3, 4, 5];
//         // Вызываем функцию обратного вызова с полученными данными
//         callback(data);
//     }, 2000); // имитация задержки запроса
// }

// // Вызываем функцию fetchData с функцией обратного вызова
// fetchData(function(result) {
//     // Этот код выполняется после того, как данные будут получены
//     console.log("Получены данные:", result);
// });


// const a = 10
// console.log(' ===> a10', a)

// {
//     const a = 20
//     console.log(' ===> a20', a)
// }



// let obj = {
//     "id": "root",
//     "data": [
//         {                              
//             "id": "child1",
//             "data": [
//                 {"id": "grandchild1"},  
             
//             ]
//         },                
//         {"id": "child2",
//         "data": [
//             {
                
//                 "id": "grandchild2",
//                  "data": [
//             {"id": "grandGrandchild2"},  
//         ]
//     },  
         
//         ]
//     },             
//         { "id": "child3",             
//         "data": [
//             {"id": "grandchild3"},      
          
//         ]
//     }                     
//     ]
// };

// const id = 'grandchild1'

// const findID = function(obj, id){

//     if(obj.id === id){
//         return obj
//     }

//     if(Array.isArray(obj.data)){
//         for (let i = 0; i < obj.data.length; i++) {
//            const target = findID(obj.data[i], id)

//             if(target){
//                 return target
//             }
//         }
//     }

//     return null
// }

let random = Math.random()


const cicle = function (x){

if( x >= 10) return x

x++
return cicle(x)
}

console.log(' ===> ', cicle(8))

const obj2 = {
    name: 'Ivan',
    family: 'Ivanov',
    level1:{
        key: '1'
    }
}

if('key' in obj2){
    console.log(' ===> name exist', )
}else{
    console.log(' ===> error', )
}

function checkEvent(i = 1) {
    if(i > 3) return
    i++
        checkEvent(i);
  }

  checkEvent()

const massiv = [2,3,3,3,4,3]

for (let i = 0; i < massiv.length; i++) {
    for (let j = i + 1; j < massiv.length; j++) {
       if(massiv[i] === massiv[j]){
           massiv.splice(j,1)
           j--
       }
    }
}

console.log(' ===> massiv', massiv)


const matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
  ];
  
// Размерность исходного массива
const n = matrix.length;

//Создание нового пустого массива размерностью n x n
const rotatedMatrix = [];
for (let i = 0; i < n; i++) {
  rotatedMatrix.push([]);
}

// [7,4,1]
// [8,5,2]
// [9,6,3]

for (let i = 0; i < n; i++) {
   for (let j = 0; j < n; j++) {
    rotatedMatrix[j][n - 1- i] = matrix[i][j]
   }
}

console.log(' ===> rotatedMatrix 90', rotatedMatrix)

// [9,8,7]
// [6,5,4]
// [3,2,1]
//повернуть массив на 180 градусов
for (let i = 0; i < n; i++) {
   for (let j = 0; j < n; j++) {
    rotatedMatrix[n- 1 - i][n- 1 -j] = matrix[i][j]
   } 
}

console.log(' ===>rotatedMatrix 180', rotatedMatrix)

const someArr = [1,2,3,4,5]

for (let i = 0; i < someArr.length; i++) {
    console.log(' ===> someArr.length', someArr.length - 1 - i)
    
}

const tags = [
    {id:1, n: 'a'},
    {id:2, n: 'a'},
    {id:3, n: 'b'}
]
    let errIds = tags.reduce((acc, item, index, array) => {
      if (array.filter((otherItem) => otherItem.n === item.n).length > 1 && !acc.includes(item.id)) {
        acc.push(item.id);
      }
      return acc;
    }, []);

this.name = 'Window'

const regularFunc = function(){
    console.log(' ===> regularFunc context', this)
    this.alert('my Alert!')
    return `your name is ${this.name}`
}

const arrawFync = () => {
    console.log(' ===> arrawFync context', this)
    this.alert('my Alert!')
     return `your name is ${this.name}`
}

const person = {name: 'Ivan'}

person.regularFunc = regularFunc
person.arrawFync = arrawFync

person.regularFunc()
//person.arrawFync()