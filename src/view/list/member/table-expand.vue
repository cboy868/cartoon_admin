<style scoped>
.expand-row {
  margin-bottom: 16px;
}
.expand-key {
  font-weight: 800;
  color: green;
}
.expand-row .col {
  margin-bottom: 10px;
}
</style>
<template>
  <div>
    <Row class="expand-row">
      <Col span="24" class="col">
        <span class="expand-key">白骑士:</span>
        <span class="expand-value">{{ row.knight_intro }}</span>
      </Col>
      <Col span="24" class="col">
        <span class="expand-key">同盾:</span>
        <span class="expand-value">{{ row.tongdun_intro }}</span>
      </Col>
      <Col span="24" class="col">
        <span class="expand-key">电话邦:</span>
        <span class="expand-value">{{ row.phone_intro }}</span>
      </Col>
      <Col span="24" class="col">
        <span class="expand-key">学信网:</span>
        <span class="expand-value">{{ row.chsi_intro }}</span>
      </Col>
    </Row>
  </div>
</template>
<script>
export default {
  props: {
    row: Object
  }
};
</script>