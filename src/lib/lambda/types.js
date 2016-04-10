
export const LambdaContext = {
  succeed: results => {
    console.log(results)
    process.exit(0)
  }
}
