<template>
  <div class="app-profile_container">
    <div class="profile-avatar">
      <vs-avatar circle size="70" :loading="is_wait_change">
        <img v-if="loggedInUser.avatar" :src="loggedInUser.avatar" :alt="loggedInUser.first_name + ' ' + loggedInUser.last_name">
        <template v-if="!loggedInUser.avatar" #text>
          {{ loggedInUser.first_name + ' ' + loggedInUser.last_name }}
        </template>
      </vs-avatar>
      <button type="button" class="btn-change" :disabled="is_wait_change" @click="$refs.avatarFileInput.click()">
        <svg width="16" height="16" viewBox="0 0 492.49284 492" xmlns="http://www.w3.org/2000/svg"><path d="m304.140625 82.472656-270.976563 270.996094c-1.363281 1.367188-2.347656 3.09375-2.816406 4.949219l-30.035156 120.554687c-.898438 3.628906.167969 7.488282 2.816406 10.136719 2.003906 2.003906 4.734375 3.113281 7.527344 3.113281.855469 0 1.730469-.105468 2.582031-.320312l120.554688-30.039063c1.878906-.46875 3.585937-1.449219 4.949219-2.8125l271-270.976562zm0 0"/><path d="m476.875 45.523438-30.164062-30.164063c-20.160157-20.160156-55.296876-20.140625-75.433594 0l-36.949219 36.949219 105.597656 105.597656 36.949219-36.949219c10.070312-10.066406 15.617188-23.464843 15.617188-37.714843s-5.546876-27.648438-15.617188-37.71875zm0 0"/></svg>
      </button>
      <input type="file" class="hidden" ref="avatarFileInput" accept="image/*" @change="onchange">
    </div>

    <h1 class="profile-name">{{ loggedInUser.first_name + ' ' + loggedInUser.last_name }}</h1>
    <div class="profile-info">
      <div class="field-control">
        <vs-input label="First name" readonly :value="loggedInUser.first_name"/>
      </div>
      <div class="field-control">
        <vs-input label="Last name" readonly :value="loggedInUser.last_name"/>
      </div>
      <div class="field-control">
        <vs-input label="Email address" readonly :value="loggedInUser.email"/>
      </div>
    </div>
    <div class="profile-setting">
      <div class="label">Setting</div>
      <ul class="setting-list">
        <li class="setting-item">
          <div class="setting-icon language">
            <svg width="20" height="20" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><g><g><polygon points="138.71,137 132.29,137 120.293,197 150.707,197 		"/></g></g><g><g><path d="M381.374,257c6.477,17.399,15.092,31.483,24.626,43.467c9.534-11.984,19.149-26.069,25.626-43.467H381.374z"/></g></g><g><g><path d="M467,91H280.717l38.842,311.679c0.687,12.748-2.798,24.75-11.118,34.146L242.663,512H467c24.814,0,45-20.186,45-45V137C512,112.186,491.814,91,467,91z M467,257h-4.006c-8.535,27.383-22.07,48.81-36.136,65.702c11.019,10.074,22.802,18.338,34.517,27.594c6.46,5.171,7.515,14.604,2.329,21.079c-5.162,6.465-14.632,7.513-21.079,2.329c-12.729-10.047-24.677-18.457-36.625-29.421c-11.948,10.964-22.896,19.374-35.625,29.421c-6.447,5.184-15.917,4.136-21.079-2.329c-5.186-6.475-4.131-15.908,2.329-21.079c11.715-9.256,22.498-17.52,33.517-27.594c-14.066-16.891-26.602-38.318-35.136-65.702H346c-8.291,0-15-6.709-15-15s6.709-15,15-15h45v-15c0-8.291,6.709-15,15-15c8.291,0,15,6.709,15,15v15h46c8.291,0,15,6.709,15,15S475.291,257,467,257z"/></g></g><g><g><path d="M244.164,39.419C241.366,16.948,222.162,0,199.516,0H45C20.186,0,0,20.186,0,45v332c0,24.814,20.186,45,45,45c89.67,0,154.177,0,236.551,0c4.376-5.002,8.044-8.134,8.199-14.663C289.788,405.7,244.367,41.043,244.164,39.419zM183.944,286.707c-7.954,1.637-16.011-3.527-17.651-11.763L156.706,227h-42.411l-9.587,47.944c-1.611,8.115-9.434,13.447-17.651,11.763c-8.115-1.626-13.389-9.521-11.763-17.651l29.999-150C106.699,112.054,112.852,107,120,107h31c7.148,0,13.301,5.054,14.707,12.056l30,150C197.333,277.186,192.06,285.081,183.944,286.707z"/></g></g><g><g><path d="M175.261,452l2.574,20.581c1.716,13.783,10.874,27.838,25.938,34.856c28.428-31.294,11.229-12.362,50.359-55.437H175.261z"/></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>
          </div>
          <h5 class="setting-title">Language</h5>
        </li>
        <li class="setting-item">
          <div class="setting-icon moon">
            <svg width="20" height="20" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><path style="fill:#EFDA45;" d="M492.533,393.514c-45.591,71.117-125.26,118.288-215.959,118.484C136.061,512.303,20.686,398.644,18.987,258.141C17.389,125.938,115.61,16.341,243.014,0.027c2.723-0.349,4.497,2.766,2.842,4.956c-30.719,40.661-48.931,91.286-48.931,146.177c0,134.063,108.676,242.738,242.738,242.738c17.004,0,33.592-1.744,49.607-5.075C491.959,388.264,494.015,391.202,492.533,393.514z"/><path style="fill:#EDC148;" d="M489.276,388.819c2.684-0.558,4.74,2.373,3.261,4.682C446.851,464.773,366.946,512,276.009,512C134.044,512,18.972,396.917,18.972,254.963c0-56.808,18.424-109.306,49.635-151.86c-7.086,23.245-10.961,47.888-11.116,73.419C56.624,319.554,171.5,435.157,314.535,435.151c51.831-0.002,100.076-15.342,140.436-41.74C466.655,392.692,478.106,391.143,489.276,388.819z"/><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>
          </div>
          <h5 class="setting-title flex-none">Dark mode</h5>
          <SwitchMode/>
          <div class="switch-mode" v-show="false">
            <vs-switch color="#4F37A2" v-model="is_dark">
              <template #circle>
                <svg v-if="is_dark" width="12" height="12" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><path style="fill:#EFDA45;" d="M492.533,393.514c-45.591,71.117-125.26,118.288-215.959,118.484C136.061,512.303,20.686,398.644,18.987,258.141C17.389,125.938,115.61,16.341,243.014,0.027c2.723-0.349,4.497,2.766,2.842,4.956c-30.719,40.661-48.931,91.286-48.931,146.177c0,134.063,108.676,242.738,242.738,242.738c17.004,0,33.592-1.744,49.607-5.075C491.959,388.264,494.015,391.202,492.533,393.514z"/><path style="fill:#EDC148;" d="M489.276,388.819c2.684-0.558,4.74,2.373,3.261,4.682C446.851,464.773,366.946,512,276.009,512C134.044,512,18.972,396.917,18.972,254.963c0-56.808,18.424-109.306,49.635-151.86c-7.086,23.245-10.961,47.888-11.116,73.419C56.624,319.554,171.5,435.157,314.535,435.151c51.831-0.002,100.076-15.342,140.436-41.74C466.655,392.692,478.106,391.143,489.276,388.819z"/><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>
                <svg v-else id="Capa_1" width="12" height="12" enable-background="new 0 0 497 497" viewBox="0 0 497 497" xmlns="http://www.w3.org/2000/svg"><g><g fill="#ffd900"><path d="m231.933 49.7c0 9.149 7.417 16.567 16.567 16.567 9.149 0 16.567-7.417 16.567-16.567v-33.133c0-9.15-7.418-16.567-16.567-16.567-9.15 0-16.567 7.417-16.567 16.567z"/><path d="m231.933 480.433c0 9.15 7.417 16.567 16.567 16.567 9.149 0 16.567-7.417 16.567-16.567v-33.133c0-9.149-7.417-16.567-16.567-16.567s-16.567 7.417-16.567 16.567z"/><path d="m447.3 231.933c-9.149 0-16.567 7.417-16.567 16.567s7.417 16.567 16.567 16.567h33.133c9.15 0 16.567-7.417 16.567-16.567s-7.417-16.567-16.567-16.567z"/><path d="m16.567 231.933c-9.15 0-16.567 7.417-16.567 16.567s7.417 16.567 16.567 16.567h33.133c9.149 0 16.567-7.417 16.567-16.567s-7.417-16.567-16.567-16.567z"/><circle cx="248.5" cy="248.5" r="149.1"/><path d="m377.358 96.213c-6.47 6.47-6.47 16.959 0 23.429s16.959 6.47 23.429 0l23.429-23.429c6.47-6.47 6.47-16.959 0-23.429s-16.959-6.47-23.429 0z"/><path d="m72.784 400.787c-6.47 6.47-6.47 16.959 0 23.429s16.959 6.47 23.429 0l23.429-23.429c6.47-6.47 6.47-16.959 0-23.429s-16.959-6.47-23.429 0z"/><path d="m400.787 377.358c-6.47-6.47-16.959-6.47-23.429 0s-6.47 16.959 0 23.429l23.429 23.429c6.47 6.47 16.959 6.47 23.429 0s6.47-16.959 0-23.429z"/><path d="m96.213 72.784c-6.47-6.47-16.959-6.47-23.429 0s-6.47 16.959 0 23.429l23.429 23.429c6.47 6.47 16.959 6.47 23.429 0s6.47-16.959 0-23.429z"/></g><g><path d="m172.427 72.343c-2.943 0-5.736-1.743-6.932-4.632l-6.34-15.306c-1.585-3.827.232-8.214 4.059-9.799 3.827-1.583 8.214.231 9.799 4.059l6.34 15.306c1.585 3.827-.232 8.214-4.059 9.799-.938.388-1.91.573-2.867.573z" fill="#ffa400"/></g><g><path d="m330.922 454.983c-2.943 0-5.735-1.743-6.932-4.632l-6.34-15.306c-1.586-3.827.231-8.214 4.059-9.799 3.827-1.586 8.214.231 9.799 4.059l6.34 15.306c1.586 3.827-.231 8.214-4.059 9.799-.938.389-1.911.573-2.867.573z" fill="#ffa400"/></g><g><path d="m64.843 179.944c-.957 0-1.929-.184-2.867-.573l-15.306-6.34c-3.827-1.585-5.644-5.972-4.059-9.799s5.974-5.647 9.799-4.059l15.306 6.34c3.827 1.585 5.644 5.972 4.059 9.799-1.196 2.888-3.989 4.632-6.932 4.632z" fill="#ffa400"/></g><g><path d="m447.483 338.44c-.957 0-1.929-.184-2.867-.573l-15.306-6.34c-3.827-1.585-5.645-5.972-4.058-9.799 1.586-3.826 5.975-5.646 9.799-4.059l15.306 6.34c3.827 1.585 5.645 5.972 4.059 9.799-1.197 2.887-3.989 4.632-6.933 4.632z" fill="#ffa400"/></g><g><path d="m49.56 338.44c-2.943 0-5.736-1.743-6.932-4.632-1.585-3.827.233-8.214 4.059-9.799l15.306-6.34c3.826-1.584 8.214.231 9.799 4.059 1.585 3.827-.232 8.214-4.059 9.799l-15.306 6.34c-.938.388-1.91.573-2.867.573z" fill="#ffa400"/></g><g><path d="m432.2 179.944c-2.943 0-5.735-1.743-6.932-4.632-1.586-3.827.231-8.214 4.059-9.799l15.306-6.34c3.826-1.585 8.214.232 9.799 4.059 1.586 3.827-.231 8.214-4.059 9.799l-15.306 6.34c-.938.389-1.911.573-2.867.573z" fill="#ffa400"/></g><g><path d="m166.121 454.983c-.956 0-1.929-.184-2.867-.573-3.827-1.585-5.644-5.972-4.059-9.799l6.34-15.306c1.584-3.826 5.973-5.647 9.799-4.059 3.827 1.585 5.644 5.972 4.059 9.799l-6.34 15.306c-1.196 2.888-3.989 4.632-6.932 4.632z" fill="#ffa400"/></g><g><path d="m324.616 72.343c-.957 0-1.929-.184-2.867-.573-3.827-1.585-5.645-5.972-4.059-9.799l6.34-15.306c1.586-3.826 5.976-5.646 9.799-4.059 3.827 1.585 5.645 5.972 4.059 9.799l-6.34 15.306c-1.196 2.888-3.988 4.632-6.932 4.632z" fill="#ffa400"/></g><path d="m248.5 99.4c-3.87 0-7.705.148-11.5.437 76.972 5.871 137.6 70.187 137.6 148.663s-60.628 142.792-137.6 148.663c3.795.289 7.63.438 11.5.438 82.346 0 149.1-66.754 149.1-149.1s-66.754-149.101-149.1-149.101z" fill="#fb0"/><path d="m49.7 231.933h-23c9.149 0 16.567 7.417 16.567 16.567 0 9.149-7.417 16.567-16.567 16.567h23c9.149 0 16.567-7.417 16.567-16.567 0-9.149-7.418-16.567-16.567-16.567z" fill="#fb0"/><path d="m480.433 231.933h-23c9.15 0 16.567 7.417 16.567 16.567 0 9.149-7.417 16.567-16.567 16.567h23c9.15 0 16.567-7.417 16.567-16.567 0-9.149-7.417-16.567-16.567-16.567z" fill="#fb0"/><path d="m248.5 0c-4.471 0-8.52 1.779-11.5 4.657 3.119 3.013 5.067 7.231 5.067 11.91v33.133c0 4.679-1.948 8.897-5.067 11.909 2.98 2.878 7.029 4.657 11.5 4.657 9.149 0 16.567-7.417 16.567-16.567v-33.132c0-9.15-7.418-16.567-16.567-16.567z" fill="#fb0"/><path d="m248.5 430.733c-4.471 0-8.52 1.779-11.5 4.657 3.119 3.013 5.067 7.23 5.067 11.909v33.133c0 4.679-1.948 8.897-5.067 11.909 2.98 2.878 7.029 4.657 11.5 4.657 9.149 0 16.567-7.417 16.567-16.567v-33.131c0-9.15-7.418-16.567-16.567-16.567z" fill="#fb0"/><path d="m424.216 72.784c-6.401-6.401-16.73-6.458-23.214-.194.07.068.145.125.214.194 6.47 6.47 6.47 16.959 0 23.429l-23.429 23.429c-.069.069-.145.126-.214.194 6.485 6.264 16.814 6.207 23.214-.194l23.429-23.429c6.47-6.47 6.47-16.959 0-23.429z" fill="#fb0"/><path d="m424.216 400.787-23.429-23.429c-6.401-6.401-16.73-6.458-23.214-.194.07.067.145.125.214.194l23.429 23.429c6.47 6.47 6.47 16.959 0 23.429-.069.069-.145.126-.214.194 6.484 6.265 16.813 6.207 23.214-.194 6.47-6.47 6.47-16.959 0-23.429z" fill="#fb0"/><path d="m119.642 96.213-23.429-23.429c-6.393-6.393-16.703-6.457-23.189-.216.078.075.163.139.239.216l23.429 23.429c6.47 6.47 6.47 16.959 0 23.429-.077.077-.161.141-.239.216 6.486 6.241 16.797 6.176 23.189-.216 6.469-6.47 6.469-16.96 0-23.429z" fill="#fb0"/><path d="m119.642 377.358c-6.393-6.393-16.703-6.457-23.189-.216.078.075.162.139.239.216 6.47 6.47 6.47 16.959 0 23.429l-23.429 23.429c-.077.077-.161.141-.239.216 6.486 6.241 16.797 6.176 23.189-.216l23.429-23.429c6.469-6.47 6.469-16.959 0-23.429z" fill="#fb0"/></g></svg>
              </template>
            </vs-switch>
          </div>
        </li>
      </ul>

    </div>
    <div class="profile-account">
      <div class="label">My Account</div>
      <span class="joined">Joined <strong class="date">{{ $dayjs(loggedInUser.created_at).format('DD MM YYYY') }}</strong></span>
      <button type="button" class="btn-logout" @click="handleLogout">Log Out</button>
    </div>
  </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        data: () => ({
            is_wait_change: false
        }),
        computed: {
            ...mapGetters([ 'loggedInUser' ]),
            is_dark: {
                get() {
                    return this.$store.state.is_dark
                },
                set(value) {
                    this.$store.commit('setThemeMode', value)
                }
            }
        },
        watch: {
            is_dark(value) {
                if (value)
                    this.$colorMode.preference = 'dark'
                else this.$colorMode.preference = 'light'
            }
        },
        methods: {
            async onchange() {
                let file = this.$refs.avatarFileInput.files[0]
                this.is_wait_change = true
                let formData = new FormData();
                formData.append("avatar", file)
                let res = await this.$axios.$put(`/user/${this.loggedInUser._id}`, formData)
                // await this.$auth.fetchUser() // update user by callback $auth.fetchUser
                this.$auth.setUser(res.user) // update user by $auth.setUser
                this.$refs.avatarFileInput.value = null
                this.is_wait_change = false
            },
            async handleLogout() {
                this.$nuxt.$emit('offline', {userId: this.loggedInUser._id})
                // this.socket.emit('offline', { userId: this.loggedInUser._id })
                await this.$auth.logout();
            },
        }
    }
</script>

<style lang="scss" scoped>
  .app-profile_container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-top: 10px;
    overflow-x: hidden;
    overflow-y: auto;
    text-align: center;

    // app left side scroll bar style
    &::-webkit-scrollbar {
      //display: none;
      width: 5px; /* width of the entire scrollbar */
    }
    &::-webkit-scrollbar-track {
      background: transparent;        /* color of the tracking area */
    }
    &::-webkit-scrollbar-thumb {
      background-color: $light-gray;    /* color of the scroll thumb */
      border-radius: 20px;       /* roundness of the scroll thumb */
    }

    .profile-avatar {
      position: relative;
      margin: 0 auto;

      .btn-change {
        position: absolute;
        bottom: -5px;
        right: -5px;
        padding: 5px;
        border-radius: 50%;
        background-color: $gainboro;
        z-index: 999;

        svg {
          fill: $primary;
        }
      }
    }

    .profile-name {
      @include font-text($font-20, bold, null);
      line-height: 2.5;
    }

    .profile-info {
      width: 100%;
      padding: 10px 15px;

      .field-control {
        padding: 15px 0;
      }
    }

    .profile-setting {
      width: 100%;
      padding: 0 15px;
      text-align: left;
      .label {
        @include font-text($font-14, normal, $light-gray)
      }

      .setting-list {
        width: 100%;

        .setting-item {
          display: flex;
          align-items: center;
          margin-top: 10px;
          cursor: pointer;

          .setting-icon {
            padding: 10px;
            border-radius: 50%;

            &.language {
              background-color: rgba($primary, .5);
              svg {
                fill: $light;
              }
            }

            &.moon {
              background-color: rgba($gainboro, .5);
            }
          }

          .setting-title {
            margin: 0 15px;
            @include font-text($font-14, normal, null);
          }

          .switch-mode {
            margin-left: auto;
          }

        }

      }
    }

    .profile-account {
      width: 100%;
      padding: 20px 15px;
      text-align: left;
      margin-bottom: auto;
      .label {
        @include font-text($font-14, normal, $dark-gray)
      }

      .joined {
        @include font-text($font-14, normal, $dark-gray);
        line-height: 2.5;
        .date {
          @include font-text($font-16, normal, $color)
        }
      }

      .btn-logout {
        display: block;
        margin-top: 20px;
        @include font-text($font-16, 600, $danger);
        &:hover {
          text-decoration: underline;
        }
      }

    }

  }
</style>
