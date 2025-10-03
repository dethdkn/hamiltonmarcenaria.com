import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  modules: ['@nuxt/fonts', '@nuxt/icon', '@nuxtjs/seo', '@nuxt/image', '@vueuse/nuxt'],
  devtools: { enabled: true },
  css: ['~/assets/main.css'],
  site: {
    url: 'https://hamiltonmarcenaria.com/',
    name: 'Hamilton Marcenaria Moderna',
    description: 'Hamilton Marcenaria Moderna é uma empresa de móveis planejados em MDF, modulados, projetos sob medida e reformas em geral localizada no Rio de Janeiro.',
    identity: { type: 'Organization' },
  },
  compatibilityDate: '2025-10-03',
  nitro: { preset: 'cloudflare_module', cloudflare: { deployConfig: true, nodeCompat: true } },
  vite: { plugins: [tailwindcss()] },
  linkChecker: { enabled: false },
})
