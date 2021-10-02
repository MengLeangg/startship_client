<template>
  <div class="chat-card_wrapper" @click="selectFriendChat"> <!-- :class="{ 'active' : active }"-->
    <div class="chat-card_container">
      <!--- user avatar --->
      <vs-avatar class="flex-none" badge circle :badge-color="friend.online ? 'success' : 'danger'">
        <img v-if="friend.avatar" :src="friend.avatar" :alt="friend.first_name + ' ' + friend.last_name">
        <template v-if="!friend.avatar" #text>
          {{ friend.first_name + ' ' + friend.last_name }}
        </template>
      </vs-avatar>
      <div class="chat-card_content">
        <h1 class="chat-name">{{ friend.first_name + ' ' + friend.last_name }}</h1>
        <div class="chat-last">
          <p class="text">Hello everyone. What's up?</p>
          <p class="chat-date" v-show="!friend.online">{{ $dayjs(friend.online_at).fromNow(true) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        props: ['conversation', 'current_user'],
        data: () => ({
            random_colors: Math.floor(Math.random()*16777215).toString(16),
            friend: {},
        }),
        computed: {
            friendId() {
                return this.conversation.members.find(m => m !== this.current_user._id)
            }
        },
        created() {
            this.$nuxt.$on('refresh', () => {
                this.$fetch()
            })
        },
        methods: {
            selectFriendChat() {
                this.$nuxt.$emit('selectChat', this.friend);
            },
        },
        async fetch() {
            this.friend = await this.$axios.$get(`/user/${this.friendId}`)
        }
    }
</script>

<style lang="scss" scoped>
  @import '~/assets/sass/components/_friend.scss';
</style>
