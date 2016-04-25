import { griddlePlugin, griddleConfig, griddleReducer } from 'griddle-overhaul-react-redux'

const testPlugin =  griddlePlugin('test', pluginContext => next => (state, action) => {
                                            console.debug(`TEST PLUGIN PRE FOR PLUGIN [${pluginContext.name}]`)
                                            return next(state, action)
                                          })

const primary = { plugins: [ testPlugin ] }

export const config = griddleConfig([[ 'primary', primary ]])

export const context = id => config.context(id)
export const reducer = griddleReducer(config)
