import { useCallback } from 'react';
import type { ECharts } from 'echarts';

interface DownloadOptions {
  filename?: string;
  pixelRatio?: number;
  backgroundColor?: string;
}

export const useChartDownload = (chartInstance: React.MutableRefObject<ECharts | null>) => {
  const downloadChart = useCallback(
    (options: DownloadOptions = {}) => {
      if (!chartInstance.current) {
        console.warn('Chart instance is not available');
        return;
      }

      const {
        filename = `chart-${new Date().toISOString().slice(0, 10)}.png`,
        pixelRatio = 2,
        backgroundColor = '#fff',
      } = options;

      try {
        // Получаем изображение графика в формате base64
        const imageUrl = chartInstance.current.getDataURL({
          type: 'png',
          pixelRatio,
          backgroundColor,
        });

        // Создаем временную ссылку для скачивания
        const link = document.createElement('a');
        link.download = filename;
        link.href = imageUrl;

        // Добавляем ссылку в DOM, кликаем и удаляем
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error('Error downloading chart:', error);
      }
    },
    [chartInstance]
  );

  return {
    downloadChart,
  };
};

