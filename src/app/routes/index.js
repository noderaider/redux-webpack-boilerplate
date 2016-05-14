import configureRoutes from 'lib/routes/configureRoutes'
import App from './components/App'
import Home from './components/Home'
import Test from './Test'
import NoMatch from './NoMatch'

const childRoutes = [ Test, NoMatch ]

export default configureRoutes({ ContainerComponent: App, IndexComponent: Home, childRoutes })
