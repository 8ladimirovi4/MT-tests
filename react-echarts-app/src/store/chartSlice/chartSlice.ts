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
    data: (number | null)[];
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

const chartSlice = createSlice({
  name: 'chart',
  initialState,
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
    }
  }
});

export const { updateChartOption, updateSeriesData, updateTrendStyle, updateYAxisVisibility } = chartSlice.actions;
export default chartSlice.reducer;

