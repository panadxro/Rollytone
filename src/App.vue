<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { ref } from 'vue';
import { onMounted } from 'vue';

import { useAlbums } from '@/data/explore';
import { useDBs } from '@/data/db';

import Favs from './components/Favs.vue';

const database = useDBs();
const albumsCatalog = useAlbums();

onMounted(() => {
  albumsCatalog.getAlbums('explore');
  database.showData('favs');
  database.setUpListeners('favs');
});
</script>

<template>
  <div class="app relative h-screen p-2 gap-2 flex items-stretch">
    <aside class="[grid-area:aside] flex-col flex overflow-y-hidden">
      <nav class="flex flex-col flex-1 gap-2">
        <div class="bg-zinc-900 rounded-lg p-2">
          <router-link 
            to="/"
            :class="{ 'active': $route.path === '/' }" 
            class="flex gap-4 text-zinc-400 hover:text-zinc-100 items-center py-3 px-5 font-medium transition duration-300"
          >
            <i class="fa-solid fa-house"></i><span class="hidden sm:inline">Inicio</span>
          </router-link>
          <router-link 
            to="/search"
            :class="{ 'active': $route.path === '/search' }"
            class="flex gap-4 text-zinc-400 hover:text-zinc-100 items-center py-3 px-5 font-medium transition duration-300"
          >
            <i class="fa-solid fa-magnifying-glass"></i><span class="hidden sm:inline">Buscar</span>
          </router-link>
        </div>
        <div class="aside-carrito bg-zinc-900 rounded-lg p-2 flex-1 overflow-y-hidden h-full">
          <h2 class="flex gap-4 text-zinc-400 hover:text-zinc-100 items-center py-3 px-5 font-medium transition duration-300">
            <i class="fa-solid fa-bookmark"></i><span class="hidden sm:inline">Mis favoritos</span>
          </h2>
          <div class="overflow-hidden mb-6">
            <div class="lista-favoritos">
              <Favs v-for="(album, index) in database.favs" :key="album.id" :favs="album"></Favs>
              <Favs v-for="(album, index) in albumsCatalog.favs" :key="album.id" :favs="album"></Favs>
            </div>
          </div>
        </div>
      </nav>
    </aside>
    
    <main class="[grid-area:main] rounded-lg bg-zinc-900 overflow-y-auto pb-6">
      <router-view></router-view>
    </main>
  </div>
</template>

<style scoped>
  html {
  font-family: system-ui, sans-serif;
  background-color: #000;
}
.app {
  display: grid;
  grid-template-areas: 
    "aside main main";
  grid-template-columns: 350px 1fr;
  grid-template-rows: 1fr;
}

@media (max-width: 641px) {
  .app {
    display: grid;
    grid-template-areas: 
      "aside main main";
    grid-template-columns: 80px 1fr;
    grid-template-rows: 1fr;
  }
}
/* .aside-carrito {
  max-height: 80%;
} */

.lista-favoritos {
  overflow-y: scroll;
  max-height: 22rem;
  /* padding-bottom: 20rem; */
}
.active {
  color:#fff !important;
}
/* Scroll */
main::-webkit-scrollbar {
  width: 12px;
}
main::-webkit-scrollbar-track {
  background-color: rgba(0, 0, 0, 0);
}
main::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, .1);
  border-radius: 1rem;
}
main::-webkit-scrollbar-thumb:hover {
  background-color: #555; 
}
.lista-favoritos::-webkit-scrollbar {
  width: 12px;
}
.lista-favoritos::-webkit-scrollbar-track {
  background-color: rgba(0, 0, 0, 0);
}
.lista-favoritos::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, .1);
  border-radius: 1rem;
}
.lista-favoritos::-webkit-scrollbar-thumb:hover {
  background-color: #555; 
}
</style>