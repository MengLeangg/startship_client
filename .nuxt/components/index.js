export { default as Friend } from '../../components/Friend.vue'
export { default as FriendLoading } from '../../components/FriendLoading.vue'
export { default as Menu } from '../../components/Menu.vue'
export { default as Message } from '../../components/Message.vue'
export { default as MessagePanel } from '../../components/MessagePanel.vue'
export { default as MessagePanelEmpty } from '../../components/MessagePanelEmpty.vue'
export { default as NuxtLogo } from '../../components/NuxtLogo.vue'
export { default as People } from '../../components/People.vue'
export { default as Profile } from '../../components/Profile.vue'
export { default as RocketLoading } from '../../components/RocketLoading.vue'
export { default as SwitchMode } from '../../components/SwitchMode.vue'
export { default as User } from '../../components/User.vue'

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
