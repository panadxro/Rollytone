<script setup>
import Albums from '../components/Albums.vue';

import { useLoading } from '@/data/loading';
import { useAlbums } from '@/data/explore';
import { onMounted } from 'vue';

const loading = useLoading();
const albumsCatalog = useAlbums();

onMounted(() => {
  albumsCatalog.search = null;
  // albumsCatalog.getAlbums();
});
</script>

<template>
  <div>
    <h1 class="text-xl font-bold text-white">Explorar</h1>
    <div class="flex flex-wrap mt-6 gap-4">
<!--       <div v-if="loading.loading.albums" class="w-full">
        LOADING
      </div> -->
      <Albums v-for="album in albumsCatalog.albums" 
        :key="album.id" 
        :album="album"
      </Albums>
<!--       <albums
        v-for="album in exploreAlbums"
        :key="album.id"
        :id="album.id"
        :titulo="album.title"
        :artista="album.artist"
        :anio="album.year"
        :portada="album.cover"
        :es-favorito="isFav(album.id)"
        @agregar="onAgregar(album.id)"
      ></albums> -->
    </div>
  </div>
</template>

<!-- <script>
export default {
  props: {
    isFav: {
      type: Function,
      required: true
    },
    agregarFavorito: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      exploreAlbums: [],
      error: ''
    };
  },
  created() {
    console.log('explore')
    this.loadExploreAlbums();
  },
  methods: {
    async loadExploreAlbums() {
      // Intentar obtener los datos desde localStorage
      const storedAlbums = localStorage.getItem('exploreAlbums');
      if (storedAlbums) {
        this.exploreAlbums = JSON.parse(storedAlbums);
        // console.log(this.exploreAlbums);
        console.log('Cargando datos de localStorage');
      } else {
        console.log('Haciendo nueva petición a la API');
        await this.explore(); // Si no hay datos almacenados, hacer la petición a la API
      }
    },
    async explore() {
      const letraRandom = String.fromCharCode(97 + Math.floor(Math.random() * 26));
      const url = `https://spotify23.p.rapidapi.com/search/?q=${letraRandom}&type=album&offset=0&limit=10`;
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
        console.log(result);
        
        if (result.albums && result.albums.items.length > 0) {
            this.exploreAlbums = result.albums.items.map(item => ({
                id: item.data.uri,
                title: item.data.name,
                artist: item.data.artists.items[0].profile.name,
                year: item.data.date.year,
                cover: item.data.coverArt.sources[0].url
            }));

            localStorage.setItem('exploreAlbums', JSON.stringify(this.exploreAlbums));
        } else {
            this.error = 'No se encontraron álbumes.';
        }
      } catch (error) {
        console.error('Error al buscar álbumes:', error);
        this.error = 'Ocurrió un error al buscar los álbumes.';
      }
    },
    async onAgregar(id) {
      console.log('onAgregar')
      await this.agregarFavorito(id);
    }
  },
  components: {
    'albums': Albums
  }
};
</script> -->
