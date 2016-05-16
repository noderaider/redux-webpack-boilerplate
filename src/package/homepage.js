import name from './name.js'
export default ({ host = 'js.org', organization = 'cchamberlain' }) => host === 'js.org' ? `http://${name}.js.org` : `http://${organization}.github.io/${name}`
