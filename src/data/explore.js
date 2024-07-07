import { defineStore } from 'pinia';
import { useLoading } from '@/data/loading';
import { useDBs } from '@/data/db';


let loading = null;
let database = null;

export const useAlbums = defineStore('albums',{
  state: () => {
    return {
      albums: JSON.parse(localStorage.getItem('albums')) ?? [],
      albumsSearch: [],
      favs: JSON.parse(localStorage.getItem('favs')) ?? [],
      albumDetail: {},
      search: '',
      vistosRecientemente: JSON.parse(localStorage.getItem('vistosRecientemente')) ?? [],
      error: ''
    };
  },  
  getters: {
    
    /* favoriteORITE? */
    isFavoriteorite: (state) => (id) => {
      return state.favs.some(album => album.id === id);
    }
  },
  actions: {
    async loadExploreAlbums() {
      // Intentar obtener los datos desde localStorage
      const storedAlbums = localStorage.getItem('albums');
      if (storedAlbums) {
        this.albums = JSON.parse(storedAlbums);
      } else {
        console.log('Haciendo nueva petición a la API');
        await this.getAlbums('explore'); // Si no hay datos almacenados, hacer la petición a la API
      }
    },
    async getAlbums(catalog) {
      loading = useLoading();
      loading.loading.albums = false;
      // this.albums = [];

      let url = `https://${import.meta.env.VITE_API_URL}/search/?q=rock&type=album&offset=0&limit=10`;
      if (catalog === 'busqueda') {
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
        const response = await fetch(url, options);
        const result = await response.json();
        // this.albums = result.albums;
        // loading.loading.albums = true;
        if (result.albums && result.albums.items.length > 0) {
            const loadAlbums = result.albums.items.map(item => ({
              id: item.data.uri,
              title: item.data.name,
              artist: item.data.artists.items[0].profile.name,
              year: item.data.date.year,
              cover: item.data.coverArt.sources[0].url,
              esFavorito: this.isFavorite(item.data.uri)
            }));
            // console.log(this.albums)
            if(catalog === 'busqueda') {
              this.albumsSearch = loadAlbums;
            } else if (catalog === 'explore') {
              this.albums = loadAlbums;
              localStorage.setItem("albums", JSON.stringify(this.albums));
              console.log('Datos almacenados en localStorage')
            }
        } else {
            this.error = 'No se encontraron álbumes.';
        }
      } catch (error) {
        console.error('Error al buscar álbumes:', error);
      }
    },
    /* async getAlbumsSearch() {
      this.albumsSearch = [];
      let url = `https://${import.meta.env.VITE_API_URL}/search/?q=${this.search}&type=album&offset=0&limit=10`;


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
        
        if (result.albums && result.albums.items.length > 0) {
            this.albumsSearch = result.albums.items.map(item => ({
              id: item.data.uri,
              title: item.data.name,
              artist: item.data.artists.items[0].profile.name,
              year: item.data.date.year,
              cover: item.data.coverArt.sources[0].url,
              esFavorito: this.isFavorite(item.data.uri)
            }));
            console.log(this.albumsSearch)
        } else {
            this.error = 'No se encontraron álbumes.';
        }
      } catch (error) {
        console.error('Error al buscar álbumes:', error);
      }
    }, */
    async getAlbumDetail(id) {
      database = useDBs();
      // console.log(id);
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
        const result = await response.json();
        this.albumDetail = result.albums.map(item => ({
          id: item.uri,
          title: item.name,
          artist: item.artists[0].name,
          year: new Date(item.release_date).getFullYear(),
          cover: item.images[0].url,
          esFavorito: this.isFavorite(item.uri),
          tracks: item.tracks.items.map(track => ({
            id: track.id,
            name: track.name,
            duration: track.duration_ms
          })),
        }));
        // console.log(this.albumDetail)
        this.vistosRecientemente.push(this.albumDetail[0])
        localStorage.setItem("vistosRecientemente", JSON.stringify(this.vistosRecientemente));
        database.addData(this.albumDetail[0], 'visto')
        // console.log(this.vistosRecientemente)
        loading.loading.albumDetail = true;
      } catch (error) {
        console.error('Error al obtener el detalle del album', error);
      }

    },
    async agregarFavorito(id) {
      database = useDBs();
      const albumIndex = this.favs.findIndex(item => item.id === id);
      
      if (albumIndex > -1) {
        // Eliminar el album de favoritos
        this.favs[albumIndex].esFavorito = false;
        this.favs.splice(albumIndex, 1);
        localStorage.setItem("favs", JSON.stringify(this.favs));
        // console.log('Album eliminado de favoritos')
        
      } else {
        // Buscar en this.albums y this.exploreAlbums según sea necesario
        let album = this.albums.find(item => item.id === id);

        if (!album) {
        album = this.albumsSearch.find(item => item.id === id);
        }
        
        if (album) {
          album.esFavorito = true;
          this.favs.push(album);
        }
        console.log(album)
        // database.addData(album, 'favs')
      }
      localStorage.setItem("favs", JSON.stringify(this.favs));
      console.log(this.favs)

      try {
        await database.addData(this.favs.find(item => item.id === id), 'favs');
    } catch (error) {
        console.error('Error al guardar el álbum en favoritos:', error);
    }
    
    },
    isFavorite(albumId) {
      return this.favs.some(album => album.id === albumId);
    },
    leerFavoritosLocal() {
      const favsStorage = JSON.parse(localStorage.getItem('favs'));
      this.favs = favsStorage ? favsStorage : [];
    }
  }
})