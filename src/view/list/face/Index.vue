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
          </FormItem>
        </Form>
      </div>

      <Table ref="table" border :columns="columns" :data="tableData" :loading="loading">
        <template slot-scope="{ row, index }" slot="action">
          <Button
            type="primary"
            size="small"
            style="margin-right: 5px"
            @click="clearFace(index)"
          >清除扫脸标识</Button>
          <Button type="error" size="small" @click="verify(index)">确认本人并认证</Button>
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
export default {
  props: {
    row: Object
  }
};
</script>
<script>
import Tables from "_c/tables";
import { getCertData, clearFace, verify } from "@/api/face";
export default {
  name: "face",
  components: {
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
        { title: "memberId", key: "member_id" },
        { title: "姓名", key: "username" },
        { title: "手机号", key: "mobile", sortable: true },
        { title: "身份证号", key: "cert_no" },
        { title: "认证状态", key: "status" },
        {
          title: "Action",
          slot: "action",
          width: 250,
          align: "center"
        }
      ],
      tableData: []
    };
  },
  methods: {
    search() {
      let key = this.keySel;
      let value = this.searchValue;
      this.handleData({ key: key, value: value });
    },
    reset() {
      this.searchValue = "";
      this.handleData({});
    },
    clearFace(index) {
      let item = this.tableData[index];

      clearFace({ member_id: item.member_id })
        .then(res => {
          if (res.data.code == 0) {
            this.$Message.success("清除成功");
          } else {
            this.$Message.error("清除失败：" + res.data.msg);
          }
        })
        .catch(() => {});
    },
    verify(index) {
      let item = this.tableData[index];
      if (!item) return;

      if (!confirm("确定要执行此操作吗？")) {
        return false;
      }

      verify({ member_id: item.member_id })
        .then(res => {
          if (res.data.code == 0) {
            this.tableData[index].status = "认证完成";
            this.$Message.success("操作成功");
          } else {
            this.$Message.error("操作失败：" + res.data.msg);
          }
        })
        .catch(() => {});
    },
    handleData(params) {
      this.loading = true;
      getCertData(params)
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
                status: item.face ? "认证完成" : "未认证"
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
