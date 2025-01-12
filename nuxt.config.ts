export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: false },
  modules: ["@element-plus/nuxt"],
  app: {
    head: {
      link: [
        { rel: 'icon', 
          type: 'image/x-icon', 
          href: '/favicon.ico' 
        },
        {
          rel: "apple-touch-icon",
          href: "/apple-touch-icon.png",
          sizes: "180x180",
        },
        {
          rel: "icon",
          href: "/favicon-32x32.png",
          type: "image/png",
          sizes: "32x32",
        },
        {
          rel: "icon",
          href: "/favicon-16x16.png",
          type: "image/png",
          sizes: "16x16",
        },
        {
          rel: "manifest",
          href: "/site.webmanifest",
        },
        {
          rel: "mask-icon",
          href: "/safari-pinned-tab.svg",
          color: "#ffffff",
        },
      ],
      meta: [
        { name: "msapplication-TileColor", content: "#ffffff" },
        { name: "theme-color", content: "#ffffff" },
      ],
    },
  },

  vite: {
    base:'/azlogica-roi-calculator/',
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/styles/_vars.scss" as *;',
        },
      },
    },
  },
  css: ["./assets/styles/index.scss"],
  components: [
    { path: "~/components/base", prefix: "base" },
    { path: "~/components/global", prefix: "the" },
    { path: "~/components/global", prefix: "step" },
    { path: "~/components/sections" },
    "~/components",
  ],
});
