/**
 * @description renderTable
 */

import CubeTableRender from '@/components/CubeTableRender'

export default {
  components: { CubeTableRender },
  data() {
    return {
      cubeDialogTitle: '新增',
      dialogVisible: false,
      propsData: {
        data: null,
        isUpdate: false
      }
    }
  }
}
