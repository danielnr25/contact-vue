<script setup>
import { useContactsStore } from "@/stores/contacts";
import {ref} from 'vue'
const contacts = useContactsStore();

const getTableCellClass = (index, columnIndex) => {
  const isEven = index % 2 === 0;
  const bgClass = isEven
    ? "bg-[#F3F6FF] dark:bg-dark-3"
    : "bg-white dark:bg-dark-2";

  return `text-dark border-b ${
    columnIndex === 0 ? "border-l" : ""
  } border-[#E8E8E8] ${bgClass} dark:border-dark dark:text-dark-7 py-5 px-2 text-center text-base font-medium`;
};

const showModal = ref(false);

const item = ref(null);

const showDeleteModal = (contact) => {
   item.value = contact;
   showModal.value = true;
};

const hideDeleteModal = () => {
   showModal.value = false;
   item.value = null;
};

</script>

<template>
  <section class="bg-white py-20 lg:py-[80px]">
    <div class="container mx-auto">
      <div class="flex flex-wrap -mx-4">
        <div class="w-full px-4">
          <div class="max-w-full overflow-x-auto">
            <table class="w-full table-auto">
              <thead>
                <tr class="text-center bg-blue-400">
                  <th
                    class="w-1/6 min-w-[160px] border-l border-transparent py-4 px-3 text-lg font-medium text-white lg:py-7 lg:px-4"
                  >
                    ID
                  </th>
                  <th
                    class="w-1/6 min-w-[160px] py-4 px-3 text-lg font-medium text-white lg:py-7 lg:px-4"
                  >
                    Nombre
                  </th>
                  <th
                    class="w-1/6 min-w-[160px] py-4 px-3 text-lg font-medium text-white lg:py-7 lg:px-4"
                  >
                    Correo
                  </th>
                  <th
                    class="w-1/6 min-w-[160px] py-4 px-3 text-lg font-medium text-white lg:py-7 lg:px-4"
                  >
                    Telefono
                  </th>
                  <th
                    class="w-1/6 min-w-[160px] py-4 px-3 text-lg font-medium text-white lg:py-7 lg:px-4"
                  >
                    Pais
                  </th>
                  <th
                    class="w-1/6 min-w-[160px] border-r border-transparent py-4 px-3 text-lg font-medium text-white lg:py-7 lg:px-4"
                  >
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, index) in contacts.contactsCollection"
                  v-bind:key="index"
                >
                  <td v-bind:class="getTableCellClass(index, 0)">{{ item.id }}</td>
                  <td v-bind:class="getTableCellClass(index, 1)">{{ item.name }}</td>
                  <td v-bind:class="getTableCellClass(index, 2)">{{ item.email }}</td>
                  <td v-bind:class="getTableCellClass(index, 3)">{{ item.phone }}</td>
                  <td v-bind:class="getTableCellClass(index, 4)">{{ item.country }}</td>
                  <td v-bind:class="getTableCellClass(index, 5)">
                    <RouterLink 
                     :to="{ name: 'editar',params: { id: item.id },
                     }"
                     class="bg-green-400 px-2 py-1 rounded-md mr-2">
                      Editar
                    </RouterLink>
                    <button
                     @click="showDeleteModal(item)"
                      class="bg-red-400 text-white px-2 py-1 rounded-md mr-2"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <div v-if="showModal" class="fixed inset-0 space-x-0 bg-gray-500 bg-opacity-75 z-50 transition-opacity">
               <div class="fixed inset-0 flex items-center justify-center">
                 <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:w-full sm:max-w-lg">
                   <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                     <div class="sm:flex sm:items-start">
                       <div
                         class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"
                       >
                         <svg
                           class="h-6 w-6 text-red-600"
                           xmlns="http://www.w3.org/2000/svg"
                           fill="none"
                           viewBox="0 0 24 24"
                           stroke-width="2"
                           stroke="currentColor"
                           aria-hidden="true"
                         >
                           <path
                             stroke-linecap="round"
                             stroke-linejoin="round"
                             stroke-width="2"
                             d="M5 13l4 4L19 7"
                           />
                         </svg>
                       </div>
                       <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                         <h3
                           class="text-lg leading-6 font-medium text-gray-900"
                           id="modal-headline"
                         > Eliminar Contacto de <span class="text-red-500"> {{ item.name }}</span>
                         </h3>
                         <div class="mt-2">
                           <p class="text-sm text-gray-500">
                             ¿Estás seguro de que deseas eliminar este contacto?
                           </p>
                         </div>
                       </div>
                     </div>
            
                     <div class="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                       <button
                         type="button"
                         class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                        @click="contacts.deleteContact(item.id); hideDeleteModal()"
                       >
                         Eliminar
                       </button>
                       <button
                         type="button"
                         class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                         @click="hideDeleteModal"
                       >
                         Cancelar
                       </button>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
