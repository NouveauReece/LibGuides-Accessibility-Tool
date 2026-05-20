import { defineRouteMiddleware } from '@astrojs/starlight/route-data'

export const onRequest = defineRouteMiddleware((context) => {
  const sidebar = context.locals.starlightRoute.sidebar

  // Find the auto-generated 'docs' group and hoist its entries up
  const docsGroup = sidebar.find(
    (entry) => entry.type === 'group' && entry.label === 'Docs'
  )

  if (docsGroup) {
    context.locals.starlightRoute.sidebar = docsGroup.entries
  }
})