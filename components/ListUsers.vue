<template>
  <div>
    <ul class="user_list flex flex-col space-y-1 mt-4 -mx-2 overflow-y-auto">
      <li class="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2" v-for="(user, key) in users" :key="key">
        <vs-avatar size="40" badge v-if="user.avatar">
          <img :src="user.avatar" alt="">
        </vs-avatar>
        <vs-avatar primary size="40" badge :badge-color="user.online ? 'success' : 'danger'" v-else>
          <template #text>
            {{ user.first_name.slice(0, 1) }}
          </template>
        </vs-avatar>
        <div class="ml-2 text-sm font-semibold">{{ user.first_name + ' ' + user.last_name }}</div>
      </li>
    </ul>
  </div>
</template>

<script>

    export default {
        data:() => ({
            users: []
        }),
        computed: {

        },
        async fetch() {
            this.users = await this.$axios.$get('/user');
        }
    }
</script>

<style>
  .user_list {
    max-height: calc(100vh - 400px);
  }

  .user_list::-webkit-scrollbar {
    width: 5px;
  }

  .user_list::-webkit-scrollbar-track {

  }

  .user_list::-webkit-scrollbar-thumb {
    background-color: #c7c7c7;
  }

  .user-online {
    width: 10px;
    height: 10px;
    position: absolute;
    bottom: 0;
    right: 0;
    border-radius: 50%;
    background-color: #fff;
  }

  .user-online.online {
    background-color: limegreen;
  }

  .user-online.offline {
    background-color: red;
  }

</style>
