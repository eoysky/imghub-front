<template>
  <div class="uploadDiv">
    <div class="uploadContent">
      <div class="selectUpload">
        <template>
          <span class="selectDescription">请选择图片存储引擎： </span>
          <a-select
            label-in-value
            :default-value="{ key: '0' }"
            style="width: 60%"
            @change="handleSelectChange"
          >
            <a-select-option value="0">
              本地上传
            </a-select-option>
            <a-select-option value="1">
              七牛云
            </a-select-option>
            <a-select-option value="2">
              腾讯云
            </a-select-option>
          </a-select>
        </template>
      </div>
      <a-upload-dragger
        name="file"
        :multiple="true"
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        @change="handleUploadChange"
        class="uploadDraggerWin"
      >
        <p class="ant-upload-drag-icon">
          <a-icon type="cloud-upload" />
        </p>
        <p class="ant-upload-text">
          点击上传文件或拖入文件到此处来上传！
        </p>
        <p class="ant-upload-hint">
          支持单次或批量上传，每次最大上传数量为20。严格禁止上传公司数据！
        </p>
      </a-upload-dragger>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {};
  },
  methods: {
    handleUploadChange (info) {
      const status = info.file.status;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        this.$message.success(`${info.file.name} 上传成功！`);
      } else if (status === 'error') {
        this.$message.error(`${info.file.name} 上传失败！`);
      }
    },
    handleSelectChange (value) {
      console.log(value);
    },
  },
};
</script>

<style lang="less" scoped>
.selectDescription{
  color: #FFF;
  font-size: 18px;
  font-weight: 800;
  margin: 0 18px;
}
.selectUpload{
  text-align: left;
  // float: left;
  display: block;
  height: 48px;
  width: 100%;
  margin-bottom: 48px;
}

.uploadDiv{
  text-align: center;
}
.uploadContent{
  margin-top: 64px;
  display: inline-block;
  width: 57%;
  height: 160px;
}
</style>
