<template>
  <Form :model="formItem" :label-width="100" inline>
    <Row style="background:#eee;padding: 20px">
      <Col span="24">
        <Card :bordered="false">
          <p slot="title">失效时间</p>
          <FormItem label="同盾">
            <Input
              v-model="formItem.input"
              icon="ios-clock-outline"
              placeholder="请输入有效天数"
              style="width: 200px"
            />
          </FormItem>
          <FormItem label="白骑士">
            <Input
              v-model="formItem.input"
              icon="ios-clock-outline"
              placeholder="请输入有效天数"
              style="width: 200px"
            />
          </FormItem>
          <FormItem label="电话邦">
            <Input
              v-model="formItem.input"
              icon="ios-clock-outline"
              placeholder="请输入有效天数"
              style="width: 200px"
            />
          </FormItem>
          <FormItem label="先享后付">
            <Input
              v-model="formItem.input"
              icon="ios-clock-outline"
              placeholder="请输入有效天数"
              style="width: 200px"
            />
          </FormItem>
          <FormItem label="京东小白分">
            <Input
              v-model="formItem.input"
              icon="ios-clock-outline"
              placeholder="请输入有效天数"
              style="width: 200px"
            />
          </FormItem>
          <FormItem label="Face扫脸">
            <Input
              v-model="formItem.input"
              icon="ios-clock-outline"
              placeholder="请输入有效天数"
              style="width: 200px"
            />
          </FormItem>
        </Card>

        <Card :bordered="false">
          <p slot="title">Face扫脸</p>
          <FormItem label="人脸验证级别">
            <Select v-model="formItem.sel" style="width:280px">
              <Option v-for="item in levelList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </FormItem>

          <Button type="success">Success</Button>
        </Card>

        
      </Col>
    </Row>
  </Form>
</template>
<script>
export default {
  name: "general",
  data() {
    return {
      levelList: [
          {
            value: "1e-3",
            label: "1e-3：误识率为千分之一的置信度阈值"
          },
          {
            value: "1e-4",
            label: "1e-4：误识率为万分之一的置信度阈值"
          },
          {
            value: "1e-5",
            label: "1e-5：误识率为十万分之一的置信度阈值"
          },
          {
            value: "1e-6",
            label: "1e-6：误识率为百万分之一的置信度阈值"
          }
      ],

      formItem: {
        input: "",
        select: "",
        radio: "male",
        checkbox: [],
        switch: true,
        date: "",
        time: "",
        slider: [20, 50],
        textarea: "",
        sel: "1e-3",
      }
    };
  }
};
</script>

<style scoped lang="less">
.formdiv {
  margin: 4px 0;
}
</style>