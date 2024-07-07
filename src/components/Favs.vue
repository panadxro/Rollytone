<script setup>
import { useAlbums } from '@/data/explore';

const albumsCatalog = useAlbums();

const props = defineProps({
  favs: {
    type: Object,
    required: true
  }
})
const toggleFavorito = async () => {
  await albumsCatalog.buttonFav(props.favs.id);
  albumsCatalog.isFavorite(props.favs.id)
};
</script>

<template>
  <article class="group relative sm:w-15 sm:h-15 w-full h-auto md:aspect-w-1 md:aspect-h-1">
    <div class="playlist-item flex relative p-2 overflow-hidden items-center gap-5 rounded-md hover:bg-zinc-800">
      <picture class="h-12 w-12 flex-none">
        <img :src="`${props.favs.cover}`" :alt="`${props.favs.artist} - ${props.favs.title}`" class="object-cover w-full h-full rounded-md">
      </picture>
      <div class="flex flex-auto flex-col truncate hidden sm:flex">
        <h3 class="text-white text-sm">{{ favs?.title }}</h3>
        <span class="text-xs text-gray-400">{{ favs?.artist }} {{ favs?.year }}</span>
      </div>
      <div class="absolute right-4 bottom-8 translate-y-4 transition-all duration-500 opacity-0 group-hover:translate-y-4 group-hover:opacity-100 z-10">
        <button @click="toggleFavorito" type="button" class="card-play-button text-xs font-bold text-white p-4">
          <i :class="albumsCatalog.isFavorite(props.favs.id) ? 'fa-solid' : 'fa-regular'" class="fa-heart"></i>
        </button>
      </div>
    </div>
  </article>
</template>

<style scoped>
@media (max-width: 642px){
  button{
    color: transparent;
  }
}

</style>