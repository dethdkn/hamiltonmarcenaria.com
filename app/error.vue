<script setup lang='ts'>
const error = useError()

const statusCode = ref(500)
const message = ref('Ocorreu um erro...')

if(error.value && 'statusCode' in error.value && 'message' in error.value){
  statusCode.value = error.value.statusCode
  message.value = error.value.message
}

useHead({ title: `${statusCode.value}` })
setTimeout(async () => clearError({ redirect: '/' }), 3000)
</script>

<template>
  <h1>{{ statusCode }} - {{ message }}</h1>
  <h2>Redirecionando...</h2>
</template>
