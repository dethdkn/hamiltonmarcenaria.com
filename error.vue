<script setup lang='ts'>
const error = defineProps(['error'])
const { statusCode, message } = error.error
useHead({
	title: `${statusCode}`,
})
setTimeout(async () => await navigateTo('/'), 3000)
</script>

<template>
	<h1>{{ statusCode }} - {{ message }}</h1>
	<h2>Aguarde...</h2>
</template>
