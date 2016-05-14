import name from './name.js'
export default ({ host = 'js.org', organization = 'cchamberlain' }) => host === 'js.org' ? `https://${name}.js.org` : `https://${organization}.github.io/${name}`
