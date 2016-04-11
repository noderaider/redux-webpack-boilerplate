import name from './name'
export default ({ organization }) =>  { type: 'git'
                                      , url: `git+https://github.com/${organization}/${name}.git`
                                      }
