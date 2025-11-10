import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface ChartOption {
  title: {
    text: string;
  };
  tooltip: {};
  xAxis: {
    data: string[];
  };
  yAxis: {};
  series: Array<{
    name: string;
    type: string;
    data: number[];
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
    data: ['shirt', 'cardigan', 'chiffon', 'pants', 'heels', 'socks']
  },
  yAxis: {},
  series: [
    {
      name: 'sales',
      type: 'bar',
      data: [5, 20, 36, 10, 10, 20]
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

