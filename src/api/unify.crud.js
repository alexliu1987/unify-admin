import request from '@/plugin/axios'

export function GetAll (path) {
  return Get(path, { pageSize: -1, enabled: true })
}

export function Get (path, data) {
  return request({
    url: `/data/${path}`,
    method: 'get',
    data: { params: data }
  })
}

export function Add (path, data) {
  return request({
    url: `/data/${path}`,
    method: 'post',
    data
  })
}
export function Update (path, data) {
  return request({
    url: `/data/${path}/${data._id}`,
    method: 'put',
    data
  })
}
