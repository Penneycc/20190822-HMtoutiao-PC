const KEY = 'hm-80-user'
export default {
  setUser (user) {
    const jsonStr = JSON.stringify(user)
    sessionStorage.setItem(KEY, jsonStr)
  },
  getUser () {
    const jsonStr = sessionStorage.getItem(KEY) || '{}'
    return JSON.parse(jsonStr)
  },
  delUser () {
    sessionStorage.removeItem(KEY)
  }
}
