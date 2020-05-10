import 'echarts';
import chart from './chart';
import buleTheme from './theme/cube-bule.json';
import greenTheme from './theme/cube-green.json';

chart.registerTheme('cube-blue', buleTheme);
chart.registerTheme('cube-green', greenTheme);

export default chart;
