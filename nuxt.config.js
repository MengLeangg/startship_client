export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'starship',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'vuesax/dist/vuesax.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    // https://vuesax.com/
    "~/plugins/vuesax.js",
    // https://vee-validate.logaretm.com/v3
    "~/plugins/vee-validate.js",
    "~/plugins/vue-chat-scroll.js"
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    // https://github.com/nuxt-community/style-resources-module
    '@nuxtjs/style-resources',
    // https://google-fonts.nuxtjs.org/
    '@nuxtjs/google-fonts',
  ],

  styleResources: {
    scss: [
      './assets/sass/utilities/_variables.scss', // sass variable
      './assets/sass/utilities/_mixins.scss', // sass mixin method
      './assets/sass/utilities/_breakpoints.scss', // sass responsive breakpoint
      './assets/sass/_main.scss' // use underscore "_" & also file extension ".scss"
    ]
  },

  // Google fonts
  googleFonts: {
    families: {
      Poppins: {
        wght: [100, 200, 300, 400, 500, 600, 700],
        ital: [100]
      },
      Dangrek: {
        wght: [100, 200, 300, 400, 500, 600, 700],
        ital: [100]
      }
    }
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/proxy',
    // https://nuxt-socket-io.netlify.app/
    'nuxt-socket-io',
    '@nuxtjs/dayjs',
    'cookie-universal-nuxt',
  ],

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: '/auth/login', method: 'POST', propertyName: 'token' },
          logout: false,
          user: { url: '/user/me', method: 'GET', propertyName: 'user' },
          tokenRequired: true,
          tokenType: 'Bearer',
          csrf: {
            url: '/auth/login'
          }
        }
      }
    },
    redirect: {
      login: '/signin',
      logout: '/',
      user: '/messages',
      callback: '/signin'
    }
  },

  axios: {
    baseURL: "http://localhost:5000/api",  // here set your API url
    // proxy: true
  },

  io: {
    sockets: [{
      url: 'http://localhost:5000' // IO server lives here
    }]
  },

  dayjs: {
    locales: ['en'],
    defaultLocale: 'en',
    plugins: ['relativeTime', 'advancedFormat'],
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ["vee-validate/dist/rules"],
  }
}
