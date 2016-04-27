import { resolveRoot } from '../config.server.js'
import { resolve } from 'path'

export const configClientPath = resolveRoot('./config-client.json')
export const configServerPath = resolveRoot('./config-server.json')
export const configPath = resolveRoot('./config.client.js')

export const libFolder = resolveRoot('./src/lib')
export const packageFolder = resolveRoot('./src/package')
export const appFolder = resolveRoot('./src/app')
export const binFolder = resolveRoot('./src/bin')

export const controlsFolder = resolve(appFolder, 'controls')
export const elementsFolder = resolve(appFolder, 'elements')
export const stateFolder = resolve(appFolder, 'state')
export const servicesFolder = resolve(appFolder, 'services')
export const stylesFolder = resolve(appFolder, 'styles')
export const imagesFolder = resolve(appFolder, 'images')
export const vendorFolder = resolve(appFolder, 'vendor')
export const externalFolder = resolve(appFolder, 'external')
export const legacyFolder = resolve(appFolder, 'legacy')

const resolveVendor = path => resolve(vendorFolder, path)

export function getAlias(name) {
  return  { 'config-client': configClientPath
          , 'config': configPath
          , 'package': packageFolder
          , 'app': appFolder
          , 'chai': 'assertive-chai'
          , 'vendor': vendorFolder
          , 'controls': controlsFolder
          , 'elements': elementsFolder
          , 'services': servicesFolder
          , 'state': stateFolder
          , 'legacy': legacyFolder
          , 'styles': stylesFolder
          , 'images': imagesFolder
          , 'external': externalFolder
          }
}
