<template>
  <div style="background:#eee;padding: 20px">
    <Card :bordered="false" v-for="(focus, index) in tableData" :key="focus.id">
      <p slot="title">
        {{focus.name}}
        
      </p>
      <Row>
      <Col span="7" v-for="item in focus.items" :key="item.id" style="margin-right:10px;">
        <img :src="item.path" style="display:inline-block;width:200px;height:120px;">
        <Form ref="formInline">
            <FormItem prop="user">
                <Input type="text"  placeholder="标题"></Input>
            </FormItem>
            <FormItem prop="password">
                <Input type="text" placeholder="目标url地址">
                    <Icon type="ios-link" slot="prepend"></Icon>
                </Input>
            </FormItem>
            <FormItem>
                <Button type="primary" >保存</Button>
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
            <Button
              type="default"
              size="small"
              icon="ios-cloud-upload-outline"
            >封面</Button>
          </Upload>
    </Card>
  </div>
</template>

<script>
import axios from "@/libs/api.request";
import { getFocusData } from "@/api/focus";
export default {
  name: "focus",
  data() {
    return {
        uploadAction: "",
      tableData: []
    };
  },
  methods: {
      uploadSuccess(res, file, fileList) {
      if (res.code === "0") {
        this.tableData[res.data.params["index"]]["thumb"] = res.data.path;
      }
    },
    getData() {
      getFocusData()
        .then(res => {
          if (res.data.code === "0") {
            this.total = res.data.data.total;
            this.pageSize = res.data.data.per_page;
            let baseUrl = res.data.data.base_url;
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

          console.dir(res.data);
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
.demo-upload-list {
  display: inline-block;
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
}
.demo-upload-list img {
  width: 100%;
  height: 100%;
}
.demo-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.demo-upload-list:hover .demo-upload-list-cover {
  display: block;
}
.demo-upload-list-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}
.ivu-col{
    overflow: hidden;
}
</style>