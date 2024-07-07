<script setup>
import Albums from '../components/Albums.vue';

import { ref } from 'vue';
import { useAlbums } from '@/data/explore';
import { onMounted } from 'vue';
import { useDBs } from '@/data/db';

const albumsCatalog = useAlbums();
const search = ref('');
const database = useDBs();

const handleSearch = () => {
  albumsCatalog.search = search.value;
  albumsCatalog.getAlbums('busqueda');
};

onMounted(() => {
  database.showData('vistos');
  database.setUpListeners('vistos');
});

const genres = ['Rock', 'Reggaeton', 'Punk', 'Pop', 'Jazz', 'Metal']

const searchByGenre = (genre) => {
  search.value = genre;
  handleSearch();
}
</script>

<template>
  <div class="relative z-10 px-6 pt-10">
    <form @submit.prevent="handleSearch">
      <input class="mb-6 py-2 px-6 rounded-full w-80 bg-transparent border-2 text-white inputSearch" id="buscar" type="text" v-model="search" placeholder="Ingresa el título del álbum">
    </form>
    <div class="mb-4">
      <button
        v-for="genre in genres"
        :key="genre"
        @click="searchByGenre(genre)"
        class="mr-2 mb-2 px-4 py-2 rounded-full bg-zinc-800 text-white font-bold hover:bg-zinc-700"
      >
        {{ genre }}
      </button>
    </div>
    <h1 class="text-xl font-bold text-white">{{ albumsCatalog.search ? 'Resultados' : 'Buscados recientemente' }}</h1>
    <div v-if="albumsCatalog.search" class="flex flex-wrap mt-6 gap-4 albumes">
      <Albums v-for="album in albumsCatalog.albumsSearch" 
        :key="album.id" 
        :album="album"
      </Albums>
    </div>
    <div v-else class="flex flex-wrap mt-6 gap-4 albumes">
      <Albums v-for="album in database.vistos" 
        :key="album.id" 
        :album="album"
      </Albums>
    </div>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}

@media (max-width: 1023px) {
  .inputSearch{
    max-width: 100%;
  }
  .albumes{
    display: flex;
    justify-content: start;
  }
}
</style>
