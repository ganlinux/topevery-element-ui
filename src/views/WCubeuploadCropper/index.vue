
<template>
  <div class="cropper-wrapper">
    <div class="img-box">
      <img :id="imgId" class="cropper-image" alt="">
    </div>
    <div class="right-con">
      <div v-if="preview" :id="previewId" class="preview-box" />
      <div class="button-box">
        <slot>
          <el-upload
            class="upload-demo"
            style="text-align: center;"
            action="//jsonplaceholder.typicode.com/posts/"
            :before-upload="beforeUpload"
          >
            <div style="text-align: center;">
              <el-button size="mini" type="primary">选择图片</el-button>
            </div>
          </el-upload>
        </slot>
        <div v-show="insideSrc" class="btn-list">
          <el-button type="primary" size="mini" icon="el-icon-sort" @click="scale('Y')" />
          <el-button type="primary" size="mini" icon="el-icon-refresh-right" @click="rotate" />
          <el-button type="primary" size="mini" icon="el-icon-s-operation" @click="scale('X')" />
          <el-button type="primary" size="mini" icon="el-icon-zoom-in" @click="magnify" />
          <el-button type="primary" size="mini" icon="el-icon-top" @click="move(0, -moveStep)" />
          <el-button type="primary" size="mini" icon="el-icon-zoom-out" @click="shrink" />
          <el-button type="primary" size="mini" icon="el-icon-back" @click="move(-moveStep, 0)" />
          <el-button type="primary" size="mini" icon="el-icon-bottom" @click="move(0, moveStep)" />
          <el-button type="primary" size="mini" icon="el-icon-right" @click="move(moveStep, 0)" />
          <el-button size="mini" style="width: 150px;margin-top: 6px;" type="primary" @click="crop">{{ cropButtonText }}</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.min.css'

export default {
  name: 'WCubeuploadCropper',
  title: '图片上传剪切',
  pageConfig: {
    groupsKey: 'component',
    groupsName: '组件',
    pageTitle: '图片上传剪切',
    pageName: 'CubeuploadCropper',
    sort: '1'
  },
  props: {
    src: {
      type: String,
      default: ''
    },
    preview: {
      type: Boolean,
      default: true
    },
    moveStep: {
      type: Number,
      default: 4
    },
    cropButtonText: {
      type: String,
      default: '裁剪上传'
    }
  },
  data() {
    return {
      cropper: null,
      insideSrc: ''
    }
  },
  computed: {
    imgId() {
      return `cropper${this._uid}`
    },
    previewId() {
      return `cropper_preview${this._uid}`
    }
  },
  watch: {
    src(src) {
      this.replace(src)
    },
    insideSrc(src) {
      this.replace(src)
    }
  },
  mounted() {
    this.$nextTick(() => {
      const dom = document.getElementById(this.imgId)
      this.cropper = new Cropper(dom, {
        preview: `#${this.previewId}`,
        checkCrossOrigin: true
      })
    })
  },
  methods: {
    beforeUpload(file) {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = (event) => {
        this.insideSrc = event.srcElement.result
      }
      return false
    },
    replace(src) {
      this.cropper.replace(src)
      this.insideSrc = src
    },
    rotate() {
      this.cropper.rotate(90)
    },
    shrink() {
      this.cropper.zoom(-0.1)
    },
    magnify() {
      this.cropper.zoom(0.1)
    },
    scale(d) {
      this.cropper[`scale${d}`](-this.cropper.getData()[`scale${d}`])
    },
    move(...argu) {
      this.cropper.move(...argu)
    },
    crop() {
      this.cropper.getCroppedCanvas().toBlob(blob => {
        // this.$emit('on-crop', blob)
        // const img = window.URL.createObjectURL(blob)
        const fd = new FormData()
        fd.append('image', blob, 'image.png')
        const xhr = new XMLHttpRequest()
        xhr.open('POST', '//jsonplaceholder.typicode.com/posts/', true)
        xhr.send(fd)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.bg{
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC")
}
.cropper-wrapper{
  width: 600px;
  height: 340px;
  display: flex;

  .img-box{
    height: 340px;
    width: 430px;
    border: 1px solid #ebebeb;
    display: inline-block;
    .bg;
    img{
      max-width: 100%;
      display: block;
    }
  }
  .right-con{
    display: inline-block;
    width: 170px;
    vertical-align: top;
    box-sizing: border-box;
    padding: 0 10px;
    .preview-box{
      height: 150px !important;
      width: 100% !important;
      overflow: hidden;
      border: 1px solid #ebebeb;
      .bg;
    }
    .button-box{
      padding: 10px 0 0;
    }
  }
}

.el-button {
    margin: 0;
    margin: 0;
    margin-bottom: 4px;
}

.btn-list{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}
</style>
