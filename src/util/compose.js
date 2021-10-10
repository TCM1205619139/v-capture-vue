/**
 * 异步非阻塞的不可中断compose函数
 * @param  {Function[]} fns
 * @returns {Function => Promise}
 */
const composeAsync = (...fns) => {
  return (input) => {
    return fns.reduce(
      (sequins, fn) => {
        return sequins.then(async data => {
          return Promise.resolve(await fn(data))
        })
      },
      Promise.resolve(input)
    )
  }
}
