import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import * as echarts from 'echarts';
import type { RootState } from '../store/store';

const EChartsChart: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);

  // Получаем данные из chartSlice
  const chartOption = useSelector((state: RootState) => state.chart);

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
      // При получении данных обновляем опции графика
      chartInstance.current.setOption(chartOption as echarts.EChartsOption);
    }
  }, [chartOption]);

  return <div ref={chartRef} style={{ width: '100%', height: '400px' }} />;
};

export default EChartsChart;