import { assert } from 'chai'
import App from './components/App'
import Index from './components/Index'
import NoMatch from './NoMatch'

export default function configureRoutes({ ContainerComponent = App, IndexComponent = Index, childRoutes = [] } = {}) {
  assert.ok(ContainerComponent, 'ContainerComponent is required')
  assert.ok(IndexComponent, 'IndexComponent is required')
  assert.ok(childRoutes, 'childRoutes are required')
  return  { path: '/'
          , component: ContainerComponent
          , indexRoute: { component: IndexComponent }
          , childRoutes
          }
}
