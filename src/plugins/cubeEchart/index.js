// import 'echarts'

import CubeEchart from './echarts'
import buleTheme from '../echarts-theme/cube-bule.json'
import greenTheme from '../echarts-theme/cube-green.json'

CubeEchart.registerTheme('cube-blue-theme', buleTheme)
CubeEchart.registerTheme('cube-green-theme', greenTheme)

export default CubeEchart
