<script setup>
import Albums from '../components/Albums.vue';

import { ref } from 'vue';
import { useAlbums } from '@/data/explore';
import { onMounted } from 'vue';

const albumsCatalog = useAlbums();
const search = ref('');

const handleSearch = () => {
  albumsCatalog.search = search.value;
  albumsCatalog.getAlbums();
};

onMounted(() => {
  console.log('Busqueda en proceso')
});
</script>

<template>
  <div class="relative z-10 px-6 pt-10">
    <form @submit.prevent="handleSearch">
      <input class="mb-6 py-2 px-6 rounded-full w-80 bg-transparent border-2 text-white" id="buscar" type="text" v-model="search" placeholder="Ingresa el título del álbum">
    </form>
    <h1 class="text-xl font-bold text-white">{{ albumsCatalog.search ? 'Resultados' : 'Buscados recientemente' }}</h1>
    <!-- <h1 v-if="error" class="text-xl font-bold text-white">{{ error }}</h1> -->
    <div class="flex flex-wrap mt-6 gap-4">
      <Albums v-for="album in albumsCatalog.albums" 
        :key="album.id" 
        :album="album"
      </Albums>
    </div>
  </div>
</template>

<!-- <script>

export default {
  data() {
    return {
      busqueda: '',
      albums: [],
      error: ''
    };
  },
  methods: {
    async searchAlbum() {
      if (!this.busqueda) {
        this.albums = [];
        return;
      }
      this.error = '';
      this.albums = [];

      const url = `https://spotify23.p.rapidapi.com/search/?q=${encodeURIComponent(this.busqueda)}&type=album&offset=0&limit=10`;
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': '94b9b8f666msh537ecaf7787af34p16a305jsnf2d1b397b450',
          'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
        }
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();

        if (result.albums && result.albums.items.length > 0) {
          this.albums = result.albums.items.map(item => ({
            id: item.data.uri,
            title: item.data.name,
            artist: item.data.artists.items[0].profile.name,
            year: item.data.date.year,
            cover: item.data.coverArt.sources[0].url
          }));
        } else {
          this.error = 'No se encontraron álbumes.';
        }
      } catch (error) {
        this.error = 'Ocurrió un error al buscar los álbumes.';
        console.error('Error en la solicitud fetch:', error);
      }
    },
    isFav(albumId) {
      //return this.$root.isFav(albumId);
      return this.$parent.isFav(albumId);
    },
    agregarFavorito(id) {
      //this.$root.agregarFavorito(id);
      this.$parent.agregarFavorito(id);
    }
  },
  components: {
    'albums': Albums
  }
};
</script> -->

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
