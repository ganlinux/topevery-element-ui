<template>
  <div class="cube-search-bar">
    <template v-if="data && data.length">
      <!-- 左边组件类型 -->
      <template v-if="data && data[0] && data[0].length">
        <div
          v-for="(item, index) in data[0]"
          :key="index"
          class="left"
        >

          <template v-if="item.type === 'input'">
            <el-input
              v-model="item.value"
              :class="item.class ? item.class :'w180' "
              :size="size"
              clearable
              :placeholder="item.placeholder|| '请输入'"
              @keyup.enter.native="search"
            />
          </template>

          <template v-else-if="item.type === 'option'">
            <el-select
              v-model="item.value"
              :class="item.class?item.class:'w90'"
              :size="size"
              clearable
              filterable
              :placeholder="item.placeholder|| '请选择'"
              :multiple="item.multiple"
              collapse-tags
              @change="item.change ?item.change($event): null"
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

          <template v-if="item.type === 'date'">
            <el-date-picker
              v-model="item.value"
              :style="{width:'134px'}"
              :size="size"
              value-format="yyyy-MM-dd"
              :picker-options="dateTimePicker(item.minDate,item.maxDate)"
              type="date"
              :placeholder="item.placeholder|| '请选择'"
            />
          </template>

          <!-- 特别的组件 -->
          <template v-if="item.type === 'cubeSelectTree'">
            <CubeSelectTree
              ref="selectTree"
              v-model="item.value"
              :extra-param="item.extraParam ? item.extraParam : {} "
              :config="item.config || {} "
            />
          </template>
          <template v-if="item.type === 'cubeSelect'">
            <CubeSelect
              ref="CubeSelect"
              v-model="item.value"
              :extra-param="item.extraParam ? item.extraParam : {} "
              :config="item.config || {} "
            />
          </template>
          <template v-if="item.type === 'cubeCascader'">
            <CubeCascader
              ref="CubeCascader"
              v-model="item.value"
              :extra-param="item.extraParam ? item.extraParam : {} "
              :config="item.config || {} "
            />
          </template>

          <template v-else-if="item.type === 'search'">
            <el-button
              :type="item.buttonType ? item.buttonType : 'primary'"
              :icon="item.icon ? item.icon : 'el-icon-search'"
              :size="size"
              @click="search"
            >{{ item.name }}</el-button>
          </template>
          <template v-else-if="item.type === 'reset'">
            <el-button
              :type="item.buttonType ? item.buttonType : 'primary'"
              :icon="item.icon ? item.icon : 'el-icon-refresh'"
              plain
              :size="size"
              @click="clickReset"
            >{{ item.name }}</el-button>
          </template>
        </div>
      </template>
      <!-- 右边操作区域 -->
      <template v-if="data && data[1] && data[1].length">
        <div class="right">
          <div
            v-for="(item, index) in data[1]"
            :key="index"
            class="left"
          >
            <template v-if="item.type === 'add'">
              <el-button
                :size="size"
                type="success"
                icon="el-icon-plus"
                @click.stop="item.action ? item.action() :clickAdd(item)"
              >{{ item.name ? item.name : '新增' }}</el-button>
            </template>

            <template v-if="item.type === 'del'">
              <el-button
                :size="size"
                type="danger"
                icon="el-icon-delete"
                @click.stop="item.action ? item.action() :clickDel(item)"
              >删除</el-button>
            </template>

            <template v-if="item.type === 'button'">
              <el-button
                :plain="true"
                :size="size"
                :icon="item.icon"
                :type="item.btType"
                @click="item.click ? item.click($event) : null"
                @click.stop="item.action ? item.action() :clickBtn(item)"
              >{{ item.name }}</el-button>
            </template>

            <template v-else-if="item.type === 'more'">
              <el-dropdown
                trigger="click"
                @command="command"
              >
                <el-button
                  type="primary"
                  :size="size"
                  plain
                >{{ item.name || '更多操作' }}<i class="el-icon-arrow-down el-icon--right" /></el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item
                    v-for="(itemK,i) in item.options"
                    :key="i"
                    :icon="itemK.icon"
                    :command="itemK.label"
                    @click.native="itemK.action ? itemK.action() : null"
                  >{{ itemK.label }}</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </div>
        </div>
      </template>
    </template>
  </div>
</template>

<script>

//  常量类型
const commonlyTypes = ['input', 'select', 'option', 'cascader', 'cubeCascader', 'date', 'datetime', 'date-month', 'tree'];
//  特殊类型
const cubeType = ['cubeSelect', 'cubeSelectTree'];

import { deepClone } from 'utils/index.new.js';
import ElButton from 'packages/button';
import ElInput from 'packages/input';
import ElSelect from 'packages/select';
import ElDropdown from 'packages/dropdown';
import ElDropdownItem from 'packages/dropdown-item';
import ElDropdownMenu from 'packages/dropdown-menu';
import DatePicker from 'packages/date-picker';

import CubeSelect from 'packages/cube-select';
import CubeSelectTree from 'packages/cube-select-tree';
import CubeCascader from 'packages/cube-cascader';

export default {
  name: 'CubeSearchBar',
  componentName: 'CubeSearchBar',
  components: {
    ElButton,
    ElInput,
    ElSelect,
    DatePicker,
    ElDropdown,
    ElDropdownItem,
    ElDropdownMenu,

    CubeSelect,
    CubeCascader,
    CubeSelectTree
  },
  props: {
    size: {
      type: String,
      default: () => 'small'
    },
    data: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
    };
  },
  created() {
    this.initParam();
  },
  methods: {
    initParam() {
      if (this.data.length > 0 && this.data[0] && this.data[0].length > 0) {
        const items = this.data[0];
        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          if (item['initValue']) {
            item['value'] = item['initValue'];
          }
        }
      }
    },
    clickReset() {
      if (this.data.length > 0 && this.data[0] && this.data[0].length > 0) {
        const items = this.data[0];
        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          if (item['type'] === 'search') {
            break;
          } else if (item['initValue']) {
            item['value'] = item['initValue'];
          } else {
            item['value'] = null;
          }
        }
      }
      if (this.$refs['selectTree']) {
        this.$refs['selectTree'][0].clear();
      }
      this.$emit('reset', this.getSearchParams());
    },
    search() {
      const params = this.getSearchParams();
      this.$emit('search', params);
    },
    getSearchParams() {
      // 获取选择参数
      const params = {};
      if (this.data.length > 0 && this.data[0] && this.data[0].length > 0) {
        const items = this.data[0];
        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          if (commonlyTypes.indexOf(item['type']) !== -1) {
            params[item['key']] = item.multiple ? item.value.toString() : item.value;
          } else if (item['type'] === 'multiple-date') {
            if (item.value != null) {
              params[item['key1']] = item.value[0] ? item.value[0] : '';
              params[item['key2']] = item.value[1] ? item.value[1] : '';
            } else {
              params[item['key1']] = null;
              params[item['key2']] = null;
            }
          } else if (cubeType.includes(item['type'])) {
            params[item['key']] = item.value ? item.value[item.config.keyCode] ? item.value[item.config.keyCode] : '' : '';
          } else if (item['type'] === 'search') {
            break;
          }
        }
      }
      return deepClone(params);
    },
    clickAdd() {
      this.$emit('add');
    },
    clickDel() {
      this.$emit('del');
    },
    clickBtn(item) {
      this.$emit('button', item);
      this.$emit('clickBtn', item);
    },
    command(command) {
      this.$emit('command', command);
    },
    dateTimePicker(minDate, maxDate) {
      if (minDate && maxDate) {
        return {
          disabledDate: time => (time.getTime() > new Date(maxDate).getTime() || time.getTime() < new Date(minDate).getTime())
        };
      }
      if (maxDate) {
        return {
          disabledDate: time => (maxDate ? time.getTime() > new Date(maxDate).getTime() : false)
        };
      }
      if (minDate) {
        return {
          disabledDate: time => (minDate ? time.getTime() < new Date(minDate).getTime() : false)
        };
      }
      return {
        disabledDate: false
      };
    }
  }
};
</script>

