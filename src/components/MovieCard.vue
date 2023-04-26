<template>
  <div>
    <div class="input_section">
      <input v-model="searchTerm" type="text" placeholder="Buscar películas" v-on:keyup.enter="searchMovies">
    </div>
    <div class="search_result">
      <p>Search Result:</p>
    </div>
    <div v-if="movies.length === 0" class="no_results">
      <p>No results found</p>
    </div>
    <div class="section_cards">
      <div v-for="movie in movies" :key="movie.imdbID" class="card-main" @click="goToMovieDetails(movie.imdbID)"
        :movie="movie">
        <img :src="movie.Poster === 'N/A' ? 'https://via.placeholder.com/300x480' : movie.Poster" alt="Movie poster" />
        <p>{{ (movie.Year) }}</p>
        <h2>{{ movie.Title }}</h2>
      </div>
    </div>
  </div>
</template>
  
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { getMovieList } from '@/services/api';
import router from '@/router';
import { MovieProps } from '@/types/movie';

export default defineComponent({
  name: 'MovieList',

  async created() {
    this.searchMovies();
  },
  setup() {
    const movies = ref<MovieProps[]>([]);
    const searchTerm = ref('batman');

    const searchMovies = async () => {
      const pageNumber = 1;
      const moviesResponse = await getMovieList(searchTerm.value, pageNumber);
      movies.value = moviesResponse;
      const errorSearch = moviesResponse.Error;
      if (errorSearch === 'Movie not found!') {
        alert('No se encontraron resultados');
      }
    };

    const goToMovieDetails = (movieId: string | string[]) => {
      const id = Array.isArray(movieId) ? movieId[0] : movieId;
      router.push({ name: 'MovieDetails', params: { imdbID: id } });
    };

    return { movies, searchTerm, searchMovies, goToMovieDetails, };
  },
});
</script>

<style lang="scss">
@import "@/styles/variables";

.no_results {
  display: flex;
  justify-content: center;
  align-items: start;
  height: 50vh;

  p {
    font-size: 1.5rem;
    font-weight: 600;
  }
}

.section_cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  width: 100%;
  max-width: 80vw;
  gap: 3rem 5rem;

  .card-main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 5px;
    width: 15vw;
    overflow: hidden;
    min-width: 150px;
    cursor: pointer;
    gap: 0.5rem;

    img {
      width: 100%;
      height: 100%;
    }

    h2 {
      font-size: 1rem;
      font-weight: 600;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 100%;

    }

    p {
      font-size: 0.8rem;
      font-weight: 400;
      color: $color-gray;
    }
  }
}

.input_section {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  width: 100%;
  padding-top: 1rem;
  padding-bottom: 1.5rem;

  input {
    width: 100%;
    max-width: 30rem;
    height: 2rem;
    border-radius: 5px;
    border: 1px solid $color-gray;
    padding: 0 1rem;
    font-size: 1rem;
    font-weight: 400;
    outline: none;

    &::placeholder {
      font-size: 1rem;
      font-weight: 400;
      color: $color-gray;
    }
  }

}

.search_result {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  width: 100%;
  max-width: 80vw;
  padding-top: 1rem;
  padding-bottom: 1.5rem;

  p {
    font-size: 1.5rem;
    font-weight: 600;
  }
}
</style>