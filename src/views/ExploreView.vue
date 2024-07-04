<script>
import Albums from '../components/Albums.vue';

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
    this.explore();
  },
  methods: {
    async explore() {
      const letraRandom = String.fromCharCode(97 + Math.floor(Math.random() * 26));
      // const url = `https://spotify23.p.rapidapi.com/search/?q=${letraRandom}&type=album&offset=0&limit=10`;
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
            this.exploreAlbums = result.albums.items.map(item => ({
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
      }
    }
  },
  components: {
    'albums': Albums
  }
};
</script>

<template>
  <div>
    <h1 class="text-xl font-bold text-white">Explorar</h1>
    <div class="flex flex-wrap mt-6 gap-4">
      <albums
        v-for="album in exploreAlbums"
        :key="album.id"
        :id="album.id"
        :titulo="album.title"
        :artista="album.artist"
        :anio="album.year"
        :portada="album.cover"
        :es-favorito="isFav(album.id)"
        @agregar="agregarFavorito(album.id)"
      ></albums>
    </div>
  </div>
</template>