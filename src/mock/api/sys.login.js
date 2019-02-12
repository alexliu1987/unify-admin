const userDB = [
  { username: 'admin', password: 'admin', uuid: 'admin-uuid', name: '管理员' },
  { username: 'editor', password: 'editor', uuid: 'editor-uuid', name: '编辑' },
  { username: 'user1', password: 'user1', uuid: 'user1-uuid', name: '用户1' }
]

export default [
  {
    path: '/api/login',
    method: 'post',
    handle ({ body }) {
      const user = userDB.find(e => e.username === body.username && e.password === body.password)
      if (user) {
        return {
          succeed: true,
          errorCode: '0000000',
          errorMessage: '登录成功',
          data: {
            ...user,
            token: '8dfhassad0asdjwoeiruty'
          }
        }
      } else {
        return {
          succeed: false,
          errorCode: '0000001',
          errorMessage: '用户名或密码错误',
          data: {}
        }
      }
    }
  }
]
