<template>
  <div class="chat-card_wrapper" @click="selectFriendChat"> <!-- :class="{ 'active' : active }"-->
    <div class="chat-card_container">
      <!--- user avatar --->
      <vs-avatar class="flex-none" badge circle :badge-color="friend.online ? 'success' : 'danger'">
        <img :src="friend.avatar" :alt="friend.first_name + ' ' + friend.last_name">
      </vs-avatar>
      <div class="chat-card_content">
        <h1 class="chat-name">{{ friend.first_name + ' ' + friend.last_name }}</h1>
        <div class="chat-last" v-show="false">
          <p class="text">Hello everyone.</p>
          <p class="chat-date">1 min ago</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        props: ['conversation', 'current_user', 'users'],
        data: () => ({
            friend: {},
        }),
        computed: {
            friendId() {
                return this.conversation.members.find(m => m !== this.current_user._id)
            }
        },
        mounted() {
            this.users.filter(user => {
                if (user.userId === this.friendId)
                    this.friend.online = true
                else this.friend.online = false
            })
        },
        methods: {
            selectFriendChat() {
                this.$nuxt.$emit('selectChat', this.friend);
            }
        },
        async fetch() {
            this.friend= await this.$axios.$get(`/user/${this.friendId}`)
        }
    }
</script>

<style lang="scss" scoped>
  @import '~/assets/sass/components/_chatcard.scss';
</style>
