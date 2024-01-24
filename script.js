// const array = [1,2,3,4,5,6,7,8,9,10]


// for (let index = 0; index < array.length; index++) {
//     //console.count('Итерация')
// }

// console.table({ name: "John", age: 30, city: "New York" });

// console.group("Группа 1");
// console.log("Сообщение в группе 1");
// console.log("Еще одно сообщение в группе 1");
// console.groupEnd();

// console.log("Это снова обычное сообщение вне группы");

// console.group("Группа 2");
// console.log("Сообщение в группе 2");
// console.group("Вложенная группа");
// console.log("Сообщение во вложенной группе");
// console.groupEnd();



//Поднятие (hoisting)

//Стадии разбора кода
// 1. Парсинг (Parsing): Когда модули загружены, код JavaScript 
// парсится (разбирается) для создания абстрактного синтаксического 
// дерева (Abstract Syntax Tree, AST). Это дерево представляет собой 
// структуру кода, которая будет исполняться.

//2. Компиляция (Compilation): AST компилируется в машинный код с использованием 
// движка V8 (или другого, в зависимости от конфигурации Node.js).
//  В этом процессе код оптимизируется для более эффективного выполнения.

// 3. Выполнение (Execution): Скомпилированный код выполняется. В процессе выполнения 
// создаются объекты, функции вызываются, и программа начинает взаимодействовать с 
// окружающей средой.

//ok
//classic()

function classic(){
    console.log(' classic function called===> ',)
}

//error
//functionalExpression()

const functionalExpression = function(){
    console.log(' functional expression called===> ',)
}

//error
//arrowFunction()

const arrowFunction = () => {
    console.log(' arrow function called===> ',)
}

//error
//console.log(' ===> ', person )
//console.log(' ===> ', animal)
//console.log(' ===> ', car)
let person = 'Denis'
const animal = 'Cat'
var car = 'Ferrari'


//контекст
const parentObj = {
    name: 'Karen',
    getName: function(){
        const parentObjContext = this
       const arrowFunction = () => {
           function arrowFunction2(){
            console.log(' this.name===> ', parentObjContext.name)
           }
           arrowFunction2()
        }
        arrowFunction()
    }
}

parentObj.getName()

//Области видимости

if(true){
    let login= 'keks'
    const password = '123'
    var email = 'keks@gmail.com'
}

//error
//console.log(' login===> ', login)
//error
//console.log(' password===> ', password)
//ok
//console.log('  email===> ',  email)

function Scope(){
  let name = 'Dasha'
  const age = 30
  var gender = 'female'
}
//error
//console.log(' name===> ', name)
//error
//console.log(' age===> ',age)
//error
//console.log(' gender===> ', gender)

let name = 'Vanya'
const age = 25
var gender = 'male'

function anotherScope(){
return `Меня зовут ${name}, мне ${age} лет и я ${gender}`
}

//Ключи в обектах

const myObj = {
    name: 'Саша',
    age: 9,
    random333: 'random3' + ' <=-==',
    2: 'Двоечка',
    3: 'тройка',
    4: 'четыре'
  }

//console.log(' ===> ', myObj[2])

//Задачки

// Создать случайное число от 1 до 10
//Если выпадает число от 1 до 3 включително вывести в консоль "ДЖЕКПОТ!!!"
//Если выпадает число от 4 до 7  включително вывести в консоль "ТЕБЕ ПОЧТИ ПОВЕЗЛО"
//Если выпадает число от 8 до 10  включително вывести в консоль "ХОЛОДНО"

const min = 1
const max = 10
const random = Math.round(Math.random() * (max - min) + min)

if(random >= 1 && random <=3){
    //console.log(' ===> ', "ДЖЕКПОТ")
}else if(random >= 4 && random <=7){
    //console.log(' ===> ', "Почти")
}else{
   // console.log(' ===> ', "Холодно")
}

//Что будет в консоли?
if (5 > 7) {
    //console.log('Да, пойду гулять')
  } else if (8 === 88) {
    //console.log(5 + 5)
  } else if ( 77 === 77) {
    const a = 77 + 77
     //console.log(a)

  }

//читаем код
function GetSum( a,b )
{
  let min, max;
  a > b ? (min = b, max = a) : (min = a, max = b);
  let result = min;
  while(min < max){
    result += ++ min;
    console.log(result, min)
  }
  return result;
}

console.log(GetSum(10, 13))

