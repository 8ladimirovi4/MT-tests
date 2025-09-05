const fs = require('fs');
const path = require('path');

// Функция для конвертации PNG файла в base64
function convertPngToBase64(filePath) {
    try {
        // Читаем файл
        const imageBuffer = fs.readFileSync(filePath);
        
        // Конвертируем в base64
        const base64String = imageBuffer.toString('base64');
        
        // Создаем data URL
        const dataUrl = `data:image/png;base64,${base64String}`;
        
        return dataUrl;
    } catch (error) {
        console.error(`Ошибка при конвертации файла ${filePath}:`, error);
        return null;
    }
}

// Конвертируем оба PNG файла
const bmrzBase64 = convertPngToBase64('./bmrz.png');
const systemPactBase64 = convertPngToBase64('./systemPact.png');

if (bmrzBase64 && systemPactBase64) {
    console.log('Конвертация завершена успешно!');
    console.log('BMRZ base64 длина:', bmrzBase64.length);
    console.log('SystemPact base64 длина:', systemPactBase64.length);
    
    // Сохраняем результаты в файл
    const result = {
        bmrz: bmrzBase64,
        systemPact: systemPactBase64
    };
    
    fs.writeFileSync('./png_base64_data.json', JSON.stringify(result, null, 2));
    console.log('Данные сохранены в png_base64_data.json');
} else {
    console.error('Ошибка при конвертации файлов');
}
