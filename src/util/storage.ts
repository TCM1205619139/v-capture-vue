export default {
  get (key:string) {
    try {
      return JSON.parse(<string>localStorage.getItem(key))
    } catch (e) {}
  },
  set (key:string, val:any) {
    try {
      localStorage.setItem(key, JSON.stringify(val))
    } catch (e) {}
  },
  remove (key:string) {
    try {
      localStorage.removeItem(key)
    } catch (e) {}
  },
  clear () {
    try {
      localStorage.clear()
    } catch (e) {}
  }
}
