<template>
  <main>
    <div class="auth-wrapper">
      <div class="auth-container">
        <div class="auth-form">
          <div class="auth-logo">
            <div class="logo">Starship🚀</div>
            <div class="auth-title">Sign up</div>
            <div class="auth-subtitle">It's easier to sign up now</div>
          </div>

          <ValidationObserver v-slot="{ invalid }">
            <form @submit.prevent="handleSignUp">

              <ValidationProvider name="first_name" rules="required" v-slot="{ errors }">
                <div class="from-group mb-7">
                  <vs-input v-model="first_name" label="First name" placeholder="Tuong" autocomplete="off">
                    <template #message-danger>{{ errors[0] }}</template>
                  </vs-input>
                </div>
              </ValidationProvider>

              <ValidationProvider name="last_name" rules="required" v-slot="{ errors }">
                <div class="from-group mb-7">
                  <vs-input v-model="last_name" label="Last name" placeholder="Mengleang" autocomplete="off">
                    <template #message-danger>{{ errors[0] }}</template>
                  </vs-input>
                </div>
              </ValidationProvider>

              <ValidationProvider name="email" rules="required|email" v-slot="{ errors }">
                <div class="form-group mb-7">
                  <vs-input v-model="email" label="Email" placeholder="example@gmail.com" autocomplete="off">
                    <template #message-danger>{{ errors[0] }}</template>
                  </vs-input>
                </div>
              </ValidationProvider>

              <ValidationProvider name="password" rules="required|min:4" v-slot="{ errors }">
                <div class="form-group mb-7">
                  <vs-input type="password" v-model="password" label="password" placeholder="password" autocomplete="off">
                    <template #message-danger>{{ errors[0] }}</template>
                  </vs-input>
                </div>
              </ValidationProvider>

              <ValidationProvider name="confirm" rules="required|password:@password" v-slot="{ errors }">
                <div class="form-group mb-5">
                  <vs-input type="password" v-model="confirm_password" label="confirm password" placeholder="confirm password" autocomplete="off">
                    <template #message-danger>{{ errors[0] }}</template>
                  </vs-input>
                </div>
              </ValidationProvider>

              <div class="form-action">
                <vs-button class="btn-signin" size="large" dark gradient :disabled="invalid" :loading="loading">Sign Up</vs-button>
              </div>

            </form>
          </ValidationObserver>

          <div class="auth-text">
            <p class="text">Already have an account? <nuxt-link to="/signin" class="link"> Sign in</nuxt-link></p>
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
        colorMode: 'light',
        data: () => ({
            loading: false,
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            confirm_password: ''
        }),
        methods: {
            async handleSignUp() {
                this.loading = true
                try {
                    await this.$axios.post('/auth/register', {
                        first_name: this.first_name,
                        last_name: this.last_name,
                        username: this.username,
                        email: this.email,
                        password: this.password
                    })
                    await this.$router.push('/signin')
                    this.$store.commit("setActive", 1)
                }
                catch (error) {
                    this.loading = false
                    this.$vs.notification({
                        color: 'danger',
                        position: 'top-center',
                        title: 'Sign up failed',
                        text: error.response.data.message
                    })
                    // this.error = error.response.data.message
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
  @import '~/assets/sass/pages/_auth.scss';
</style>
