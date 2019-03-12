import React from 'react';
import { VictoryTheme, VictoryChart, VictoryLine } from 'victory';

const Chart = ({ data }) => (
  <div style={{ width: 700, height: 500 }}>
    <VictoryChart theme={VictoryTheme.material}>
      <VictoryLine data={data} />
    </VictoryChart>
  </div>
);

export default Chart;
