<template>
  <div>
    <Card>
      <Table border :columns="columns" :data="tableData" ref="tables">

        <template slot-scope="{ row, index }" slot="action">
          <Button type="default" size="small" style="margin-right: 5px" @click="show(index)">
            <Icon type="ios-eye" size="18" color="green"/>
            <span style="color:green">View</span>
          </Button>
          <Button type="default" size="small" @click="remove(index)">
            <Icon type="ios-trash-outline" size="18" color="red"/>
            <span style="color:red">Delete</span>
          </Button>
          <Dropdown trigger="click">
            <Button type="default" size="small">操作
              <Icon type="ios-arrow-down"/>
            </Button>
            <DropdownMenu slot="list">
              <DropdownItem @click="alerta">
                <span @click="alerta">点我事件</span>
              </DropdownItem>
              <DropdownItem>
                <p type="default" @click="alerta">关闭</p>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </template>
      </Table>

      <Button style="margin: 10px 0;" type="primary" @click="exportExcel">导出为Csv文件</Button>
    </Card>
  </div>
</template>

<script>
import Tables from '_c/tables'
import { getPostData, deletePostData } from '@/api/post'
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
        {
          title: '作者',
          key: 'author'
        },
        { title: '标题', key: 'title' },
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
    alerta () {
      alert(1234)
    },
    remove (index) {
      let id = this.tableData[index].id

      deletePostData(id).then(res => {
        if (res.data.code == 0) {
          this.tableData.splice(index, 1)
        }
      })
    },
    exportExcel () {
      console.dir(this.tableData)
      let columns = this.columns
      columns.pop()
      this.$refs.tables.exportCsv({
        filename: `table-${new Date().valueOf()}.csv`,
        columns: columns
        // data: this.tableData
      })
    }
  },
  mounted () {
    getPostData().then(res => {
      if (res.data.code == 0) {
        res.data.data.data.forEach(item => {
          this.tableData.push({
            id: item.id.toString(),
            title: item.title,
            author: item.author.name,
            created_at: item.created_at
          })
        })
      }
    }).catch(() => {
    })
  }
}
</script>

<style>
</style>
