<template>
  <div>
    <Card>
      <Table border :columns="columns" :data="tableData" ref="tables">
        <template slot-scope="{ row, index }" slot="action">
          <Button type="default" size="small" @click="remove(index)">
            <Icon type="ios-trash-outline" size="18" color="red"/>
            <span style="color:red">Delete</span>
          </Button>
        </template>
      </Table>
    </Card>
  </div>
</template>

<script>
import Tables from '_c/tables'
import { getPictureCategoryData, deletePictureData } from '@/api/pictures'
export default {
  name: 'post_page',
  components: {
    Tables
  },
  data () {
    return {
      columns: [
        {
          title: 'ID',
          key: 'id'
        },
        { title: '图集', key: 'name' },
        { title: '创建时间', key: 'created_at' },
        {
          title: 'Action',
          slot: 'action',
          width: 200,
          align: 'center'
        }
      ],
      tableData: []
    }
  },
  methods: {
    remove (index) {
      let id = this.tableData[index].id

      deletePictureCategoryData(id).then(res => {
        if (res.data.code == 0) {
          this.tableData.splice(index, 1)
        }
      })
    }
  },
  mounted () {
    getPictureCategoryData()
      .then(res => {
        if (res.data.code == 0) {
          res.data.data.data.forEach(item => {
            this.tableData.push({
              id: item.id.toString(),
              name: item.name,
              created_at: item.created_at
            })
          })
        }
      })
      .catch(() => {})
  }
}
</script>

<style>
</style>
