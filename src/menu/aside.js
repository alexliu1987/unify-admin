// 菜单 侧边栏
export default [
  { path: '/index', title: '首页', icon: 'home' },
  {
    title: '组织架构',
    icon: 'folder-o',
    children: [
      { path: '/org/org', title: '机构管理' },
      { path: '/org/team', title: '团队管理' }
    ]
  }
]
