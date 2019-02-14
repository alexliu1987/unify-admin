import request from '@/plugin/axios'
import { Message } from 'element-ui'
import Model from '@/model'

export default {
  install (Vue, options) {
    Vue.prototype.$unifyCrud = {
      // 获取列表列信息
      getColumns: path => {
        let model = path.split('-').reduce((result, item) => result[item], Model)
        let columns = Object.entries(model)
          .filter(([, v]) => v.table)
          .map(([k, v]) => {
            let res = {
              title: v.name,
              key: k,
              width: (v.table && v.table.width) || null,
              align: (v.table && v.table.align) || 'center'
            }
            if (v.type.name === 'Boolean') {
              res.formatter = (row, column, cellValue, index) => {
                return cellValue ? '启用' : '禁用'
              }
            }
            return res
          })
        return columns
      },
      // 获取列表数据
      getData: async (path, state) => {
        let result = await request(`/data/${path}`, { params: state })
        return result
      },
      // 表单校验
      formRules: path => {
        let model = path.split('-').reduce((result, item) => result[item], Model)
        let result = {}
        for (let key in model) {
          result[key] = []
          let prop = model[key]
          if (prop.isRequired) {
            result[key].push({
              required: true,
              message: `请输入${prop.name}`
            })
          }
          if (prop.type) {
            result[key].push({
              type: prop.type.name.toLowerCase(),
              message: `${prop.name}格式有误`
            })
          }
          if (prop.regEx) {
            result[key].push({
              pattern: prop.regEx,
              message: `${prop.name}格式有误`
            })
          }
        }
        return result
      },
      // 新增模板
      addTemplate: path => {
        let model = path.split('-').reduce((result, item) => result[item], Model)
        let result = {}
        for (let key in model) {
          result[key] = {
            title: model[key].name,
            value: model[key].default
          }
          if (model[key].type.name === 'Boolean') {
            result[key].component = { name: 'el-switch' }
          }
        }
        return result
      },
      add: async (path, data) => {
        let result = await request.post(`/data/${path}`, data)
        Message({
          message: '保存成功',
          type: 'success'
        })
        return result
      },
      update: async (path, data) => {
        console.log('update data', data)
        let result = await request.put(`/data/${path}/${data._id}`, data)
        Message({
          message: '保存成功',
          type: 'success'
        })
        return result
      }
    }
  }
}
