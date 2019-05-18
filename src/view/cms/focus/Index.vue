<template>
  <div style="background:#eee;padding: 20px">
    <Card :bordered="false" v-for="(focus, index) in tableData" :key="focus.id">
      <p slot="title">{{focus.name}}</p>
      <Row>
        <Col
          span="7"
          v-for="(item,itemIndex) in focus.items"
          :key="item.id"
          style="margin-right:10px;"
        >
          <img :src="baseUrl + item.path" style="display:inline-block;width:200px;height:120px;">
          <Form ref="formInline">
            <FormItem prop="user">
              <Input type="text" placeholder="标题" v-model="item.title"/>
            </FormItem>
            <FormItem prop="password">
              <Input type="text" placeholder="目标url地址" v-model="item.link">
                <Icon type="ios-link" slot="prepend"></Icon>
              </Input>
            </FormItem>
            <FormItem>
              <Button
                type="primary"
                size="small"
                style="margin-right:10px;"
                @click="update(index, itemIndex)"
              >保存</Button>
              <Button type="error" size="small" @click="del(index,itemIndex)">删除</Button>
            </FormItem>
          </Form>
        </Col>
      </Row>
      <Upload
        name="focus"
        :format="['jpg','jpeg','png']"
        :max-size="2048"
        :data="{id:focus.id,index:index}"
        :action="uploadAction"
        :on-success="uploadSuccess"
        :show-upload-list="false"
        multiple
        style="display:inline"
      >
        <Button type="default" size="small" icon="ios-cloud-upload-outline">封面</Button>
      </Upload>
    </Card>
  </div>
</template>

<script>
import axios from "@/libs/api.request";
import {
  getFocusData,
  updateFocusItemData,
  deleteFocusItemData
} from "@/api/focus";
export default {
  name: "focus",
  data() {
    return {
      baseUrl: "",
      uploadAction: "",
      tableData: []
    };
  },
  methods: {
    uploadSuccess(res, file, fileList) {
      if (res.code === "0") {
        this.tableData[res.data.params["index"]]["items"].push(res.data.model);
      } else {
        this.$Message.error("上传图片失败");
      }
    },
    update(index, itemIndex) {
      updateFocusItemData(this.tableData[index]["items"][itemIndex]).then(
        res => {
          if (res.data.code === "0") {
            this.$Message.success("修改成功");
          } else {
            this.$Message.error("修改失败");
          }
        }
      );
      console.dir(this.tableData[index]);
    },
    del(index, itemIndex) {
      if (!confirm("确认删除此图片吗？")) {
        return false;
      }
      deleteFocusItemData(this.tableData[index]["items"][itemIndex].id).then(
        res => {
          if (res.data.code === "0") {
            this.$Message.success("删除成功");
            this.tableData[index]["items"].splice(itemIndex, 1);
          } else {
            this.$Message.error("删除失败");
          }
        }
      );
    },
    getData() {
      getFocusData()
        .then(res => {
          if (res.data.code === "0") {
            this.total = res.data.data.total;
            this.pageSize = res.data.data.per_page;
            this.baseUrl = res.data.data.base_url;

            this.tableData = [];
            res.data.data.data.forEach(focus => {
              this.tableData.push({
                id: focus.id.toString(),
                name: focus.name,
                intro: focus.intro,
                pos: focus.pos,
                items: focus.items
              });
            });
          }
        })
        .catch(() => {});
    }
  },
  mounted() {
    this.getData();
    this.uploadAction = axios.baseUrl + "upfocus";
  }
};
</script>

<style>
.ivu-col {
  overflow: hidden;
}
</style>