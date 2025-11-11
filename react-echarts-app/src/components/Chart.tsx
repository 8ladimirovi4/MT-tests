import React, { useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as echarts from 'echarts';
import { Button } from 'primereact/button';
import { useChartZoom } from '../features/zoom';
import { useFullscreen } from '../features/fullscreen';
import { useChartDownload } from '../features/download';
import { TrendStyleModal, type TrendStyleSettings } from '../features/trend-style';
import { updateTrendStyle, updateYAxisVisibility, setChartMode, updateLiveData, resetLiveData } from '../store/chartSlice/chartSlice';
import { createChartWebSocketConnection, closeChartWebSocketConnection, type ChartWebSocketMessage } from '../api/chartWebSocketApi';
import type { RootState } from '../store/store';

const EChartsChart: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);
  const dispatch = useDispatch();
  const wsRef = useRef<WebSocket | null>(null);

  // Получаем данные из chartSlice
  const chartOption = useSelector((state: RootState) => state.chart);
  const chartMode = useSelector((state: RootState) => (state.chart as any).mode || 'historical');

  // Состояние для модального окна
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Используем хук для масштабирования
  const { zoomIn, zoomOut, resetZoom } = useChartZoom(chartInstance);

  // Используем хук для полноэкранного режима
  // Используем chartRef напрямую, так как это уже контейнер для графика
  const { isFullscreen, toggleFullscreen, isSupported: isFullscreenSupported } = useFullscreen(
    chartRef,
    chartInstance
  );

  // Используем хук для скачивания графика
  const { downloadChart } = useChartDownload(chartInstance);

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

  // Обработчик клика на графике - подписываемся один раз при монтировании
  useEffect(() => {
    if (!chartInstance.current) return;

    const handleChartClick = (params: any) => {
      // Проверяем, что клик был по серии "Напряжение" (тренд)
      if (params?.seriesName === 'Напряжение') {
        setIsModalVisible(true);
      }
    };

    chartInstance.current.on('click', handleChartClick);
    
    // Обработка событий легенды для управления видимостью осей Y
    const handleLegendSelectChanged = (params: any) => {   
      const selected = params.selected || {};
      
      // Проверяем видимость серий для каждой оси Y
      // yAxisIndex 0 используется серией 'sales' (гистограмма)
      // yAxisIndex 1 используется серией 'Напряжение' (тренд)
      
      // Проверяем ось Y для гистограммы (yAxisIndex 0)
      // Серия 'sales' использует yAxisIndex 0
      const barSeriesVisible = selected['sales'] !== false;
      dispatch(updateYAxisVisibility({ yAxisIndex: 0, show: barSeriesVisible }));
      
      // Проверяем ось Y для тренда (yAxisIndex 1)
      // Серия 'Напряжение' использует yAxisIndex 1
      const trendSeriesVisible = selected['Напряжение'] !== false;
      dispatch(updateYAxisVisibility({ yAxisIndex: 1, show: trendSeriesVisible }));
    };
    
    chartInstance.current.on('legendselectchanged', handleLegendSelectChanged);

  }, [dispatch]); // dispatch стабилен, но добавляем для соответствия правилам React

  // Получаем текущие настройки тренда из store
  const getCurrentTrendSettings = (): TrendStyleSettings => {
    const trendSeries = chartOption.series.find((s) => s.name === 'Напряжение');
    // Цвет, толщина и стиль находятся в lineStyle, а не напрямую в series
    return {
      color: trendSeries?.lineStyle?.color || '#5470c6',
      thickness: trendSeries?.lineStyle?.width || 2,
      style: trendSeries?.lineStyle?.type || 'solid',
    };
  };

  const handleApplySettings = (settings: TrendStyleSettings) => {
    dispatch(updateTrendStyle(settings));
  };

  // Обработчик переключения режима
  const handleToggleMode = () => {
    const newMode = chartMode === 'live' ? 'historical' : 'live';
    
    if (newMode === 'live') {
      // Переключаемся на live режим
      dispatch(setChartMode('live'));
      dispatch(resetLiveData());
      
      // Подключаемся к WebSocket
      const ws = createChartWebSocketConnection('ws://localhost:3000', {
        onOpen: () => {
          console.log('Chart WebSocket connected');
        },
        onMessage: (message: ChartWebSocketMessage) => {
          if (message.type === 'chartData' && message.data) {
            dispatch(updateLiveData({
              voltage: message.data.voltage,
              barValues: message.data.barValues,
              elapsedSeconds: message.data.elapsedSeconds,
            }));
          }
        },
        onError: () => {
          console.error('Chart WebSocket error');
        },
        onClose: () => {
          console.log('Chart WebSocket disconnected');
          wsRef.current = null;
        },
      });
      wsRef.current = ws;
    } else {
      // Переключаемся на historical режим
      dispatch(setChartMode('historical'));
      
      // Закрываем WebSocket соединение
      if (wsRef.current) {
        closeChartWebSocketConnection(wsRef.current);
        wsRef.current = null;
      }
    }
  };

  // Очистка WebSocket при размонтировании
  useEffect(() => {
    return () => {
      if (wsRef.current) {
        closeChartWebSocketConnection(wsRef.current);
        wsRef.current = null;
      }
    };
  }, []);

  return (
    <div style={{ width: '100%' }}>
      <div style={{ marginBottom: '10px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <Button
          label={chartMode === 'live' ? 'Historical' : 'Live'}
          icon={chartMode === 'live' ? 'pi pi-history' : 'pi pi-wifi'}
          onClick={handleToggleMode}
          severity={chartMode === 'live' ? 'warning' : 'success'}
        />
        <Button label="Увеличить (x2)" icon="pi pi-search-plus" onClick={zoomIn} />
        <Button label="Уменьшить (x2)" icon="pi pi-search-minus" onClick={zoomOut} />
        <Button label="Сбросить масштаб" icon="pi pi-refresh" onClick={resetZoom} severity="secondary" />
        {isFullscreenSupported && (
          <Button
            label={isFullscreen ? 'Выйти из полноэкранного режима' : 'Полноэкранный режим'}
            icon={isFullscreen ? 'pi pi-window-minimize' : 'pi pi-window-maximize'}
            onClick={toggleFullscreen}
            severity="info"
          />
        )}
        <Button
          label="Скачать PNG"
          icon="pi pi-download"
          onClick={() => downloadChart()}
          severity="success"
        />
      </div>
      <div ref={chartRef} style={{ width: '100%', height: '400px' }} />
      <TrendStyleModal
        visible={isModalVisible}
        onHide={() => setIsModalVisible(false)}
        initialSettings={getCurrentTrendSettings()}
        onApply={handleApplySettings}
      />
    </div>
  );
};

export default EChartsChart;