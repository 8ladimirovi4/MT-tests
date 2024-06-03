const date = new Date(1712149140000)
date.setUTCHours(date.getUTCHours() + 3)
console.log(' ===> ', date)

function foo(){
    this.sayHi = function() {
       return 123
    }
}

const instance = new foo()

function isValidString(input) {
    return input.indexOf('\u0001') === -1;
}

// Пример использования
var userInput = "Some text with null character\u0001";
if (isValidString(userInput.toString())) {
    console.log("Строка допустима.");
   console.log(' ===> isValidString(userInput)', isValidString(userInput))
} else {
    console.log("Обнаружен нулевой символ в строке.");
    console.log(' ===> isValidString(userInput)', isValidString(userInput))
}
 const pattern = /[a-zA-Z0-9!;%:?()@#$^&_=+\\/<>\[\]{}~,.\-]/;
 function testPasswd(value){
    return pattern.test(value)
 }
 console.log(' ===> ',  testPasswd('k€ek'))

debugger;
function  validationNumber (value, min, max) {
    const pattern = /^\d+$/
    return pattern.test(value.toString()) && value >= min && value <= max;
  }
  console.log(' ===> ',  validationNumber('99', 0, 100))


  const v = '10sd'

console.log(' ===> ', Number.isNaN(+v))



