<template>
  <div class="card-wrapper" :class="{ 'active' : user_active ? user_active._id === user._id : '' }" @click="openConversation">
    <div class="card-container">
      <div class="card-avatar">
<!--        <div v-if="$fetchState.pending" class="avatar-loading animate-pulse"></div>-->
        <vs-avatar circle badge :badge-color="user.online ? 'success' : 'danger'">
          <img v-if="user.avatar" :src="user.avatar" :alt="user.first_name + ' ' + user.last_name">
          <template v-if="!user.avatar" #text>
            {{ user.first_name + ' ' + user.last_name }}
          </template>
        </vs-avatar>
      </div>
      <div class="card-info">
<!--        <div v-if="$fetchState.pending" class="loading-wrap animate-pulse"></div>-->
        <h1>{{ user.first_name + ' ' + user.last_name }}</h1>
<!--        <div class="w-full flex items-center">-->
<!--          <p class="last-chat">Hello</p>-->
<!--          <p class="chat-date" v-show="!user.online">{{ $dayjs(user.online_at).fromNow() }}</p>-->
<!--        </div>-->
      </div>
    </div>
  </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        props: ['conversation'],
        data: () => ({
            user: {},
        }),
        computed: {
            ...mapGetters([ 'loggedInUser' ]),
            user_active() {
                return this.$store.state.user_active
            },
            friendId() {
                return this.conversation.members.find(m => m !== this.loggedInUser._id)
            }
        },
        created() {
            this.$nuxt.$on('refresh', () => {
                this.$fetch()
            })
        },
        methods: {
            openConversation() {
                this.$store.commit('setUserActive', this.user)
                this.$nuxt.$emit('fetch-chat', this.conversation._id);
            }
        },
        async fetch() {
            this.user = await this.$axios.$get(`/user/${this.friendId}`)
        }
    }
</script>

<style lang="scss" scoped>
  @import "~/assets/sass/components/_user-card.scss";
</style>
