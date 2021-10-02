<template>
  <transition name="slide-down">
    <div class="message-panel_wrapper">

      <div class="message-panel_empty" v-if="!user">
        <div class="content">
          <div class="text">Select a chat to start messaging</div>
        </div>
      </div>
      <div class="message-panel_container" v-else>

        <div class="panel-header">

          <!--- back button for mobile --->
          <button class="btn-back" @click="closeConversation">
            <svg width="18" height="18" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 447.243 447.243" style="enable-background:new 0 0 447.243 447.243;" xml:space="preserve"><g><g><path d="M420.361,192.229c-1.83-0.297-3.682-0.434-5.535-0.41H99.305l6.88-3.2c6.725-3.183,12.843-7.515,18.08-12.8l88.48-88.48c11.653-11.124,13.611-29.019,4.64-42.4c-10.441-14.259-30.464-17.355-44.724-6.914c-1.152,0.844-2.247,1.764-3.276,2.754l-160,160C-3.119,213.269-3.13,233.53,9.36,246.034c0.008,0.008,0.017,0.017,0.025,0.025l160,160c12.514,12.479,32.775,12.451,45.255-0.063c0.982-0.985,1.899-2.033,2.745-3.137c8.971-13.381,7.013-31.276-4.64-42.4l-88.32-88.64c-4.695-4.7-10.093-8.641-16-11.68l-9.6-4.32h314.24c16.347,0.607,30.689-10.812,33.76-26.88C449.654,211.494,437.806,195.059,420.361,192.229z"/></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>
          </button>

          <vs-avatar class="flex-none" size="50" circle :writing="user_typing && user_typing.userId === user._id && user_typing.typing" :badge="user_typing && user_typing.userId === user._id && user_typing.typing">
            <img :src="user.avatar" :alt="user.first_name + ' ' + user.last_name">
          </vs-avatar>

          <div class="ml-3">
            <div class="chat-name">{{ user.first_name + ' ' + user.last_name }}</div>
            <span class="online_at">{{ user.online ? 'Active now' : 'Active ' + $dayjs(user.online_at).fromNow() }}</span>
          </div>

          <div class="ml-auto">
            <button type="button" class="btn voice-call" disabled>
              <svg width="15" height="15" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 513.64 513.64" style="enable-background:new 0 0 513.64 513.64;" xml:space="preserve"><g><g><path d="M499.66,376.96l-71.68-71.68c-25.6-25.6-69.12-15.359-79.36,17.92c-7.68,23.041-33.28,35.841-56.32,30.72c-51.2-12.8-120.32-79.36-133.12-133.12c-7.68-23.041,7.68-48.641,30.72-56.32c33.28-10.24,43.52-53.76,17.92-79.36l-71.68-71.68c-20.48-17.92-51.2-17.92-69.12,0l-48.64,48.64c-48.64,51.2,5.12,186.88,125.44,307.2c120.32,120.32,256,176.641,307.2,125.44l48.64-48.64C517.581,425.6,517.581,394.88,499.66,376.96z"/></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>
            </button>
            <button type="button" class="btn video-call" disabled>
              <svg width="15" height="15" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 467.968 467.968" style="enable-background:new 0 0 467.968 467.968;" xml:space="preserve"><g><g><path d="M264.704,96.512H51.2c-28.16,0-51.2,23.04-51.2,51.2v172.544c0,28.16,23.04,51.2,51.2,51.2h213.504c28.16,0,51.2-23.04,51.2-51.2V147.712C315.904,119.04,292.864,96.512,264.704,96.512z"/></g></g><g><g><path d="M430.08,124.672c-3.072,0.512-6.144,2.048-8.704,3.584l-79.872,46.08V293.12l80.384,46.08c14.848,8.704,33.28,3.584,41.984-11.264c2.56-4.608,4.096-9.728,4.096-15.36V154.368C467.968,135.424,450.048,120.064,430.08,124.672z"/></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>
            </button>
          </div>

        </div>

        <!-- message loading -->
<!--        <RocketLoading v-if="is_loading_message"/>-->

        <!-- message list -->
        <div class="message-list_container" v-chat-scroll="{always: false, smooth: false}">
          <infinite-loading direction="top" spinner="spiral" @infinite="infiniteHandler" ref="InfiniteLoading">
            <div slot="no-more"></div>
            <div slot="no-results"></div>
          </infinite-loading>
          <Message v-for="message in messages" :key="message.id" :data="message"/>
        </div>

        <ValidationObserver v-slot="{ invalid, handleSubmit }">
          <form @submit.prevent="handleSubmit(sendMessage)">
            <div class="message_input">
              <div class="input-container">

                <ValidationProvider rules="required" class="w-full">
                  <input type="text" ref="messageInput" v-model="text" @keydown="typingMessage" placeholder="Your message...">
                </ValidationProvider>

                <div class="chat-input_actions">
                  <vs-tooltip not-arrow>
                    <button type="button" class="btn emoji" disabled>
                      <svg width="18" height="18" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><g><g><path d="M437.019,74.981C388.668,26.629,324.38,0,256,0S123.332,26.629,74.981,74.981C26.628,123.332,0,187.62,0,256s26.628,132.668,74.981,181.019C123.332,485.371,187.62,512,256,512s132.668-26.629,181.019-74.981C485.372,388.668,512,324.38,512,256S485.372,123.332,437.019,74.981z M256,481.524c-124.354,0-225.524-101.17-225.524-225.524S131.646,30.476,256,30.476S481.524,131.646,481.524,256S380.354,481.524,256,481.524z"/></g></g><g><g><path d="M200.622,188.396c-24.953-24.955-65.556-24.953-90.509,0c-5.951,5.95-5.951,15.599,0,21.55c5.952,5.95,15.601,5.95,21.551,0c13.072-13.071,34.34-13.07,47.41,0c2.976,2.976,6.875,4.464,10.774,4.464s7.8-1.488,10.774-4.464C206.573,203.995,206.573,194.347,200.622,188.396z"/></g></g><g><g><path d="M401.884,188.396c-24.953-24.953-65.556-24.955-90.509,0c-5.951,5.95-5.951,15.599,0,21.55c5.952,5.95,15.601,5.95,21.551,0c13.07-13.071,34.338-13.072,47.41,0c2.976,2.976,6.875,4.464,10.774,4.464s7.8-1.488,10.774-4.464C407.835,203.995,407.835,194.347,401.884,188.396z"/></g></g><g><g><path d="M391.111,267.175H120.889c-8.416,0-15.238,6.823-15.238,15.238c0,82.902,67.447,150.349,150.349,150.349s150.349-67.447,150.349-150.349C406.349,273.997,399.527,267.175,391.111,267.175z M256,402.286c-60.938,0-111.402-45.703-118.909-104.635H374.91C367.402,356.583,316.938,402.286,256,402.286z"/></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>
                    </button>
                    <template #tooltip>
                      Emoji
                    </template>
                  </vs-tooltip>
                  <vs-tooltip not-arrow>
                    <button type="button" class="btn photo" disabled>
                      <svg width="18" height="18" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 298.73 298.73" style="enable-background:new 0 0 298.73 298.73;" xml:space="preserve"><g><path d="M264.959,9.35H33.787C15.153,9.35,0,24.498,0,43.154v212.461c0,18.634,15.153,33.766,33.787,33.766h231.171c18.634,0,33.771-15.132,33.771-33.766V43.154C298.73,24.498,283.593,9.35,264.959,9.35z M193.174,59.623c18.02,0,32.634,14.615,32.634,32.634s-14.615,32.634-32.634,32.634c-18.025,0-32.634-14.615-32.634-32.634S175.149,59.623,193.174,59.623z M254.363,258.149H149.362H49.039c-9.013,0-13.027-6.521-8.964-14.566l56.006-110.93c4.058-8.044,11.792-8.762,17.269-1.605l56.316,73.596c5.477,7.158,15.05,7.767,21.386,1.354l13.777-13.951c6.331-6.413,15.659-5.619,20.826,1.762l35.675,50.959C266.487,252.16,263.376,258.149,254.363,258.149z"/></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>
                    </button>
                    <template #tooltip>
                      Photos
                    </template>
                  </vs-tooltip>
                  <vs-tooltip not-arrow>
                    <button type="submit" class="btn send" :disabled="invalid">
                      <svg width="18" height="18" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><g><g><path d="M481.508,210.336L68.414,38.926c-17.403-7.222-37.064-4.045-51.309,8.287C2.86,59.547-3.098,78.551,1.558,96.808L38.327,241h180.026c8.284,0,15.001,6.716,15.001,15.001c0,8.284-6.716,15.001-15.001,15.001H38.327L1.558,415.193c-4.656,18.258,1.301,37.262,15.547,49.595c14.274,12.357,33.937,15.495,51.31,8.287l413.094-171.409C500.317,293.862,512,276.364,512,256.001C512,235.638,500.317,218.139,481.508,210.336z"/></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>
                    </button>
                    <template #tooltip>
                      Send
                    </template>
                  </vs-tooltip>
                </div>
              </div>
            </div>
          </form>
        </ValidationObserver>

      </div>
    </div>
  </transition>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        data: () => ({
            loading: null,
            conversation_id: null,
            messages: [],
            text: '',
            page: 1,
            limit: 10,
            typing: false,
            timeout: null,
            user_typing: null
        }),
        computed: {
            ...mapGetters([ 'loggedInUser', 'getMessages' ]),
            user() {
                return this.$store.state.user_active
            }
        },
        created() {
            this.$nuxt.$on('fetch-chat', async (conversation_id) => {
                this.messages = []
                this.page = 1
                this.conversation_id = conversation_id
                // this.messages = await this.$axios.$get(`/messages/${conversation_id}`)
                if(this.$refs.InfiniteLoading)
                    this.$refs.InfiniteLoading.stateChanger.reset();
            });

            this.$nuxt.$on('new-message', message => {
                this.messages.push(message)
            })
        },
        mounted() {
            this.socket = this.$nuxtSocket({channel: '/', reconnection: false})
            // Get Typing from Server-side
            this.socket.on("displayTyping", data => {
                // console.log("user typing:", data);
                this.user_typing = data
            });
        },
        methods: {
            async infiniteHandler($state) {
                await this.$axios.$get(`/messages/${this.conversation_id}?page=${this.page}&limit=${this.limit}`)
                    .then((data) => {
                        if (data.length) {
                            this.page += 1
                            this.messages.unshift(...data.reverse())
                            $state.loaded();
                        }
                        else
                            $state.complete();
                    })
            },
            timeOutTyping() {
                this.typing = false
                this.socket.emit("typing", { userId: this.loggedInUser._id, typing: this.typing })
            },
            typingMessage() {
                if (!this.typing) {
                    this.typing = true
                    this.socket.emit('typing', { userId: this.loggedInUser._id, typing: this.typing })
                    this.timeout = setTimeout(this.timeOutTyping, 5000)
                }
                else {
                    clearTimeout(this.timeout)
                    this.timeout = setTimeout(this.timeOutTyping, 5000)
                }
            },
            async sendMessage() {
                clearTimeout(this.timeout)
                this.timeout = setTimeout(this.timeOutTyping, 5000)
                this.socket.emit("typing", { userId: this.loggedInUser._id, typing: false })

                if (!this.conversation_id) {
                    let res = await this.$axios.$post("/conversations", {
                        "senderId" : this.loggedInUser._id,
                        "receiverId": this.user._id
                    })
                    this.conversation_id = res._id
                    this.socket.emit('new-conversation')
                }

                // new message
                let message = {
                    "sender": this.loggedInUser._id,
                    "text": this.text,
                    "conversationId": this.conversation_id
                };
                this.messages.push(message);
                // Emit send message to server
                this.socket.emit('sendMessage', {
                    senderId: this.loggedInUser._id,
                    receiverId: this.user._id,
                    text: this.text
                });

                this.text = ''

                // Save message to database
                try {
                    await this.$axios.$post('/messages', message);
                } catch (err) {
                    console.log(err)
                }
            },
            closeConversation() {
                this.$store.commit('setUserActive', null)
            }
        },
    }
</script>

<style lang="scss" scoped>
  @import '~/assets/sass/components/_message-panel.scss';
</style>
