<template>
    <Upload
        multiple
        type="drag"
        action="http://homestead.laravel/api/admin/files"
        :headers="headers"
        :data="params"
        :before-upload="handleBeforeUpload">
        <div style="padding: 20px 0">
            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
            <p>Click or drag files here to upload</p>
        </div>
    </Upload>
</template>
<script>
import { getToken } from '@/libs/util'
export default {
  data () {
    return {
      params: { folder: 'tests' }
    }
  },
  computed: {
    headers () {
      return {
        'Authorization': 'Bearer ' + getToken()
      }
    }
  },
  methods: {
    handleBeforeUpload (file) {
    }
  }
}
</script>
