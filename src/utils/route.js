import path from 'path'
/**
 * 返回所有子路由
 */
const getChildrenRoutes = routes => {
  const result = []
  routes.forEach(item => {
    if (item.children && item.children.length > 0) {
      result.push(...item.children)
    }
  })
  return result
}

/**
 * 处理脱离层级的路由
 */
export const filterRoutes = routes => {
  const childrentRoutes = getChildrenRoutes(routes)
  return routes.filter(route => {
    // 根据route在childrenRoutes 中进行查重，把所有的重复路由表删除
    return !childrentRoutes.find(childrentRoute => {
      return childrentRoute.path === route.path
    })
  })
}

function isNull(data) {
  if (!data) return true
  if (JSON.stringify(data) === '{}') return true
  if (JSON.stringify(data) === '[]') return true
}

/**
 * 根据 routes 数据，返回对应 menu 规则数组
 */
export const generateMenus = (routes, basePath = '') => {
  const result = []
  // 不满足该条件 meta && meta.title && meta.icon 的数据不应该存在
  routes.forEach(item => {
    // 不存在children&&不存在meta 直接return
    if (isNull(item.children) && isNull(item.meta)) return
    // 存在 children 不存在 meta，进入迭代
    if (isNull(item.meta) && !isNull(item.children)) {
      result.push(...generateMenus(item.children))
      return
    }
    // 不存在children,存在meta || 存在children && 存在meta
    const routePath = path.resolve(basePath, item.path)
    let route = result.find(item => item.path === routePath)
    if (!route) {
      route = {
        ...item,
        path: routePath,
        children: []
      }
      // icon 与 title 必须全部存在
      if (route.meta.icon && route.meta.title) {
        result.push(route)
      }
    }
    // 存在 children && 存在meta  进入迭代到children
    if (!isNull(item.children)) {
      route.children.push(...generateMenus(item.children, route.path))
    }
  })
  return result
}
