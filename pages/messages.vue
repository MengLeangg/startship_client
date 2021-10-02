<template>
  <div class="app-container">
    <!--- app left side --->
    <div class="app-left">
      <div class="app-left-header">
        <!--- logo app --->
        <div class="app-logo">
          <h1 class="logo-text">Starship🚀</h1>
        </div>
        <div class="app-left-nav">
          <div class="search-wrap">
            <span class="search-icon">
              <svg width="20" height="20" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><g><g><path d="M225.474,0C101.151,0,0,101.151,0,225.474c0,124.33,101.151,225.474,225.474,225.474c124.33,0,225.474-101.144,225.474-225.474C450.948,101.151,349.804,0,225.474,0z M225.474,409.323c-101.373,0-183.848-82.475-183.848-183.848S124.101,41.626,225.474,41.626s183.848,82.475,183.848,183.848S326.847,409.323,225.474,409.323z"/></g></g><g><g><path d="M505.902,476.472L386.574,357.144c-8.131-8.131-21.299-8.131-29.43,0c-8.131,8.124-8.131,21.306,0,29.43l119.328,119.328c4.065,4.065,9.387,6.098,14.715,6.098c5.321,0,10.649-2.033,14.715-6.098C514.033,497.778,514.033,484.596,505.902,476.472z"/></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>
            </span>
            <input type="text" v-model="search" @keypress.enter="findUser" placeholder="Search you friend">
          </div>

          <!--          <h1 class="title-text">Recent</h1>-->
<!--          <div class="group-button">-->
<!--            <button type="button" class="btn search">-->
<!--              <svg width="15" height="15" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><g><g><path d="M225.474,0C101.151,0,0,101.151,0,225.474c0,124.33,101.151,225.474,225.474,225.474c124.33,0,225.474-101.144,225.474-225.474C450.948,101.151,349.804,0,225.474,0z M225.474,409.323c-101.373,0-183.848-82.475-183.848-183.848S124.101,41.626,225.474,41.626s183.848,82.475,183.848,183.848S326.847,409.323,225.474,409.323z"/></g></g><g><g><path d="M505.902,476.472L386.574,357.144c-8.131-8.131-21.299-8.131-29.43,0c-8.131,8.124-8.131,21.306,0,29.43l119.328,119.328c4.065,4.065,9.387,6.098,14.715,6.098c5.321,0,10.649-2.033,14.715-6.098C514.033,497.778,514.033,484.596,505.902,476.472z"/></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>-->
<!--            </button>-->
<!--            <button type="button" class="btn add">-->
<!--              <svg width="15" height="15" viewBox="0 0 426.66667 426.66667" xmlns="http://www.w3.org/2000/svg"><path d="m405.332031 192h-170.664062v-170.667969c0-11.773437-9.558594-21.332031-21.335938-21.332031-11.773437 0-21.332031 9.558594-21.332031 21.332031v170.667969h-170.667969c-11.773437 0-21.332031 9.558594-21.332031 21.332031 0 11.777344 9.558594 21.335938 21.332031 21.335938h170.667969v170.664062c0 11.777344 9.558594 21.335938 21.332031 21.335938 11.777344 0 21.335938-9.558594 21.335938-21.335938v-170.664062h170.664062c11.777344 0 21.335938-9.558594 21.335938-21.335938 0-11.773437-9.558594-21.332031-21.335938-21.332031zm0 0"/></svg>-->
<!--            </button>-->
<!--          </div>-->
        </div>
      </div>

      <!--- chat list --->
      <ul class="chat-list-wrapper" style="margin-left: -10px; margin-right: -10px">
        <li v-if="results.length > 0">
          <div v-show="is_wait_find" v-for="n in 2" :key="n">
            <FriendLoading/>
          </div>
          <div v-for="(user, $i) in results" :key="$i">
            <User :senderId="loggedInUser._id" :receiverId="user._id" :avatar="user.avatar" :full_name="user.full_name"/>
          </div>
        </li>
        <li v-else v-for="conversation in conversations" :key="conversation._id" @click="openChat(conversation)">
          <Friend ref="friend" :conversation="conversation" :current_user="loggedInUser"/>
        </li>
      </ul>

    </div>

    <!--- app main side --->
    <div class="app-main empty" v-if="!current_chat">
      <div class="text">Select a chat to start messaging</div>
    </div>
    <div class="app-main" v-else>
      <div class="app-main-header">
        <!--- app main user chat with --->
        <div class="app-main-chat-head">
          <vs-avatar class="flex-none" size="50" circle :writing="display_typing && display_typing.userId === friend_chat._id && display_typing.typing">
            <img :src="friend_chat.avatar" alt="">
          </vs-avatar>
          <div class="app-main-chat-info">
            <h1 class="chat-with_name">{{ friend_chat.first_name + ' ' + friend_chat.last_name }}</h1>
            <p class="chat-with_online">{{ friend_chat.online ? 'Active now' : 'Online ' + $dayjs(friend_chat.online_at).fromNow() }}</p>
          </div>
        </div>
        <!--- app main user chat with actions video-call call-voice or setting --->
        <div class="app-main-chat-actions" v-show="false">
          <button type="button" class="btn voice-call">
            <svg width="15" height="15" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 513.64 513.64" style="enable-background:new 0 0 513.64 513.64;" xml:space="preserve"><g><g><path d="M499.66,376.96l-71.68-71.68c-25.6-25.6-69.12-15.359-79.36,17.92c-7.68,23.041-33.28,35.841-56.32,30.72c-51.2-12.8-120.32-79.36-133.12-133.12c-7.68-23.041,7.68-48.641,30.72-56.32c33.28-10.24,43.52-53.76,17.92-79.36l-71.68-71.68c-20.48-17.92-51.2-17.92-69.12,0l-48.64,48.64c-48.64,51.2,5.12,186.88,125.44,307.2c120.32,120.32,256,176.641,307.2,125.44l48.64-48.64C517.581,425.6,517.581,394.88,499.66,376.96z"/></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>
          </button>
          <button type="button" class="btn video-call">
            <svg width="15" height="15" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 467.968 467.968" style="enable-background:new 0 0 467.968 467.968;" xml:space="preserve"><g><g><path d="M264.704,96.512H51.2c-28.16,0-51.2,23.04-51.2,51.2v172.544c0,28.16,23.04,51.2,51.2,51.2h213.504c28.16,0,51.2-23.04,51.2-51.2V147.712C315.904,119.04,292.864,96.512,264.704,96.512z"/></g></g><g><g><path d="M430.08,124.672c-3.072,0.512-6.144,2.048-8.704,3.584l-79.872,46.08V293.12l80.384,46.08c14.848,8.704,33.28,3.584,41.984-11.264c2.56-4.608,4.096-9.728,4.096-15.36V154.368C467.968,135.424,450.048,120.064,430.08,124.672z"/></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>
          </button>
          <button type="button" class="btn more">
            <svg width="15" height="15" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 426.667 426.667" style="enable-background:new 0 0 426.667 426.667;" xml:space="preserve"><g><g><circle cx="42.667" cy="213.333" r="42.667"/></g></g><g><g><circle cx="213.333" cy="213.333" r="42.667"/></g></g><g><g><circle cx="384" cy="213.333" r="42.667"/></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>
          </button>
        </div>

      </div>

      <!--- chat list --->
      <ul class="chat-wrapper" ref="chatWrapper" v-chat-scroll="{ always: true, smooth: true }">
        <!--- message --->
        <li class="message-wrapper" v-for="(message, $i) in messages" :key="$i" :class="{ 'reverse' : message.sender === loggedInUser._id }">
          <!--- message avatar --->
          <vs-avatar v-show="message.sender !== loggedInUser._id" class="message-avatar" circle size="35">
            <img :src="message.sender === loggedInUser._id ? loggedInUser.avatar : friend_chat.avatar"
                 :alt="message.sender === loggedInUser._id ? loggedInUser.first_name + ' ' + loggedInUser.last_name : friend_chat.first_name + ' ' + friend_chat.last_name"
            >
          </vs-avatar>
          <!--- message box content --->
          <div class="message-box-wrapper">
            <div class="message-box" v-html="message.text"></div>
            <span class="message-date">{{ $dayjs(message.createdAt).fromNow() }}</span>
          </div>
        </li>

      </ul>

      <!--- chat input box --->
      <div class="chat-input_wrapper">
        <form @submit.prevent="handleSendMessage">
          <div class="chat-input">
            <input v-model="text" type="text" @keydown="typingMessage" class="chat-text" placeholder="Your message...">
            <div class="chat-input_actions">
              <vs-tooltip not-arrow>
                <button type="button" class="btn emoji">
                  <svg width="18" height="18" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><g><g><path d="M437.019,74.981C388.668,26.629,324.38,0,256,0S123.332,26.629,74.981,74.981C26.628,123.332,0,187.62,0,256s26.628,132.668,74.981,181.019C123.332,485.371,187.62,512,256,512s132.668-26.629,181.019-74.981C485.372,388.668,512,324.38,512,256S485.372,123.332,437.019,74.981z M256,481.524c-124.354,0-225.524-101.17-225.524-225.524S131.646,30.476,256,30.476S481.524,131.646,481.524,256S380.354,481.524,256,481.524z"/></g></g><g><g><path d="M200.622,188.396c-24.953-24.955-65.556-24.953-90.509,0c-5.951,5.95-5.951,15.599,0,21.55c5.952,5.95,15.601,5.95,21.551,0c13.072-13.071,34.34-13.07,47.41,0c2.976,2.976,6.875,4.464,10.774,4.464s7.8-1.488,10.774-4.464C206.573,203.995,206.573,194.347,200.622,188.396z"/></g></g><g><g><path d="M401.884,188.396c-24.953-24.953-65.556-24.955-90.509,0c-5.951,5.95-5.951,15.599,0,21.55c5.952,5.95,15.601,5.95,21.551,0c13.07-13.071,34.338-13.072,47.41,0c2.976,2.976,6.875,4.464,10.774,4.464s7.8-1.488,10.774-4.464C407.835,203.995,407.835,194.347,401.884,188.396z"/></g></g><g><g><path d="M391.111,267.175H120.889c-8.416,0-15.238,6.823-15.238,15.238c0,82.902,67.447,150.349,150.349,150.349s150.349-67.447,150.349-150.349C406.349,273.997,399.527,267.175,391.111,267.175z M256,402.286c-60.938,0-111.402-45.703-118.909-104.635H374.91C367.402,356.583,316.938,402.286,256,402.286z"/></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>
                </button>
                <template #tooltip>
                  Emoji
                </template>
              </vs-tooltip>

              <vs-tooltip not-arrow>
                <button type="button" class="btn photo">
                  <svg width="18" height="18" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 298.73 298.73" style="enable-background:new 0 0 298.73 298.73;" xml:space="preserve"><g><path d="M264.959,9.35H33.787C15.153,9.35,0,24.498,0,43.154v212.461c0,18.634,15.153,33.766,33.787,33.766h231.171c18.634,0,33.771-15.132,33.771-33.766V43.154C298.73,24.498,283.593,9.35,264.959,9.35z M193.174,59.623c18.02,0,32.634,14.615,32.634,32.634s-14.615,32.634-32.634,32.634c-18.025,0-32.634-14.615-32.634-32.634S175.149,59.623,193.174,59.623z M254.363,258.149H149.362H49.039c-9.013,0-13.027-6.521-8.964-14.566l56.006-110.93c4.058-8.044,11.792-8.762,17.269-1.605l56.316,73.596c5.477,7.158,15.05,7.767,21.386,1.354l13.777-13.951c6.331-6.413,15.659-5.619,20.826,1.762l35.675,50.959C266.487,252.16,263.376,258.149,254.363,258.149z"/></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>
                </button>
                <template #tooltip>
                  Photos
                </template>
              </vs-tooltip>

              <vs-tooltip not-arrow>
                <button type="submit" class="btn send">
                  <svg width="18" height="18" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><g><g><path d="M481.508,210.336L68.414,38.926c-17.403-7.222-37.064-4.045-51.309,8.287C2.86,59.547-3.098,78.551,1.558,96.808L38.327,241h180.026c8.284,0,15.001,6.716,15.001,15.001c0,8.284-6.716,15.001-15.001,15.001H38.327L1.558,415.193c-4.656,18.258,1.301,37.262,15.547,49.595c14.274,12.357,33.937,15.495,51.31,8.287l413.094-171.409C500.317,293.862,512,276.364,512,256.001C512,235.638,500.317,218.139,481.508,210.336z"/></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>
                </button>
                <template #tooltip>
                  Send
                </template>
              </vs-tooltip>

            </div>
          </div>
        </form>
      </div>

    </div>

    <!--- app right side --->
    <div class="app-right">
      <div class="app-profile-wrapper">
        <!-- user profile avatar -->
        <vs-avatar class="app-profile-avatar" :loading="is_wait_avatar" history history-gradient circle size="70" primary>
          <img v-if="loggedInUser.avatar" :src="loggedInUser.avatar" :alt="loggedInUser.first_name + ' ' + loggedInUser.last_name">
          <template v-if="!loggedInUser.avatar" #text>
            {{ loggedInUser.first_name + ' ' + loggedInUser.last_name }}
          </template>
          <button type="button" class="app-profile-change" :disabled="is_wait_avatar" @click="$refs.avatarFileInput.click()">
            <svg width="16" height="16" viewBox="0 0 492.49284 492" xmlns="http://www.w3.org/2000/svg"><path d="m304.140625 82.472656-270.976563 270.996094c-1.363281 1.367188-2.347656 3.09375-2.816406 4.949219l-30.035156 120.554687c-.898438 3.628906.167969 7.488282 2.816406 10.136719 2.003906 2.003906 4.734375 3.113281 7.527344 3.113281.855469 0 1.730469-.105468 2.582031-.320312l120.554688-30.039063c1.878906-.46875 3.585937-1.449219 4.949219-2.8125l271-270.976562zm0 0"/><path d="m476.875 45.523438-30.164062-30.164063c-20.160157-20.160156-55.296876-20.140625-75.433594 0l-36.949219 36.949219 105.597656 105.597656 36.949219-36.949219c10.070312-10.066406 15.617188-23.464843 15.617188-37.714843s-5.546876-27.648438-15.617188-37.71875zm0 0"/></svg>
          </button>
        </vs-avatar>
        <input type="file" class="hidden" ref="avatarFileInput" accept="image/*" @change="onchange">
        <h1 class="app-profile-name">{{ loggedInUser.first_name + ' ' + loggedInUser.last_name }}</h1>
      </div>

      <!-- Log Out button -->
      <vs-button class="btn-logout" circle danger border :loading="is_wait_logout" @click="handleLogout">
        <svg version="1.1" id="Layer_1" width="18" height="18" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><g><g><path d="M505.664,243.739l-54.783-38.622c-9.926-6.997-23.645,0.128-23.645,12.26v23.622H164.196c-8.284,0-15.001,6.716-15.001,15.001S155.912,271,164.196,271h263.038v23.621c0,12.212,13.792,19.204,23.644,12.26l54.783-38.622C514.027,262.365,514.196,249.767,505.664,243.739z"/></g></g><g><g><path d="M430.471,352.317c-7.169-4.146-16.347-1.698-20.496,5.474c-35.236,60.916-101.103,101.811-176.372,101.811c-112.266,0-203.602-91.336-203.602-203.602S121.337,52.398,233.603,52.398c75.319,0,141.156,40.933,176.371,101.809c4.148,7.172,13.328,9.619,20.496,5.474c7.171-4.148,9.621-13.325,5.474-20.496C395.418,69.127,319.729,22.397,233.603,22.397C104.49,22.397,0,126.876,0,256c0,129.113,104.479,233.603,233.603,233.603c86.163,0,161.833-46.763,202.342-116.79C440.092,365.642,437.642,356.466,430.471,352.317z"/></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>
        Log Out
      </vs-button>

    </div>
  </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        middleware: 'auth',
        data: () => ({
            is_wait_logout: false,
            conversations: [],
            current_chat: null,
            friend_chat: null,
            messages: [],
            text: '',
            socket: null,
            arrivalMessage: null,
            // user typing
            typing: false,
            timeout: undefined,
            display_typing: null,
            is_wait_avatar: false,
            // find user
            search: '',
            is_wait_find: false,
            results: [],
            // user online
        }),
        computed: {
            ...mapGetters([ 'isAuthenticated', 'loggedInUser' ])
        },
        created() {
            this.$nuxt.$on('selectChat', (friend) => {
                this.friend_chat = friend;
            })
        },
        mounted() {
            this.socket = this.$nuxtSocket({ channel: '/', persist: true });

            // user online
            this.socket.emit("login", { userId: this.loggedInUser._id });
            this.socket.on("online", () => {
                this.$nuxt.$emit('refresh-conversation');
            })
            this.socket.on("offline", () => {
                this.$nuxt.$emit('refresh-conversation');
            })

            // socket on event from server
            this.socket.emit("addUser", this.loggedInUser._id)

            // this.socket.on("getUsers", users => {
            //     // console.log("getUsers ::", users)
            //     this.$nuxt.$emit('refresh');
            // })

            // Get Typing from Server-side
            this.socket.on("displayTyping", data => {
                // console.log("displayTyping data:", data);
                this.display_typing = data
            })

            // getMessage
            this.socket.on("getMessage", data => {
                this.arrivalMessage = {
                    sender: data.senderId,
                    text: data.text,
                    createdAt: Date.now()
                }
                this.arrivalMessage && this.current_chat.members.includes(this.arrivalMessage.sender) && this.messages.push(this.arrivalMessage)
                // console.log("arrivalMessage :", this.arrivalMessage)
                // this.$store.commit("setLastChat", this.arrivalMessage)
            })
        },
        methods: {
            async openChat(conversation) {
                this.messages = [];
                this.current_chat = conversation
                this.messages = await this.$axios.$get(`/messages/${conversation._id}`)
            },
            timeOutTyping() {
                this.typing = false
                this.socket.emit("typing", { userId: this.loggedInUser._id, typing: this.typing })
            },
            typingMessage() {
                if (!this.typing) {
                    this.typing = true
                    this.socket.emit("typing", { userId: this.loggedInUser._id, typing: this.typing })
                    this.timeout = setTimeout(this.timeOutTyping, 5000)
                }
                else {
                    clearTimeout(this.timeout)
                    this.timeout = setTimeout(this.timeOutTyping, 5000)
                }
            },
            async handleSendMessage() {
                if (this.text) {
                    clearTimeout(this.timeout)
                    this.timeout = setTimeout(this.timeOutTyping, 5000)
                    this.socket.emit("typing", { userId: this.loggedInUser._id, typing: false })
                    const message = {
                        "sender": this.loggedInUser._id,
                        "text": this.text,
                        "conversationId": this.current_chat._id
                    }

                    this.socket.emit("sendMessage", {
                        senderId: this.loggedInUser._id,
                        receiverId: this.friend_chat._id,
                        text: this.text
                    })

                    try {
                        const res = await this.$axios.$post('/messages', message);
                        this.messages.push(res)
                        this.text = ''
                    } catch (err) {
                        console.log(err)
                    }
                }
            },
            async onchange() {
                let file = this.$refs.avatarFileInput.files[0]
                this.is_wait_avatar = true
                let formData = new FormData();
                formData.append("avatar", file)
                let res = await this.$axios.$put(`/user/${this.loggedInUser._id}`, formData)
                // await this.$auth.fetchUser() // update user by callback $auth.fetchUser
                this.$auth.setUser(res.user) // update user by $auth.setUser
                this.$refs.avatarFileInput.value = null
                this.is_wait_avatar = false
            },
            async findUser() {
                this.is_wait_find = true
                let results = await this.$axios.post("/user/find", {
                    search: this.search
                })
                this.results = results.data
                this.is_wait_find = false
                // console.log("result :", results.data)
            },
            async handleLogout() {
                this.is_wait_logout = true
                this.socket.emit('offline', { userId: this.loggedInUser._id })
                await this.$auth.logout();
            },
        },
        async fetch() {
            this.conversations = await this.$axios.$get(`/conversations/${this.loggedInUser._id}`)
        },
    }
</script>

<style lang="scss" scoped>
  @import '~/assets/sass/pages/_messages.scss';
</style>
