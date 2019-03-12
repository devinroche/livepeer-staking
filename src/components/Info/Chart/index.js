import React from 'react';
import { VictoryTheme, VictoryChart, VictoryLine } from 'victory';

const Chart = ({ data }) => (
  <div>
    <VictoryChart
      width={800}
      style={{ width: '100%' }}
      theme={VictoryTheme.material}
    >
      <VictoryLine
        data={data}
        style={{
          data: { stroke: '#00eb88' }
        }}
      />
    </VictoryChart>
  </div>
);

export default Chart;
