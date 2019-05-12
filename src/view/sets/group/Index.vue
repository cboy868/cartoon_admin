<template>
  <div>
    <Card>
      <div class="search-con search-con-top">
        <Button type="primary" @click="modal1 = true">Display dialog box</Button>
        <Modal
          v-model="modal1"
          title="Common Modal dialog box title"
          @on-ok="ok"
          @on-cancel="cancel"
        >
          <p>Content of dialog</p>
          <p>Content of dialog</p>
          <p>Content of dialog</p>
        </Modal>
      </div>

      <Divider />

      <Row>
        <Table ref="table" border :columns="columns" :data="tableData" :loading="loading">
          <template slot-scope="{ row, index }" slot="action">

            <Button type="primary" size="small" style="margin-right: 5px">修改</Button>
            <Button type="error" size="small" style="margin-right: 5px">禁用</Button>
            <Button type="info" to="/sets/general" size="small" style="margin-right: 5px">配置规则</Button>
            <Button type="info" to="/sets/channel" size="small" style="margin-right: 5px">配置渠道</Button>
          </template>
        </Table>
      </Row>
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
export default {
  name: "group",
  data() {
    return {
      modal1: false,
      loading: false,
      columns: [
        { title: "标题", key: "name", width: "120px" },
        { title: "介绍", key: "intro" },
        {
          title: "操作",
          slot: "action",
          width: 240,
          align: "center"
        }
      ],
      tableData: [
        { name: "无电话邦", intro: "这里是一些简单的介绍" },
        { name: "无白骑士", intro: "这里是一些简单的介绍" }
      ]
    };
  },
  methods: {
    ok() {
      this.$Message.info("Clicked ok");
    },
    cancel() {
      this.$Message.info("Clicked cancel");
    },
    changeLimit() {
      function getArrayItems(arr, num) {
        const temp_array = [];
        for (let index in arr) {
          temp_array.push(arr[index]);
        }
        const return_array = [];
        for (let i = 0; i < num; i++) {
          if (temp_array.length > 0) {
            const arrIndex = Math.floor(Math.random() * temp_array.length);
            return_array[i] = temp_array[arrIndex];
            temp_array.splice(arrIndex, 1);
          } else {
            break;
          }
        }
        return return_array;
      }
      this.randomMovieList = getArrayItems(this.movieList, 5);
    }
  },
  mounted() {
    this.changeLimit();
  }
};
</script>

<style>
</style>
