import { useCallback } from 'react';
import type { ECharts } from 'echarts';

interface ZoomState {
  start: number;
  end: number;
}

const ZOOM_FACTOR = 2;
const MIN_ZOOM_RANGE = 5; // Минимальный диапазон масштабирования в процентах

export const useChartZoom = (chartInstance: React.MutableRefObject<ECharts | null>) => {
  const getCurrentZoom = useCallback((): ZoomState | null => {
    if (!chartInstance.current) return null;

    const option = chartInstance.current.getOption();
    const dataZoom = (option as any).dataZoom;

    if (dataZoom && dataZoom.length > 0) {
      const zoom = dataZoom[0];
      // Используем start/end для процентного масштабирования
      const start = zoom.start !== undefined ? zoom.start : 0;
      const end = zoom.end !== undefined ? zoom.end : 100;
      return { start, end };
    }

    // Если dataZoom не установлен, возвращаем полный диапазон
    return { start: 0, end: 100 };
  }, [chartInstance]);

  const zoomIn = useCallback(() => {
    if (!chartInstance.current) return;

    const currentZoom = getCurrentZoom();
    if (!currentZoom) return;

    const range = currentZoom.end - currentZoom.start;
    
    // Проверяем минимальный диапазон
    if (range <= MIN_ZOOM_RANGE) return;

    const center = (currentZoom.start + currentZoom.end) / 2;
    const newRange = range / ZOOM_FACTOR;

    // Вычисляем новые границы, сохраняя центр
    let newStart = center - newRange / 2;
    let newEnd = center + newRange / 2;

    // Корректируем границы, если они выходят за пределы
    if (newStart < 0) {
      newStart = 0;
      newEnd = newRange;
    }
    if (newEnd > 100) {
      newEnd = 100;
      newStart = 100 - newRange;
    }

    chartInstance.current.dispatchAction({
      type: 'dataZoom',
      dataZoomIndex: 0,
      start: newStart,
      end: newEnd,
    });
  }, [chartInstance, getCurrentZoom]);

  const zoomOut = useCallback(() => {
    if (!chartInstance.current) return;

    const currentZoom = getCurrentZoom();
    if (!currentZoom) return;

    const range = currentZoom.end - currentZoom.start;
    const center = (currentZoom.start + currentZoom.end) / 2;
    const newRange = Math.min(100, range * ZOOM_FACTOR);

    // Вычисляем новые границы, сохраняя центр
    let newStart = center - newRange / 2;
    let newEnd = center + newRange / 2;

    // Корректируем границы, если они выходят за пределы
    if (newStart < 0) {
      newStart = 0;
      newEnd = newRange;
    }
    if (newEnd > 100) {
      newEnd = 100;
      newStart = 100 - newRange;
    }

    chartInstance.current.dispatchAction({
      type: 'dataZoom',
      dataZoomIndex: 0,
      start: newStart,
      end: newEnd,
    });
  }, [chartInstance, getCurrentZoom]);

  const resetZoom = useCallback(() => {
    if (!chartInstance.current) return;

    chartInstance.current.dispatchAction({
      type: 'dataZoom',
      start: 0,
      end: 100,
    });
  }, [chartInstance]);

  return {
    zoomIn,
    zoomOut,
    resetZoom,
    getCurrentZoom,
  };
};

