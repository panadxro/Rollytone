import { defineStore } from 'pinia';
import { useLoading } from '@/data/loading';

let loading = null;

export const useAlbums = defineStore('albums',{
  state: () => {
    return {
      albums: [],
      error: ''
    };
  },  
  actions: {
    async getAlbums() {
      loading = useLoading();
      loading.loading.albums = false;
      this.albums = [];

      let url = `https://api.spotify.com/v1/browse/new-releases`;
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': `${import.meta.env.VITE_API_KEY}`,
          'X-RapidAPI-Host': `${import.meta.env.VITE_API_URL}`
        }
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        this.albums = result.albums;
        loading.loading.albums = true;
        
        if (result.albums && result.albums.items.length > 0) {
            this.albums = result.albums.items.map(item => ({
              id: item.data.uri,
              title: item.data.name,
              artist: item.data.artists.items[0].profile.name,
              year: item.data.date.year,
              cover: item.data.coverArt.sources[0].url
            }));
            console.log(this.albums);

            localStorage.setItem('exploreAlbums', JSON.stringify(this.exploreAlbums));
        } else {
            this.error = 'No se encontraron álbumes.';
        }
      } catch (error) {
        console.error('Error al buscar álbumes:', error);
      }
    }
  }
})