jest.mock('react-chartjs-2', () => ({
  Line: () => <div>Mocked Line Chart</div>,
  Bar: () => <div>Mocked Bar Chart</div>,
  Pie: () => <div>Mocked Pie Chart</div>,
  Doughnut: () => <div>Mocked Doughnut Chart</div>,
  PolarArea: () => <div>Mocked PolarArea Chart</div>,
  Radar: () => <div>Mocked Radar Chart</div>,
  Bubble: () => <div>Mocked Bubble Chart</div>,
  Scatter: () => <div>Mocked Scatter Chart</div>,
}));

import React from 'react';
import { render } from '@testing-library/react';
import Dashboard from '../Dashboard';
import { ConfigProvider } from '../../../context/ConfigContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

describe('Dashboard', () => {
  it('renders without crashing', () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <ConfigProvider>
          <Dashboard />
        </ConfigProvider>
      </QueryClientProvider>
    );
  });
}); 