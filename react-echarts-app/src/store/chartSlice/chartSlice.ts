import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import {  generateVoltageData, timeLabels, barData, barLabels } from './model/data';

export interface ChartOption {
  title: {
    text: string;
  };
  tooltip: {
    trigger?: string;
    axisPointer?: {
      type?: string;
      crossStyle?: {
        color?: string;
        width?: number;
        type?: string;
      };
      lineStyle?: {
        color?: string;
        width?: number;
        type?: string;
      };
    };
  };
  xAxis: Array<{
    type?: string;
    data?: string[];
    position?: string;
    name?: string;
    nameLocation?: 'start' | 'middle' | 'end';
    nameGap?: number;
    nameTextStyle?: {
      align?: 'left' | 'center' | 'right';
    };
    min?: number;
    max?: number;
    axisLabel?: {
      formatter?: (value: number) => string;
    };
  }>;
  yAxis: Array<{
    type?: string;
    name?: string;
    position?: string;
    min?: number;
    max?: number;
    show?: boolean;
  }>;
  series: Array<{
    name: string;
    type: string;
    data: (number | null)[] | Array<[number, number]>;
    yAxisIndex?: number;
    xAxisIndex?: number;
    triggerLineEvent?: boolean;
    connectNulls?: boolean; // Не соединять точки при отсутствии данных (создает разрывы)
    lineStyle?: {
      color?: string;
      width?: number;
      type?: 'solid' | 'dashed' | 'dotted';
    };
  }>;
  dataZoom: Array<{
    type: string;
    show: boolean;
    start: number;
    end: number;
  }>;
  legend?: {
    orient?: 'horizontal' | 'vertical';
    left?: string | number;
    right?: string | number;
    top?: string | number;
    bottom?: string | number;
  };
}

export type ChartMode = 'live' | 'historical';

const initialState: ChartOption = {
  title: {
    text: 'ECharts Getting Started Example'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      crossStyle: {
        color: '#999',
        width: 1,
        type: 'dashed'
      },
      lineStyle: {
        color: '#999',
        width: 1,
        type: 'dashed'
      }
    }
  },
  legend: {
    orient: 'horizontal',
    left: 'center',
    bottom: -5
  },
  xAxis: [
    {
      type: 'category',
      data: barLabels,
      position: 'top', 
    },
    {
      type: 'category',
      data: timeLabels,
      position: 'bottom',
      name: 'Время',
      nameLocation: 'end',
      nameGap: 15,
      nameTextStyle: {
        align: 'right',
      },
    }
  ],
  yAxis: [
    {
      type: 'value',
      name: 'Продажи',
      position: 'left',
      show: true,
    },
    {
      type: 'value',
      name: 'Напряжение (В)',
      position: 'right',
      min: 190,
      max: 250,
      show: true,
    }
  ],
  series: [
    {
      name: 'sales',
      type: 'bar',
      data: barData,
      yAxisIndex: 0,
      xAxisIndex: 0,
    },
    {
      name: 'Напряжение',
      type: 'line',
      data: generateVoltageData(),
      yAxisIndex: 1,
      xAxisIndex: 1,
      triggerLineEvent: true, // click on line
      connectNulls: false, // Не соединять точки при отсутствии данных (создает разрывы)
      lineStyle: {
        color: '#70f078',
        width: 2,
        type: 'solid',
      },
    }
  ],
  dataZoom: [  // конфигурация для поддержки масштабирования
    {
      type: 'slider',
      show: true,
      start: 0,
      end: 100,
    },
  ],
};

// Расширяем state для хранения режима и live данных
interface ChartState extends ChartOption {
  mode: ChartMode;
  // Исходные данные для historical режима
  historicalData: {
    voltageData: (number | null)[];
    barData: number[];
    timeLabels: string[];
  };
  // Live данные
  liveData: {
    voltageData: Array<[number, number]>; // [время_в_минутах, напряжение]
    barData: number[];
    timeLabels: string[];
    lastMinuteIndex: number; // Последняя добавленная минута на шкале
    maxTime: number; // Максимальное время в минутах для масштабирования
  };
}

const initialStateWithMode: ChartState = {
  ...initialState,
  mode: 'historical',
  historicalData: {
    voltageData: generateVoltageData(),
    barData: [...barData],
    timeLabels: [...timeLabels],
  },
  liveData: {
    voltageData: [],
    barData: [0, 0, 0, 0, 0, 0],
    timeLabels: ['0:00'],
    lastMinuteIndex: 0,
    maxTime: 0,
  },
};

const chartSlice = createSlice({
  name: 'chart',
  initialState: initialStateWithMode,
  reducers: {
    updateChartOption: (state, action: PayloadAction<Partial<ChartOption>>) => {
      return { ...state, ...action.payload };
    },
    updateSeriesData: (state, action: PayloadAction<{ seriesIndex: number; data: (number | null)[] }>) => {
      if (state.series[action.payload.seriesIndex]) {
        state.series[action.payload.seriesIndex].data = action.payload.data;
      }
    },
    updateTrendStyle: (state, action: PayloadAction<{ color: string; thickness: number; style: 'solid' | 'dashed' | 'dotted' }>) => {
      const trendSeriesIndex = state.series.findIndex((s) => s.name === 'Напряжение');
      if (trendSeriesIndex !== -1) {
        // Цвет уже нормализован в модальном окне (с #)
        const colorValue = action.payload.color

        state.series[trendSeriesIndex].lineStyle = {
          color: colorValue,
          width: action.payload.thickness,
          type: action.payload.style,
        };
      }
    },
    updateYAxisVisibility: (state, action: PayloadAction<{ yAxisIndex: number; show: boolean }>) => {
      if (state.yAxis[action.payload.yAxisIndex]) {
        state.yAxis[action.payload.yAxisIndex].show = action.payload.show;
      }
    },
    setChartMode: (state, action: PayloadAction<ChartMode>) => {
      state.mode = action.payload;
      
      if (action.payload === 'historical') {
        // Переключаемся на historical данные
        const barSeriesIndex = state.series.findIndex((s) => s.name === 'sales');
        const trendSeriesIndex = state.series.findIndex((s) => s.name === 'Напряжение');
        
        if (barSeriesIndex !== -1) {
          state.series[barSeriesIndex].data = [...state.historicalData.barData];
        }
        
        if (trendSeriesIndex !== -1) {
          state.series[trendSeriesIndex].data = [...state.historicalData.voltageData];
        }
        
        // Обновляем оси X - восстанавливаем категориальную ось для historical
        if (state.xAxis[0]) {
          state.xAxis[0].data = [...state.historicalData.barData.map((_, i) => barLabels[i])];
        }
        if (state.xAxis[1]) {
          state.xAxis[1].type = 'category';
          state.xAxis[1].data = [...state.historicalData.timeLabels];
          // Удаляем числовые свойства
          delete state.xAxis[1].min;
          delete state.xAxis[1].max;
          delete state.xAxis[1].axisLabel;
        }
      } else {
        // Переключаемся на live данные
        const barSeriesIndex = state.series.findIndex((s) => s.name === 'sales');
        const trendSeriesIndex = state.series.findIndex((s) => s.name === 'Напряжение');
        
        if (barSeriesIndex !== -1) {
          state.series[barSeriesIndex].data = [...state.liveData.barData];
        }
        
        if (trendSeriesIndex !== -1) {
          state.series[trendSeriesIndex].data = [...state.liveData.voltageData];
        }
        
        // Обновляем оси X
        if (state.xAxis[0]) {
          state.xAxis[0].data = [...barLabels];
        }
        if (state.xAxis[1]) {
          // Для live режима используем числовую ось
          state.xAxis[1].type = 'value';
          state.xAxis[1].min = 0;
          state.xAxis[1].max = Math.ceil(state.liveData.maxTime) + 1 || 1;
          state.xAxis[1].axisLabel = {
            formatter: (value: number) => {
              const minutes = Math.floor(value);
              const hours = Math.floor(minutes / 60);
              const mins = minutes % 60;
              return `${hours}:${mins.toString().padStart(2, '0')}`;
            }
          };
        }
      }
    },
    updateLiveData: (state, action: PayloadAction<{ voltage: number; barValues: number[]; elapsedSeconds: number }>) => {
      const { voltage, barValues, elapsedSeconds } = action.payload;
      
      // Вычисляем время в минутах (с дробной частью для секунд)
      const timeInMinutes = elapsedSeconds / 60;
      
      // Определяем текущую минуту (новая минута появляется каждые 60 секунд)
      const currentMinute = Math.floor(elapsedSeconds / 60);
      
      // Добавляем новую точку напряжения с привязкой ко времени [время_в_минутах, напряжение]
      state.liveData.voltageData.push([timeInMinutes, voltage]);
      
      // Обновляем максимальное время для масштабирования
      if (timeInMinutes > state.liveData.maxTime) {
        state.liveData.maxTime = timeInMinutes;
      }
      
      // Суммируем значения гистограммы
      for (let i = 0; i < barValues.length && i < state.liveData.barData.length; i++) {
        state.liveData.barData[i] += barValues[i];
      }
      
      // Если прошла новая минута, добавляем новую метку времени
      if (currentMinute > state.liveData.lastMinuteIndex) {
        const hours = Math.floor(currentMinute / 60);
        const mins = currentMinute % 60;
        const minuteLabel = `${hours}:${mins.toString().padStart(2, '0')}`;
        state.liveData.timeLabels.push(minuteLabel);
        state.liveData.lastMinuteIndex = currentMinute;
      }
      
      // Обновляем данные в series, если режим live
      if (state.mode === 'live') {
        const barSeriesIndex = state.series.findIndex((s) => s.name === 'sales');
        const trendSeriesIndex = state.series.findIndex((s) => s.name === 'Напряжение');
        
        if (barSeriesIndex !== -1) {
          state.series[barSeriesIndex].data = [...state.liveData.barData];
        }
        
        if (trendSeriesIndex !== -1) {
          // Используем формат [время, значение] для числовой оси X
          state.series[trendSeriesIndex].data = [...state.liveData.voltageData];
        }
        
        // Обновляем ось X для тренда - меняем на числовую ось с форматированием
        if (state.xAxis[1]) {
          state.xAxis[1].type = 'value';
          state.xAxis[1].min = 0;
          state.xAxis[1].max = Math.ceil(state.liveData.maxTime) + 1;
          // Форматируем метки как время (часы:минуты)
          state.xAxis[1].axisLabel = {
            formatter: (value: number) => {
              const minutes = Math.floor(value);
              const hours = Math.floor(minutes / 60);
              const mins = minutes % 60;
              return `${hours}:${mins.toString().padStart(2, '0')}`;
            }
          };
        }
      }
    },
    resetLiveData: (state) => {
      // Сбрасываем live данные
      state.liveData = {
        voltageData: [],
        barData: [0, 0, 0, 0, 0, 0],
        timeLabels: ['0:00'],
        lastMinuteIndex: 0,
        maxTime: 0,
      };
    },
  }
});

export const { 
  updateChartOption, 
  updateSeriesData, 
  updateTrendStyle, 
  updateYAxisVisibility,
  setChartMode,
  updateLiveData,
  resetLiveData,
} = chartSlice.actions;
export default chartSlice.reducer;

