import assert from 'assert';

import { lambdaPromisifier } from '../../lib/lambda/promisifier.js'
import { proxyRequest } from '../../lambda/route.js'

const promisifiedFetch = lambdaPromisifier(proxyRequest)
describe('fetch lambda', () => {
  it('should be able to make an http call', done => {
    promisifiedFetch({url: 'http://www.tix.com/reports/something'})
    .then(res => assert(/fallback/.test(res)))
    .then(() => done(), done)
  })
})
