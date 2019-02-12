<template>
  <d2-container>
    <template slot="header">机构管理</template>
    <d2-crud
      ref="d2Crud"
      add-mode
      :add-button="addButton"
      :form-template="this.$unifyCrud.formTemplate(this.$route.name)"
      :form-options="formOptions"
      :columns="this.$unifyCrud.getColumns(this.$route.name)"
      :loading="loading"
      :data="data"
      :pagination="pagination"
      @pagination-current-change="paginationCurrentChange"
      @row-add="handleRowAdd"
      @dialog-cancel="handleDialogCancel"
    />
  </d2-container>
</template>

<script>
export default {
  data () {
    return {
      data: [],
      loading: false,
      addButton: {
        icon: 'el-icon-plus',
        size: 'small'
      },
      formOptions: {
        labelWidth: '80px',
        labelPosition: 'left',
        saveLoading: false
      },
      pagination: {
        currentPage: 1,
        pageSize: 10,
        total: 0,
        layout: 'prev, pager, next, total'
      }
    }
  },
  async mounted () {
    this.fetchData()
  },
  methods: {
    async handleRowAdd (row, done) {
      this.formOptions.saveLoading = true
      await this.$unifyCrud.add(this.$route.name, row)
      done()
      this.formOptions.saveLoading = false
    },
    paginationCurrentChange (currentPage) {
      this.pagination.currentPage = currentPage
      this.fetchData()
    },
    async fetchData () {
      this.loading = true
      let res = await this.$unifyCrud.getData(this.$route.name, {
        pageIndex: this.pagination.currentPage,
        pageSize: this.pagination.pageSize
      })
      this.data = res.list
      this.pagination.total = res.pageInfo.recordCount
      this.loading = false
    },
    handleDialogCancel (done) {
      this.$message({
        message: '取消保存',
        type: 'warning'
      })
      done()
    }
  }
}
</script>
