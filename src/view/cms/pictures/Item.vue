<style scoped>
.expand-row {
  margin-bottom: 16px;
}
.expand-row img {
  width: 100%;
  border: 3px solid #fff;
}
</style>
<template>
  <div>
    <Row class="expand-row">
      <Col span="4" v-for="item in pictureitems" v-bind:key="item.id">
        <img :src="item.src">
      </Col>
    </Row>
  </div>
</template>
<script>
import { getPictureItemsData } from '@/api/pictures'
export default {
  data () {
    return {
      pictureitems: []
    }
  },
  props: {
    row: Object
  },
  created () {
    let that = this
    getPictureItemsData(this.row.id)
      .then(res => {
        if (res.data.code === 0) {
          let baseUrl = res.data.data.base_url
          res.data.data.items.forEach(item => {
            this.pictureitems.push({
              sort: item.sort,
              id: item.id,
              src: baseUrl + item.path + '/' + item.name + '.' + item.ext,
              title: item.title,
              created_at: item.created_at
            })
          })
        }
      })
      .catch(() => {})
  }
}
</script>
