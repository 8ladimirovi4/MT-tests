// Генерируем случайные данные напряжения для 24 часов (шаг 1 час)
export const generateVoltageData = (): number[] => {
    const data: number[] = [];
    for (let i = 0; i < 24; i++) {
      // Генерируем случайное напряжение в диапазоне 200-240 В
      const voltage = Math.random() * 40 + 200;
      data.push(Number(voltage.toFixed(2)));
    }
    return data;
  };
  
  // Генерируем метки времени для 24 часов
 const generateTimeLabels = (): string[] => {
    const labels: string[] = [];
    for (let i = 0; i < 24; i++) {
      const hour = i.toString().padStart(2, '0');
      labels.push(`${hour}:00`);
    }
    return labels;
  };
  
  // Исходные данные гистограммы
const originalBarLabels = ['shirt', 'cardigan', 'chiffon', 'pants', 'heels', 'socks'];
const originalBarData = [5, 20, 36, 10, 10, 20];

  // Создаем x-axis с 24 позициями, сохраняя оригинальные подписи на первых 6 позициях
export const xAxisLabels = generateTimeLabels();
// Заменяем первые 6 меток времени на оригинальные подписи
for (let i = 0; i < originalBarLabels.length; i++) {
  xAxisLabels[i] = originalBarLabels[i];
}

// Расширяем данные гистограммы до 24 позиций (первые 6 с данными, остальные null)
export const extendedBarData: (number | null)[] = [...originalBarData];
for (let i = originalBarData.length; i < 24; i++) {
  extendedBarData.push(null);
}
  