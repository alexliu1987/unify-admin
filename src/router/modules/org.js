import layoutHeaderAside from '@/layout/header-aside'

const meta = { auth: true }

export default {
  path: '/org',
  name: 'org',
  meta,
  redirect: { name: 'org-org' },
  component: layoutHeaderAside,
  children: (pre => [
    {
      path: `/org/org`,
      name: `${pre}org`,
      component: () => import('@/pages/unify-crud'),
      meta: { requiresAuth: true, title: '机构管理' }
    },
    {
      path: `/org/team`,
      name: `${pre}team`,
      component: () => import('@/pages/unify-crud'),
      meta: { requiresAuth: true, title: '团队管理' }
    }
  ])('org-')
}
