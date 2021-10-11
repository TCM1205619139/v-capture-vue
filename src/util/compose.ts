/**
 * 异步非阻塞的不可中断compose函数
 * @param  {Function[]} fns
 * @returns {Function => Promise}
 */
const composeAsync = (...fns: Function[]) => {
  return (input: any) => {
    return fns.reduce(
      (sequins, fn:Function) => {
        return sequins.then(async data => {
          return Promise.resolve(await fn(data))
        })
      },
      Promise.resolve(input)
    )
  }
}
