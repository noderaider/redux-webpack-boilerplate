export default  { path: 'maintenance/:type(/:code)'
                , getComponent(nextState, cb) {
                    require.ensure([], require => cb(null, require('./components/Maintenance').default))
                  }
                }
