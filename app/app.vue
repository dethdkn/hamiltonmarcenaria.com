<!-- eslint-disable no-restricted-globals -->
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

function scrollTo(to: string){
  if(to === 'Início' && inicio.value) window.scrollTo({ top: inicio.value.offsetTop, behavior: 'smooth' })
  if(to === 'Sobre' && sobre.value) window.scrollTo({ top: sobre.value.offsetTop, behavior: 'smooth' })
  if(to === 'Fotos' && fotos.value) window.scrollTo({ top: fotos.value.offsetTop, behavior: 'smooth' })
  if(to === 'Orçamento' && orcamento.value) window.scrollTo({ top: orcamento.value.offsetTop - 150, behavior: 'smooth' })
  if(to === 'Contato' && contato.value) window.scrollTo({ top: contato.value.offsetTop, behavior: 'smooth' })
  menuOpen.value = false
}

function validateY(val: number){
  if(val > 50) return yScrolled.value = true
  yScrolled.value = false
}

function getActive(val: number){
  if(inicio.value && val >= inicio.value.offsetTop) current.value = 'Início'
  if(sobre.value && val >= sobre.value.offsetTop) current.value = 'Sobre'
  if(fotos.value && val >= fotos.value.offsetTop) current.value = 'Fotos'
  if(orcamento.value && val >= orcamento.value.offsetTop - 150) current.value = 'Orçamento'
  if(contato.value && val >= contato.value.offsetTop) current.value = 'Contato'
}

watch(menuOpen, nv => {
  if(nv) return document.body.style.overflow = 'hidden'
  document.body.style.overflow = 'visible'
})

watch(width, nv => {
  if(nv > 1024) return document.body.style.overflow = 'visible'
  if(menuOpen.value) document.body.style.overflow = 'hidden'
})

watch(y, nv => {
  validateY(nv)
  getActive(nv)
})

onNuxtReady(() => {
  validateY(y.value)
  getActive(y.value)
})

defineOgImageComponent('Og', { title: 'Hamilton Marcenaria Moderna' })
</script>

<template>
  <header class="fixed inset-x-0 top-0 z-50 flex h-[90px] items-center bg-transparent transition-all duration-500" :class="{ '!h-[70px] !bg-[#343b40e6]': yScrolled }">
    <div class="container mx-auto flex items-center justify-between">
      <NuxtImg src="/images/logo.png" alt="Hamilton Marcenaria Moderna" width="92" height="68" class="cursor-pointer" />
      <nav :class="{ 'fixed inset-0 z-50 overflow-hidden bg-[#4d4d4de6] transition-all duration-300': menuOpen && width < 1024 }">
        <ul class="hidden items-center lg:flex" :class="{ '!absolute !top-[55px] !bottom-[15px] !block !w-full !overflow-auto !bg-white !py-[10px]': menuOpen && width < 1024 }">
          <li v-for="nav in navigation" :key="nav.title" class="relative py-[10px] pe-[24px] whitespace-nowrap" :class="{ '!py-0': menuOpen && width < 1024 }">
            <NuxtLink v-if="nav.url" :to="nav.url" external target="_blank" class="relative flex cursor-pointer items-center py-1 text-[14px] text-white uppercase transition-all duration-300 before:invisible before:absolute before:bottom-[-6px] before:left-0 before:h-[2px] before:w-full before:scale-x-0 before:bg-[#fc0324] before:transition-all before:duration-300 before:content-[''] hover:before:visible hover:before:scale-x-100" :class="{ '!px-[20px] !py-[10px] !text-[15px] !text-[#666666] before:!bg-white hover:!text-[#fc0324]': menuOpen && width < 1024 }" @click="menuOpen = false">
              {{ nav.title }}
            </NuxtLink>
            <p v-else role="button" class="relative flex cursor-pointer items-center py-1 text-[14px] text-white uppercase transition-all duration-300 before:invisible before:absolute before:bottom-[-6px] before:left-0 before:h-[2px] before:w-full before:scale-x-0 before:bg-[#fc0324] before:transition-all before:duration-300 before:content-[''] hover:before:visible hover:before:scale-x-100" :class="{ 'before:!visible before:!scale-x-100': current === nav.title, '!px-[20px] !py-[10px] !text-[15px] !text-[#666666] before:!bg-white hover:!text-[#fc0324]': menuOpen && width < 1024, '!text-[#fc0324]': current === nav.title && menuOpen && width < 1024 }" @click="scrollTo(nav.title)" @keydown.enter="scrollTo(nav.title)">
              {{ nav.title }}
            </p>
          </li>
        </ul>
        <span class="block cursor-pointer lg:hidden" :class="{ '!absolute !top-[15px] !right-[15px]': menuOpen && width < 1024 }" role="button" @click="menuOpen = !menuOpen" @keydown.enter="menuOpen = !menuOpen">
          <Icon v-show="menuOpen" name="octicon:x-16" class="text-[28px] text-white" />
          <Icon v-show="!menuOpen" name="ion:menu" class="text-[28px] text-white" />
        </span>
      </nav>
    </div>
  </header>

  <section ref="inicio" class="relative h-screen w-full bg-[url('/images/hmmbg.jpg')] bg-cover bg-top before:absolute before:inset-0 before:bg-[#00000099] before:content-['']">
    <div class="absolute inset-0 flex flex-col items-center justify-center text-center">
      <h1 class="mt-[30px] mb-[10px] text-[28px] leading-[36px] font-bold text-white uppercase md:text-[48px] md:leading-[56px]">
        Hamilton Marcenaria Moderna
      </h1>
      <h2 class="mb-[50px] text-[18px] text-[#eee] md:text-[24px]">
        A melhor marcenaria do Rio de Janeiro
      </h2>
      <p class="m-[10px] inline-block cursor-pointer rounded-[50px] border-2 border-white px-[28px] py-[8px] text-[16px] font-medium text-white uppercase transition-all duration-500 hover:border-[#fc0324] hover:bg-[#fc0324]" role="button" @click="scrollTo('Sobre')" @keydown.enter="scrollTo('Sobre')">
        Conhecer
      </p>
    </div>
  </section>

  <main>
    <section ref="sobre" class="bg-white py-1 lg:py-[80px]">
      <div class="container mx-auto">
        <div class="flex flex-wrap items-center">
          <div class="order-2 px-4 lg:order-1 lg:w-1/2">
            <h2 class="pt-[15px] text-[32px] font-bold text-[#333] uppercase lg:pt-0">
              Sobre
            </h2>
            <p class="mb-[30px]">
              Hamilton Marcenaria Moderna é uma empresa de móveis planejados em MDF, modulados, projetos sob medida e reformas em geral localizada no Rio de Janeiro.
            </p>
            <div class="bg-white bg-cover pb-[30px]">
              <div class="float-left flex size-[64px] flex-col items-center justify-center rounded-[50%] border-2 border-[#fc0324] bg-white text-center">
                <Icon name="map:furniture-store" class="text-[30px] text-[#fc0324]" />
              </div>
              <p class="ms-[80px] mb-[5px] text-[18px] font-medium text-black uppercase">
                Móveis Planejados em MDF
              </p>
              <p class="ms-[80px] text-[14px]">
                Na Hamilton Marcenaria Moderna, criamos móveis planejados em MDF de alta qualidade, combinando elegância e funcionalidade para transformar visões em realidade.
              </p>
            </div>
            <div class="bg-white bg-cover pb-[30px]">
              <div class="float-left flex size-[64px] flex-col items-center justify-center rounded-[50%] border-2 border-[#fc0324] bg-white text-center">
                <Icon name="solar:closet-bold" class="text-[30px] text-[#fc0324]" />
              </div>
              <p class="ms-[80px] mb-[5px] text-[18px] font-medium text-black uppercase">
                Modulados Inovadores
              </p>
              <p class="ms-[80px] text-[14px]">
                Descubra soluções versáteis e contemporâneas com nossos móveis modulados, projetados para otimizar espaços e adicionar um toque moderno à sua decoração.
              </p>
            </div>
            <div class="bg-white bg-cover pb-[30px]">
              <div class="float-left flex size-[64px] flex-col items-center justify-center rounded-[50%] border-2 border-[#fc0324] bg-white text-center">
                <Icon name="entypo:tools" class="text-[30px] text-[#fc0324]" />
              </div>
              <p class="ms-[80px] mb-[5px] text-[18px] font-medium text-black uppercase">
                Reformas em Geral
              </p>
              <p class="ms-[80px] text-[14px]">
                De renovações de móveis a remodelações completas, nossa equipe especializada em reformas transforma espaços, garantindo funcionalidade e estética excepcionais.
              </p>
            </div>
          </div>
          <NuxtImg src="/images/sobre.jpg" alt="Foto da Loja Hamilton Marcenaria Moderna" class="order-1 mx-auto mb-[10px] h-96 max-h-[500px] w-full rounded-3xl object-cover p-4 lg:order-2 lg:flex lg:h-auto lg:w-1/2" />
        </div>
      </div>
    </section>

    <section ref="fotos" class="mb-5 bg-white py-1 text-center lg:py-[80px]">
      <h2 class="mb-5 pt-[15px] text-[32px] font-bold text-[#333] uppercase lg:pt-0">
        Fotos
      </h2>
      <div class="grid grid-cols-1 place-items-center gap-8 px-10 sm:grid-cols-1 lg:grid-cols-3">
        <NuxtImg src="/portfolio/1.jpg" alt="Portfolio 1" class="max-w-sm rounded-lg" />
        <NuxtImg src="/portfolio/2.jpg" alt="Portfolio 2" class="max-w-sm rounded-lg" />
        <NuxtImg src="/portfolio/3.jpg" alt="Portfolio 3" class="max-w-sm rounded-lg" />
        <NuxtImg src="/portfolio/4.jpg" alt="Portfolio 4" class="max-w-xs rounded-lg md:max-w-sm 2xl:max-w-md" />
        <NuxtImg src="/portfolio/5.jpg" alt="Portfolio 5" class="max-w-xs rounded-lg md:max-w-sm 2xl:max-w-md" />
        <NuxtImg src="/portfolio/6.jpg" alt="Portfolio 6" class="max-w-xs rounded-lg md:max-w-sm 2xl:max-w-md" />
        <NuxtImg src="/portfolio/7.jpg" alt="Portfolio 7" class="max-w-xs rounded-lg md:max-w-sm 2xl:max-w-md" />
        <NuxtImg src="/portfolio/8.jpg" alt="Portfolio 8" class="max-w-xs rounded-lg md:max-w-sm 2xl:max-w-md" />
        <NuxtImg src="/portfolio/9.jpg" alt="Portfolio 9" class="max-w-xs rounded-lg md:max-w-sm 2xl:max-w-md" />
      </div>
      <NuxtLink to="https://www.facebook.com/hamiltonmm/photos" external target="_blank" class="m-[10px] mt-20 inline-block cursor-pointer rounded-[50px] border-2 border-[#fc0324] bg-[#fc0324] px-[28px] py-[8px] text-[16px] font-medium text-white uppercase transition-all duration-500 hover:border-[#e73e3e] hover:bg-[#e73e3e]">
        Veja mais no Facebook
      </NuxtLink>
    </section>

    <!-- eslint-disable-next-line vue/no-restricted-static-attribute -->
    <section ref="orcamento" class="relative bg-cover bg-fixed bg-center py-[80px]" style="background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/images/wppbg.jpg');">
      <div class="container mx-auto">
        <div class="block items-center justify-between text-center lg:flex lg:text-start">
          <div class="text-white">
            <h3 class="text-[28px] font-bold">
              Faça um orçamento
            </h3>
            <p>
              Clique no botão para entrar em contato pelo whatsapp
            </p>
          </div>
          <NuxtLink to="https://api.whatsapp.com/send?phone=5521983833874&text=Ol%C3%A1%20Hamilton,%20gostaria%20de%20contratar%20um%20servi%C3%A7o!" external target="_blank" class="m-[10px] mt-10 inline-block cursor-pointer rounded-[50px] border-2 border-white px-[28px] py-[8px] text-[16px] font-medium text-white uppercase transition-all duration-500 hover:border-[#fc0324] hover:bg-[#fc0324] lg:mt-0">
            Whatsapp
          </NuxtLink>
        </div>
      </div>
    </section>

    <section ref="contato" class="mb-10 bg-white py-1 text-center sm:mb-0 lg:py-[80px]">
      <h2 class="pt-[15px] text-[32px] font-bold text-[#333] uppercase lg:pt-0">
        Contato
      </h2>
      <iframe title="Mapa" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3675.353524138657!2d-43.23524962514366!3d-22.90032783763937!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x997ef332e8cc97%3A0x9820c8f34773c58c!2sR.%20S%C3%A3o%20Luiz%20Gonzaga%2C%201064%20-%20Benfica%2C%20Rio%20de%20Janeiro%20-%20RJ%2C%2020910-062!5e0!3m2!1sen!2sbr!4v1703626146204!5m2!1sen!2sbr" width="100%" height="380" frameborder="0" allowfullscreen class="border-0" />
      <div class="mt-10 grid grid-cols-1 place-items-center p-5 sm:grid-cols-2">
        <div class="mt-8 flex items-center justify-center space-x-1">
          <Icon name="mingcute:location-2-line" class="text-[24px] text-[#fc0324]" />
          <p class="max-w-32 text-black">
            R. São Luiz Gonzaga 1064 - Benfica, Rio de Janeiro, RJ
          </p>
        </div>
        <NuxtLink to="mailto:hamilton@rosa.dev.br" class="mt-8 flex items-center justify-center space-x-1">
          <Icon name="ph:envelope-bold" class="text-[24px] text-[#fc0324]" />
          <p class="text-black">
            hamilton@rosa.dev.br
          </p>
        </NuxtLink>
        <NuxtLink to="https://api.whatsapp.com/send?phone=5521983833874&text=Ol%C3%A1%20Hamilton,%20gostaria%20de%20contratar%20um%20servi%C3%A7o!" external target="_blank" class="mt-8 flex items-center justify-center space-x-1">
          <Icon name="ic:twotone-whatsapp" class="text-[24px] text-[#fc0324]" />
          <p class="text-black">
            (21) 98383-3874
          </p>
        </NuxtLink>
        <NuxtLink to="tel:22998128003" class="mt-8 flex items-center justify-center space-x-1">
          <Icon name="bi:phone" class="text-[24px] text-[#fc0324]" />
          <p class="text-black">
            (22) 99812-8003
          </p>
        </NuxtLink>
      </div>
    </section>
  </main>

  <footer class="bg-[#1E1E2E] py-[30px] font-[14px]">
    <div class="container mx-auto text-center">
      <span class="text-[#ccc]">Desenvolvido por <NuxtLink to="https://rosa.dev.br" external target="_blank" class="hover:text-[#F28AA9]">Gabriel Rosa</NuxtLink></span>
    </div>
  </footer>

  <span class="fixed right-[15px] bottom-[15px] z-[100] hidden size-9 cursor-pointer items-center justify-center rounded-lg bg-[#fc0324] transition-all duration-500 hover:bg-[#ca283e] md:flex" :class="{ 'opacity-100': yScrolled, 'invisible opacity-0': !yScrolled }" role="button" @click="scrollTo('Início')" @keydown.enter="scrollTo('Início')">
    <Icon name="humbleicons:arrow-up" class="inline-block text-[24px] text-white" />
  </span>
</template>

<!-- eslint-disable-next-line vue/no-restricted-block -->
<style scoped>
*::selection {
  background: #fc0324;
  color: white;
}

body {
  background-color: white;
  color: #666;
  font-family: Poppins, sans-serif;
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
