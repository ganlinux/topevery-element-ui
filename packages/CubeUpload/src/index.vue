<template>
  <!-- :http-request="handleRequest" -->
  <!-- :action="uploadUrl" -->
  <div class="CubeUpload">
    <el-upload
      v-show="!preview"
      ref="upload"
      action="//jsonplaceholder.typicode.com/posts/"
      :multiple="false"
      :disabled="disabled"
      :on-exceed="uploadHandleExceed"
      :on-success="handleFileSuccess"
      :on-error="uploadUploadError"
      :file-list="fileList"
      :before-upload="uploadBeforeUpload"
      :before-remove="uploadBeforeRemove"
      :accept="acceptType"
      :limit="limit"
      :headers="headers"
      :on-progress="uploadFileProcess"
      :show-file-list="false"
      list-type="picture"
    >
      <template>
        <div class="upload-btn">
          <el-button
            size="small"
            type="text"
          > <i class="el-icon-plus" /> 点击上传 </el-button>
          <el-tooltip
            placement="top"
            effect="light"
          >
            <div slot="content">只能上传jpg/png文件，且不超过500kb</div>
            <i class="up-tip el-icon-info" />
          </el-tooltip>
        </div>
      </template>
    </el-upload>

    <transition
      name="list"
      tag="div"
    >
      <div class="uploadList">
        <transition-group
          v-viewer="{movable: false}"
          class="el-upload-list"
          name="list"
          tag="ul"
        >
          >
          <li
            v-for="(item, index) in fileList"
            :key="index+guid"
            class="upload-li"
          >
            <i
              class="el-icon-close"
              @click="deleteOne(item,index)"
            />
            <div class="upload-files">
              <el-image
                v-if="isImg(item)"
                style="width: 60px; height: 60px"
                :src="item.url"
              />
              <div v-else class="el-icon-document" />
              <!-- 操作工具 -->
              <div class="upload-files-mark">
                <i v-if="isImg(item)" class="el-icon-zoom-in" @click="zoomImgs" />
                <i class="el-icon-download" @click="handleDownload(item.fileId)" />
              </div>
            </div>
            <div class="upload-progress">
              <el-progress
                v-if="item.progressPercent"
                class="progress"
                :stroke-width="8"
                :percentage="item.progressPercent"
                :show-text="false"
              />
              <div class="progress-text">
                {{ item.progressPercent +'%' }}
              </div>
            </div>
            <div
              class="files-name"
              :title="item.fileName"
            >
              {{ item.fileName }}
            </div>
          </li>
        </transition-group>
      </div>
    </transition>
  </div>
</template>

<script>

// import { baseImgSrc, previewImgSrc, baseDownSrc, uploadFileUrl } from '@/utils'

const previewImgSrc = 'http://'
const uploadFileUrl = 'http://'
const baseImgSrc = 'http://'
const baseDownSrc = 'http://'

import 'viewerjs/dist/viewer.css'
import Viewer from 'v-viewer'
import Vue from 'vue'
Vue.use(Viewer)

export default {
  name: 'CubeUpload',
  props: {
    /** 约定传入数据格式 如果不是这个格式 请自行处理数据结构
     * [{fileId: "199f2eba-9cfa-46d7-93d7-4f7ad59528d3", fileName: "画板 – 1.png"}]
     */
    dataList: {
      type: Array,
      default: () => []
    },
    accept: {
      type: String,
      default: () => ''
    },
    limit: {
      type: Number,
      default: () => 5
    },
    preview: { // 是否预览
      type: Boolean,
      default: false
    },
    headers: {
      type: Object,
      default: () => { }
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      uploadUrl: uploadFileUrl,
      fileList: [], // 上传文件
      fileList2: [1, 3, 4, 5, 6, 6, 6, 6], // 上传文件
      dialogImageUrl: '',
      imgName: ''
    }
  },
  computed: {
    previewList() {
      const list = this.fileList.map(item => this.getSourceFileUrl(item))
      return list
    },
    isDisabled() {
      const { disabled, isEdit } = this
      return disabled || isEdit === false
    },
    acceptType() {
      return this.accept || '.jpg, .jpeg, .png, .pdf, .docx, .doc, .wps, .xlsx, .xml, .xls'
    }
  },
  watch: {
    dataList: {
      immediate: true,
      handler(itemList) {
        if (itemList && Array.isArray(itemList) && itemList.length) {
          const arr = []
          for (const item of itemList) {
            arr.push({
              url: this.getPreviewFileUrl(item),
              ...item
            })
          }
          this.fileList = arr
        }
      }
    }
  },
  created() {
    // this.setHeaderToken()
  },
  methods: {
    zoomImgs() {
      this.$nextTick().then(_ => {
        const viewer = this.$el.querySelector('.el-upload-list').$viewer
        viewer.show()
      })
    },
    guid() {
      function s4() { return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1) }
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4()
    },
    deleteOne(item) {
      const index = this.fileList.findIndex(k => k.fileId === item.fileId)
      this.fileList.splice(index, 1)
    },
    uploadBeforeUpload(file) {
      const testmsg = file.name.substring(file.name.lastIndexOf('.'))
      const isTrue = this.acceptType.includes(testmsg) // '.jpg, .jpeg, .png, .pdf, .docx, .doc, .wps, .xlsx, .xml, .xls'
      const isLt2M = file.size / 1024 / 1024 < 30
      if (!isTrue) {
        this.$message({
          message: `上传文件只能是 ${this.acceptType}格式!`, type: 'warning' })
        this.fileFormal = true // 当前 的 数据的 formal
      }
      if (!isLt2M) {
        this.$message({
          message: '上传文件大小不能超过 30MB!',
          type: 'warning'
        })
        this.fileFormal = true
      }
      return isTrue && isLt2M
    },
    setHeaderToken() {
      this.headers.token = 'getToken()'
    },
    uploadUploadError(err, file, fileList) {
      this.$message({ message: err + '上传失败', type: 'error' })
    },
    isImg(file) {
      const { fileName } = file
      const testmsg = fileName.substring(fileName.lastIndexOf('.'))
      const isTrue = ['.jpg', '.jpeg', '.png', '.gif'].includes(testmsg)
      return isTrue
    },
    getPreviewFileUrl(file, w = 100) {
      if (file.fileId) {
        return previewImgSrc + '?fileId=' + file.fileId + '&w=' + w + '&h=' + w
      }
      return ''
    },
    getSourceFileUrl(file) {
      if (file.fileId) {
        return baseImgSrc + '?fileId=' + file.fileId
      }
      return ''
    },
    handleDownload(file) {
      if (file.fileId) return
      window.open(baseDownSrc + '?fileId=' + file.fileId)
    },
    uploadFileProcess(event, file, fileList) {
      fileList.forEach((element, index) => {
        if (element.uid === file.uid) {
          const progressPercent = Math.floor(event.percent)
          // 防止上传完接口还没有返回成功值，所以此处给定progress的最大值为99，成功的钩子中再置为100
          element.progressPercent = progressPercent === 100 ? 96 : progressPercent
          element.fileId = element.uid
          element.fileName = element.name
          this.$set(this.fileList, index, element)
        }
      })
    },
    uploadUploadSuc(res, file, fileList) {
      const { success, data } = res
      const { name, size } = file
      const index = name.lastIndexOf('\.')
      const fileType = name.substring(index + 1, name.length)
      if (success) {
        const info = { fileName: name, size, fileId: data, fileType }
        this.fileList.push({ ...info, url: this.getPreviewFileUrl(info) })
      }
    },
    handleFileSuccess(res, file, fileList) {
      fileList.forEach((element, index) => {
        if (element.uid === file.uid) {
          element.progressPercent = 100
          element.url = 'https://cn.bing.com/th?id=OHR.RainierClouds_ENUS_SS1021697089_1920x1080_HD_ZH-CN170801398.jpg&rf=LaDigue_1920x1080.jpg&pid=hp'
          this.$message.success('文件上传成功')
          this.$set(this.fileList, index, element)
        }
      })
    },
    uploadBeforeRemove(file, fileList) {
      // return this.$confirm(`确定移除 ${file.name}？`);
      if (this.fileFormal) {
        const index = fileList.findIndex((f, i) => {
          return f.fileId === file.fileId
        })
        fileList.splice(index, 1)
        this.fileFormal = false
        return false
      }
    },
    uploadHandleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 ${this.limit} 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      )
    }
  }
}

</script>

<style scoped lang="scss">
.CubeUpload {
  position: relative;
  .upload-btn {
    display: flex;
    align-items: center;
    .up-tip {
      color: #e5a147;
    }
  }
  .uploadList {
    max-height: 320px;
    min-height: 120px;
    background-color: #fff;
    border: 1px solid #d9d9d9;
    border-radius: 2px;
    overflow-y: auto;
    overflow-x: hidden;
  }
  .el-upload-list {
    display: flex;
    flex-wrap: wrap;
  }
  .upload-li {
    margin: 10px;
    display: inline-block;
    position: relative;
    text-align: center;
    user-select: none;
    .el-icon-close {
      font-weight: bold;
      position: absolute;
      cursor: pointer;
      transition: all 0.15s linear;
      right: 0px;
      top: 0px;
      &:hover {
        transform: rotate(90deg);
      }
      &:active {
        opacity: 0.42;
      }
    }
    .upload-files {
      width: 60px;
      height: 60px;
      overflow: hidden;
      position: relative;
      .upload-files-mark {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        opacity: 0;
        font-size: 18px;
        background-color: rgba(0, 0, 0, 0.26);
        transition: opacity 0.3s;
        border-radius: 4px;
        i {
          display: inline-block;
          cursor: pointer;
        }
      }
      &:hover {
        .upload-files-mark {
          opacity: 1;
        }
      }
    }
    .el-icon-document {
      font-size: 60px;
    }
    .files-name {
      display: flex;
      justify-content: center;
      font-size: 12px;
      width: 80px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .upload-progress {
      margin-bottom: 4px;
      font-size: 12px;
      display: flex;
      align-items: center;
      .progress {
        flex: 4;
      }
      .progress-text {
        flex: 1;
      }
    }
  }

  .list-enter-active,
  .list-leave-active {
    transition: all 0.3s ease;
  }

  .list-enter,
  .list-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }
}
</style>
