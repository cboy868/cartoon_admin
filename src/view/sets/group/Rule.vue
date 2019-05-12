<template>
  <div>
    <Card>
      <Row>
        <Col span="12">
          <div class="drag-box-card">
            <!-- 切记设置list1和list2属性时，一定要添加.sync修饰符 -->
            <drag-list
              :list1.sync="list1"
              :list2.sync="list2"
              :dropConClass="dropConClass"
              @on-change="handleChange"
            >
              <h3 slot="left-title">可选风控项</h3>
              <Card class="drag-item" slot="left" slot-scope="left">{{ left.itemLeft.name }}</Card>
              <h3 slot="right-title">已选风控项</h3>
              <Card class="drag-item" slot="right" slot-scope="right">{{ right.itemRight.name }}</Card>
            </drag-list>
          </div>
        </Col>

        <div class="example-split"></div>

        <Col span="12">
          <Form :label-width="100" inline>
            <Divider orientation="left">年龄</Divider>
            <FormItem label="最小">
              <Input icon="ios-clock-outline" placeholder="请输入有效天数" style="width: 200px"/>
            </FormItem>
            <FormItem label="最大">
              <Input icon="ios-clock-outline" placeholder="请输入有效天数" style="width: 200px"/>
            </FormItem>
            <Divider orientation="left">芝麻分免押额度</Divider>
            <FormItem label="Z1">
              <Input icon="ios-clock-outline" placeholder="请输入免押金额" style="width: 200px"/>
            </FormItem>
            <FormItem label="Z2">
              <Input icon="ios-clock-outline" placeholder="请输入免押金额" style="width: 200px"/>
            </FormItem>
            <FormItem label="Z3">
              <Input icon="ios-clock-outline" placeholder="请输入免押金额" style="width: 200px"/>
            </FormItem>
            <FormItem label="Z4">
              <Input icon="ios-clock-outline" placeholder="请输入免押金额" style="width: 200px"/>
            </FormItem>
            <FormItem label="Z5">
              <Input icon="ios-clock-outline" placeholder="请输入免押金额" style="width: 200px"/>
            </FormItem>
            <FormItem label="Z6">
              <Input icon="ios-clock-outline" placeholder="请输入免押金额" style="width: 200px"/>
            </FormItem>
            <Divider orientation="left">学信网免押额度</Divider>
            <FormItem label="985">
              <Input icon="ios-clock-outline" placeholder="请输入免押金额" style="width: 200px"/>
            </FormItem>
            <FormItem label="一本">
              <Input icon="ios-clock-outline" placeholder="请输入免押金额" style="width: 200px"/>
            </FormItem>
            <FormItem label="二本">
              <Input icon="ios-clock-outline" placeholder="请输入免押金额" style="width: 200px"/>
            </FormItem>
            <FormItem label="三本">
              <Input icon="ios-clock-outline" placeholder="请输入免押金额" style="width: 200px"/>
            </FormItem>
            <FormItem label="其它在校生">
              <Input icon="ios-clock-outline" placeholder="请输入免押金额" style="width: 200px"/>
            </FormItem>
          </Form>
        </Col>

        <Col span="24">
          <Button type="success">Success</Button>
        </Col>
      </Row>
      <Divider/>
      <!-- <div class="handle-log-box">
        <h3>操作记录</h3>
        <div class="handle-inner-box">
          <p v-for="(item, index) in handleList" :key="`handle_item_${index}`">{{ item }}</p>
        </div>
      </div>
      <div class="res-show-box">
        <pre>{{ list1 }}</pre>
      </div>
      <div class="res-show-box">
        <pre>{{ list2 }}</pre>
      </div>-->
    </Card>
  </div>
</template>
<script>
import DragList from "_c/drag-list";
import { getDragList } from "@/api/data";
export default {
  name: "drag_list_page",
  components: {
    DragList
  },
  data() {
    return {
      list1: [
        {
          id: 10,
          name: "年龄"
        },
        {
          id: 10,
          name: "同盾"
        },
        {
          id: 10,
          name: "白骑士"
        },
        {
          id: 10,
          name: "电话邦"
        },
        {
          id: 10,
          name: "先享后付"
        }
      ],
      list2: [],
      dropConClass: {
        left: ["drop-box", "left-drop-box"],
        right: ["drop-box", "right-drop-box"]
      },
      handleList: []
    };
  },
  methods: {
    handleChange({ src, target, oldIndex, newIndex }) {
      this.handleList.push(`${src} => ${target}, ${oldIndex} => ${newIndex}`);
    }
  },
  mounted() {
    // getDragList().then(res => {
    //   this.list1 = res.data;
    //   this.list2 = [res.data[0]];
    // });
  }
};
</script>
<style lang="less">
.example-demo {
  padding: 20px 0;
  position: relative;
  transition: height 0.2s ease-in-out;
}
.example-split {
  display: block;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  border: 1px dashed #eee;
}
.drag-box-card {
  display: inline-block;
  width: 600px;
  height: 560px;
  .drag-item {
    margin: 10px;
  }
  h3 {
    padding: 10px 15px;
  }
  .drop-box {
    border: 1px solid #eeeeee;
    height: 455px;
    border-radius: 5px;
  }
  .left-drop-box {
    margin-right: 10px;
  }
  .right-drop-box {
    //
  }
}
.handle-log-box {
  display: inline-block;
  margin-left: 20px;
  border: 1px solid #eeeeee;
  vertical-align: top;
  width: 200px;
  height: 500px;
  h3 {
    padding: 10px 14px;
  }
  .handle-inner-box {
    height: ~"calc(100% - 44px)";
    overflow: auto;
    p {
      padding: 14px 0;
      margin: 0 14px;
      border-bottom: 1px dashed #eeeeee;
    }
  }
}
.res-show-box {
  display: inline-block;
  margin-left: 20px;
  border: 1px solid #eeeeee;
  vertical-align: top;
  width: 350px;
  height: 570px;
}
</style>
