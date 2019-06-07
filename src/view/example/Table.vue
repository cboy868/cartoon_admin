<template>
  <div>
    <Tabs type="card" :animated="false" class="table-top">
      <template slot="extra">
        <div class="subject">
          <h3>商品分类管理</h3>
          <h5>商品分类及商品分类及商品分类及商品分类及商品分类及</h5>
        </div>
      </template>
      <TabPane label="标签一" icon="logo-apple">
        <Alert type="success">
          A success prompt
          <template slot="desc">
            <p>Content of prompt. Content of prompt.</p>
            <p>Content of prompt. Content of prompt.</p>
          </template>
        </Alert>

        <div class="op-bar">
          <div class="stitle">
            <h3>品牌列表 <small>(共344条记录)</small></h3>
          </div>
          <div class="btns">
            <Icon type="ios-sync" size="16" />
            <Divider type="vertical" />
            <Icon type="ios-list" size="16"/>
          </div>
          <div class="search">
            <Input style="width: auto;padding-top:3px;" size="small" >
            <Select slot="prepend" style="width: 80px;" transfer size="small">
              <Option value="day">Day</Option>
              <Option value="month">Month</Option>
            </Select>
            <Button slot="append" icon="ios-search"></Button>
          </Input>
          </div>
        </div>
        <Table stripe :columns="columns" :data="tableData" ref="tables">
          <template slot-scope="{ row }" slot="action">
            <Button type="default" size="small" style="margin-right: 5px">
              <span style="color:green">下架</span>
            </Button>

            <Dropdown
              transfer
              placement="right-start"
              @on-visible-change="vis=>{iconType=vis?'down' : 'forward'}"
            >
              <a href="javascript:void(0)">
                设置
                <Icon :type="'ios-arrow-' + iconType"></Icon>
              </a>
              <DropdownMenu slot="list" trigger="click">
                <DropdownItem>驴打滚</DropdownItem>
                <DropdownItem>炸酱面</DropdownItem>
                <DropdownItem>豆汁儿</DropdownItem>
                <DropdownItem>冰糖葫芦</DropdownItem>
                <DropdownItem>北京烤鸭</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </template>
        </Table>
      </TabPane>
      <TabPane label="标签二" icon="logo-windows">标签二的内容</TabPane>
      <TabPane label="标签三" icon="logo-tux">标签三的内容</TabPane>
    </Tabs>

    <Button @click="value1 = true" type="primary">Open</Button>
    <Drawer title="Basic Drawer" :closable="false" v-model="value1">
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Drawer>
  </div>
</template>

<script>
import Tables from "_c/tables";
import { getTableData } from "@/api/data";
export default {
  name: "tables_page",
  components: {
    Tables
  },
  data() {
    return {
      iconType: "forward",
      value1: false,
      columns: [
        {
          title: "操作",
          slot: "action",
          width: 160,
          align: "center",
        },
        { title: "标题", key: "name", width: "300px" },
        { title: "Email", key: "email", editable: true },
        { title: "Create-Time", key: "createTime" }
      ],
      tableData: []
    };
  },
  methods: {
    handleDelete(params) {
      console.log(params);
    }
  },
  mounted() {
    getTableData().then(res => {
      console.dir(res.data);
      this.tableData = res.data;
    });
  }
};
</script>

<style lang="less">
.op-bar{
  background-color: #FFF;
    color: #333;
    white-space: nowrap;
    display: block;
    border-bottom: solid 1px #C8C8C8;
    position: relative;
    z-index: 4;
    height: 30px;
    overflow: hidden;
    .stitle,.btns,.search{
      line-height: 30px;
    };
    .stitle,.btns{
      float: left;
      margin-right: 20px;
      
    }
    .search{
      float: right;
    }
    .stitle h3{
        font-weight: normal;
      font-size: 16px;
      color: #333;
    }
}
.ivu-alert-with-desc{
  padding: 8px;
}


.table-top .ivu-tabs-nav-right {
  min-width: 190px;
  float: left;
  margin-right: 10px;
}
.table-top .subject h3 {
  font-size: 16px;
  font-weight: normal;
  line-height: 20px;
  color: #333;
}

.table-top .subject h5 {
  font-size: 12px;
  font-weight: normal;
  line-height: 18px;
  color: #999;
}

.table-top .ivu-tabs-bar {
  height: 40px;
  margin-bottom:8px;
}
.table-top.ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-nav-container {
  top: 8px;
}

.ivu-table th {
  height: 38px;
}
.ivu-table td {
  height: 42px;
}
.ivu-table-cell {
  padding-left: 2px;
  padding-right: 2px;
}
</style>
