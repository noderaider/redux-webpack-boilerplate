#! /usr/bin/env node

import fs from 'fs'
import mkdirp from 'mkdirp'
import { getServerMap } from '../lib'
import { join, resolve } from 'path'
import { server, __rootname, resolveRoot } from '../config'
import Pmx from 'pmx'
const pmx = Pmx.init( { http: true
                      , errors: true
                      , ignore_routes: []
                      , network: true // Network monitoring at the application level
                      , ports: true   // Shows which ports your app is listening on (default: false)
                      })


const paths = { NODE_ROOT: __rootname
              , NODE_MODULES_ROOT: resolveRoot('node_modules')
              , SERVER_CONFIG_PATH: resolveRoot('config-server.json')
              , CLIENT_CONFIG_PATH: resolveRoot('config-client.json')
              , PUBLIC_ROOT: resolveRoot('public')
              , STATIC_ROOT: resolveRoot('public/static')
              , IMAGES_ROOT: resolveRoot('public/static/images')
              , APP_ROOT: resolveRoot('app')
              , BIN_ROOT: resolveRoot('bin')
              , LOG_ROOT: resolveRoot('log')
              , LEGACY_STYLES_ROOT: resolveRoot('app/legacy/styles')
              , LEGACY_IMAGES_ROOT: resolveRoot('app/legacy/images')
              }

const serverMap = getServerMap(paths)
//serverMap.get('https').start()
serverMap.get('http').start()
