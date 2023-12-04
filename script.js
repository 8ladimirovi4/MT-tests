
const diff = 1701733411254 - 1701647009870 
const milliseconds = diff;

// Конвертация в часы
const hours = milliseconds / (1000 * 60 * 60);

// Конвертация в дни
const days = hours / 24;

console.log(`Время в часах: ${hours}`);
console.log(`Время в днях: ${days}`);