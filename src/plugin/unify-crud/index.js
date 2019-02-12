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
          .map(([k, v]) => ({
            title: v.name,
            key: k,
            width: (v.table && v.table.width) || null,
            align: (v.table && v.table.align) || 'center'
          }))
        columns.push({ title: '操作', width: 120, align: 'center' })
        return columns
      },
      // 获取列表数据
      getData: async (path, state) => {
        let result = await request(`/data/${path}`, { params: state })
        return result
      },
      // 新增模板
      formTemplate: path => {
        let model = path.split('-').reduce((result, item) => result[item], Model)
        let result = {}
        for (let key in model) {
          result[key] = {
            title: model[key].name,
            value: model[key].default
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
      }
    }
  }
}
