<template>
  <main>
    <div class="auth-wrapper">
      <div class="auth-container">

        <div class="auth-form">
          <div class="auth-logo">
            <div class="logo" data-text="Starship🚀">Starship🚀</div>
            <div class="auth-title">Sign in</div>
            <div class="auth-subtitle">Welcome back. <br> You've been missed!</div>
          </div>

          <ValidationObserver v-slot="{ invalid }">
            <form @submit.prevent="handleSignIn">

              <ValidationProvider rules="required">
                <div class="form-group mb-6">
                  <vs-input v-model="username" label-placeholder="username, email" autocomplete="off" requred/>
                </div>
              </ValidationProvider>

              <ValidationProvider rules="required">
                <div class="form-group mb-6">
                  <vs-input type="password" v-model="password" label-placeholder="password" requred/>
                </div>
              </ValidationProvider>

              <div class="form-action">
                <vs-button class="btn-signin" size="large" dark gradient :disabled="invalid" :loading="is_loading">Sign In</vs-button>
              </div>

            </form>
          </ValidationObserver>

          <div class="auth-text">
            <p class="text">Don't have an account?  <nuxt-link to="/signup" class="link"> Sign up</nuxt-link></p>
          </div>

        </div>
      </div>
    </div>
  </main>
</template>

<script>
  export default {
      layout: "empty",
      middleware: 'guest',
      data: () => ({
        username: '',
        password: '',
        is_loading: false,
      }),
      methods: {
        async handleSignIn() {
          this.is_loading = true
          try {
              await this.$auth.loginWith('local', {
                  data: {
                      email: this.username,
                      password: this.password
                  }
              })
              .then(() => {
                this.$router.push('/messages')
                this.is_loading = false
              })
          }
          catch (error) {
              this.error = error.response.data;
              this.is_loading = false
              this.$vs.notification({
                color: 'danger',
                position: 'top-center',
                title: 'Incorrect Credentials',
                text: `Verify your user name and password and try again.`
              })
          }
        }
      }
  }
</script>

<style lang="scss">
  @import '~/assets/sass/pages/_auth.scss';
</style>
