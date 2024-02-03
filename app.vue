<script setup lang='ts'>
const { y } = useWindowScroll()
const { width } = useWindowSize()

const menuOpen = ref(false)
const yScrolled = ref(false)

const navigation = ref([
	{ title: 'Início' },
	{ title: 'Sobre' },
	{ title: 'Fotos' },
	{ title: 'Orçamento' },
	{ title: 'Contato' },
	{ title: 'Whatsapp', url: 'https://api.whatsapp.com/send?phone=5521983833874&text=Ol%C3%A1%20Hamilton,%20gostaria%20de%20contratar%20um%20servi%C3%A7o!' },
	{ title: 'Facebook', url: 'https://www.facebook.com/Hamiltonmm' },
])

const current = ref('Início')

const inicio = ref<HTMLElement | null>()
const sobre = ref<HTMLElement | null>()
const fotos = ref<HTMLElement | null>()
const orcamento = ref<HTMLElement | null>()
const contato = ref<HTMLElement | null>()

function scrollTo(to: string) {
	if (to === 'Início' && inicio.value)
		window.scrollTo({ top: inicio.value.offsetTop, behavior: 'smooth' })
	if (to === 'Sobre' && sobre.value)
		window.scrollTo({ top: sobre.value.offsetTop, behavior: 'smooth' })
	if (to === 'Fotos' && fotos.value)
		window.scrollTo({ top: fotos.value.offsetTop, behavior: 'smooth' })
	if (to === 'Orçamento' && orcamento.value)
		window.scrollTo({ top: orcamento.value.offsetTop - 150, behavior: 'smooth' })
	if (to === 'Contato' && contato.value)
		window.scrollTo({ top: contato.value.offsetTop, behavior: 'smooth' })
	menuOpen.value = false
}

function validateY(val: number) {
	if (val > 50)
		return yScrolled.value = true
	yScrolled.value = false
}

function getActive(val: number) {
	if (inicio.value && val >= inicio.value.offsetTop)
		current.value = 'Início'
	if (sobre.value && val >= sobre.value.offsetTop)
		current.value = 'Sobre'
	if (fotos.value && val >= fotos.value.offsetTop)
		current.value = 'Fotos'
	if (orcamento.value && val >= orcamento.value.offsetTop - 150)
		current.value = 'Orçamento'
	if (contato.value && val >= contato.value.offsetTop)
		current.value = 'Contato'
}

watch(menuOpen, (nv) => {
	if (nv)
		return document.body.style.overflow = 'hidden'
	document.body.style.overflow = 'visible'
})

watch(width, (nv) => {
	if (nv > 1024)
		return document.body.style.overflow = 'visible'
	if (menuOpen.value)
		document.body.style.overflow = 'hidden'
})

watch(y, (nv) => {
	validateY(nv)
	getActive(nv)
})

onMounted(() => {
	validateY(y.value)
	getActive(y.value)
})
</script>

<template>
	<header class="h-[90px] transition-all duration-500 z-50 bg-transparent fixed top-0 right-0 left-0 flex items-center" :class="{ '!bg-[#343b40e6] !h-[70px]': yScrolled }">
		<div class="container flex items-center justify-between mx-auto">
			<NuxtImg src="/images/logo.png" alt="Hamilton Marcenaria Moderna" width="92" height="68" class="cursor-pointer" />
			<nav :class="{ 'fixed overflow-hidden top-0 bottom-0 right-0 left-0 bg-[#4d4d4de6] transition-all duration-300 z-50': menuOpen && width < 1024 }">
				<ul class="hidden lg:flex items-center" :class="{ '!block !absolute !top-[55px] !bottom-[15px] !py-[10px] !bg-white !overflow-auto !w-full': menuOpen && width < 1024 }">
					<li v-for="nav in navigation" :key="nav.title" class="relative whitespace-nowrap py-[10px] pe-[24px]" :class="{ '!py-0': menuOpen && width < 1024 }">
						<NuxtLink v-if="nav.url" :to="nav.url" external target="_blank" class="cursor-pointer flex items-center text-[14px] py-1 transition-all duration-300 relative uppercase before:content-[''] before:absolute before:w-full before:h-[2px] before:-bottom-[6px] before:left-0 before:bg-[#fc0324] before:invisible hover:before:visible before:scale-x-0 hover:before:scale-x-100 before:transition-all before:duration-300 text-white" :class="{ '!text-[#666666] !text-[15px] !px-[20px] !py-[10px] before:!bg-white hover:!text-[#fc0324]': menuOpen && width < 1024 }" @click="menuOpen = false">
							{{ nav.title }}
						</NuxtLink>
						<p v-else class="cursor-pointer flex items-center text-[14px] py-1 transition-all duration-300 relative uppercase before:content-[''] before:absolute before:w-full before:h-[2px] before:-bottom-[6px] before:left-0 before:bg-[#fc0324] before:invisible hover:before:visible before:scale-x-0 hover:before:scale-x-100 before:transition-all before:duration-300 text-white" :class="{ 'before:!visible before:!scale-x-100': current === nav.title, '!text-[#666666] !text-[15px] !px-[20px] !py-[10px] before:!bg-white hover:!text-[#fc0324]': menuOpen && width < 1024, '!text-[#fc0324]': current === nav.title && menuOpen && width < 1024 }" @click="scrollTo(nav.title)">
							{{ nav.title }}
						</p>
					</li>
				</ul>
				<span class="block lg:hidden cursor-pointer" :class="{ '!absolute !top-[15px] !right-[15px]': menuOpen && width < 1024 }" @click="menuOpen = !menuOpen">
					<Icon v-if="menuOpen" name="octicon:x-16" color="white" size="28px" />
					<Icon v-else name="ion:menu" color="white" size="28px" />
				</span>
			</nav>
		</div>
	</header>

	<section ref="inicio" class="w-full h-screen bg-[url('/images/hmmbg.jpg')] bg-cover relative bg-top before:content-[''] before:absolute before:bg-[#00000099] before:bottom-0 before:top-0 before:left-0 before:right-0">
		<div class="absolute top-0 bottom-0 left-0 right-0 flex flex-col items-center justify-center text-center">
			<h1 class="mt-[30px] mb-[10px] text-[28px] md:text-[48px] font-bold leading-[36px] md:leading-[56px] uppercase text-white">
				Hamilton Marcenaria Moderna
			</h1>
			<h2 class="text-[#eee] mb-[50px] md:text-[24px] text-[18px]">
				A melhor marcenaria do Rio de Janeiro
			</h2>
			<p class="uppercase text-[16px] inline-block py-[8px] px-[28px] rounded-[50px] transition-all duration-500 m-[10px] font-medium border-2 border-white text-white hover:bg-[#fc0324] hover:border-[#fc0324] cursor-pointer" @click="scrollTo('Sobre')">
				Conhecer
			</p>
		</div>
	</section>

	<main>
		<section ref="sobre" class="bg-white py-1 lg:py-[80px]">
			<div class="container mx-auto">
				<div class="flex flex-wrap items-center">
					<div class="order-2 lg:order-1 lg:w-1/2 px-4">
						<h2 class="text-[#333] font-bold text-[32px] pt-[15px] lg:pt-0 uppercase">
							Sobre
						</h2>
						<p class="mb-[30px]">
							Hamilton Marcenaria Moderna é uma empresa de móveis planejados em MDF, modulados, projetos sob medida e reformas em geral localizada no Rio de Janeiro.
						</p>
						<div class="bg-white bg-cover pb-[30px]">
							<div class="flex flex-col justify-center items-center float-left bg-white w-[64px] h-[64px] text-center rounded-[50%] border-2 border-[#fc0324]">
								<Icon name="map:furniture-store" color="#fc0324" size="30px" />
							</div>
							<p class="ms-[80px] mb-[5px] text-[18px] uppercase font-medium text-black">
								Móveis Planejados em MDF
							</p>
							<p class="ms-[80px] text-[14px]">
								Na Hamilton Marcenaria Moderna, criamos móveis planejados em MDF de alta qualidade, combinando elegância e funcionalidade para transformar visões em realidade.
							</p>
						</div>
						<div class="bg-white bg-cover pb-[30px]">
							<div class="flex flex-col justify-center items-center float-left bg-white w-[64px] h-[64px] text-center rounded-[50%] border-2 border-[#fc0324]">
								<Icon name="solar:closet-bold" color="#fc0324" size="30px" />
							</div>
							<p class="ms-[80px] mb-[5px] text-[18px] uppercase font-medium text-black">
								Modulados Inovadores
							</p>
							<p class="ms-[80px] text-[14px]">
								Descubra soluções versáteis e contemporâneas com nossos móveis modulados, projetados para otimizar espaços e adicionar um toque moderno à sua decoração.
							</p>
						</div>
						<div class="bg-white bg-cover pb-[30px]">
							<div class="flex flex-col justify-center items-center float-left bg-white w-[64px] h-[64px] text-center rounded-[50%] border-2 border-[#fc0324]">
								<Icon name="entypo:tools" color="#fc0324" size="30px" />
							</div>
							<p class="ms-[80px] mb-[5px] text-[18px] uppercase font-medium text-black">
								Reformas em Geral
							</p>
							<p class="ms-[80px] text-[14px]">
								De renovações de móveis a remodelações completas, nossa equipe especializada em reformas transforma espaços, garantindo funcionalidade e estética excepcionais.
							</p>
						</div>
					</div>
					<NuxtImg src="/images/sobre.png" alt="Foto da Loja Hamilton Marcenaria Moderna" class="order-1 lg:order-2 lg:flex w-full h-96 object-cover lg:w-1/2 lg:h-auto mb-[10px] mx-auto p-4 rounded-3xl max-h-[500px]" />
				</div>
			</div>
		</section>

		<section ref="fotos" class="bg-white py-1 lg:py-[80px] text-center mb-5">
			<h2 class="text-[#333] font-bold text-[32px] pt-[15px] lg:pt-0 uppercase mb-5">
				Fotos
			</h2>
			<div class="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-8 place-items-center px-10">
				<NuxtImg src="/portfolio/1.jpg" alt="Portfolio 1" class="rounded-lg max-w-sm" />
				<NuxtImg src="/portfolio/2.jpg" alt="Portfolio 2" class="rounded-lg max-w-sm" />
				<NuxtImg src="/portfolio/3.jpg" alt="Portfolio 3" class="rounded-lg max-w-sm" />
				<NuxtImg src="/portfolio/4.jpg" alt="Portfolio 4" class="rounded-lg max-w-xs md:max-w-sm 2xl:max-w-md" />
				<NuxtImg src="/portfolio/5.jpg" alt="Portfolio 5" class="rounded-lg max-w-xs md:max-w-sm 2xl:max-w-md" />
				<NuxtImg src="/portfolio/6.jpg" alt="Portfolio 6" class="rounded-lg max-w-xs md:max-w-sm 2xl:max-w-md" />
				<NuxtImg src="/portfolio/7.jpg" alt="Portfolio 7" class="rounded-lg max-w-xs md:max-w-sm 2xl:max-w-md" />
				<NuxtImg src="/portfolio/8.jpg" alt="Portfolio 8" class="rounded-lg max-w-xs md:max-w-sm 2xl:max-w-md" />
				<NuxtImg src="/portfolio/9.jpg" alt="Portfolio 9" class="rounded-lg max-w-xs md:max-w-sm 2xl:max-w-md" />
			</div>
			<NuxtLink to="https://www.facebook.com/Hamiltonmm/photos" external target="_blank" class="uppercase text-[16px] inline-block py-[8px] px-[28px] rounded-[50px] transition-all duration-500 m-[10px] font-medium border-2 text-white bg-[#fc0324] border-[#fc0324] hover:bg-[#e73e3e] hover:border-[#e73e3e] cursor-pointer mt-20">
				Veja mais no Facebook
			</NuxtLink>
		</section>

		<section ref="orcamento" class="bg-fixed bg-center bg-cover relative py-[80px]" style="background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/images/wppbg.jpg');">
			<div class="container mx-auto">
				<div class="block text-center lg:text-start lg:flex justify-between items-center">
					<div class="text-white">
						<h3 class="text-[28px] font-bold">
							Faça um orçamento
						</h3>
						<p class="cta-text">
							Clique no botão a direita e entre em contato pelo whatsapp
						</p>
					</div>
					<NuxtLink to="https://api.whatsapp.com/send?phone=5521983833874&text=Ol%C3%A1%20Hamilton,%20gostaria%20de%20contratar%20um%20servi%C3%A7o!" external target="_blank" class="uppercase text-[16px] inline-block py-[8px] px-[28px] rounded-[50px] transition-all duration-500 m-[10px] font-medium border-2 border-white text-white hover:bg-[#fc0324] hover:border-[#fc0324] cursor-pointer mt-10 lg:mt-0">
						Whatsapp
					</NuxtLink>
				</div>
			</div>
		</section>

		<section ref="contato" class="bg-white py-1 lg:py-[80px] text-center mb-10 sm:mb-0">
			<h2 class="text-[#333] font-bold text-[32px] pt-[15px] lg:pt-0 uppercase">
				Contato
			</h2>
			<iframe title="Mapa" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3675.353524138657!2d-43.23524962514366!3d-22.90032783763937!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x997ef332e8cc97%3A0x9820c8f34773c58c!2sR.%20S%C3%A3o%20Luiz%20Gonzaga%2C%201064%20-%20Benfica%2C%20Rio%20de%20Janeiro%20-%20RJ%2C%2020910-062!5e0!3m2!1sen!2sbr!4v1703626146204!5m2!1sen!2sbr" width="100%" height="380" frameborder="0" style="border:0" allowfullscreen />
			<div class="grid grid-cols-1 sm:grid-cols-2 place-items-center mt-10 p-5">
				<div class="max-w-[300px]">
					<Icon name="mingcute:location-2-line" color="#fc0324" size="24px" class="inline-block" />
					<p class="text-black inline">
						R. São Luiz Gonzaga 1064 - Benfica, Rio de Janeiro, RJ
					</p>
				</div>
				<NuxtLink to="mailto:hamilton@rosa.dev.br" class="mt-8 sm:mt-0">
					<Icon name="ph:envelope-bold" color="#fc0324" size="24px" class="inline-block" />
					<p class="text-black inline">
						hamilton@rosa.dev.br
					</p>
				</NuxtLink>
				<NuxtLink to="https://api.whatsapp.com/send?phone=5521983833874&text=Ol%C3%A1%20Hamilton,%20gostaria%20de%20contratar%20um%20servi%C3%A7o!" external target="_blank" class="mt-8">
					<Icon name="ic:twotone-whatsapp" color="#fc0324" size="24px" class="inline-block" />
					<p class="text-black inline">
						(21) 98383-3874
					</p>
				</NuxtLink>
				<NuxtLink to="tel:22998128003" class="mt-8">
					<Icon name="bi:phone" color="#fc0324" size="24px" class="inline-block" />
					<p class="text-black inline">
						(22) 99812-8003
					</p>
				</NuxtLink>
			</div>
		</section>
	</main>

	<footer class="bg-[#343b40] py-[30px] font-[14px]">
		<div class="container mx-auto text-center">
			<span class="text-[#ccc]">Desenvolvido por <NuxtLink to="https://rosa.dev.br" external target="_blank" class="hover:text-[#F28AA9]">Gabriel Rosa</NuxtLink></span>
		</div>
	</footer>

	<span class="md:flex justify-center items-center fixed right-[15px] bottom-[15px] z-[100] bg-[#fc0324] w-9 h-9 rounded-lg transition-all duration-500 cursor-pointer hover:bg-[#ca283e] hidden" :class="{ 'opacity-100': yScrolled, 'invisible opacity-0': !yScrolled }" @click="scrollTo('Início')">
		<Icon name="humbleicons:arrow-up" color="white" size="24px" class="inline-block" />
	</span>
</template>

<style>
*::-moz-selection {
    background: #fc0324;
    color: white;
}
*::selection {
    background: #fc0324;
    color: white;
}
body {
	background-color: white;
	color: #666666;
	font-family: "Poppins", sans-serif;
}
body::-webkit-scrollbar {
    background-color: #EFF1F5;
    width: 16px;
}
body::-webkit-scrollbar-track {
    background-color: #EFF1F5;
}
body::-webkit-scrollbar-thumb {
    background-color: #babac0;
    border-radius: 16px;
    border: 4px solid #EFF1F5;
}
body::-webkit-scrollbar-button {
    display: none;
}
</style>
