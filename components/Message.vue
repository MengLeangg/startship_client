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
      transform: scale(0);
      transform-origin: 0 0;
      animation: bounce 500ms linear both;


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
            margin-left: auto;
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

  @keyframes bounce {
    0% { transform: matrix3d(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
    4.7% { transform: matrix3d(0.45, 0, 0, 0, 0, 0.45, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
    9.41% { transform: matrix3d(0.883, 0, 0, 0, 0, 0.883, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
    14.11% { transform: matrix3d(1.141, 0, 0, 0, 0, 1.141, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
    18.72% { transform: matrix3d(1.212, 0, 0, 0, 0, 1.212, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
    24.32% { transform: matrix3d(1.151, 0, 0, 0, 0, 1.151, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
    29.93% { transform: matrix3d(1.048, 0, 0, 0, 0, 1.048, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
    35.54% { transform: matrix3d(0.979, 0, 0, 0, 0, 0.979, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
    41.04% { transform: matrix3d(0.961, 0, 0, 0, 0, 0.961, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
    52.15% { transform: matrix3d(0.991, 0, 0, 0, 0, 0.991, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
    63.26% { transform: matrix3d(1.007, 0, 0, 0, 0, 1.007, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
    85.49% { transform: matrix3d(0.999, 0, 0, 0, 0, 0.999, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
    100% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  }
</style>
