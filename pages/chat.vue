<template>
  <div class="app-container">
    <div class="app-left_side">

      <!--- app left header --->
      <div class="app-left-header">
        <div class="app-logo">
          <h1>StarShip 🚀</h1>
        </div>

        <div class="app-left-search-box" v-show="active === 1">
          <div class="search-box">
            <span class="search-icon">
              <svg version="1.1" id="Capa_1" width="20" height="20" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><g><g><path d="M141.367,116.518c-7.384-7.39-19.364-7.39-26.748,0c-27.416,27.416-40.891,65.608-36.975,104.79c0.977,9.761,9.2,17.037,18.803,17.037c0.631,0,1.267-0.032,1.898-0.095c10.398-1.04,17.983-10.316,16.943-20.707c-2.787-27.845,6.722-54.92,26.079-74.278C148.757,135.882,148.757,123.901,141.367,116.518z"/></g></g><g><g><path d="M216.276,0C97.021,0,0,97.021,0,216.276s97.021,216.276,216.276,216.276s216.276-97.021,216.276-216.276S335.53,0,216.276,0z M216.276,394.719c-98.396,0-178.443-80.047-178.443-178.443S117.88,37.833,216.276,37.833c98.39,0,178.443,80.047,178.443,178.443S314.672,394.719,216.276,394.719z"/></g></g><g><g><path d="M506.458,479.71L368.999,342.252c-7.39-7.39-19.358-7.39-26.748,0c-7.39,7.384-7.39,19.364,0,26.748L479.71,506.458c3.695,3.695,8.531,5.542,13.374,5.542c4.843,0,9.679-1.847,13.374-5.542C513.847,499.074,513.847,487.094,506.458,479.71z"/></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>
            </span>
            <input type="text" @focus="onfocus" v-model="search" @input="findUser" class="search-input" placeholder="Search you friend">
            <button type="button" class="btn-close" v-show="is_open_search" @click="closeSearch">
              <svg width="10" height="10" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 47.971 47.971" style="enable-background:new 0 0 47.971 47.971;" xml:space="preserve"><g><path d="M28.228,23.986L47.092,5.122c1.172-1.171,1.172-3.071,0-4.242c-1.172-1.172-3.07-1.172-4.242,0L23.986,19.744L5.121,0.88c-1.172-1.172-3.07-1.172-4.242,0c-1.172,1.171-1.172,3.071,0,4.242l18.865,18.864L0.879,42.85c-1.172,1.171-1.172,3.071,0,4.242C1.465,47.677,2.233,47.97,3,47.97s1.535-0.293,2.121-0.879l18.865-18.864L42.85,47.091c0.586,0.586,1.354,0.879,2.121,0.879s1.535-0.293,2.121-0.879c1.172-1.171,1.172-3.071,0-4.242L28.228,23.986z"/></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>
            </button>
          </div>
        </div>

        <div class="app-left-title" v-show="active === 2">
          <h1 class="title">My Profile</h1>
        </div>
      </div>

      <!--- app left chat list --->
      <div class="app-left-list" v-show="active === 1">
        <transition-group name="fade">
          <User v-show="!is_open_search" v-for="conversation in getConversation" :key="`conversation-${conversation._id}`" :conversation="conversation"/>
          <People v-show="is_open_search" v-for="(user, $i) in users" :key="`key-${$i}`" :user="user" :name="user.full_name" :avatar="user.avatar"/>
        </transition-group>
      </div>

      <!--- app left list user profile --->
      <Profile v-show="active === 2"/>

      <!--- app left menu --->
      <Menu/>

    </div>
    <div class="app-main_side">
      <!--- Message Panel Component --->
<!--      <MessagePanelEmpty v-if="!user"/>-->
      <MessagePanel/>

    </div>

  </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        middleware: 'auth',
        transition: 'fade',
        data: () => ({
            // conversations: [],
            search: '',
            users: []
        }),
        computed: {
            ...mapGetters([ 'loggedInUser', 'getConversation' ]),
            active () {
                return this.$store.state.active
            },
            user() {
                return this.$store.state.user_active
            },
            is_open_search() {
                return this.$store.state.is_open_search
            }
        },
        created() {
            this.$nuxt.$on('open-chat', () => {
                this.search = ''
            })
            this.$nuxt.$on('offline', data => {
                this.socket.emit('offline', data)
            })
        },
        mounted() {
            this.socket = this.$nuxtSocket({ channel: '/', reconnection: false, persist: true })
            // // user online
            this.socket.emit("login", { userId : this.loggedInUser._id });
            this.socket.on("online", () => {
                this.$nuxt.$emit('refresh');
            })
            this.socket.on("offline", () => {
                this.$nuxt.$emit('refresh');
            })
            // socket on event from server
            this.socket.emit("addUser", this.loggedInUser._id);

            // refresh conversation list if user create new conversation
            this.socket.on('refresh-conversation', () => {
                this.$fetch()
            })

            // Get Message
            this.socket.on('getMessage', data => {
                let arrivalMessage = {
                    sender: data.senderId,
                    text: data.text,
                    createdAt: Date.now()
                };
                this.$nuxt.$emit('new-message', arrivalMessage);
            })
        },
        methods: {
            onfocus() {
                this.$store.commit("setIsOpenSearch", true)
            },
            closeSearch() {
                this.$store.commit("setIsOpenSearch", false)
                this.search = ''
            },
            async findUser() {
                let res = await this.$axios.post("/user/find", {
                    search: this.search
                });
                this.users = res.data
            }
        },
        async fetch() {
            let conversations = await this.$axios.$get(`/conversations/${this.loggedInUser._id}`)
            this.$store.commit("setConversation", conversations)
        },
    }
</script>

<style lang="scss" scoped>
  @import '~/assets/sass/pages/_chat-ui.scss';
</style>
