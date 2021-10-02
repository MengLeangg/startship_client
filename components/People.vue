<template>
  <div class="card-wrapper" @click="openConversation">
    <div class="card-container">
      <div class="card-avatar">
        <vs-avatar circle size="40">
          <img v-if="avatar" :src="avatar" :alt="name">
          <template v-if="!avatar" #text>
            {{ name }}
          </template>
        </vs-avatar>
      </div>
      <div class="card-info">
        <h1>{{ name }}</h1>
      </div>
    </div>
  </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        props: [ 'user', 'name', 'avatar' ],
        computed: {
            ...mapGetters([ 'getConversation', 'getUserActive' ]),
        },
        methods: {
            openConversation() {
                this.$store.commit("setIsOpenSearch", false)
                this.$store.commit('setUserActive', this.user)
                let status = null
                let conversation_id = null
                for (let i = 0 ; i < this.getConversation.length ; i++) {
                    if (this.user._id === this.getConversation[i].members.find(m => m === this.user._id)) {
                        status = true
                        conversation_id = this.getConversation[i]._id
                        break
                    }
                    else status = false
                }
                this.$nuxt.$emit('fetch-chat', conversation_id);
                this.$nuxt.$emit('open-chat')
            }
        }
    }
</script>

<style lang="scss" scoped>
  @import "~/assets/sass/components/_user-card.scss";
</style>
