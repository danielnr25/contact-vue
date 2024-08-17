<script setup>
import {RouterLink} from 'vue-router'
</script>

<template>
   <div class="relative z-40 -mx-4 flex items-center justify-between mt-6 shadow-md py-3 px-3 rounded-md bg-gray-100">
      <div class="w-60 max-w-full px-4">
         <h1 class="text-3xl font-bold text-blue-700 uppercase">Contactos</h1>
      </div>
      <RouterLink to="nuevo" class="bg-blue-500 px-4 py-1 rounded-md text-white hover:bg-blue-700">Nuevo Contacto</RouterLink>
   </div>
</template>

