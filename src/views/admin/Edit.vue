
<script setup>
import {useRouter,useRoute} from 'vue-router'
import {useContactsStore} from '@/stores/contacts'
import { watch, reactive } from 'vue'
import {  doc  } from 'firebase/firestore'
import { useFirestore, useDocument } from 'vuefire'

const contactsStore = useContactsStore();
const router = useRouter();
const db = useFirestore();
const route = useRoute();
const contactId = route.params.id;
const contactRef = doc(db, 'contacts', contactId);
const contactDoc = useDocument(contactRef);


const formData = reactive({
   name: '',
   email: '',
   phone: '',
   country: ''
});

watch(contactDoc, (contact)=>{ // watch nos permite observar un valor y ejecutar una función cuando cambie el valor 
   if(!contact){
      router.push({ name: 'contacts' });
   }
   Object.assign(formData, contact);
});

const submitHandler = async data => { // Función para enviar los datos del formulario
  try {
     await contactsStore.updateContact(contactRef,data); // Llamamos al método addContact del store y le pasamos el objeto data
     router.push({ name: 'contacts' });
  } catch (error) {
     console.log(error);
  }
}


</script>
<template>
  <div class="pt-10">
    <div class="shadow-lg py-10 px-10 rounded-lg">
      <div class="lg:px-0">
        <div class="flex justify-between items-center">
         <h1 class="text-4xl font-bold">Editar Contacto</h1>
         <RouterLink
            to="/"
            class="bg-blue-500 px-4 py-1 rounded-md text-white hover:bg-blue-700"
            >Regresar</RouterLink
          >
        </div>
      </div>
      <hr class="mt-10 border-gray-800">

      <div class="sm:mx-auto sm:w-full sm:max-w-3xl mt-10">
         <form class="space-y-6">
            <div>
               <label for="name"  class="block text-sm font-medium leading-6 text-gray-900">Nombre</label>
               <div class="mt-2">
                  <input type="text" 
                     v-model.trim="formData.name"
                     id="name" 
                     name="name" 
                     required 
                     class="w-full border border-gray-300 rounded-md p-2 mt-1">
               </div>
            </div>
            <div>
               <label for="email"  class="block text-sm font-medium leading-6 text-gray-900">Correo</label>
               <div class="mt-2">
                  <input type="text" v-model.trim="formData.email"  id="email" name="email" required class="w-full border border-gray-300 rounded-md p-2 mt-1">
               </div>
            </div>
            <div>
               <label for="phone"  class="block text-sm font-medium leading-6 text-gray-900">Telefono</label>
               <div class="mt-2">
                  <input type="text" v-model.trim="formData.phone" id="phone" name="phone" required class="w-full border border-gray-300 rounded-md p-2 mt-1">
               </div>
            </div>
            <div>
               <label for="country"  class="block text-sm font-medium leading-6 text-gray-900">Pais</label>
               <div class="mt-2">
                  <select v-model="formData.country" name="country" id="country" class="block text-center w-full border rounded-md py-1.5 border-gray-400 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300">
                     <option
                     v-for="country in contactsStore.countryOptions"
                     :key="country.value"
                     :value="country.value"
                     v-bind="country.attrs"
                    
                  >
                        {{ country.label }}</option>
                  </select>
               </div>
            </div>

            <div>
               <button type="submit"
                  @click.prevent="submitHandler(formData)"
               class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Modifcar</button>
            </div>

         </form>
      </div>


    </div>
  </div>
</template>
