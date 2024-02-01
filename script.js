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

//console.log(GetSum(10, 13))

const foo = 5

const message = foo == 4 ? 'а = 4' : foo == 3 ? 'a = 3' : foo == 6 ? 'a = 6' : null

//console.log('===> ', message)

const dayOfWeek = 'Tuesday';

switch (dayOfWeek) {
    case 'Monday':
    case 'Tuesday':
    case 'Wednesday':
    case 'Thursday':
    case 'Friday':
        //console.log('Working day');
        break;

    case 'Saturday':
    case 'Sunday':
        //console.log('Weekend');
        break;

    default:
        //console.log('Invalid day');
}

const numberArr = [1,2,3,4,5]

for(value of numberArr){
    //console.log('===> ', value)
}



