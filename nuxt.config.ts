// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  modules: [
    '@element-plus/nuxt'
  ],
  elementPlus: { /** Options */ },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/styles/_vars.scss" as *;',
        },
      },
    },
  },
  css: ['./assets/styles/index.scss'],
  components: [
    { path: '~/components/base', prefix: 'base' },
    { path: '~/components/global', prefix: 'the' },
    { path: '~/components/global', prefix: 'step' },
    { path: '~/components/sections' },
    '~/components',
  ],

})