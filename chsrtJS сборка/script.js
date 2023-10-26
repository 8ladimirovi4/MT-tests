const data = []
const scale = []
let valueX = null
let valueY = null
// Получение ссылки на элемент canvas
const canvas = document.getElementById('myChart');

// Создание графика с конфигурацией
const ctx = canvas.getContext('2d');
const chart = new Chart(ctx, {
  type: 'line', // Тип графика (линейный)
  data: {
    labels: scale, // Массив меток по оси X (пока пустой)
    datasets: [
      {
        label: 'График данных',
        data: data, // Массив данных
        borderColor: 'rgb(75, 192, 192)', // Цвет линии
        borderWidth: 2, // Ширина линии
        fill: false, // Заполнение под линией выключено
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
       type: 'linear', // Тип шкалы X (линейная)
       position: 'bottom', // Позиция шкалы X
       min: scale[0],
       max: null,
      },
      y: {
        beginAtZero: false, // Начинать шкалу Y не с нуля
        min: -10,          // Минимальное значение шкалы Y
        max: 10,           // Максимальное значение шкалы Y
        stepSize: 1,       // Шаг шкалы Y
      },
    },
  },
});

function scaleX(valX, valY){
// Получаем текущие данные
const currentData1 = chart.data.datasets[0].data;

// Получаем массив меток по оси X
const currentLabels1 = chart.data.labels;

// Находим индекс последней точки
const lastIndex = currentData1.length - 1;

// Получаем значение X для последней точки
const lastXValue = currentLabels1[lastIndex];

chart.options.scales.x.max = valX ? lastXValue + Number(valX) : chart.options.scales.x.max

chart.options.scales.x.min = valY ? Number(valY) : chart.options.scales.x.min
chart.update();
}

scaleX()

// Функция для добавления данных в график
function addData() {
  const inputElement = document.getElementById('dataInput');
  const newData = parseFloat(inputElement.value);

  // Получаем текущие данные
  const currentData = chart.data.datasets[0].data;
  const currentLabels = chart.data.labels;

  // Добавляем новое значение в массив данных
  currentData.push(newData);

  // Добавляем метку (может быть номером точки)
  const newLabel = currentLabels.length + 1;
  currentLabels.push(newLabel);

  // Обновляем график
  chart.update();

  // Очищаем инпут
  inputElement.value = '';

  scaleX(valueX,valueY )
}



const rightInput = document.getElementById('rightAxis')
rightInput.addEventListener('change', (evt) => {
  if(evt.target.value < 0) 
  rightInput.value = 0

  valueX = evt.target.value
  scaleX(valueX, valueY)
 })

 const leftInput = document.getElementById('leftAxis')
 leftInput.addEventListener('change', (evt) => {
  if(evt.target.value > 2)
  leftInput.value = 2

  valueY= evt.target.value
  scaleX(valueX, valueY)
 })

 const datatInput = document.getElementById('dataInput')
 datatInput.addEventListener('change', (evt) => {
  const newData = parseFloat(evt.target.value);

  // Получаем текущие данные
  const currentData = chart.data.datasets[0].data;


  // if(currentData.length > 10) currentData.shift()



  console.log('currentData',currentData)
  const currentLabels = chart.data.labels;

  // Добавляем новое значение в массив данных
  currentData.push(newData);

  // Добавляем метку (может быть номером точки)
  const newLabel = currentLabels.length + 1;
  currentLabels.push(newLabel);

  // Обновляем график
  chart.update();



  scaleX(valueX,valueY )
 })
