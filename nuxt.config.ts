export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    'nuxt-security',
    'nuxt-mongoose',
    '@nuxt/ui',
    'nuxt-auth-utils',
    'nuxt-csurf',
  ],
  $development: {
    devtools: { enabled: true },
  },
  app: {
    head: {
      title: 'shortly',
    },
  },
  css: ['~/assets/css/main.scss'],
  build: {
    transpile: ['@vuepic/vue-datepicker'],
  },
  compatibilityDate: '2024-11-01',
  eslint: {
    config: {
      stylistic: true,
    },
  },
})
