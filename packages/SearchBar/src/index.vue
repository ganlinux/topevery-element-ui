<template>
  <div class="search-bar">
    <template v-if="data && data.length > 0">
      <template v-if="data[0].length">
        <div
          v-for="(item, index) in data[0]"
          :key="index"
          class="left"
        >
          <!-- date 日期 2020年02月29日-->
          <template v-if="item.type === 'date'">
            <el-date-picker
              v-model="item.value"
              clearable
              :class="item.class?item.class:'w110'"
              size="small"
              value-format="yyyy-MM-dd"
              type="date"
              :placeholder="item.placeholder"
            />
          </template>
          <!-- option 下拉 -->
          <template v-else-if="item.type === 'option'">
            <el-select
              v-model="item.value"
              :class="item.class?item.class:'w90'"
              size="small"
              clearable
              filterable
              :placeholder="item.placeholder"
            >
              <el-option
                v-for="sub in item.options"
                :key="sub.value"
                :label="sub.label"
                :value="sub.value"
                :class="item.class"
              />
            </el-select>
          </template>
          <!-- cascader 级联 -->
          <template v-else-if="item.type === 'cascader'">
            <el-cascader
              v-model="item.value"
              size="small"
              :placeholder="item.placeholder"
              :class="item.class?item.class:'w180'"
              :options="item.options"
              :props="{checkStrictly: true,emitPath:false,expandTrigger:'hover'}"
              clearable
              filterable
            />
          </template>
          <!-- datetime 日期时间 2020年02月29日15:57:54 -->
          <template v-if="item.type === 'datetime'">
            <el-date-picker
              v-model="item.value"
              :class="item.class?item.class:'w180'"
              value-format="yyyy-MM-dd HH:mm:ss"
              type="datetime"
              size="small"
              clearable
              :placeholder="item.placeholder"
            />
          </template>
          <!-- input 输入 -->
          <template v-else-if="item.type === 'input'">
            <el-input
              v-model="item.value"
              :class="item.class"
              size="small"
              clearable
              :placeholder="item.placeholder"
              @keyup.enter.native="search"
            />
          </template>
          <!-- cubeSelect 分页选择 返回id  -->
          <!-- <template v-else-if="item.type === 'cubeSelect'">
            <CubeSelect
              v-model="item.value"
              v-bind="item.props"
              :back-value="item.key"
              :placeholder="item.placeholder"
              :search-name="item.searchName"
              :focus-onload="false"
              :width="item.width ? item.width : 330"
              :popover-width="item.popoverWidth ? item.popoverWidth : 330"
              :key-name="item.keyName"
              :key-code="item.keyCode"
              :url="item.url"
              :method="item.method ? item.method : 'POST'"
              :column="item.column"
            />
          </template> -->

          <!-- tree 树形选择 返回id  -->
          <!-- <template v-else-if="item.type === 'tree'">
            <Treeselect
              v-model="item.value"
              class="tree"
              :normalizer="normalizer"
              :multiple="item.multiple"
              :class="item.class?item.class:'w220'"
              :placeholder="item.placeholder|| '请选择'"
              no-children-text="无数据"
              no-options-text="无可以选项"
              no-results-text="查询为空"
              :options="item.options"
            />
          </template> -->

          <!-- daterange-dateTime  日期范围  2020年02月29日-2020年02月29日 -->
          <template v-if="item.type === 'multiple-date'">
            <el-date-picker
              v-if="item.dateType"
              v-model="item.value"
              value-format="yyyy-MM-dd HH:mm:ss"
              type="datetimerange"
              size="small"
              clearable
              :class="item.class?item.class:'w240'"
              range-separator="至"
              :start-placeholder="item.placeholder1"
              :end-placeholder="item.placeholder2"
            />
            <el-date-picker
              v-else
              v-model="item.value"
              value-format="yyyy-MM-dd"
              type="daterange"
              size="small"
              clearable
              :class="item.class?item.class:'w240'"
              range-separator="至"
              :start-placeholder="item.placeholder1"
              :end-placeholder="item.placeholder2"
            />
          </template>
          <template v-else-if="item.type === 'search'">
            <el-button
              type="primary"
              :icon="item.icon ? item.icon : 'el-icon-search' "
              size="small"
              @click="search"
            >{{ item.name }}</el-button>
          </template>
          <template v-else-if="item.type === 'reset'">
            <el-button
              type="primary"
              size="small"
              plain
              @click="clickReset"
            >{{ item.name }}</el-button>
          </template>
        </div>
      </template>
      <template v-if="data[1].length">
        <template>
          <div class="right">
            <div
              v-for="(item, index) in data[1]"
              :key="index"
              class="left"
            >
              <template v-if="item.type === 'add'">
                <el-button
                  size="small"
                  type="primary"
                  :icon="item.icon"
                  @click="clickAdd"
                >{{ item.name }}</el-button>
              </template>
              <template v-if="item.type === 'button'">
                <el-button
                  size="small"
                  :type="item.keyType"
                  :icon="item.icon"
                  @click="clickBtn(item)"
                >{{ item.name }}</el-button>
              </template>
              <template v-else-if="item.type === 'more'">
                <el-dropdown
                  trigger="click"
                  @command="command"
                >
                  <el-button
                    type="primary"
                    size="small"
                  >{{ item.name || '更多操作' }}<i class="el-icon-arrow-down el-icon--right" /></el-button>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item
                      v-for="(itemK,i) in item.labels"
                      :key="i"
                      :icon="itemK.icon"
                      :command="itemK.label"
                    >{{ itemK.label }}</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </template>
            </div>
          </div>
        </template>
      </template>
    </template>
  </div>
</template>

<script>

// import Treeselect from '@riophae/vue-treeselect'
// import CubeSelect from '@/components/CubeSelect'

// 定义类型
const commonlyTypes = ['input', 'select', 'option', 'date', 'datetime', 'cascader', 'tree', 'cubeSelect']

export default {
  name: 'SearchBar',
  components: {
    // Treeselect,
    // CubeSelect
  },
  props: {
    data: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  data() {
    return {
      normalizer(node) {
        // 去掉children=[]的children属性
        if (node.children && !node.children.length) {
          delete node.children
        }
        return {
          id: node.id,
          label: node.label,
          children: node.children
        }
      }
    }
  },
  methods: {
    clickReset() {
      if (this.data.length > 0 && this.data[0] && this.data[0].length > 0) {
        const items = this.data[0]
        for (let i = 0; i < items.length; i++) {
          const item = items[i]
          if (item['type'] === 'search') {
            break
          } else {
            item['value'] = null
          }
        }
      }
      this.$emit('reset')
    },
    getSearchParams() {
      // 获取选择参数
      const params = {}
      if (this.data.length > 0 && this.data[0] && this.data[0].length > 0) {
        const items = this.data[0]
        for (let i = 0; i < items.length; i++) {
          const item = items[i]
          if (commonlyTypes.indexOf(item['type']) !== -1) {
            params[item['key']] = item.value ? item.value : ''
          } else if (item['type'] === 'multiple-date') {
            if (item.value != null) {
              params[item['key1']] = item.value[0] ? item.value[0] : ''
              params[item['key2']] = item.value[1] ? item.value[1] : ''
            } else {
              params[item['key1']] = null
              params[item['key2']] = null
            }
          } else if (item['type'] === 'search') {
            break
          }
        }
      }
      return params
    },
    search() {
      const params = this.getSearchParams()
      this.$emit('search', params)
    },
    clickAdd() {
      this.$emit('add')
    },
    clickBtn(item) {
      this.$emit('clickBtn', item)
    },
    command(command) {
      this.$emit('command', command)
    }
  }
}
</script>

<style lang="scss" scoped>
.search-bar {
  width: 100%;
  clear: both;
  margin-bottom: 2px;
  padding-bottom: 2px;
  border-bottom: 1px solid #dfecf9;
  background-color: white;

  &:after {
    visibility: hidden;
    display: block;
    font-size: 0;
    content: " ";
    clear: both;
    height: 0;
  }

  .left {
    float: left;
    height: 40px;
    > div {
      margin-right: 4px;
    }
    > button {
      margin-right: 4px;
    }

    // .el-range-editor--small.el-input__inner {
    //   margin-top: 5px;
    //   padding-left: 5px;
    //   padding-right: 0;
    //   width: 215px;
    // }

    // .el-date-editor .el-range-separator {
    //   padding: 0;
    //   line-height: 24px;
    //   margin-left: 3px;
    //   margin-right: 5px;
    // }

    // .el-range-editor--small .el-range-input {
    //   min-width: 80px;
    // }

    // .el-date-editor--datetimerange {
    //   .el-range-input {
    //     min-width: 130px;
    //   }
    // }
  }

  .right {
    float: right;
    margin-right: 10px;
  }

  /deep/.el-range-separator {
    color: #c2c5ce;
  }

  .el-input {
    float: left;
  }

  .el-button {
    float: left;
  }
}

div.left {
  margin-left: 5px;
}

.tree {
  font-size: 13px;
}

.vue-treeselect {
  font-size: 13px;
  color: #838487;
  font-weight: normal !important;
  /deep/.vue-treeselect__control {
    height: 30px;
    line-height: 30px;
    margin-top: 5px;
  }
  /deep/.vue-treeselect__placeholder {
    font-size: 13px;
  }
  /deep/.vue-treeselect__input {
    font-size: 13px;
    color: #838487;
  }
  /deep/.vue-treeselect__menu-container {
    z-index: 9999999 !important;
  }
}
</style>

