#! /usr/bin/env node
import 'babel-polyfill'
import { __rootname, resolveRoot, log } from '../config'
try {
  const paths = { NODE_ROOT: __rootname
                , NODE_MODULES_ROOT: resolveRoot('node_modules')
                , SERVER_CONFIG_PATH: resolveRoot('config-server.json')
                , CLIENT_CONFIG_PATH: resolveRoot('config-client.json')
                , PUBLIC_ROOT: resolveRoot('public')
                , ASSETS_ROOT: resolveRoot('public/assets')
                , STATIC_ROOT: resolveRoot('public/static')
                , IMAGES_ROOT: resolveRoot('public/static/images')
                , APP_ROOT: resolveRoot('app')
                , BIN_ROOT: resolveRoot('bin')
                , LOG_ROOT: resolveRoot('log')
                , DOC_ROOT: resolveRoot('doc')
                }

  const server = require('../lib/server').default({ paths })
  //server.get('https').start()
  server.get('http').start()
} catch(err) {
  log.fatal(err, 'A fatal error occurred.')
}
