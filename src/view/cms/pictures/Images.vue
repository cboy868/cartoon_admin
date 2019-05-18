<template>
  <div style="background:#eee;padding: 20px">
    <Card :bordered="false">
      <p slot="title">{{detail.name}}</p>
      <div v-for="img in images" :key="img.id" style="width:220px;height:180px;float:left">
        <img :src="baseUrl + img" style="display:inline-block;width:200px;height:120px;">
        <Form ref="formInline">
          <FormItem>
            <Button type="error" size="small" @click="del(img)">删除</Button>
          </FormItem>
        </Form>
      </div>
      <Divider/>
      <Upload
        name="image"
        :format="['jpg','jpeg','png']"
        :max-size="2048"
        :data="{id:pictureId}"
        :action="uploadAction"
        :on-success="uploadSuccess"
        :show-upload-list="false"
        multiple
        style="display:inline"
      >
        <Button type="default" size="small" icon="ios-cloud-upload-outline">上传主图</Button>
      </Upload>
    </Card>
  </div>
</template>
<script>
import axios from "@/libs/api.request";
import { getPictureImagesData, deletePictureImageData } from "@/api/pictures";
export default {
  name: "images",
  data() {
    return {
      pictureId: 0,
      baseUrl: "",
      uploadAction: "",
      images: [],
      detail: {}
    };
  },
  methods: {
    uploadSuccess(res, file, fileList) {
      if (res.code === "0") {
        this.images = res.data.images;
      } else {
        this.$Message.error("上传图片失败");
      }
    },
    del(img) {
      if (!confirm("确认删除此图片吗？")) {
        return false;
      }
      deletePictureImageData(this.pictureId, img).then(res => {
        if (res.data.code === "0") {
          this.$Message.success("删除成功");
          this.images = res.data.data.images;
        } else {
          this.$Message.error("删除失败");
        }
      });
    },
    getData(id) {
      getPictureImagesData(id)
        .then(res => {
          if (res.data.code === "0") {
            this.images = res.data.data.images;
            this.detail = res.data.data;
            this.baseUrl = res.data.data.baseUrl;
          }
        })
        .catch(() => {});
    }
  },
  mounted() {
    this.pictureId = this.$route.params.id;
    this.getData(this.pictureId);
    this.uploadAction = axios.baseUrl + "upimages";
  }
};
</script>

<style>
.ivu-col {
  overflow: hidden;
}
</style>