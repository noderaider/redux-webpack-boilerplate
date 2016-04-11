"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var LambdaContext = exports.LambdaContext = {
  succeed: function succeed(results) {
    console.log(results);
    process.exit(0);
  }
};