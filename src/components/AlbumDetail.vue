<script setup>
import { useRoute } from 'vue-router';
import { useAlbums } from '@/data/explore';
import { watch } from 'vue';
// import { useLoading } from '@/data/loading';

const albumsCatalog = useAlbums();
// const loading = useLoading();
const route = useRoute();

albumsCatalog.getAlbumDetail(route.params.id);

watch(() => albumsCatalog.albumDetail, (newVal) => {
  console.log('Album detallado:', newVal)
})

</script>

<template>
  <h1>hola</h1>
<!--     <div v-if="!loading.loading.albumDetail">
        <Loading />
    </div> -->
    <article class="group relative" v-if="albumsCatalog.albumDetail[0]">
    <div class="absolute left-28 top-2 translate-y-20 transition-all duration-500 opacity-0 group-hover:translate-y-28 group-hover:opacity-100 z-10 bg-zinc-800 rounded-full aspect-square">
      <button @click="albumsCatalog.agregarFavorito(albumsCatalog.albumDetail[0].id)" type="button" class="card-play-button text-xs font-bold text-white p-4">
        <!-- <i :class="esFavorito ? 'fa-solid' : 'fa-regular'" class="fa-heart"></i> -->
        Agregar
      </button>
    </div>
    <picture class="aspect-square w-full h-auto flex-none">
        <img :src="`${albumsCatalog.albumDetail[0].cover}`" :alt="`${albumsCatalog.albumDetail[0].artist} - ${albumsCatalog.albumDetail[0].year}`" class="object-cover w-full h-full rounded-md">
      </picture>
      <div class="flex flex-auto flex-col px-2 truncate">
        <h4 class="text-white text-sm">{{ albumsCatalog.albumDetail[0].title }}</h4>
        <span class="text-xs text-gray-400">{{ albumsCatalog.albumDetail[0].artist }} - {{ albumsCatalog.albumDetail[0].year }}</span>
      </div>
  </article>
</template>

<script>
 export default {
/*   props: {
    
    id: String,
    titulo: String,
    artista: String,
    anio: Number,
    portada: String,
    esFavorito: Boolean
  }, */
  methods: {
    addFav() {
      this.$emit('agregar', this.id);
    }
  }
}
</script>