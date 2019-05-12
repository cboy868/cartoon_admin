<template>
  <div>
    <Card>
      <Button style="margin: 10px 0;" type="primary" @click="exportExcel">导出为Csv文件</Button>
      <Table border :columns="columns" :data="tableData"></Table>
      <div>
        <Page
          :total="total"
          :page-size="pageSize"
          prev-text="Previous"
          next-text="Next"
          @on-change="changepage"
        />
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
import { getKnightData } from "@/api/fengkong";
import expandRow from "./table-expand.vue";
export default {
  name: "knight",
  components: {
    expandRow
  },
  data() {
    return {
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
        {
          title: "ID",
          key: "id"
        },
        {
          title: "姓名",
          key: "realname"
        },
        { title: "手机号", key: "mobile" },
        { title: "身份证号", key: "cert_no" },
        { title: "是否触发", key: "dingxiang" }
      ],
      tableData: []
    };
  },
  methods: {
    exportExcel() {
      console.dir(this.tableData);
      let columns = this.columns;
      columns.pop();
      this.$refs.tables.exportCsv({
        filename: `table-${new Date().valueOf()}.csv`,
        columns: columns
        // data: this.tableData
      });
    },
    handleData(params) {
      getKnightData(params)
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
          }
        })
        .catch(() => {});
    },
    changepage(index) {
      console.log(index);
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
