import React from 'react';
import {
  VictoryTheme,
  VictoryChart,
  VictoryLine,
  VictoryContainer
} from 'victory';

const Chart = ({ data }) => (
  <div>
    <VictoryChart
      width={800}
      containerComponent={<VictoryContainer title="USD Gains" />}
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
