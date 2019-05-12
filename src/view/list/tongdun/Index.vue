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
import { getTongdunData } from "@/api/fengkong";
import expandRow from "./table-expand.vue";
export default {
  name: "tongdun",
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
        { title: "ID", key: "id" },
        { title: "姓名", key: "realname" },
        { title: "手机号", key: "mobile", sortable: true },
        { title: "身份证号", key: "cert_no" },
        { title: "是否触发", key: "dingxiang" }
      ],
      exportColumns: [
        { title: "姓名", key: "realname" },
        { title: "手机号", key: "mobile", sortable: true },
        { title: "身份证号", key: "cert_no" },
        { title: "是否触发", key: "dingxiang" }
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
      getTongdunData(params)
        .then(res => {
          if (res.data.code == 0) {
            this.total = res.data.data.total;
            this.pageSize = res.data.data.per_page;
            this.tableData = [];
            res.data.data.data.forEach(item => {
              this.tableData.push({
                id: item.id.toString(),
                realname: item.realname,
                mobile: item.mobile,
                cert_no: item.cert_no,
                intro: item.intro,
                dingxiang: item.dingxiang
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
