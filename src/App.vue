<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { ref } from 'vue';
import { onMounted } from 'vue';

import { useAlbums } from '@/data/explore';

const albumsCatalog = useAlbums();

</script>

<!-- <script>
import Favs from './components/Favs.vue';
import SearchView from './views/SearchView.vue';

export default {
  data() {
    return {
      favs: [],
      albums: [],
      exploreAlbums: [],
      error: ''
    };
  },
  created() {
    this.leerFavoritosLocal();
  },
  methods: {
    leerFavoritosLocal() {
      const favsStorage = JSON.parse(localStorage.getItem('favs'));
      this.favs = favsStorage ? favsStorage : [];
    },
    guardarFavs() {
      localStorage.setItem('favs', JSON.stringify(this.favs));
    },
    isFav(albumId) {
      return this.favs.some(album => album.id === albumId);
    },
    async agregarFavorito(id) {
      console.log('intentando agregar a favs')
      const albumIndex = this.favs.findIndex(item => item.id === id);
      
      if (albumIndex > -1) {
        this.favs.splice(albumIndex, 1);
      } else {
        // Buscar en this.albums y this.exploreAlbums según sea necesario
        let album = this.albums.find(item => item.id === id);
        if (!album) {
        album = this.exploreAlbums.find(item => item.id === id);
        }
        
        if (album) {
          this.favs.push(album);
        } else {
          console.error('El álbum no se encontró en ninguna lista.');
        }
      }
      
      // Guardar los favoritos actualizados en localStorage
      this.guardarFavs();
      console.log('Después de agregar/quitar a favs:', this.favs);
    },
  },
  components: {
    Favs,
    ExploreView,
    SearchView,
  }
};
</script> -->


<template>
  <div id="app" class="relative h-screen p-2 gap-2 flex items-stretch">
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
          <div class="lista-carrito overflow-y-auto pb-6">
<!--             <favs 
              v-for="(album, index) in favs"
              :key="album.id"
              :id="album.id"
              :titulo="album.title"
              :artista="album.artist"
              :anio="album.year"
              :portada="album.cover"
              :es-favorito="isFav(album.id)"
              @agregar="agregarFavorito(album.id)"
            ></favs> -->
          </div>
        </div>
      </nav>
    </aside>
    
    <main class="[grid-area:main] rounded-lg bg-zinc-900 overflow-y-auto pb-6">
      <router-view></router-view>
    </main>
    
    <footer class="[grid-area:player] min-h-[25px] text-white text-center">
      <p>DV | Progresive Web Applications | Panadero Lucas</p>
    </footer>
  </div>
</template>

<style scoped>
  html {
  font-family: system-ui, sans-serif;
  background-color: #000;
}
#app {
  display: grid;
  grid-template-areas: 
    "aside main main"
    "player player player";
  grid-template-columns: 350px 1fr;
  grid-template-rows: 1fr auto;
}

@media (max-width: 641px) {
  #app {
    display: grid;
    grid-template-areas: 
      "aside main main"
      "player player player";
    grid-template-columns: 80px 1fr;
    grid-template-rows: 1fr auto;
  }
}
.aside-carrito {
  max-height: 80%;
}

.lista-carrito {
  overflow-y: auto;
  max-height: 65%;
  padding-bottom: 20rem;
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
.lista-carrito::-webkit-scrollbar {
  width: 12px;
}
.lista-carrito::-webkit-scrollbar-track {
  background-color: rgba(0, 0, 0, 0);
}
.lista-carrito::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, .1);
  border-radius: 1rem;
}
.lista-carrito::-webkit-scrollbar-thumb:hover {
  background-color: #555; 
}
</style>
