export default ({ path }) => {
  const copyToRoot = ['etc/config/config-server.json', 'etc/config/config-client.json', 'src/public']
  const copyToSrc = ['etc/config/config-server.json', 'etc/config/config-client.json']

  const scripts = { 'prebuild-package': 'rimraf package'
                  , 'build-package': 'babel src/package -d package'
                  , 'precopy-root-files': `rimraf ${copyToRoot.map(x => path.basename(x)).join(' ')}`
                  , 'copy-root-files': copyToRoot.map(x => `ncp ${x} ${path.basename(x)}`).join(' && ')
                  , 'precopy-src-files': `rimraf ${copyToSrc.map(x => `src/${path.basename(x)}`).join(' ')}`
                  , 'copy-src-files': copyToSrc.map(x => `ncp ${x} src/${path.basename(x)}`).join(' && ')
                  , 'prebuild-webpack': 'rimraf webpack && run-p copy-root-files copy-src-files build-package && npm run build-config'
                  , 'build-webpack': 'babel src/config.js -o config.js && babel src/webpack.config.js -o webpack.config.js && babel src/webpack.static.config.js -o webpack.static.config.js && babel src/webpack.server.config.js -o webpack.server.config.js && babel src/webpack -d webpack'
                  , 'prebuild-config': 'rimraf config.js'
                  , 'build-config': 'babel src/config.js -o config.js'
                  , 'webpack-static': 'webpack --config webpack.static.config.js --progress --profile --colors'
                  , 'webpack-app': 'webpack --config webpack.config.js --progress --profile --colors'
                  , 'prebuild-app': 'rimraf public && npm run build-webpack && npm run build-package'
                  , 'build-app': 'run-p webpack-static webpack-app'
                  , 'prebuild-bin': 'rimraf bin'
                  , 'build-bin': 'babel src/bin -d bin'
                  , 'watch-bin': 'npm run build-bin -- --watch'
                  , 'prebuild-lib': 'rimraf lib'
                  , 'build-lib': 'babel src/lib -d lib'
                  , 'watch-lib': 'npm run build-lib -- --watch'
                  , 'webpack-server': 'webpack --config webpack.server.config.js --progress --profile --colors'
                  , 'webpack-server-watch': 'npm run webpack-server -- --watch'
                  , 'build-server': 'run-p build-lib webpack-server build-bin'
                  , 'watch-server': 'NODE_ENV=development run-p watch-lib webpack-server-watch watch-bin'
                  , 'link-dev': 'npm link ../redux-load ../react-load ../redux-addons ../redux-blueprint ../redux-idle-monitor ../react-redux-idle-monitor ../redux-grid ../redux-grid-view ../redux-middleware ../redux-mux ../save-as'
                  , 'build-lib-dev': 'NODE_ENV=development npm run build-lib'
                  , 'build-lib-prod': 'NODE_ENV=production npm run build-lib'
                  , 'build-prod': 'NODE_ENV=production run-s build-app build-lib-prod build-bin'
                  , 'build-dev': 'NODE_ENV=development run-s build-app build-lib-dev build-bin'
                  , 'nodemon-start': 'nodemon bin/run | bunyan'
                  , 'prestart-hot': 'npm run build-config'
                  , 'start-hot': 'NODE_ENV=hot npm run build-app && run-p watch-server nodemon-start'
                  , 'start': 'NODE_ENV=production npm run build-prod && node bin/run | bunyan'
                  , 'build': 'run-p build-app build-lib build-bin'
                  , 'watch': 'npm run watch-build'
                  , 'predoc': 'rimraf doc'
                  , 'doc': 'echo \"NO DOCS\"' //'esdoc -c ./esdoc.json'
                  , 'prerelease': 'npm run build && git add -A && git commit -am "publish"'
                  , 'release': 'npm version patch && npm publish'
                  , 'postrelease': 'npm run release-doc'
                  , 'prerelease-doc': 'npm run doc'
                  , 'release-doc': 'git subtree push --prefix public origin gh-pages'
                  , 'postrelease-doc': 'git commit -am "doc-release" && git push --follow-tags'
                  , 'upgrade': 'ncu -a && npm update'
                  }
  return scripts
}
