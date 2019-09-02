import Mybread from '@/components/my-bread'
import Mychannel from '@/components/my-channel'

export default {
  install (Vue) {
    Vue.component(Mybread.name, Mybread)
    Vue.component(Mychannel.name, Mychannel)
  }
}
