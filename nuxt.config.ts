export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@nuxt/fonts', '@nuxt/icon', '@nuxtjs/seo', '@nuxt/image', '@vueuse/nuxt'],
  devtools: { enabled: true },
  site: {
    url: 'https://hamiltonmarcenaria.com/',
    name: 'Hamilton Marcenaria Moderna',
    description: 'Hamilton Marcenaria Moderna é uma empresa de móveis planejados em MDF, modulados, projetos sob medida e reformas em geral localizada no Rio de Janeiro.',
    identity: { type: 'Organization' },
  },
  future: { compatibilityVersion: 4 },
  compatibilityDate: '2025-04-28',
  linkChecker: { enabled: false },
})
