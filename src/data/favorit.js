/* import { defineStore } from "pinia";
import axios from "axios";

const API_URL = "https://www.omdbapi.com/";
const API_KEY = "f9bfc5b4";

export const useFavoritStore = defineStore("favorit", {
  state: () => {
    return {
      favMovies: JSON.parse(localStorage.getItem("favMovies")) ?? [],
    };
  },
  actions: {
    addToFavorit(id) {
      axios
        .get(`${API_URL}?apikey=${API_KEY}&i=${id}`)
        .then(res => {
          const { data } = res;
          const movie = {
            imdbID: data.imdbID,
            Title: data.Title,
            Poster: data.Poster,
            Year: data.Year,
          };
          this.favMovies.push(movie);
          localStorage.setItem("favMovies", JSON.stringify(this.favMovies));
        })
        .catch(err => console.log(err));
    },
    removeFromFav(id) {
      this.favMovies = this.favMovies.filter(movie => movie.imdbID != id);
      localStorage.setItem("favMovies", JSON.stringify(this.favMovies));
    },
  },
}); */
const favs: [];

const API_URL = "https://www.omdbapi.com/";
const API_KEY = "f9bfc5b4";

const state = {
  favMovies: JSON.parse(localStorage.getItem("favMovies")) || [],
};

const addToFavorit = async (id) => {
  try {
    // const response = await fetch(`${API_URL}?apikey=${API_KEY}&i=${id}`);
    const albumIndex = this.favs.findIndex(item => item.id === id);
/*     if (!response.ok) {
      throw new Error('Failed to fetch movie data');
    } */
    const data = await response.json();
    const movie = {
      imdbID: data.imdbID,
      Title: data.Title,
      Poster: data.Poster,
      Year: data.Year,
    };
    state.favMovies.push(movie);
    localStorage.setItem("favMovies", JSON.stringify(state.favMovies));
  } catch (error) {
    console.error('Error adding to favorites:', error);
  }
};

const removeFromFav = (id) => {
  state.favMovies = state.favMovies.filter(movie => movie.imdbID !== id);
  localStorage.setItem("favMovies", JSON.stringify(state.favMovies));
};

export {
  state,
  addToFavorit,
  removeFromFav,
};
