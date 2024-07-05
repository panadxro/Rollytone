<script setup>
import { useRoute } from 'vue-router';
import { useAlbums } from '@/data/explore';
import { useLoading } from '@/data/loading';

const albumsCatalog = useAlbums();
const loading = useLoading();
const route = useRoute();

albumsCatalog.getAlbumDetail(route.params.id);
</script>

<template>
<!--     <div v-if="!loading.loading.albumDetail">
        <Loading />
    </div> -->
    <article class="group relative">
    <div class="absolute left-28 top-2 translate-y-20 transition-all duration-500 opacity-0 group-hover:translate-y-28 group-hover:opacity-100 z-10 bg-zinc-800 rounded-full aspect-square">
      <!-- <button @click="addFav" type="button" class="card-play-button text-xs font-bold text-white p-4">
        <i :class="esFavorito ? 'fa-solid' : 'fa-regular'" class="fa-heart"></i>
      </button> -->
    </div>
    <picture class="aspect-square w-full h-auto flex-none">
        <img :src="`${albumsCatalog.albumDetail.cover}`" :alt="`${albumsCatalog.albumDetail.artist} - ${albumsCatalog.albumDetail.title}`" class="object-cover w-full h-full rounded-md">
      </picture>
      <div class="flex flex-auto flex-col px-2 truncate">
        <h4 class="text-white text-sm">{{ albumsCatalog.albumDetail.title }}</h4>
        <span class="text-xs text-gray-400">{{ albumsCatalog.albumDetail.artist }} - {{ albumsCatalog.albumDetail.year }}</span>
      </div>
  </article>
</template>