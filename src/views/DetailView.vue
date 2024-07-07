<script setup>
import albumDetail from '../components/AlbumDetail.vue';

import { useAlbums } from '@/data/explore';
import { onMounted } from 'vue';

const albumsCatalog = useAlbums();

onMounted(() => {
   albumsCatalog.getAlbumDetail();
});
</script>

<template>
  <div>
    <h1 class="text-xl font-bold text-white">Album</h1>
    <div class="flex flex-wrap mt-6 gap-4">
      <albumDetail v-for="album in albumsCatalog.albumDetail" 
        :key="album.id" 
        :album="album">
        </albumDetail>
    </div>
  </div>
</template>