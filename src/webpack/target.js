export function getTarget(name) {
  if(name === 'lambda')
    return 'node'
  return 'web'
}
