import { log } from 'config'
export default  { path: 'identity'
                , getComponent(nextState, cb) {
                    log.debug('identity-getComponent')
                    require.ensure([], require => cb(null, require('./components/Identity').default))
                  }
                , getChildRoutes(location, cb) {
                    log.debug('identity-getChildRoutes')
                    require.ensure([], require => cb(null,  [ require('./routes/Login').default
                                                            , require('./routes/Maintenance').default
                                                            ]))
                  }
                }
