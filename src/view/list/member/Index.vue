<template>
  <div>
    <Card>
      <div class="search-con search-con-top">
        <Form ref="formInline" :model="formInline" inline>
          <FormItem>
            <Input v-model="searchValue" enter-button="Search">
              <Select v-model="keySel" slot="prepend" style="width: 120px">
                <Option value="mobile">手机号</Option>
                <Option value="cert_no">身份证号</Option>
              </Select>
              <Button type="primary" slot="append" icon="ios-search" @click="search()">Search</Button>
            </Input>
          </FormItem>

          <FormItem>
            <Button type="primary" @click="reset()">重置</Button>
            <Button type="default" @click="exportExcel">导出为Csv文件</Button>
          </FormItem>
        </Form>
      </div>

      <Table ref="table" border :columns="columns" :data="tableData" :loading="loading"></Table>
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
export default {
  props: {
    row: Object
  }
};
</script>
<script>
import Tables from "_c/tables";
import { getFengkongData } from "@/api/fengkong";
import expandRow from "./table-expand.vue";
export default {
  name: "member",
  components: {
    expandRow,
    Tables
  },
  data() {
    return {
      formInline: {
        key: "",
        value: ""
      },
      loading: true,
      keySel: "mobile",
      searchValue: "",
      total: 0,
      pageSize: 0,
      columns: [
        {
          type: "expand",
          width: 50,
          render: (h, params) => {
            return h(expandRow, {
              props: {
                row: params.row
              }
            });
          }
        },
        { title: "member_id", key: "member_id", width: "120px" },
        { title: "姓名", key: "username", width: "120px" },
        { title: "手机号", key: "mobile", width: "120px" },
        { title: "身份证号", key: "cert_no", width: "180px" },
        { title: "同盾", key: "tongdun", width: "90px" },
        { title: "白骑士", key: "knight", width: "90px" },
        { title: "电话邦", key: "phone", width: "90px" },
        { title: "先享后付", key: "nsf", width: "90px" },
        { title: "学信网", key: "chsi", width: "90px" },
        { title: "芝麻分级别", key: "zhima_grade" },
        { title: "小白分", key: "xiaobai_grade" }
      ],
      exportColumns: [
        { title: "member_id", key: "member_id" },
        { title: "姓名", key: "username" },
        { title: "手机号", key: "mobile" },
        { title: "身份证号", key: "cert_no" },
        { title: "同盾", key: "tongdun" },
        { title: "白骑士", key: "knight" },
        { title: "电话邦", key: "phone" },
        { title: "先享后付", key: "nsf" },
        { title: "学信网", key: "chsi" },
        { title: "芝麻分级别", key: "zhima_grade" },
        { title: "小白分", key: "xiaobai_grade" }
      ],
      tableData: []
    };
  },
  methods: {
    exportExcel() {
      let old_columns = this.columns;
      let columns = this.exportColumns;

      this.$refs.table.exportCsv({
        filename: `table-${new Date().valueOf()}.csv`,
        columns: columns,
        data: this.tableData
      });
    },
    search() {
      let key = this.keySel;
      let value = this.searchValue;
      this.handleData({ key: key, value: value });
    },
    reset() {
      this.searchValue = "";
      this.handleData({});
    },
    handleData(params) {
      this.loading = true;
      getFengkongData(params)
        .then(res => {
          if (res.data.code == 0) {
            this.total = res.data.data.total;
            this.pageSize = res.data.data.per_page;
            this.tableData = [];

            res.data.data.data.forEach(item => {
              this.tableData.push({
                member_id: item.member_id.toString(),
                username: item.username,
                mobile: item.mobile,
                cert_no: item.cert_no,
                knight: item.knight,
                tongdun: item.tongdun,
                phone: item.phone,
                nsf: item.nsf,
                zhima_grade: item.grade,
                chsi: item.chsi,
                knight_intro: item.knight_intro,
                tongdun_intro: item.tongdun_intro,
                phone_intro: item.phone_intro,
                chsi_intro: item.chsi_intro,
                xiaobai_grade: item.xiaobai_grade
              });
            });
            this.loading = false;
          }
        })
        .catch(() => {});
    },
    changepage(index) {
      this.handleData({ page: index });
    }
  },
  created() {
    this.handleData({});
  }
};
</script>

<style>
</style>
