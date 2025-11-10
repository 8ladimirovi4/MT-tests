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
export const generateTimeLabels = (): string[] => {
    const labels: string[] = [];
    for (let i = 0; i < 24; i++) {
      const hour = i.toString().padStart(2, '0');
      labels.push(`${hour}:00`);
    }
    return labels;
  };
  
  // Исходные данные гистограммы
export const barLabels = ['shirt', 'cardigan', 'chiffon', 'pants', 'heels', 'socks'];
export const barData = [5, 20, 36, 10, 10, 20];

  // Экспортируем метки времени для оси X (нижняя ось)
export const timeLabels = generateTimeLabels();
  