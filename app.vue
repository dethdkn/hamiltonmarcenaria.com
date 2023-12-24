<script setup lang='ts'>
const { y } = useWindowScroll()
const { width } = useWindowSize()

const menuOpen = ref(false)

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

const navigation = ref([
	{ title: 'Início' },
	{ title: 'Sobre' },
	{ title: 'Serviços' },
	{ title: 'Fotos' },
	{ title: 'Contato' },
	{ title: 'Whatsapp', url: 'https://api.whatsapp.com/send?phone=5521983833874&text=Ol%C3%A1%20Hamilton,%20gostaria%20de%20contratar%20um%20servi%C3%A7o!' },
	{ title: 'Facebook', url: 'https://www.facebook.com/Hamiltonmm' },
])

const current = ref('Início')
</script>

<template>
	<header class="h-[90px] transition-all duration-500 z-50 bg-transparent fixed top-0 right-0 left-0 flex items-center" :class="{ '!bg-[#343b40e6] !h-[70px]': y > 50 }">
		<div class="container flex items-center justify-between mx-auto">
			<NuxtImg src="/images/logo.png" alt="Hamilton Marcenaria Moderna" width="92" height="68" class="cursor-pointer" />
			<nav :class="{ 'fixed overflow-hidden top-0 bottom-0 right-0 left-0 bg-[#4d4d4de6] transition-all duration-300 z-50': menuOpen && width < 1024 }">
				<ul class="hidden lg:flex items-center" :class="{ '!block !absolute !top-[55px] !bottom-[15px] !py-[10px] !bg-white !overflow-auto !w-full': menuOpen && width < 1024 }">
					<li v-for="nav in navigation" :key="nav.title" class="relative whitespace-nowrap py-[10px] pe-[24px]" :class="{ '!py-0': menuOpen && width < 1024 }">
						<NuxtLink v-if="nav.url" :to="nav.url" external target="_blank" class="cursor-pointer flex items-center text-[14px] py-1 transition-all duration-300 relative uppercase before:content-[''] before:absolute before:w-full before:h-[2px] before:-bottom-[6px] before:left-0 before:bg-[#fc0324] before:invisible hover:before:visible before:scale-x-0 hover:before:scale-x-100 before:transition-all before:duration-300 text-white" :class="{ '!text-[#666666] !text-[15px] !px-[20px] !py-[10px] before:!bg-white hover:!text-[#fc0324]': menuOpen && width < 1024 }" @click="menuOpen = false">
							{{ nav.title }}
						</NuxtLink>
						<p v-else class="cursor-pointer flex items-center text-[14px] py-1 transition-all duration-300 relative uppercase before:content-[''] before:absolute before:w-full before:h-[2px] before:-bottom-[6px] before:left-0 before:bg-[#fc0324] before:invisible hover:before:visible before:scale-x-0 hover:before:scale-x-100 before:transition-all before:duration-300 text-white" :class="{ 'before:!visible before:!scale-x-100': current === nav.title, '!text-[#666666] !text-[15px] !px-[20px] !py-[10px] before:!bg-white hover:!text-[#fc0324]': menuOpen && width < 1024, '!text-[#fc0324]': current === nav.title && menuOpen && width < 1024 }" @click="menuOpen = false">
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

	<section class="w-full h-screen bg-[url('/images/hmmbg.jpg')] bg-cover relative bg-top before:content-[''] before:absolute before:bg-[#00000099] before:bottom-0 before:top-0 before:left-0 before:right-0">
		<div class="absolute top-0 bottom-0 left-0 right-0 flex flex-col items-center justify-center text-center">
			<h1 class="mt-[30px] mb-[10px] text-[28px] md:text-[48px] font-bold leading-[36px] md:leading-[56px] uppercase text-white">
				Hamilton Marcenario Moderna
			</h1>
			<h2 class="text-[#eee] mb-[50px] md:text-[24px] text-[18px]">
				A melhor marcenaria do Rio de Janeiro
			</h2>
			<p class="uppercase text-[16px] inline-block py-[8px] px-[28px] rounded-[50px] transition-all duration-500 m-[10px] font-medium border-2 border-white text-white hover:bg-[#fc0324] hover:border-[#fc0324] cursor-pointer">
				Conhecer
			</p>
		</div>
	</section>

	<!-- <main>
		<section class="bg-white py-[80px]">
			<div class="container mx-auto">
				<div class="flex flex-wrap">
					<div class="order-2 lg:order-1 lg:flex lg:w-1/2">
						<h2 class="title">
							Sobre
						</h2>
						<p>
							Aqui na Hamilton Marcenaria Moderna, nos fazemos isso aquilo isso aquilo isso aquilo isso aquilo isso aquilo isso aquilo isso aquilo isso aquilo isso aquilo isso aquilo isso aquilo isso aquilo .
						</p>

						<div class="icon-box">
							<div class="icon">
								<i class="bi bi-briefcase" />
							</div>
							<h4 class="title">
								<a href="">Sobre 1</a>
							</h4>
							<p class="description">
								isso aquilo isso aquilo isso aquilo isso aquilo isso aquilo isso aquilo isso aquilo isso aquilo isso aquilo isso aquilo isso aquilo isso aquilo
							</p>
						</div>

						<div class="icon-box">
							<div class="icon">
								<i class="bi bi-card-checklist" />
							</div>
							<h4 class="title">
								<a href="">Sobre 2</a>
							</h4>
							<p class="description">
								isso aquilo isso aquilo isso aquilo isso aquilo isso aquilo isso aquilo isso aquilo isso aquilo isso aquilo isso aquilo isso aquilo isso aquilo
							</p>
						</div>

						<div class="icon-box">
							<div class="icon">
								<i class="bi bi-binoculars" />
							</div>
							<h4 class="title">
								<a href="">Sobre 3</a>
							</h4>
							<p class="description">
								isso aquilo isso aquilo isso aquilo isso aquilo isso aquilo isso aquilo isso aquilo isso aquilo isso aquilo isso aquilo isso aquilo isso aquilo
							</p>
						</div>
					</div>
					<NuxtImg src="/images/sobre.png" class="order-1 lg:order-2 lg:flex lg:w-1/2  min-h-[300px] mb-[10px]" />
				</div>
			</div>
		</section>
	</main> -->

	<footer class="bg-[#343b40] py-[30px] font-[14px]">
		<div class="container mx-auto text-center">
			<span class="text-[#ccc]">Desenvolvido por <NuxtLink to="https://rosa.dev.br" external target="_blank" class="hover:text-[#F28AA9]">Gabriel Rosa</NuxtLink></span>
		</div>
	</footer>
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
