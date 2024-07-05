import { defineStore } from 'pinia';
import { useLoading } from '@/data/loading';

let loading = null;

export const useAlbums = defineStore('albums',{
  state: () => {
    return {
      albums: [],
      favs: [],
      albumDetail: {},
      search: '',
      error: ''
    };
  },  
  actions: {
    async getAlbums() {
      console.log(this.search)
      loading = useLoading();
      loading.loading.albums = false;
      this.albums = [];

      let url = `https://${import.meta.env.VITE_API_URL}/search/?q=rock&type=album&offset=0&limit=10`;
      if (this.search) {
        url = `https://${import.meta.env.VITE_API_URL}/search/?q=${this.search}&type=album&offset=0&limit=10`;
      }
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': `${import.meta.env.VITE_API_KEY}`,
          'X-RapidAPI-Host': `${import.meta.env.VITE_API_URL}`
        }
      };

      try {
        console.log(url)
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
        } else {
            this.error = 'No se encontraron álbumes.';
        }
      } catch (error) {
        console.error('Error al buscar álbumes:', error);
      }
    },
    async getAlbumDetail(id) {
      console.log(id);
      loading = useLoading();
      loading.loading.albumDetail = false;

      let url = `https://${import.meta.env.VITE_API_URL}/albums/?ids=${id}`;
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': `${import.meta.env.VITE_API_KEY}`,
          'X-RapidAPI-Host': `${import.meta.env.VITE_API_URL}`
        }
      };
      try{
        const response = await fetch(url, options);
        const data = await response.json();
        console.log(data)
        this.albumDetail = {
          id: data.id,
          title: data.name,
          artist: data.artists[0].name,
          year: data.release_date,
          cover: data.images.length > 0 ? data.images[1].url : (data.images.length > 0 ? data.images[0].url : '')
        };
        loading.loading.albumDetail = true;
      } catch (error) {
        console.error('Error al obtener el detalle del album', error);
      }

    },
    async agregarFavorito(id) {
      console.log('intentando agregar a favs')
      const albumIndex = this.favs.findIndex(item => item.id === id);
      
      if (albumIndex > -1) {
        this.favs.splice(albumIndex, 1);
      } else {
        // Buscar en this.albums y this.exploreAlbums según sea necesario
        let album = this.albums.find(item => item.id === id);
        if (!album) {
        album = this.exploreAlbums.find(item => item.id === id);
        }
        
        if (album) {
          this.favs.push(album);
          console.log(this.favs)
        } else {
          console.error('El álbum no se encontró en ninguna lista.');
        }
      }}
  }
})