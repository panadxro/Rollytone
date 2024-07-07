<script setup>
import { watch } from 'vue';
// import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

import { useAlbums } from '@/data/explore';
// import { useDBs } from '@/data/db';

// import { useLoading } from '@/data/loading';
// const database = useDBs();
const albumsCatalog = useAlbums();
// const loading = useLoading();
const route = useRoute();

albumsCatalog.getAlbumDetail(route.params.id);

/* watch(() => albumsCatalog.albumDetail, (newVal) => {
  console.log('Album detallado:', newVal)
}) */
/* onMounted(() => {
  database.addVisto('chau')
});
 */
</script>

<template>
<!--     <div v-if="!loading.loading.albumDetail">
        <Loading />
    </div> -->
    <article class="group relative flex flex-col lg:flex-row lg:items-center" v-if="albumsCatalog.albumDetail[0]">
    <div class="absolute left-28 top-2 translate-y-20 transition-all duration-500 opacity-0 group-hover:translate-y-28 group-hover:opacity-100 z-10 bg-zinc-800 rounded-full aspect-square">
      <button @click="albumsCatalog.buttonFav(albumsCatalog.albumDetail[0].id)" type="button" class="card-play-button text-xs font-bold text-white p-4">
        <!-- <i :class="esFavorito ? 'fa-solid' : 'fa-regular'" class="fa-heart"></i> -->
        Agregar
      </button>
    </div>
    <picture class="w-full h-auto flex-none lg:w-1/3">
        <img :src="`${albumsCatalog.albumDetail[0].cover}`" :alt="`${albumsCatalog.albumDetail[0].artist} - ${albumsCatalog.albumDetail[0].year}`" class="object-cover rounded-md coverAlbum md:max-w-md mx-auto">
      </picture>
      <div class="flex flex-col px-2 truncate nombreAlbum lg:px-6 lg:flex-wrap">
        <h4 class="text-white font-bold lg:mb-4 lg:absolute lg:top-1/2">{{ albumsCatalog.albumDetail[0].title }}</h4>
        <span class="text-sm text-gray-400 lg:absolute lg:bottom-0">{{ albumsCatalog.albumDetail[0].artist }} - {{ albumsCatalog.albumDetail[0].year }}</span>
      </div>
  </article>

  <section v-if="albumsCatalog.albumDetail.length > 0 && albumsCatalog.albumDetail[0].tracks.length > 0" class="mt-4 tracks">
    <div class="flex justify-between mb-6 border-b border-gray-400 titulo">
      <h5 class="text-gray-400 text-s mb-3">Titulo</h5>
      <i class="fa-regular fa-clock icono mb-3" style="color: #9ca3af;"></i>    
    </div>
    <ul>
      <li v-for="track in albumsCatalog.albumDetail[0].tracks" :key="track.id" class="flex justify-between items-center mb-5 text-gray-400">
        <span class="font-semibold text-white">{{ track.name }}</span>
        <span class="duracion">{{ (track.duration / 60000).toFixed(2) }}</span>
      </li>
    </ul>
  </section>

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

<style scoped>

.nombreAlbum{
    margin-top: 2rem;
    padding-left: 0;
  }
  .nombreAlbum span{
    margin-top: 0.3rem;
  }
  .coverAlbum{
    margin-top: 2rem;
  }

@media (max-width: 480px) {
  .coverAlbum {
    max-width: 50%;
  }
  .nombreAlbum{
  margin-left: 1.5rem;
}
.nombreAlbum h4{
  font-size: 15px;
}
.titulo{
  display: none;
}
.duracion{
  display: none;
}
.tracks{
  margin-top: 2rem;
}
.tracks span{
  margin-left: 1.5rem;
  font-size: 14px
}
}

@media (min-width: 481px) and (max-width: 1023px) {
.coverAlbum {
 max-width: 50%;
 margin-top: 2rem;
}
.nombreAlbum{
  margin-left: 1.5rem;
}
.nombreAlbum h4{
  font-size: 18px;
}
.titulo{
  display: none;
}
.duracion{
  display: none;
}
.tracks{
  margin-top: 2rem;
}
.tracks span{
  margin-left: 1.5rem;
  font-size: 16px
}
}

@media (min-width: 1024px) {
  .coverAlbum {
    max-width: 70%;
  }
  .nombreAlbum h4{
    font-size: 34px;
  }
  .nombreAlbum span{
    margin-top: 1rem;
  }
  .tracks{
    margin-top: 3rem;
    margin-left: 2.5rem;
    margin-right: 2rem;
  }
  .tracks h5{
    margin-right: 1.5rem;
    margin-left: 1.5rem
  }
  .tracks span{
    margin-right: 1.5rem;
    margin-left: 1.5rem
  }
  .icono{
    margin-right: 1.9rem;
  }
}

</style>