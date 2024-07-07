<script setup>
import { ref, watch } from 'vue';

import { RouterLink } from 'vue-router';
import { useAlbums } from '@/data/explore';
import { useDBs } from '@/data/db';

const albumsCatalog = useAlbums();
const database = useDBs();

const props = defineProps({
  album: {
    type: Object,
    required: false
  }
})

// const esFavorito = ref(albumsCatalog.isFavorite(props.album.id));

/* watch(
  () => props.album.id,
  (newId) => {
    esFavorito.value = albumsCatalog.isFavorite(newId);
  }
); */

const toggleFavorito = async () => {
  // await albumsCatalog.agregarFavorito(props.album.id);
  await albumsCatalog.buttonFav(props.album.id);
  // esFavorito.value = albumsCatalog.isFavorite(props.album.id);
};
</script>


<template>
  <article class="group relative">
    <div class="absolute left-28 top-2 translate-y-20 transition-all duration-500 opacity-0 group-hover:translate-y-28 group-hover:opacity-100 z-10 bg-zinc-800 rounded-full aspect-square">
      <button @click="toggleFavorito" type="button" class="card-play-button text-xs font-bold text-white p-4">
        <!-- <i :class="esFavorito.value ? 'fa-solid' : 'fa-regular'" class="fa-heart"></i> -->
      </button>
    </div>
    <a class="playlist-item transition-all duration-300 flex relative p-2 overflow-hidden gap-2 pb-6 rounded-md hover:bg-zinc-800 shadow-lg hover:shadow-lg w-40 flex-col">
      <RouterLink :to="`/album/${album?.id.replace('spotify:album:', '')}`">
      <picture class="aspect-square w-full h-auto flex-none">
        <img :src="`${props.album.cover}`" :alt="`${props.album.artist} - ${props.album.title}`" class="object-cover w-full h-full rounded-md">
      </picture>
      <div class="flex flex-auto flex-col px-2 truncate">
        <h4 class="text-white text-sm">{{ album?.title }}</h4>
        <span class="text-xs text-gray-400">{{ album?.artist }} - {{ album?.year }}</span>
      </div>
      </RouterLink>
    </a>
  </article>
</template>

<!-- <script>
 export default {
  props: {
    
    id: String,
    titulo: String,
    artista: String,
    anio: Number,
    portada: String,
    esFavorito: Boolean
  },
  methods: {
    addFav() {
      this.$emit('agregar', this.id);
    }
  }
}
</script> -->

