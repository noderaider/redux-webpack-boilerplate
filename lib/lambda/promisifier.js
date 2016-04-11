'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.lambdaPromisifier = undefined;

var _types = require('./types.js');

var lambdaPromisifier = exports.lambdaPromisifier = function lambdaPromisifier(lambda, options) {
  return function (options) {
    return new Promise(function (resolve, reject) {
      lambda(options, {
        succeed: resolve,
        fail: reject,
        done: function done(err, res) {
          return err ? reject(err) : resolve(res);
        },
        getRemainingTimeInMillis: function getRemainingTimeInMillis() {
          return Infinity;
        },
        functionName: 'fakeLambda',
        functionVersion: '0',
        invokedFunctionArn: 'arn:aws:lambda:fake-region:fake-acc:function:fakeLambda',
        memoryLimitInMB: Infinity,
        awsRequestId: 'fakeRequest',
        logGroupName: 'fakeGroup',
        logStreamName: 'fakeStream',
        identity: null,
        clientContext: null
      });
    });
  };
};