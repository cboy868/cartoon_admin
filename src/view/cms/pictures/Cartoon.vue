<template>
  <div>
    <Card>
      <div class="search-con search-con-top">
        <Form ref="formInline" inline>
          <FormItem>
            <Input
              v-model="searchName"
              enter-button="Search"
              placeholder="请输入要查找的标题..."
              style="width:300px;"
            >
              <Button type="primary" slot="append" icon="ios-search" @click="search()">查找</Button>
            </Input>
          </FormItem>

          <FormItem>
            <Button type="primary" @click="reset()">重置</Button>
          </FormItem>
        </Form>
      </div>

      <Table border stripe :columns="columns" :data="tableData" ref="tables">
        <template slot-scope="{ row }" slot="thumb">
          <img
            :src="row.thumb"
            style="height:32px;overflow:hidden;border-redius:5px;cursor:pointer"
            @click="handleView(row.thumb)"
          >
        </template>
        <template slot-scope="{ row,index }" slot="name">
          <strong v-if="editing != index">{{ row.name }}</strong>
          <Input v-if="editing == index" v-model="updateForm.name" placeholder="输入新标题"/>
        </template>
        <template slot-scope="{ row,index }" slot="category">
          <strong v-if="editing != index">{{ row.category }}</strong>
          <Select v-if="editing== index" v-model="updateForm.category_id" transfer>
            <Option v-for="ca in categorys" :value="ca.id" :key="ca.id">{{ ca.name }}</Option>
          </Select>
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
           <Upload
            name="cover"
            :format="['jpg','jpeg','png']"
            :max-size="2048"
            :data="{id:row.id,index:index}"
            :action="uploadAction"
            :on-success="uploadSuccess"
            :show-upload-list="false"
            style="display:inline"
          >
            <Button
              type="default"
              size="small"
              icon="ios-cloud-upload-outline"
            >封面</Button>
          </Upload>
          <Button
            type="default"
            size="small"
            style="margin-right: 5px"
            :to="'/cms/cartoons/chapter/'+row.id"
          >
            <Icon type="ios-eye" size="18" color="green"/>
            <span style="color:green">查看章节</span>
          </Button>
        </template>
      </Table>
      <Modal title="查看图片" v-model="visible">
        <img :src="currentThumb" v-if="visible" style="width: 100%">
        <div slot="footer"></div>
      </Modal>
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
import axios from "@/libs/api.request";
import Tables from '_c/tables'
import {
  getPictureData,
  deletePictureData,
  updatePictureData
} from '@/api/pictures'
export default {
  name: 'pictures',
  components: {
    Tables
  },
  data () {
    return {
       currentThumb: "",
      visible: false,
      uploadAction: "",
      modal: false,
      searchName: '',
      updateForm: {},
      categorys: [],
      editing: 'noedit',
      total: 0,
      pageSize: 0,
      columns: [
        { title: '标题', slot: 'name', width: '300px' },
        { title: '分类', slot: 'category', width: '150px' },
        { title: '介绍', slot: 'intro' },
        { title: '创建时间', key: 'created_at', width: '150px' },
        { title: "封面", slot: "thumb", width: "100px" ,className:"thumb"},
        {
          title: '操作',
          slot: 'action',
          width: 250,
          align: 'center',
          fixed: 'right'
        }
      ],
      tableData: []
    }
  },
  methods: {
     handleView(thumb) {
      console.dir(thumb);
      this.currentThumb = thumb;
      this.visible = true;
    },
    uploadSuccess(res, file, fileList) {
      if (res.code === "0") {
        this.tableData[res.data.params["index"]]["thumb"] = res.data.path;
      }
    },
    search () {
      this.getData({ name: this.searchName })
    },
    reset () {
      this.searchValue = ''
      this.getData({ type: 2 })
    },
    remove (index) {
      let id = this.tableData[index].id
      deletePictureData(id).then(res => {
        if (res.data.code === '0') {
          this.tableData.splice(index, 1)
        }
      })
    },
    edit (index) {
      this.editing = index
      this.updateForm = this.tableData[index]
    },
    save (index) {
      updatePictureData(this.updateForm).then(res => {
        console.dir(res.data)

        if (res.data.code === '0') {
          let obj = this.categorys.find(
            o => o.id === this.updateForm.category_id
          )

          this.$Message.success('数据修改成功')
          this.tableData[index].name = this.updateForm.name
          this.tableData[index].category_id = this.updateForm.category_id
          this.tableData[index].category = obj.name
          this.tableData[index].intro = this.updateForm.intro
        } else {
          this.$Message.error('数据修改失败：' + res.data.msg)
        }
        this.editing = 'noedit'
      })
    },
    changepage (index) {
      this.getData({ page: index, type: 2 })
    },
    getData (params) {
      getPictureData(params)
        .then(res => {
          if (res.data.code === '0') {
            this.total = res.data.data.total
            this.pageSize = res.data.data.per_page
            let baseUrl = res.data.data.base_url
            this.tableData = []
            res.data.data.data.forEach(item => {
              this.tableData.push({
                id: item.id.toString(),
                category_id: item.category.id,
                category: item.category.name,
                author: item.author,
                name: item.name,
                intro: item.intro,
                created_by: item.createdby.name,
                thumb: baseUrl + item.thumb,
                created_at: item.created_at
              })
            })
            this.categorys = res.data.data.categorys
            console.dir(this.categorys)
          }
        })
        .catch(() => {})
    }
  },
  mounted () {
    this.getData({ type: 2 })
    this.uploadAction = axios.baseUrl + "cover";
  }
}
</script>

<style>
.thumb .ivu-table-cell div{
  overflow: hidden;
}
</style>
