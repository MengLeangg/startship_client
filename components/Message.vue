<template>
  <div class="message-wrapper" :class="{ 'replied' : data.sender === loggedInUser._id }"> <!-- sent | replied -->
    <div class="message-container">
      <div class="message-profile" v-show="true">
        <vs-avatar circle size="40">
          <img :src="user.avatar" :alt="user.first_name + ' ' + user.last_name">
        </vs-avatar>
      </div>
      <div class="message-body">
        <p class="message-text">{{ data.text }}</p>
        <div class="message-date">{{ $dayjs(data.createdAt).fromNow() }}</div>
      </div>
    </div>
  </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        props: ['data'],
        computed: {
            ...mapGetters([ 'loggedInUser' ]),
            user() {
                return this.$store.state.user_active
            }
        }
    }
</script>

<style lang="scss" scoped>

  .message-wrapper {
    .message-container {
      max-width: 70%;
      display: flex;
      align-items: flex-end;


      .message-profile {
        margin-right: 15px;
        padding-bottom: 40px;
      }

      .message-body {

        .message-text {
          width: fit-content;
          padding: 15px;
          background-color: $bg-message-text;
          border-radius: 25px 25px 25px 0;
          @include font-text($font-14, normal, null)
        }

        .message-date {
          padding: 10px 5px;
          @include font-text($font-12, normal, null)
        }
      }

    }

    // reverse or reply message
    &.replied {

      .message-container {
        max-width: 70%;
        margin-left: auto;
        flex-direction: row-reverse;

        .message-profile {
          display: none;
          margin-left: 15px;
          margin-right: 0;
        }
        .message-body {

          .message-text {
            color: $light;
            background-color: $primary;
            border-radius: 25px 25px 0 25px;
          }

          .message-date {
            text-align: right;
          }
        }
      }

    }
  }
</style>
