
export const permissionsValue = {
  ACCESS: 1,
  EDIT: 2,
  DELETE: 4,
  ASSIGN: 8,
}
export const MENU = [
  {
    key: 'dashboard',
    title: 'Dashboard',
    icon: 'Dashboard',
    href: '/dashboard',
    permissions: ['ACCESS', 'EDIT', 'DELETE'],
  },
  {
    key: 'product',
    title: 'Products',
    icon: 'Products',
    href: '/product',
    permissions: ['ACCESS', 'EDIT', 'DELETE'],
  },
  {
    key: 'role',
    title: 'Roles',
    icon: 'Roles',
    href: '/role',
    permissions: ['ACCESS', 'EDIT', 'DELETE'],
  },
  {
    key: 'user',
    title: 'Users',
    icon: 'Users',
    href: '/user',
    permissions: ['ACCESS', 'EDIT', 'DELETE', 'ASSIGN'],
  },
]
