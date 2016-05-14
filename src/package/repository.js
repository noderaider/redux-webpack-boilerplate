import name from './name.js'
export default ({ organization = 'cchamberlain' }) => ( { type: 'git'
                                                        , url: `git+https://github.com/${organization}/${name}.git`
                                                        } )
