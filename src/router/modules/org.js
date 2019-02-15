import layoutHeaderAside from '@/layout/header-aside'
import UnifyCrud from '@/components/unify-crud'

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
      component: UnifyCrud,
      meta: { requiresAuth: true, title: '机构管理' }
    },
    {
      path: `/org/team`,
      name: `${pre}team`,
      component: UnifyCrud,
      meta: { requiresAuth: true, title: '团队管理' }
    }
  ])('org-')
}
