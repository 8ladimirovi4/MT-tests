const array = [1,2,3,4,5,6,7,8,9,10]


for (let index = 0; index < array.length; index++) {
    //console.count('Итерация')
}

console.table({ name: "John", age: 30, city: "New York" });

console.group("Группа 1");
console.log("Сообщение в группе 1");
console.log("Еще одно сообщение в группе 1");
console.groupEnd();

console.log("Это снова обычное сообщение вне группы");

console.group("Группа 2");
console.log("Сообщение в группе 2");
console.group("Вложенная группа");
console.log("Сообщение во вложенной группе");
console.groupEnd();
