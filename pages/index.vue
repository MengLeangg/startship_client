<template>
  <div class="w-full h-screen flex items-center justify-center">
    <nuxt-link to="/signin"><vs-button border>Sign in</vs-button></nuxt-link>
    <nuxt-link to="/signup"><vs-button border success>Sign up</vs-button></nuxt-link>
  </div>
</template>

<script>
  export default {
      layout: "empty",
      middleware: 'guest',
  }
</script>
