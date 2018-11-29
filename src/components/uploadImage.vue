<template>
  <div>
    <template v-if="uploadList.length > 0">
        <div class="demo-upload-list" v-for="item in uploadList">
            <template>
              <img :src="item.url">
              <div class="demo-upload-list-cover">
                <Icon type="ios-eye-outline" size="40" @click.native="handleView(item.url)"></Icon>
                <Icon type="ios-trash-outline" size="40" @click.native="handleRemove(item)"></Icon>
              </div>
            </template>
        </div>
    </template>
    <Upload
        v-else
        ref="upload"
        :show-upload-list="false"
        :on-success="handleSuccess"
        accept=".jpg,.jpeg,.png"
        :format="['jpg','jpeg','png']"
        :max-size="2048"
        :on-format-error="handleFormatError"
        :on-exceeded-size="handleMaxSize"
        :before-upload="handleBeforeUpload"
        type="drag"
        :action="$uploadUrl"
        style="display: inline-block;width:160px;">
        <div style="width: 160px;height:78px;line-height: 78px;">
            <Icon type="ios-camera" size="40"></Icon>
        </div>
    </Upload>
    <Modal title="View Image" v-model="visible">
      <img :src="imgUrl" style="width: 100%" alt="预览">
    </Modal>
  </div>
</template>
<script>
export default {
    props: {
      uploadList: {
        type: Array
      },
      uploadMax: {
        type: Number
      }
    },
    data () {
        return {
            imgUrl: '',
            visible: false
        }
    },
    methods: {
        handleView (name) {
            this.imgUrl = name;
            this.visible = true;
        },
        handleRemove (file) {
            const data = {
                file,
                type: 0
            }
            this.$emit('upload', data)
        },
        handleSuccess (res, file) {
            if (res.state == 1) {
                const data = {
                    file: res.info.imgPath,
                    type: 1
                }
                this.$emit('upload', data)
            }
        },
        handleFormatError (file) {
            this.$Message.error('不支持该文件格式')
        },
        handleMaxSize (file) {
            this.$Message.error('上传文件超出最大文件限制2M')
        },
        handleBeforeUpload () {
            const check = this.uploadList.length < this.uploadMax
            if (!check) {
                this.$Message.error('最多可上传5张图')
            }
            return check;
        }
    }
}
</script>
<style scoped lang="less">
    .demo-upload-list{
        display: inline-block;
        width: 160px;
        height: 80px;
        text-align: center;
        line-height: 80px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 4px;
    }
    .demo-upload-list img{
        width: 100%;
        height: 100%;
    }
    .demo-upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
    }
    .demo-upload-list:hover .demo-upload-list-cover{
        display: block;
    }
    .demo-upload-list-cover i{
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }
</style>