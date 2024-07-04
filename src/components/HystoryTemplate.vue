<script>
    export default {
        name: 'ProductList',
        data() {
            return {
                busqueda: '',
                albums: [],
                exploreAlbums: [],
                favs: [],
            }
        },
        mounted() {
            this.searchAlbum();
        },
        methods: {
          async searchAlbum() {
          if (!this.busqueda) {
            this.albums = [];
            return
          }
          this.error = '';
          this.albums = [];

          // const url = `https://spotify23.p.rapidapi.com/search/?q=${encodeURIComponent(this.busqueda)}&type=album&offset=0&limit=10`;
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
              console.log('API Response:', result.albums);

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
          }
      }
        }
    }
</script>

<template>

    <article v-for="album in favs" class="group relative">
      <div class="absolute left-28 top-2 translate-y-20 transition-all duration-500 opacity-0 group-hover:translate-y-28 group-hover:opacity-100 z-10 bg-zinc-800 rounded-full aspect-square">
        <button v-on:click="addFav" type="button" class="card-play-button text-xs font-bold text-white p-4">
          <i :class="esFavorito ? 'fa-solid' : 'fa-regular'" class="fa-heart"></i>
        </button>
      </div>
      <a class="playlist-item transition-all duration-300 flex relative p-2 overflow-hidden gap-2 pb-6 rounded-md hover:bg-zinc-800 shadow-lg hover:shadow-lg w-40 flex-col">
        <picture class="aspect-square w-full h-auto flex-none">
          <img :src="album.cover" :alt="titulo" class="object-cover w-full h-full rounded-md">
        </picture>
        <div class="flex flex-auto flex-col px-2 truncate">
          <h4 class="text-white text-sm">{{ album.title }}</h4>
          <span class="text-xs text-gray-400">{{ album.artist }} - {{ album.year }}</span>
        </div>
      </a>
    </article>
</template>

<style>

</style>