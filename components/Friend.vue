<template>
  <div class="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2">
    <vs-avatar badge badge-color="success">
      <img :src="friend.avatar" :alt="friend.first_name + ' ' + friend.last_name">
    </vs-avatar>
    <div class="ml-2 text-md font-semibold">{{ friend.first_name + ' ' + friend.last_name }}</div>
  </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        name: "Friend",
        props: ['conversation', 'current_user'],
        data: () => ({
            friend: {}
        }),
        computed: {
            friendId() {
                return this.conversation.members.find(m => m !== this.current_user._id)
            }
        },
        async fetch() {
            this.friend= await this.$axios.$get(`/user/${this.friendId}`)
        }
    }
</script>

<style scoped>

</style>
