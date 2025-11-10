import React, { useRef, useEffect } from 'react';
import * as echarts from 'echarts';

const EChartsChart: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);

  // Получаем данные с помощью хука RTK Query
  const { data, isLoading, error } = useSelector....

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
    if (isLoading) {
      // Отображаем состояние загрузки
      chartInstance.current?.showLoading();
    } else {
      chartInstance.current?.hideLoading();
    }

    if (error) {
      // Обрабатываем состояние ошибки (можно отобразить сообщение)
      console.error('Ошибка при загрузке данных для графика:', error);
      // Опционально: можно отобразить заглушку на графике
      chartInstance.current?.setOption({
        title: {
          text: 'Не удалось загрузить данные',
          left: 'center',
          top: 'center',
        },
      });
    }

    if (data) {
      // При получении данных обновляем опции графика
      const option = {
        // Ваша конфигурация графика на основе полученных 'data'
        tooltip: {},
        xAxis: {
          data: data.categories,
        },
        yAxis: {},
        series: [
          {
            name: 'Продажи',
            type: 'bar',
            data: data.values,
          },
        ],
      };
      chartInstance.current?.setOption(option);
    }
  }, [data, isLoading, error]);

  return <div ref={chartRef} style={{ width: '100%', height: '400px' }} />;
};

export default EChartsChart;