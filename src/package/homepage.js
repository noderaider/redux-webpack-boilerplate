import name from './name'
export default ({ host, organization }) => host === 'js.org' ? `https://${name}.js.org` : `https://${organization}.github.io/${name}`
