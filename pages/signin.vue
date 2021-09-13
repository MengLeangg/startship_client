<template>
  <div class="auth-wrapper">
    <div class="auth-container">
      <div class="auth-form">
        <div class="auth-logo">
          <div class="logo">Starship🤟</div>
          <div class="auth-title">Sign in</div>
        </div>
        <form @submit="handleSignIn">

          <div class="form-group">
            <vs-input v-model="username" placeholder="email address"/>
          </div>

          <div class="form-group">
            <vs-input type="password" v-model="password" placeholder="password"/>
          </div>

          <button type="submit" class="btn">Sign in</button>

        </form>

        <div class="auth-text">
          <p class="text">Don't have an account?  <nuxt-link to="/register" class="link"> Sign up</nuxt-link></p>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  export default {
      data: () => ({
          username: '',
          password: '',
      }),
      methods: {
          handleSignIn() {

          }
      }
  }
</script>

<style lang="scss">
  @import '~/assets/sass/auth.scss';
</style>
