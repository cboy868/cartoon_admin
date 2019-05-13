<template>
  <div>
    <Card>
      <div class="search-con search-con-top">
        <h2>{{pictureName}}  <small>的章节管理</small> </h2>  
      </div>
      <Divider />

      <Table border stripe :columns="columns" :data="tableData" ref="tables">
        <template slot-scope="{ row }" slot="thumb">
          <img :src="row.thumb" alt="" style="width:52px;height:52px;">
        </template>
        <template slot-scope="{ row,index }" slot="chapter">
          <strong v-if="editing != index">{{ row.chapter }}</strong>
          <Input v-if="editing == index" v-model="updateForm.chapter" placeholder="输入新章节序号"/>
        </template>
        <template slot-scope="{ row,index }" slot="title">
          <strong v-if="editing != index">{{ row.title }}</strong>
          <Input v-if="editing == index" v-model="updateForm.title" placeholder="输入新标题"/>
        </template>
        <template slot-scope="{ row,index }" slot="subtitle">
          <strong v-if="editing != index">{{ row.subtitle }}</strong>
          <Input v-if="editing == index" v-model="updateForm.subtitle" placeholder="输入新副标题"/>
        </template>
        <template slot-scope="{ row,index }" slot="intro">
          <strong v-if="editing != index">{{ row.intro }}</strong>
          <Input
            v-if="editing == index"
            type="textarea"
            v-model="updateForm.intro"
            placeholder="输入新简介"
          />
        </template>
        <template slot-scope="{ row, index }" slot="action">
          <Button
            type="default"
            size="small"
            style="margin-right: 5px"
            @click="edit(index)"
            v-if="editing != index"
          >
            <span style="color:green">编辑</span>
          </Button>
          <Button
            type="default"
            size="small"
            style="margin-right: 5px"
            @click="save(index)"
            v-if="editing == index"
          >
            <span>保存</span>
          </Button>
          <Button
            type="default"
            size="small"
            style="margin-right: 5px"
            :to="'/cms/cartoons/chapter/'+row.id"
          >
            <Icon type="ios-eye" size="18" color="green"/>
            <span style="color:green">查看图片</span>
          </Button>
        </template>
      </Table>
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
          <Page
            :total="total"
            :page-size="pageSize"
            prev-text="Previous"
            next-text="Next"
            @on-change="changepage"
          />
        </div>
      </div>
    </Card>
  </div>
</template>

<script>
import Tables from "_c/tables";
import { getChaptersData, updateChapterData } from "@/api/pictures";
export default {
  name: "pictures",
  components: {
    Tables
  },
  data() {
    return {
      pictureId: "",
      pictureName: "",
      modal: false,
      searchName: "",
      updateForm: {},
      categorys: [],
      editing: "noedit",
      total: 0,
      pageSize: 0,
      columns: [
        { title: "首图", slot: "thumb" },
        { title: "章节", slot: "chapter", width: "80px" },
        { title: "标题", slot: "title", width: "150px" },
        { title: "副标题", slot: "subtitle" },
        { title: "简介", slot: "intro" },
        { title: "创建时间", key: "created_at", width: "150px" },
        {
          title: "操作",
          slot: "action",
          width: 250,
          align: "center",
          fixed: "right"
        }
      ],
      tableData: []
    };
  },
  methods: {
    edit(index) {
      this.editing = index;
      this.updateForm = this.tableData[index];
    },
    save(index) {
      let upData = {
        id:this.updateForm.id,
        title:this.updateForm.title,
        subtitle:this.updateForm.subtitle,
        chapter:this.updateForm.chapter,
        intro:this.updateForm.intro
      };
      updateChapterData(upData).then(res => {
        if (res.data.code === "0") {
          this.$Message.success("数据修改成功");
          this.tableData[index].chapter = this.updateForm.chapter;
          this.tableData[index].title = this.updateForm.title;
          this.tableData[index].subtitle = this.updateForm.subtitle;
          this.tableData[index].intro = this.updateForm.intro;
        } else {
          this.$Message.error("数据修改失败：" + res.data.msg);
        }
        this.editing = "noedit";
      });
    },
    changepage(index) {
      this.getData({ page: index, id:this.pictureId});
    },
    getData(params) {
      getChaptersData(params)
        .then(res => {
          if (res.data.code === "0") {
            this.total = res.data.data.total;
            this.pageSize = res.data.data.per_page;
            let baseUrl = res.data.data.base_url;
            this.tableData = [];
            this.pictureName = res.data.data.picture.name;
            res.data.data.data.forEach(item => {
              this.tableData.push({
                id: item.id.toString(),
                chapter: item.chapter,
                title: item.title,
                subtitle: item.subtitle,
                intro: item.intro,
                thumb: baseUrl + item.thumb,
                created_at: item.created_at
              });
            });

            console.dir(this.tableData);
          }
        })
        .catch(() => {});
    }
  },
  mounted() {
    this.pictureId = this.$route.params.id;
    this.getData({ type: 2, id: this.pictureId });
  }
};
</script>

<style>
</style>
