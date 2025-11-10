import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import * as echarts from 'echarts';
import type { RootState } from '../store/store';
import { useChartZoom } from '../features/zoom';

const EChartsChart: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);

  // Получаем данные из chartSlice
  const chartOption = useSelector((state: RootState) => state.chart);

  // Используем хук для масштабирования
  const { zoomIn, zoomOut, resetZoom } = useChartZoom(chartInstance);

  useEffect(() => {
    // Инициализируем экземпляр ECharts при монтировании компонента
    if (chartRef.current) {
      chartInstance.current = echarts.init(chartRef.current);
    }

    // Обрабатываем изменение размера окна
    const handleResize = () => {
      chartInstance.current?.resize();
    };
    window.addEventListener('resize', handleResize);

    // Очищаем ресурсы при размонтировании компонента
    return () => {
      window.removeEventListener('resize', handleResize);
      chartInstance.current?.dispose();
    };
  }, []);

  useEffect(() => {
    if (chartInstance.current && chartOption) {
      // Добавляем dataZoom конфигурацию для поддержки масштабирования
     
      // При получении данных обновляем опции графика
      chartInstance.current.setOption(chartOption as echarts.EChartsOption);
    }
  }, [chartOption]);

  return (
    <div style={{ width: '100%' }}>
      <div style={{ marginBottom: '10px', display: 'flex', gap: '10px' }}>
        <button onClick={zoomIn}>Увеличить (x2)</button>
        <button onClick={zoomOut}>Уменьшить (x2)</button>
        <button onClick={resetZoom}>Сбросить</button>
      </div>
      <div ref={chartRef} style={{ width: '100%', height: '400px' }} />
    </div>
  );
};

export default EChartsChart;