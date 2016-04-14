export default ({}) => Object.assign({}, ...[ build('webpack', resource => `babel src/config.client.js -o config.client.js && babel src/config.server.js -o config.server.js && babel src/${resource}.config.js -o ${resource}.config.js && babel src/${resource}.static.config.js -o ${resource}.static.config.js && babel src/${resource} -d ${resource}`, ['copy-config-client', 'copy-config-server', 'build-config-client', 'build-config-server'])
                                            , build('public', resource => `ncp src/${resource} ${resource} && webpack --config webpack.static.config.js --progress --profile --colors`, ['build-webpack'])
                                            , buildWebpack('app', 'webpack.config.js', ['build-public'])
                                            , buildBabel('bin')
                                            , buildBabel('lib')
                                            , buildBabel('test')
                                            , copy('config-client', 'config-client.json')
                                            , copy('config-server', 'config-server.json')
                                            , buildBabelFile('config-client', 'config.client.js')
                                            , buildBabelFile('config-server', 'config.client.js')
                                            , copy('app', 'app/vendor', 'public/vendor')
                                            , { 'transform': 'transform-package'
                                              , 'postbuild-app': 'npm run copy-app'
                                              , 'build-lib-dev': 'NODE_ENV=development npm run build-lib'
                                              , 'build-lib-prod': 'NODE_ENV=production npm run build-lib'
                                              , 'build-lib-prod-osx': 'NODE_ENV=production npm run build-lib'
                                              , 'build-prod': 'NODE_ENV=production npm run build-app && npm run build-lib-prod && npm run build-bin'
                                              , 'build-dev': 'NODE_ENV=development npm run build-app && npm run build-lib-dev && npm run build-bin'
                                              , 'build-hot': 'NODE_ENV=hot npm run build-app && npm run build-lib-dev && npm run build-bin'
                                              , 'start-hot': 'NODE_ENV=hot npm run build-hot && node bin/run'
                                              , 'start': 'NODE_ENV=production npm run build-prod && node bin/run'

                                              , 'build': 'npm run build-app && npm run build-bin && npm run build-lib'
                                              , 'watch': 'npm run watch-build'
                                              , 'predoc': 'rimraf doc'
                                              , 'doc': 'esdoc -c ./esdoc.json'
                                              , 'prerelease': 'npm run build'
                                              , 'release': 'npm version patch && npm publish'
                                              , 'postrelease': 'npm run release-doc'
                                              , 'prerelease-doc': 'npm run doc'
                                              , 'release-doc': 'git subtree push --prefix doc origin gh-pages'
                                              , 'postrelease-doc': 'git commit -am "doc-release" && git push --follow-tags'
                                              , 'test': 'karma start'
                                              }
                                            ])

const babelDirBuilder = resource => `babel src/${resource} -d ${resource}`
const babelWatchBuilder = resource => `babel src/${resource} -d ${resource} --watch`
const babelFileBuilder = fromPath => `babel src/${fromPath} -o ${fromPath}`

const buildBabel = (resource, dependencies) => Object.assign({}, build(resource, babelDirBuilder, dependencies), { [`watch-${resource}`]: babelWatchBuilder(resource) })
const buildBabelFile = (resource, fromPath, dependencies) => ({ [`prebuild-${resource}`]: dependencies ? `rimraf ${fromPath} && ${formatDependencies(dependencies)}` : `rimraf ${fromPath}`
                                                              , [`build-${resource}`]: babelFileBuilder(fromPath)
                                                              })
const build = (resource, scriptBuilder, dependencies) =>  ( { [`prebuild-${resource}`]: dependencies ? `rimraf ${resource} && ${formatDependencies(dependencies)}` : `rimraf ${resource}`
                                                            , [`build-${resource}`]: scriptBuilder(resource)
                                                            })
const copy = (resource, fromPath, toPath, dependencies) =>  ( { [`precopy-${resource}`]: dependencies ? `rimraf ${toPath || fromPath} && ${formatDependencies(dependencies)}` : `rimraf ${toPath || fromPath}`
                                                              , [`copy-${resource}`]: `ncp src/${fromPath} ${toPath || fromPath}`
                                                              })

const formatDependencies = dependencies => dependencies ? dependencies.map(x => `npm run ${x}`).join(' && ') : ''

const formatWebpackBuilder = webpackConfig => `webpack --config ${webpackConfig} --progress --profile --colors`

const buildWebpack = (resource, webpackConfig, dependencies) => dependencies ? ({ [`prebuild-${resource}`]: formatDependencies(dependencies)
                                                                                , [`build-${resource}`]: formatWebpackBuilder(webpackConfig)
                                                                                }) : ({ [`build-${resource}`]: formatWebpackBuilder(webpackConfig) })