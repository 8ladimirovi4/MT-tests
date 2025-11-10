import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import {  generateVoltageData, xAxisLabels, extendedBarData } from './model/data';

export interface ChartOption {
  title: {
    text: string;
  };
  tooltip: {};
  xAxis: {
    data: string[];
  };
  yAxis: Array<{
    type?: string;
    name?: string;
    position?: string;
    min?: number;
    max?: number;
  }>;
  series: Array<{
    name: string;
    type: string;
    data: (number | null)[];
    yAxisIndex?: number;
  }>;
  dataZoom: Array<{
    type: string;
    show: boolean;
    start: number;
    end: number;
  }>;
}

const initialState: ChartOption = {
  title: {
    text: 'ECharts Getting Started Example'
  },
  tooltip: {},
  xAxis: {
    data: xAxisLabels
  },
  yAxis: [
    {
      type: 'value',
      name: 'Продажи',
      position: 'left',
    },
    {
      type: 'value',
      name: 'Напряжение (В)',
      position: 'right',
      min: 190,
      max: 250,
    }
  ],
  series: [
    {
      name: 'sales',
      type: 'bar',
      data: extendedBarData,
      yAxisIndex: 0,
    },
    {
      name: 'Напряжение',
      type: 'line',
      data: generateVoltageData(),
      yAxisIndex: 1,
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
    updateSeriesData: (state, action: PayloadAction<{ seriesIndex: number; data: number[] }>) => {
      if (state.series[action.payload.seriesIndex]) {
        state.series[action.payload.seriesIndex].data = action.payload.data;
      }
    }
  }
});

export const { updateChartOption, updateSeriesData } = chartSlice.actions;
export default chartSlice.reducer;

