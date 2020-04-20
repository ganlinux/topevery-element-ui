import { transformCamelCase } from './uitls'

import CubeDialog from './CubeDialog'
import MaxHeight from './MaxHeight'
import CubeTable from './CubeTable'

import NoticeBar from './NoticeBar'
import SearchBar from './SearchBar'
import ScrollBar from './ScrollBar'
import SelectBar from './SelectBar'

import CubeButton from './CubeButton'
import CubeInput from './CubeInput'
import CubeRadio from './CubeRadio'

import CubeForm from './CubeForm'

import CubeTableList from './CubeTableList'
import TableLoadMore from './TableLoadMore'

import CubeVideoPlayer from './CubeVideoPlayer'

import CubeSelect from './CubeSelect'
import CubeSplit from './CubeSplit'
import CubeUpload from './CubeUpload'
import CubeCircle from './CubeCircle'
import CubeMapDraw from './CubeMapDraw'
import CubeSelectTree from './CubeSelectTree'

import CubeContainer from './CubeContainer'
import CubePanel from './CubePanel'

import ProgressLine from './ProgressLine'

import CubeBorderBox1 from './CubeBorderBox1'
import CubeBorderBox2 from './CubeBorderBox2'
import CubeBorderBox3 from './CubeBorderBox3'
import CubeBorderBox4 from './CubeBorderBox4'

export const components = {
  CubeDialog,
  MaxHeight,
  CubeTable,
  NoticeBar,
  SearchBar,

  CubeTableList,
  TableLoadMore,

  CubeVideoPlayer,

  CubeSelect,
  ScrollBar,
  SelectBar,

  CubeButton,
  CubeInput,
  CubeRadio,

  CubeForm,

  CubeSplit,
  CubeUpload,
  CubeCircle,
  CubeMapDraw,
  CubeSelectTree,

  CubeContainer,
  CubePanel,

  ProgressLine,
  CubeBorderBox1,
  CubeBorderBox2,
  CubeBorderBox3,
  CubeBorderBox4
}

// Define plugin installation method
const install = function(Vue) {
  if (!Vue || install.installed) {
    return
  }
  // Register global components
  const componentsNames = Object.keys(components)
  componentsNames.forEach(name => {
    const component = components[name]
    if (component.name) {
      Vue.component(component.name, component) // kebab-case
      Vue.component(transformCamelCase(`-${component.name}`), component) // PascalCase
      // console.log(transformCamelCase(`-${component.name}`))
    }
  })

  Vue.prototype.$baseUrl = process.env.BASE_URL
  // Mount to prototype
  // Vue.prototype.$toast = Toast
}

// 当检测到 Vue 是全局变量的时候，自动将 执行 `install` 方法
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

const componentsList = { ...components }

export {
  install,
  componentsList
}
export default {
  install
}
