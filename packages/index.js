
import CubeDialog from './CubeDialog'
import Progress from './Progress'
import MaxHeight from './MaxHeight'
import CubeSelect from './CubeSelect'
import CubeTable from './CubeTable'

export const components = {
  CubeDialog,
  Progress,
  MaxHeight,
  CubeSelect,
  CubeTable
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
    }
  })

  // Mount to prototype
  // Vue.prototype.$toast = Toast
}

// 当检测到 Vue 是全局变量的时候，自动将 执行 `install` 方法
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export {
  install,
  CubeDialog,
  Progress,
  MaxHeight,
  CubeSelect,
  CubeTable
}
export default {
  install
}
