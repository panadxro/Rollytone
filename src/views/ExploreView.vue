<script setup>
import Albums from '../components/Albums.vue';
import { useAlbums } from '@/data/explore';
import { onMounted } from 'vue';

const albumsCatalog = useAlbums();

onMounted(() => {
  albumsCatalog.search = null;
});
</script>

<template>
  <div class="relative z-10 px-6 pt-10">
    <h1 class="text-xl font-bold text-white">Explorar</h1>
    <div class="flex flex-wrap mt-6 gap-4 albumes">
      <Albums v-for="album in albumsCatalog.albums" 
        :key="album.id" 
        :album="album"
      </Albums>
    </div>
  </div>
</template>