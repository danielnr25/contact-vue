import { addDoc, collection, deleteDoc, doc, getDoc, orderBy, query, updateDoc } from "firebase/firestore";
import { defineStore } from "pinia";
import { computed } from "vue";
import { useCollection, useFirestore } from "vuefire";

export const useContactsStore = defineStore('contacts',()=>{
   
   const db = useFirestore();
   const countries =[
      {name: 'México', code: 'México'},
      {name: 'Estados Unidos', code: 'Estados Unidos'},
      {name: 'Canadá', code: 'Canadá'},
      {name: 'Argentina', code: 'Argentina'},
      {name: 'Brasil', code: 'Brasil'},
      {name: 'Chile', code: 'Chile'},
      {name: 'Colombia', code: 'Colombia'},
      {name: 'Ecuador', code: 'Ecuador'},
      {name: 'Perú', code: 'Perú'},
      {name: 'Venezuela', code: 'Venezuela'},
   ];

   const countryOptions = computed(() => {
      const options = [
          {label: 'Seleccione', value: '', attrs: {disabled: true } },
          ...countries.map(country => (
              {label: country.name, value: country.code}
          ))
      ]
      return options
  }) 

   const q = query(collection(db,'contacts'), 
   orderBy('name','desc'));

   const contactsCollection = useCollection(q);

   async function addContact(contact){
      await addDoc(collection(db,'contacts'),contact);
   }

   async function updateContact(docRef,contact){
      await updateDoc(docRef,contact);
   }

   async function deleteContact(id){
      const docRef = doc(db,'contacts',id);
      const docSnap = await getDoc(docRef);

      if(docSnap.exists()){
         await deleteDoc(docRef);
      }else{
         console.log('No se encontro el documento');
      }

   }

   return{
      addContact,
      updateContact,
      deleteContact,
      contactsCollection,
      countryOptions
   }
});