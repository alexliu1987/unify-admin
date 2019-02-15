<template>
  <d2-container>
    <template slot="header">{{this.$route.meta.title}}</template>
    <d2-crud
      ref="d2Crud"
      :columns="this.$unifyCrud.getColumns(this.$route.name)"
      :loading="loading"
      :data="data"
      add-title="新增"
      :add-template="template"
      :add-rules="this.$unifyCrud.formRules(this.$route.name)"
      @row-add="handleRowAdd"
      :rowHandle="rowHandle"
      edit-title="修改"
      :edit-template="template"
      :edit-rules="this.$unifyCrud.formRules(this.$route.name)"
      @row-edit="handleRowEdit"
      :form-options="formOptions"
      :pagination="pagination"
      @pagination-current-change="paginationCurrentChange"
      @dialog-cancel="handleDialogCancel"
    >
      <el-button slot="header" style="margin-bottom: 5px" @click="addRow">新增</el-button>
    </d2-crud>
  </d2-container>
</template>

<script>
export default {
  data () {
    return {
      data: [],
      template: {},
      loading: false,
      rowHandle: {
        columnHeader: '操作',
        edit: {
          icon: 'el-icon-edit',
          text: '编辑',
          size: 'small'
        }
      },
      options: {
        stripe: true,
        fit: false,
        highlightCurrentRow: true
      },
      formOptions: {
        labelWidth: '80px',
        labelPosition: 'left',
        saveLoading: false
      },
      pagination: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      }
    }
  },
  mounted () {
    this.fetchData()
    this.fetchTemplate()
  },
  methods: {
    addRow () {
      this.$refs.d2Crud.showDialog({
        mode: 'add'
      })
    },
    async handleRowAdd (row, done) {
      this.formOptions.saveLoading = true
      await this.$unifyCrud.add(this.$route.name, row)
      done()
      this.formOptions.saveLoading = false
    },
    async handleRowEdit ({ row }, done) {
      this.formOptions.saveLoading = true
      await this.$unifyCrud.update(this.$route.name, row)
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
    async fetchTemplate () {
      this.template = await this.$unifyCrud.getTemplate(this.$route.name)
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
