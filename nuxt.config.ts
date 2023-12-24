export default defineNuxtConfig({
	modules: ['@nuxtjs/tailwindcss', '@nuxtjs/google-fonts', 'nuxt-icon', '@nuxtseo/module', '@nuxt/image', '@vueuse/nuxt'],
	googleFonts: {
		families: {
			'Open+Sans': [300, 400, 500, 700],
			'Poppins': [300, 400, 500, 700],
		},
	},
	site: {
		url: 'https://hamiltonmarcenaria.com/',
		name: 'Hamilton Marcenaria Moderna',
		description: 'Hamilton Marcenaria Moderna é uma empresa de móveis planejados em MDF, modulados, projetos sob medida e reformas em geral localizada no Rio de Janeiro.',
		defaultLocale: 'pt-BR',
		identity: {
			type: 'Organization',
		},
	},
	linkChecker: {
		enabled: false,
	},
	devtools: {
		enabled: true,
	},
})
